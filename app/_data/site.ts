export const CURRENT_SITE_URL = "https://learnerlens-th.burapatis.chatgpt.site";
export const PUBLIC_SITE_URL = "https://llens.thamdee.com";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || CURRENT_SITE_URL
).replace(/\/$/, "");

export const siteRoutes = [
  "/",
  "/knowledge",
  "/start",
  "/toolkit",
  "/paths",
  "/cases",
  "/case-finder",
  "/coach",
  "/follow-up",
  "/downloads",
  "/prompts",
  "/assessment",
  "/data",
  "/about",
  "/principles",
] as const;
