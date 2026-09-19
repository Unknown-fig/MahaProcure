import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    const num = Number(amount);
    if (isNaN(num)) return "₹0";
    return "₹" + num.toLocaleString("en-IN");
  }
  return "₹" + amount.toLocaleString("en-IN");
}

