import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** True for absolute http(s)/mailto/tel links. */
export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href)
