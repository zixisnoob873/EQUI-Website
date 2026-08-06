// ============================================================
// EQUI Admin Auth Helper
// ============================================================

export interface AuthState {
  token: string | null;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
}

const TOKEN_KEY = "equi_admin_token";
const USER_KEY = "equi_admin_user";

export function toCamelCase<T>(obj: unknown): T {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v)) as unknown as T;
  }
  if (obj !== null && typeof obj === "object" && !(obj instanceof Date)) {
    return Object.keys(obj as Record<string, unknown>).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      (acc as Record<string, unknown>)[camelKey] = toCamelCase((obj as Record<string, unknown>)[key]);
      return acc;
    }, {} as Record<string, unknown>) as unknown as T;
  }
  return obj as T;
}

export function getStoredAuth(): AuthState {
  if (typeof window === "undefined") return { token: null, user: null };
  const token = localStorage.getItem(TOKEN_KEY);
  const userStr = localStorage.getItem(USER_KEY);
  const user = userStr ? JSON.parse(userStr) : null;
  return { token, user };
}

export function setStoredAuth(token: string, user: AuthState["user"]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function adminFetch(endpoint: string, options: RequestInit = {}) {
  const { token } = getStoredAuth();
  const headers = new Headers(options.headers || {});
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`http://127.0.0.1:8000/api${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || `API error (${res.status})`);
  }

  const json = await res.json();
  return {
    ...json,
    data: json.data ? toCamelCase(json.data) : json.data,
  };
}
