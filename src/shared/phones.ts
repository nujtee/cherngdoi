/**
 * The site's contact phone can hold several numbers in one field, e.g. "063 795 1218, 095 579 0679".
 * Numbers are separated by a comma (also ";", "/" or the Thai / Chinese full-width comma); each number on its
 * own must look like a phone number. Stored as one string, numbers joined by ", ".
 */
export const MAX_PHONES = 5;
const ONE_PHONE = /^[0-9+()\- ]{6,30}$/;
const SEPARATOR = /[,;，、/]/;

/** Split the stored value into its numbers (empty parts dropped). */
export function splitPhones(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split(SEPARATOR)
    .map((p) => p.trim().replace(/\s+/g, " "))
    .filter((p) => p.length > 0);
}

/** Canonical stored form ("a, b"), or null when any number is malformed or there are too many. */
export function normalizePhoneList(value: string): string | null {
  const phones = splitPhones(value);
  if (phones.length === 0 || phones.length > MAX_PHONES) return null;
  if (!phones.every((p) => ONE_PHONE.test(p) && /\d{3}/.test(p.replace(/\D/g, "")))) return null;
  return phones.join(", ");
}

/** `tel:` link for one number. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
