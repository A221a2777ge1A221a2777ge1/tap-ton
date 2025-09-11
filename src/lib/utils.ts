import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatET(num: number): string {
  if (num < 1000) {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
  const suffixes = ["", "K", "M", "B", "T"];
  const i = Math.floor(Math.log(num) / Math.log(1000));
  const formattedNum = parseFloat((num / Math.pow(1000, i)).toFixed(2));
  return `${formattedNum}${suffixes[i]}`;
}
