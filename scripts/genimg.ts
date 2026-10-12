/**
 * genimg.ts — generate the atmospheric imagery for /i/bizintro.
 *
 * Run:  npx tsx scripts/genimg.ts --all
 *       npx tsx scripts/genimg.ts "a prompt" --out public/i/bizintro/x.png
 *       npx tsx scripts/genimg.ts --list-models
 *
 * WHY THE SDK AND NOT RAW fetch():
 *   HF's OpenAI-compatible endpoint (https://router.huggingface.co/v1) is
 *   chat-completion ONLY — it does not serve text-to-image. For images the HF
 *   router proxies to whichever provider hosts the model (fal-ai, replicate,
 *   wavespeed, hf-inference...) and each expects a different request shape.
 *   @huggingface/inference normalises that, so this keeps working when routing
 *   changes. Verified against:
 *     https://huggingface.co/docs/inference-providers/en/index
 *     https://huggingface.co/docs/inference-providers/en/tasks/text-to-image
 *
 * AUTH: HF_TOKEN from the environment. Never hardcode a token here.
 *   Needs the "Make calls to Inference Providers" permission.
 *   https://huggingface.co/settings/tokens
 */

import { InferenceClient } from "@huggingface/inference";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/** Model the build brief asks for. Not silently substituted — see preflight(). */
const DEFAULT_MODEL = "Qwen/Qwen-Image-2.1";

const OUT_DIR = "public/i/bizintro";

/**
 * One grade across every image so they read as a single shoot, in both themes.
 * Brief §8: consistent colour temperature, grain and contrast curve.
 */
const GRADE =
  "shot on 35mm film, fine natural grain, warm tungsten key light, deep desaturated " +
  "green-black shadows, soft low-contrast curve, muted cinematic colour grade, " +
  "shallow depth of field, no text, no logos, no watermark";

/**
 * Brief §8 hard constraint: no faces, no eye contact, no identifiable people.
 * An investor who clocks an AI face discounts everything around it.
 */
const NEGATIVE =
  "face, faces, facial features, eyes, eye contact, portrait, headshot, looking at camera, " +
  "person facing camera, teeth, smile, distorted hands, extra fingers, text, watermark, " +
  "signature, logo, oversaturated, HDR, plastic skin, 3d render, illustration, cartoon";

type Slot = {
  slug: string;
  /** What the image is doing on the page — kept with the prompt so they stay in sync. */
  role: string;
  prompt: string;
  width: number;
  height: number;
  alt: string;
};

/** Every image slot the brief calls for. Each sits low in the hierarchy, behind glass/gradient. */
const IMAGE_SET: Slot[] = [
  {
    slug: "hero-atmosphere",
    role: "Hero — ambient wash behind the converging fragments",
    prompt:
      "Empty concert stage seen from the wings, haze in the air, warm backlight rigs flaring " +
      "toward the lens, cables and monitor wedges in silhouette, nobody on stage",
    width: 1600,
    height: 900,
    alt: "An empty stage lit from behind, haze catching the rig lights",
  },
  {
    slug: "problem-fragments",
    role: "The problem — texture behind the tangle diagram",
    prompt:
      "Cluttered home studio desk at night from a steep overhead angle, scattered cables, " +
      "notebooks and an audio interface, single warm lamp, most of the frame in shadow",
    width: 1400,
    height: 900,
    alt: "A cluttered home studio desk at night under a single lamp",
  },
  {
    slug: "manager-hands",
    role: "AI Manager — atmosphere behind the prompt panel",
    prompt:
      "Close crop of a musician's hands on an electric guitar fretboard, warm stage lighting " +
      "from behind, strings catching the light, body and face entirely out of frame",
    width: 1400,
    height: 900,
    alt: "Hands on an electric guitar fretboard, lit warmly from behind",
  },
  {
    slug: "rail-listening-party",
    role: "Listening Parties rail — crowd texture",
    prompt:
      "Dense crowd at a small venue photographed from behind the audience, heads in " +
      "silhouette, warm stage glow ahead, motion blur across the frame",
    width: 1200,
    height: 800,
    alt: "A small-venue crowd seen from behind, stage glowing ahead",
  },
  {
    slug: "proof-community",
    role: "Proof — community texture behind the campaign figures",
    prompt:
      "Hands raised in a dim crowd lit by warm stage wash, shot from the back of the room, " +
      "heavy bokeh, no faces visible",
    width: 1200,
    height: 800,
    alt: "Raised hands in a dim crowd under warm stage light",
  },
  {
    slug: "close-studio",
    role: "The ask — closing atmosphere",
    prompt:
      "Recording studio control surface at a low raking angle, faders and knobs catching warm " +
      "light, monitors dark in the background, room empty",
    width: 1600,
    height: 700,
    alt: "An empty studio control surface lit at a raking angle",
  },
];

function die(msg: string): never {
  console.error(`\nerror: ${msg}\n`);
  process.exit(1);
}

function getToken(): string {
  const t = process.env.HF_TOKEN || process.env.HUGGING_FACE_HUB_TOKEN;
  if (!t) {
    die(
      "HF_TOKEN is not set.\n\n" +
        "  export HF_TOKEN='hf_...'\n\n" +
        "Create one with 'Make calls to Inference Providers' permission:\n" +
        "  https://huggingface.co/settings/tokens",
    );
  }
  return t;
}

async function hostedTextToImageModels(limit = 15): Promise<string[]> {
  const q = new URLSearchParams({
    filter: "text-to-image",
    inference_provider: "all",
    sort: "trendingScore",
    limit: String(limit),
  });
  const r = await fetch(`https://huggingface.co/api/models?${q}`);
  if (!r.ok) return [];
  const data = (await r.json()) as Array<{ id: string }>;
  return data.map((m) => m.id);
}

