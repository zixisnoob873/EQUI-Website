// ============================================================
// EQUI Gaming Platform — TypeScript Type Definitions
// ============================================================

// --- Branch ---
export interface Branch {
  id: number;
  name: string;
  slug: string;
  address: string;
  city: string;
  phone: string;
  mapsLat: number;
  mapsLng: number;
  mapsEmbedUrl: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// --- Pricing ---
export type PricingType = "pc" | "console";

export interface PricingTier {
  id: number;
  branchId: number;
  tierName: string;
  type: PricingType;
  hourlyRate: number;
  dailyRate: number | null;
  features: string[];
  sortOrder: number;
}

// --- PC Tiers ---
export interface PcTier {
  id: number;
  branchId: number;
  tierName: string;
  cpu: string;
  gpu: string;
  ram: string;
  monitor: string;
  peripherals: Record<string, string>;
  imageUrl: string;
  description: string;
  sortOrder: number;
}

// --- Consoles ---
export interface Console {
  id: number;
  branchId: number;
  consoleType: string;
  setupDescription: string;
  gamesAvailable: string[];
  imageUrl: string;
  hourlyRate: number;
}

// --- Contact ---
export interface Contact {
  id: number;
  branchId: number;
  phonePrimary: string;
  phoneSecondary: string | null;
  email: string | null;
  whatsapp: string | null;
  operatingHours: OperatingHours;
}

export interface OperatingHours {
  schedule?: string;
  status?: string;
  weekdays?: string;
  weekends?: string;
}

// --- Gallery ---
export interface GalleryImage {
  id: number;
  branchId: number;
  imageUrl: string;
  thumbnailUrl: string;
  caption: string;
  category: GalleryCategory;
  sortOrder: number;
  isFeatured: boolean;
}

export type GalleryCategory = "setup" | "events" | "ambiance" | "gaming" | "general";

// --- Page Content ---
export interface PageContent {
  id: number;
  branchId: number | null;
  pageSlug: string;
  sectionKey: string;
  content: Record<string, unknown>;
  updatedAt: string;
}

// --- Auth ---
export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "super_admin";
}

// --- API Response Wrappers ---
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiListResponse<T> {
  data: T[];
  message?: string;
  meta?: {
    total: number;
    page: number;
    perPage: number;
  };
}

// --- Branch Switcher ---
export type BranchSlug = "gulberg-3" | "airline-society";

export interface BranchSwitcherProps {
  activeBranch: BranchSlug;
  onBranchChange: (branch: BranchSlug) => void;
  className?: string;
}
