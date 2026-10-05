// Replace SITE_URL with the production domain before launch (or set NEXT_PUBLIC_SITE_URL).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.trilandtour.com";

export const CONTACT_EMAIL = "trilandxxx@gmail.com";

export function mailto(subject?: string) {
  return subject
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
    : `mailto:${CONTACT_EMAIL}`;
}
