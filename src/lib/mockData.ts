// ============================================================
// EQUI Gaming Platform — Mock Data (replaces API until Laravel is ready)
// ============================================================

import type {
  Branch,
  PricingTier,
  PcTier,
  Console,
  Contact,
  GalleryImage,
  BranchSlug,
} from "@/types";

// --- Branches ---
export const BRANCHES: Record<BranchSlug, Branch> = {
  "gulberg-3": {
    id: 1,
    name: "Gulberg 3",
    slug: "gulberg-3",
    address: "Main Boulevard, Gulberg III, Lahore, Punjab, Pakistan",
    city: "Lahore",
    phone: "+92 321 1234567",
    mapsLat: 31.5204,
    mapsLng: 74.3587,
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2spk!4v1",
    description:
      "Our flagship branch in the heart of Gulberg, featuring 30+ premium gaming stations, VIP lounges, and tournament-ready setups.",
    imageUrl: "/images/branch-gulberg.jpg",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  "airline-society": {
    id: 2,
    name: "Airline Society",
    slug: "airline-society",
    address: "Block B, Airline Housing Society, Lahore, Punjab, Pakistan",
    city: "Lahore",
    phone: "+92 333 7654321",
    mapsLat: 31.5156,
    mapsLng: 74.3966,
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.8!2d74.3966!3d31.5156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMwJzU2LjIiTiA3NMKwMjMnNDcuOCJF!5e0!3m2!1sen!2spk!4v1",
    description:
      "Our newest branch with cutting-edge hardware, spacious gaming zones, and a dedicated PS5 arena.",
    imageUrl: "/images/branch-airline.jpg",
    createdAt: "2024-06-01",
    updatedAt: "2024-06-01",
  },
};

// --- Pricing ---
export const PRICING: Record<BranchSlug, PricingTier[]> = {
  "gulberg-3": [
    {
      id: 1,
      branchId: 1,
      tierName: "Tier 1",
      type: "pc",
      hourlyRate: 200,
      dailyRate: 1500,
      features: ["i5 13th Gen", "RTX 3060", "144Hz Monitor", "Basic Peripherals"],
      sortOrder: 1,
    },
    {
      id: 2,
      branchId: 1,
      tierName: "Tier 2",
      type: "pc",
      hourlyRate: 350,
      dailyRate: 2500,
      features: ["i7 13th Gen", "RTX 4070", "165Hz Monitor", "Premium Peripherals", "Ergonomic Chair"],
      sortOrder: 2,
    },
    {
      id: 3,
      branchId: 1,
      tierName: "Tier 3",
      type: "pc",
      hourlyRate: 500,
      dailyRate: 3500,
      features: ["i9 14th Gen", "RTX 4090", "240Hz Monitor", "Pro Peripherals", "VIP Zone", "Complimentary Drinks"],
      sortOrder: 3,
    },
    {
      id: 4,
      branchId: 1,
      tierName: "PS5",
      type: "console",
      hourlyRate: 300,
      dailyRate: 2000,
      features: ["PS5 Digital/Disc", "4K Display", "DualSense Controller", "200+ Games Library"],
      sortOrder: 4,
    },
  ],
  "airline-society": [
    {
      id: 5,
      branchId: 2,
      tierName: "Tier 1",
      type: "pc",
      hourlyRate: 180,
      dailyRate: 1400,
      features: ["i5 12th Gen", "RTX 3060", "144Hz Monitor", "Standard Peripherals"],
      sortOrder: 1,
    },
    {
      id: 6,
      branchId: 2,
      tierName: "Tier 2",
      type: "pc",
      hourlyRate: 320,
      dailyRate: 2300,
      features: ["i7 13th Gen", "RTX 4060 Ti", "165Hz Monitor", "Premium Peripherals", "RGB Setup"],
      sortOrder: 2,
    },
    {
      id: 7,
      branchId: 2,
      tierName: "Tier 3",
      type: "pc",
      hourlyRate: 480,
      dailyRate: 3200,
      features: ["i9 13th Gen", "RTX 4080", "240Hz Monitor", "Pro Peripherals", "Private Booth", "Snack Bar Access"],
      sortOrder: 3,
    },
    {
      id: 8,
      branchId: 2,
      tierName: "PS5",
      type: "console",
      hourlyRate: 280,
      dailyRate: 1800,
      features: ["PS5 Disc Edition", "55\" 4K TV", "DualSense Controller", "150+ Games Library"],
      sortOrder: 4,
    },
  ],
};

// --- PC Tiers ---
export const PC_TIERS: Record<BranchSlug, PcTier[]> = {
  "gulberg-3": [
    {
      id: 1,
      branchId: 1,
      tierName: "Tier 1",
      cpu: "Intel Core i5-13400F",
      gpu: "NVIDIA GeForce RTX 3060 12GB",
      ram: "16GB DDR4 3200MHz",
      monitor: '24" 144Hz IPS 1080p',
      peripherals: {
        Keyboard: "Mechanical RGB",
        Mouse: "Gaming Mouse 12000 DPI",
        Headset: "Stereo Gaming Headset",
        Chair: "Standard Gaming Chair",
      },
      imageUrl: "/images/pc-tier1-g3.jpg",
      description: "Perfect for casual gaming and esports titles. Smooth 144fps gameplay on competitive settings.",
      sortOrder: 1,
    },
    {
      id: 2,
      branchId: 1,
      tierName: "Tier 2",
      cpu: "Intel Core i7-13700KF",
      gpu: "NVIDIA GeForce RTX 4070 12GB",
      ram: "32GB DDR5 5200MHz",
      monitor: '27" 165Hz IPS 1440p',
      peripherals: {
        Keyboard: "Mechanical Hot-Swap RGB",
        Mouse: "Wireless Gaming Mouse 25K DPI",
        Headset: "7.1 Surround Sound Headset",
        Chair: "Ergonomic Premium Chair",
      },
      imageUrl: "/images/pc-tier2-g3.jpg",
      description: "High-performance setup for AAA gaming and content creation. Ultra settings at 1440p.",
      sortOrder: 2,
    },
    {
      id: 3,
      branchId: 1,
      tierName: "Tier 3",
      cpu: "Intel Core i9-14900KS",
      gpu: "NVIDIA GeForce RTX 4090 24GB",
      ram: "64GB DDR5 6000MHz",
      monitor: '27" 240Hz IPS 1440p',
      peripherals: {
        Keyboard: "Custom Mechanical 75%",
        Mouse: "Pro Wireless 30K DPI",
        Headset: "Studio-Grade Gaming Headset",
        Chair: "Secretlab Titan Evo",
        Extra: "Stream Deck, Webcam, Ring Light",
      },
      imageUrl: "/images/pc-tier3-g3.jpg",
      description: "The ultimate experience. No compromises. 4K gaming, streaming, and professional-grade hardware.",
      sortOrder: 3,
    },
  ],
  "airline-society": [
    {
      id: 4,
      branchId: 2,
      tierName: "Tier 1",
      cpu: "Intel Core i5-12400F",
      gpu: "NVIDIA GeForce RTX 3060 12GB",
      ram: "16GB DDR4 3200MHz",
      monitor: '24" 144Hz VA 1080p',
      peripherals: {
        Keyboard: "Membrane RGB Keyboard",
        Mouse: "Gaming Mouse 8000 DPI",
        Headset: "Over-Ear Gaming Headset",
        Chair: "Comfort Gaming Chair",
      },
      imageUrl: "/images/pc-tier1-as.jpg",
      description: "Entry-level gaming that still packs a punch. Great for esports and online gaming.",
      sortOrder: 1,
    },
    {
      id: 5,
      branchId: 2,
      tierName: "Tier 2",
      cpu: "Intel Core i7-13700F",
      gpu: "NVIDIA GeForce RTX 4060 Ti 8GB",
      ram: "32GB DDR4 3600MHz",
      monitor: '27" 165Hz IPS 1440p',
      peripherals: {
        Keyboard: "Mechanical RGB Full-Size",
        Mouse: "Wireless Gaming Mouse 20K DPI",
        Headset: "Virtual 7.1 Headset",
        Chair: "Premium Ergonomic Chair",
      },
      imageUrl: "/images/pc-tier2-as.jpg",
      description: "Balanced performance for modern gaming. Handles any game at high settings smoothly.",
      sortOrder: 2,
    },
    {
      id: 6,
      branchId: 2,
      tierName: "Tier 3",
      cpu: "Intel Core i9-13900KF",
      gpu: "NVIDIA GeForce RTX 4080 16GB",
      ram: "64GB DDR5 5600MHz",
      monitor: '27" 240Hz IPS 1440p',
      peripherals: {
        Keyboard: "Custom Mechanical TKL",
        Mouse: "Pro Wireless 25K DPI",
        Headset: "Planar Magnetic Gaming Headset",
        Chair: "Herman Miller x Logitech",
        Extra: "USB-C Hub, Monitor Light Bar",
      },
      imageUrl: "/images/pc-tier3-as.jpg",
      description: "Top-tier hardware in a private booth setting. Built for serious gamers and streamers.",
      sortOrder: 3,
    },
  ],
};

// --- Consoles ---
export const CONSOLES: Record<BranchSlug, Console[]> = {
  "gulberg-3": [
    {
      id: 1,
      branchId: 1,
      consoleType: "PS5",
      setupDescription:
        "Immerse yourself in our PS5 zone featuring 4K displays, surround sound, and comfortable seating for up to 4 players. Perfect for FIFA tournaments, racing games, and co-op sessions.",
      gamesAvailable: [
        "FIFA 25", "God of War Ragnarök", "Spider-Man 2", "Gran Turismo 7",
        "Call of Duty MW3", "GTA V", "Tekken 8", "Elden Ring",
        "Hogwarts Legacy", "Horizon Forbidden West", "The Last of Us Part I",
        "Mortal Kombat 1", "NBA 2K25", "FC 25", "Fortnite",
      ],
      imageUrl: "/images/ps5-gulberg.jpg",
      hourlyRate: 300,
    },
  ],
  "airline-society": [
    {
      id: 2,
      branchId: 2,
      consoleType: "PS5",
      setupDescription:
        "Our Airline Society PS5 arena features a 55-inch 4K Smart TV setup with premium sound, DualSense controllers, and a cozy lounge vibe. Ideal for group gaming sessions.",
      gamesAvailable: [
        "FIFA 25", "Spider-Man 2", "God of War Ragnarök", "Tekken 8",
        "Call of Duty MW3", "GTA V", "Gran Turismo 7", "Elden Ring",
        "Mortal Kombat 1", "NBA 2K25", "Astro Bot", "Ratchet & Clank",
      ],
      imageUrl: "/images/ps5-airline.jpg",
      hourlyRate: 280,
    },
  ],
};

// --- Contacts ---
export const CONTACTS: Record<BranchSlug, Contact> = {
  "gulberg-3": {
    id: 1,
    branchId: 1,
    phonePrimary: "+92 321 1234567",
    phoneSecondary: "+92 42 35761234",
    email: "gulberg@equigaming.pk",
    whatsapp: "+923211234567",
    operatingHours: {
      weekdays: "12:00 PM – 2:00 AM",
      weekends: "10:00 AM – 4:00 AM",
      holidays: "10:00 AM – 4:00 AM",
    },
  },
  "airline-society": {
    id: 2,
    branchId: 2,
    phonePrimary: "+92 333 7654321",
    phoneSecondary: "+92 42 35889876",
    email: "airline@equigaming.pk",
    whatsapp: "+923337654321",
    operatingHours: {
      weekdays: "1:00 PM – 1:00 AM",
      weekends: "11:00 AM – 3:00 AM",
      holidays: "11:00 AM – 3:00 AM",
    },
  },
};

// --- Gallery ---
// Using placeholder gradient images since no real photos yet
export const GALLERY: Record<BranchSlug, GalleryImage[]> = {
  "gulberg-3": [
    { id: 1, branchId: 1, imageUrl: "https://placehold.co/800x600/1a1a2e/f5a623?text=Gaming+Zone+G3", thumbnailUrl: "https://placehold.co/400x300/1a1a2e/f5a623?text=Gaming+Zone", caption: "Main gaming floor — Gulberg 3", category: "setup", sortOrder: 1, isFeatured: true },
    { id: 2, branchId: 1, imageUrl: "https://placehold.co/800x600/1a1a2e/ffd700?text=VIP+Lounge+G3", thumbnailUrl: "https://placehold.co/400x300/1a1a2e/ffd700?text=VIP+Lounge", caption: "VIP lounge area", category: "setup", sortOrder: 2, isFeatured: false },
    { id: 3, branchId: 1, imageUrl: "https://placehold.co/800x600/0a0a0a/f5a623?text=Tournament+G3", thumbnailUrl: "https://placehold.co/400x300/0a0a0a/f5a623?text=Tournament", caption: "Weekly tournament night", category: "events", sortOrder: 3, isFeatured: true },
    { id: 4, branchId: 1, imageUrl: "https://placehold.co/800x600/2d2d3f/f5a623?text=PS5+Zone+G3", thumbnailUrl: "https://placehold.co/400x300/2d2d3f/f5a623?text=PS5+Zone", caption: "PS5 console zone", category: "gaming", sortOrder: 4, isFeatured: false },
    { id: 5, branchId: 1, imageUrl: "https://placehold.co/800x600/1a1a2e/e0e0e0?text=Ambiance+G3", thumbnailUrl: "https://placehold.co/400x300/1a1a2e/e0e0e0?text=Ambiance", caption: "Evening ambiance with RGB lighting", category: "ambiance", sortOrder: 5, isFeatured: false },
    { id: 6, branchId: 1, imageUrl: "https://placehold.co/800x600/0a0a0a/ffd700?text=Tier+3+Setup+G3", thumbnailUrl: "https://placehold.co/400x300/0a0a0a/ffd700?text=Tier+3", caption: "Tier 3 premium stations", category: "setup", sortOrder: 6, isFeatured: true },
  ],
  "airline-society": [
    { id: 7, branchId: 2, imageUrl: "https://placehold.co/800x600/1a1a2e/f5a623?text=Gaming+Zone+AS", thumbnailUrl: "https://placehold.co/400x300/1a1a2e/f5a623?text=Gaming+Zone", caption: "Open gaming floor — Airline Society", category: "setup", sortOrder: 1, isFeatured: true },
    { id: 8, branchId: 2, imageUrl: "https://placehold.co/800x600/2d2d3f/ffd700?text=Lounge+AS", thumbnailUrl: "https://placehold.co/400x300/2d2d3f/ffd700?text=Lounge", caption: "Relaxation lounge", category: "ambiance", sortOrder: 2, isFeatured: false },
    { id: 9, branchId: 2, imageUrl: "https://placehold.co/800x600/0a0a0a/f5a623?text=LAN+Party+AS", thumbnailUrl: "https://placehold.co/400x300/0a0a0a/f5a623?text=LAN+Party", caption: "LAN party event", category: "events", sortOrder: 3, isFeatured: true },
    { id: 10, branchId: 2, imageUrl: "https://placehold.co/800x600/1a1a2e/e0e0e0?text=PS5+Arena+AS", thumbnailUrl: "https://placehold.co/400x300/1a1a2e/e0e0e0?text=PS5+Arena", caption: "Dedicated PS5 arena", category: "gaming", sortOrder: 4, isFeatured: false },
    { id: 11, branchId: 2, imageUrl: "https://placehold.co/800x600/2d2d3f/f5a623?text=Night+Vibes+AS", thumbnailUrl: "https://placehold.co/400x300/2d2d3f/f5a623?text=Night+Vibes", caption: "Late night gaming vibes", category: "ambiance", sortOrder: 5, isFeatured: true },
    { id: 12, branchId: 2, imageUrl: "https://placehold.co/800x600/0a0a0a/ffd700?text=Private+Booth+AS", thumbnailUrl: "https://placehold.co/400x300/0a0a0a/ffd700?text=Private+Booth", caption: "Private gaming booths", category: "setup", sortOrder: 6, isFeatured: false },
  ],
};
