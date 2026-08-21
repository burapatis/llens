import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base="https://learnerlens-th.burapatis.chatgpt.site";
  const routes=["","/knowledge","/toolkit","/paths","/cases","/coach","/downloads","/prompts","/assessment","/data","/about","/principles"];
  return routes.map((route,index)=>({url:`${base}${route}`,lastModified:new Date("2026-08-21"),changeFrequency:index===0?"weekly":"monthly",priority:index===0?1:index<6?0.8:0.6}));
}
