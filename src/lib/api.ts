// ============================================================
// EQUI Gaming Platform — API Client (connects Next.js to Laravel API)
// ============================================================

import {
  BRANCHES,
  PRICING,
  PC_TIERS,
  CONSOLES,
  CONTACTS,
  GALLERY,
} from "./mockData";
import type {
  Branch,
  PricingTier,
  PcTier,
  Console,
  Contact,
  GalleryImage,
  BranchSlug,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

function toCamelCase<T>(obj: unknown): T {
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

async function fetchFromApi<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 10 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`API error: ${res.statusText}`);
    const json = await res.json();
    return toCamelCase<T>(json.data);
  } catch (err) {
    console.warn(`[API] Fallback to mock data for endpoint ${endpoint}:`, err);
    return fallback;
  }
}

export async function getBranches(): Promise<Branch[]> {
  return fetchFromApi<Branch[]>("/branches", Object.values(BRANCHES));
}

export async function getBranch(slug: BranchSlug): Promise<Branch> {
  return fetchFromApi<Branch>(`/branches/${slug}`, BRANCHES[slug]);
}

export async function getPricing(branch: BranchSlug): Promise<PricingTier[]> {
  return fetchFromApi<PricingTier[]>(`/pricing?branch=${branch}`, PRICING[branch]);
}

export async function getPcTiers(branch: BranchSlug): Promise<PcTier[]> {
  return fetchFromApi<PcTier[]>(`/pc-tiers?branch=${branch}`, PC_TIERS[branch]);
}

export async function getConsoles(branch: BranchSlug): Promise<Console[]> {
  return fetchFromApi<Console[]>(`/consoles?branch=${branch}`, CONSOLES[branch]);
}

export async function getContact(branch: BranchSlug): Promise<Contact> {
  return fetchFromApi<Contact>(`/contacts?branch=${branch}`, CONTACTS[branch]);
}

export async function getGallery(branch: BranchSlug): Promise<GalleryImage[]> {
  return fetchFromApi<GalleryImage[]>(`/gallery?branch=${branch}`, GALLERY[branch]);
}
