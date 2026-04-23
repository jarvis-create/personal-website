export type Route = "home" | "work" | "writing" | "about" | "side-projects" | "shelf";

export type SeoMeta = {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
};

export const BASE_URL = "https://oluwafemijoshua.com";
const OG_IMAGE = `${BASE_URL}/oluwafemi-joshua.png`;

export function parseRoute(pathname: string): Route {
  const p = pathname.toLowerCase().replace(/\/+$/, "") || "/";
  if (p.startsWith("/work")) return "work";
  if (p.startsWith("/shelf")) return "shelf";
  if (p.startsWith("/about")) return "about";
  if (p.startsWith("/side-projects")) return "side-projects";
  if (p.startsWith("/writing")) return "writing";
  return "home";
}

function absoluteUrl(pathname: string) {
  return pathname === "/" ? `${BASE_URL}/` : `${BASE_URL}${pathname}`;
}

function createMeta(pathname: string, title: string, description: string): SeoMeta {
  const url = absoluteUrl(pathname);

  return {
    title,
    description,
    canonical: url,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: OG_IMAGE,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: OG_IMAGE,
  };
}

const SEO_BY_ROUTE: Record<Route, SeoMeta> = {
  home: createMeta(
    "/",
    "Oluwafemi Joshua - Technical Product Manager",
    "Oluwafemi Joshua is a Technical Product Manager at Tech1M building AI-native products, PLG systems, and LLM evaluation frameworks."
  ),
  about: createMeta(
    "/about",
    "About Oluwafemi Joshua — Technical PM at Tech1M",
    "Learn how Oluwafemi Joshua works as a Technical Product Manager at Tech1M, from discovery-driven product thinking to AI-native product strategy."
  ),
  work: createMeta(
    "/work",
    "How Oluwafemi Joshua Works — Product Case Studies",
    "Selected product case studies and working principles from Oluwafemi Joshua across AI quality systems, enterprise transformation, and payments."
  ),
  writing: createMeta(
    "/writing",
    "Writing by Oluwafemi Joshua — Essays on AI, PLG & Product",
    "Essays by Oluwafemi Joshua on AI, product-led growth, human-centered product work, and the questions behind better products."
  ),
  "side-projects": createMeta(
    "/side-projects",
    "Side Projects by Oluwafemi Joshua — AI, Learning & Experiments",
    "Explore Oluwafemi Joshua's side projects, including Useiterance and experiments in learning systems, AI, and digital legacy."
  ),
  shelf: createMeta(
    "/shelf",
    "Oluwafemi Joshua's Shelf — Books, Music & References",
    "A shelf of books, playlists, and references shaping how Oluwafemi Joshua thinks about product, writing, and life."
  ),
};

export function getSeoForPath(pathname: string): SeoMeta {
  return SEO_BY_ROUTE[parseRoute(pathname)];
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderSeoHead(seo: SeoMeta) {
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<link rel="canonical" data-seo="canonical" href="${escapeHtml(seo.canonical)}" />`,
    `<meta name="description" data-seo="description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" data-seo="og:title" content="${escapeHtml(seo.ogTitle)}" />`,
    `<meta property="og:description" data-seo="og:description" content="${escapeHtml(seo.ogDescription)}" />`,
    `<meta property="og:url" data-seo="og:url" content="${escapeHtml(seo.ogUrl)}" />`,
    `<meta property="og:image" data-seo="og:image" content="${escapeHtml(seo.ogImage)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" data-seo="twitter:title" content="${escapeHtml(seo.twitterTitle)}" />`,
    `<meta name="twitter:description" data-seo="twitter:description" content="${escapeHtml(seo.twitterDescription)}" />`,
    `<meta name="twitter:image" data-seo="twitter:image" content="${escapeHtml(seo.twitterImage)}" />`,
  ].join("\n    ");
}

function setMetaAttribute(selector: string, attribute: "content" | "href", value: string) {
  const element = document.head.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
}

export function applySeoToDocument(seo: SeoMeta) {
  document.title = seo.title;
  setMetaAttribute('[data-seo="canonical"]', "href", seo.canonical);
  setMetaAttribute('[data-seo="description"]', "content", seo.description);
  setMetaAttribute('[data-seo="og:title"]', "content", seo.ogTitle);
  setMetaAttribute('[data-seo="og:description"]', "content", seo.ogDescription);
  setMetaAttribute('[data-seo="og:url"]', "content", seo.ogUrl);
  setMetaAttribute('[data-seo="og:image"]', "content", seo.ogImage);
  setMetaAttribute('[data-seo="twitter:title"]', "content", seo.twitterTitle);
  setMetaAttribute('[data-seo="twitter:description"]', "content", seo.twitterDescription);
  setMetaAttribute('[data-seo="twitter:image"]', "content", seo.twitterImage);
}