/**
 * Confirm a provider actually serves this model before spending a request.
 * An empty inferenceProviderMapping means the weights are on the Hub but nobody
 * hosts them — there is no endpoint to call. Fail loudly with alternatives
 * rather than quietly swapping in a different model.
 */
async function preflight(model: string): Promise<string[]> {
  const url =
    `https://huggingface.co/api/models/${model}` +
    `?expand[]=inferenceProviderMapping&expand[]=inference`;
  const r = await fetch(url);
  if (r.status === 404) die(`model not found on the Hub: ${model}`);
  if (!r.ok) die(`Hub API returned HTTP ${r.status} for ${model}`);

  const info = (await r.json()) as {
    inferenceProviderMapping?: Record<string, { status?: string }>;
  };
  const mapping = info.inferenceProviderMapping ?? {};
  const live = Object.entries(mapping)
    .filter(([, v]) => v?.status === "live")
    .map(([k]) => k);

  if (live.length === 0) {
    const alts = await hostedTextToImageModels();
    die(
      `'${model}' is NOT served by any Inference Provider.\n\n` +
        "  The weights exist on the Hub, but nobody hosts them, so there is no\n" +
        "  endpoint to call. This is not a rate limit and not a token problem.\n\n" +
        "  Either pick a hosted model with --model, or run the weights yourself\n" +
        "  (diffusers + GPU / a dedicated Inference Endpoint). Currently hosted:\n\n" +
        alts.map((a) => `    ${a}`).join("\n"),
    );
  }
  return live;
}

/** First arg of textToImage, so `provider` can be attached without `any`. */
type T2IArgs = Parameters<InferenceClient["textToImage"]>[0];

async function generateOne(
  client: InferenceClient,
  opts: {
    model: string;
    prompt: string;
    width: number;
    height: number;
    outBase: string;
    provider?: string;
  },
) {
  const args = {
    model: opts.model,
    inputs: `${opts.prompt}. ${GRADE}`,
    parameters: {
      negative_prompt: NEGATIVE,
      width: opts.width,
      height: opts.height,
    },
  } as T2IArgs;

  // Provider is selected per call (the constructor does not take one).
  if (opts.provider) {
    (args as unknown as Record<string, unknown>).provider = opts.provider;
  }

  const blob = await client.textToImage(args);

  // SDK versions differ: Blob in most, base64/URL string in some. Handle both.
  let png: Buffer;
  if (typeof blob === "string") {
    const s = blob as string;
    png = s.startsWith("http")
      ? Buffer.from(await (await fetch(s)).arrayBuffer())
      : Buffer.from(s.replace(/^data:image\/\w+;base64,/, ""), "base64");
  } else {
    png = Buffer.from(await (blob as Blob).arrayBuffer());
  }

  await mkdir(path.dirname(opts.outBase), { recursive: true });

  // Modern formats + explicit dimensions so nothing shifts on load (brief §8).
  await sharp(png).webp({ quality: 82 }).toFile(`${opts.outBase}.webp`);
  await sharp(png).avif({ quality: 58 }).toFile(`${opts.outBase}.avif`);
  await writeFile(`${opts.outBase}.png`, png);

  const meta = await sharp(png).metadata();
  console.log(`  saved ${opts.outBase}.{avif,webp,png}  ${meta.width}x${meta.height}`);
}

async function main() {
  const argv = process.argv.slice(2);

  if (argv.includes("--list-models")) {
    console.log("Text-to-image models currently served by a provider:\n");
    for (const m of await hostedTextToImageModels(25)) console.log(`  ${m}`);
    return;
  }

  const flag = (name: string) => {
    const i = argv.indexOf(name);
    return i !== -1 && argv[i + 1] ? argv[i + 1] : undefined;
  };

  const model = flag("--model") ?? DEFAULT_MODEL;
  const provider = flag("--provider");
  const token = getToken();

  const providers = await preflight(model);
  console.log(`model     : ${model}`);
  console.log(`providers : ${providers.join(", ")}`);
  console.log(`using     : ${provider ?? "auto"}\n`);

  const client = new InferenceClient(token);

  if (argv.includes("--all")) {
    console.log(`generating ${IMAGE_SET.length} images into ${OUT_DIR}/\n`);
    for (const slot of IMAGE_SET) {
      console.log(`${slot.slug} — ${slot.role}`);
      await generateOne(client, {
        model,
        provider,
        prompt: slot.prompt,
        width: slot.width,
        height: slot.height,
        outBase: path.join(OUT_DIR, slot.slug),
      });
    }
    return;
  }

  const prompt = argv.find((a) => !a.startsWith("--") && argv[argv.indexOf(a) - 1]?.startsWith("--") === false);
  if (!prompt) die("pass a prompt, or --all to build every slot the brief calls for");

  const out = flag("--out") ?? path.join(OUT_DIR, "image.png");
  await generateOne(client, {
    model,
    provider,
    prompt,
    width: Number(flag("--width") ?? 1400),
    height: Number(flag("--height") ?? 900),
    outBase: out.replace(/\.(png|webp|avif)$/, ""),
  });
}

main().catch((e) => {
  const t = String(e?.message ?? e);
  if (t.includes("401")) die("HF rejected the token (401) — revoked, or missing Inference Providers permission.");
  if (t.includes("402") || /credit/i.test(t)) die("Out of Inference Provider credits (402). Free allowance exhausted.");
  if (t.includes("429") || /rate/i.test(t)) die("Rate limited (429). Retry, or pin a provider with --provider.");
  die(t);
});

export { IMAGE_SET };
