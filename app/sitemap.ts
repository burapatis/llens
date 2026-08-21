import type { MetadataRoute } from "next";
import { siteRoutes, siteUrl } from "./_data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((route,index)=>({url:`${siteUrl}${route === "/" ? "" : route}`,lastModified:new Date("2026-08-21"),changeFrequency:index===0?"weekly":"monthly",priority:index===0?1:index<6?0.8:0.6}));
}
