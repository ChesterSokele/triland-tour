export type Lang = "en" | "de";

/** English lives at the root, German under /de. Works for "/", "/x", "/#hash" and "#hash" paths. */
export function localePath(lang: Lang, path: string) {
  if (lang === "en" || !path.startsWith("/")) return path;
  if (path === "/") return "/de";
  return path.startsWith("/#") ? `/de${path.slice(1)}` : `/de${path}`;
}
