const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

export function getApiBaseUrl(): string {
  if (!API_BASE_URL) {
    // По умолчанию указываем локальный адрес; поменяйте в .env
    return 'http://localhost:3000/api';
  }
  return API_BASE_URL;
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${getApiBaseUrl()}${path}`;
  const resp = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`GET ${path} failed: ${resp.status} ${text}`);
  }
  return resp.json() as Promise<T>;
}


