import type { SyntheticEvent } from 'react';

const FALLBACK_IMAGE = '/logo.png';

const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');

export const resolveImageUrl = (raw?: string): string => {
  if (!raw) return FALLBACK_IMAGE;

  let input = raw.trim();

  // Unwrap common search engine redirect URLs (e.g., Bing mediaurl, Google imgurl)
  try {
    const parsed = new URL(input);
    const wrapped = parsed.searchParams.get('mediaurl') || parsed.searchParams.get('imgurl');
    if (wrapped) {
      input = decodeURIComponent(wrapped);
    }
  } catch {
    // not a full URL, continue with original input
  }

  // Normalize slashes from Windows-style paths the API might return
  input = input.replace(/\\/g, '/');

  if (/^https?:\/\//i.test(input) || input.startsWith('data:')) {
    return input;
  }

  if (input.startsWith('//')) {
    return `https:${input}`;
  }

  const path = input.startsWith('/') ? input : `/${input}`;
  return `${apiBase}${path}`;
};

export const handleImgError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
  const img = event.currentTarget;
  if (!img || img.src.endsWith(FALLBACK_IMAGE)) return;
  img.src = FALLBACK_IMAGE;
};

export const FALLBACK_IMAGE_URL = FALLBACK_IMAGE;
