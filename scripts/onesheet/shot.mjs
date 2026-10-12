import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
const qr = await readFile("scripts/onesheet/qr.inline.svg","utf8");
const logo = await readFile("public/lisnin-logo__black.svg","utf8");
let html = await readFile("scripts/onesheet/onesheet.html","utf8");
html = html.replace("<!--QR-->", qr).replace("<!--LOGO-->", logo);
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:816,height:1056}, deviceScaleFactor:2 });
await p.setContent(html,{waitUntil:"networkidle"});
await p.evaluateHandle("document.fonts.ready");
// Real overflow test: bottom of the last child vs the frame's content box.
const m = await p.evaluate(()=>{
  const s=document.querySelector('.sheet');
  const r=s.getBoundingClientRect();
  const kids=[...s.children];
  const last=kids[kids.length-1].getBoundingClientRect();
  const padB=parseFloat(getComputedStyle(s).paddingBottom);
  return {frameBottom:r.bottom-padB, lastChildBottom:last.bottom,
          spare:+(r.bottom-padB-last.bottom).toFixed(1),
          childCount:kids.length};
});
await p.screenshot({path:"/tmp/onesheet.png"});
await b.close();
console.log(JSON.stringify(m,null,1));
