export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export async function fetchJson(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = data?.message || res.statusText || 'Request failed';
    throw new Error(message);
  }
  return data;
}
