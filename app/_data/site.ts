export const CURRENT_SITE_URL = "https://learnerlens-th.burapatis.chatgpt.site";
export const PUBLIC_SITE_URL = "https://llens.thamdee.com";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || CURRENT_SITE_URL
).replace(/\/$/, "");

export const siteRoutes = [
  "/",
  "/knowledge",
  "/articles",
  "/articles/learning-psychology",
  "/articles/child-development",
  "/articles/individual-differences",
  "/articles/multiple-intelligences",
  "/articles/learning-preferences",
  "/articles/motivation",
  "/articles/executive-functions",
  "/articles/inclusive-education",
  "/articles/udl",
  "/articles/differentiation",
  "/articles/assessment-for-learning",
  "/editorial",
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
