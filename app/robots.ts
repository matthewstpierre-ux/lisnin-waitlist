import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/i/bizintro", "/ataglance"],
    },
    sitemap: "https://www.lisnin.io/sitemap.xml",
  };
}
