import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number into a string with K/M/T suffixes for thousand, million, trillion.
 * @param n The number to format.
 * @returns A formatted string (e.g., 1.2K, 2.5M, 3.4T).
 */
export function formatET(n: number): string {
  if (n < 1e3) return n.toString();
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  return n.toString();
}
