"use client";

import { useEffect, useState } from "react";
import { adminFetch, toCamelCase } from "@/lib/auth";
import type { GalleryImage, BranchSlug } from "@/types";

export default function AdminGalleryPage() {
  const [branchSlug, setBranchSlug] = useState<BranchSlug>("gulberg-3");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCaption, setNewCaption] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState("setup");
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  const loadGallery = async (branch: string) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/gallery?branch=${branch}`);
      const json = await res.json();
      setImages(json.data ? toCamelCase<GalleryImage[]>(json.data) : []);
    } catch {
      setMessage("Failed to fetch gallery from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery(branchSlug);
  }, [branchSlug]);

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setMessage("");

    try {
      const branchId = branchSlug === "gulberg-3" ? 1 : 2;
      const res = await adminFetch("/admin/gallery", {
        method: "POST",
        body: JSON.stringify({
          branch_id: branchId,
          image_url: newUrl,
          caption: newCaption,
          category: newCategory,
          is_featured: false,
        }),
      });

      setImages((prev) => [...prev, res.data]);
      setNewCaption("");
      setNewUrl("");
      setMessage("Photo added to photoshoot gallery successfully!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to add image";
      setMessage(`Error: ${msg}`);
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteImage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    try {
      await adminFetch(`/admin/gallery/${id}`, { method: "DELETE" });
      setImages((prev) => prev.filter((img) => img.id !== id));
      setMessage("Photo deleted!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete";
      setMessage(`Error: ${msg}`);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-black text-cyber-white tracking-wider uppercase">
            GALLERY & PHOTOSHOOTS
          </h1>
          <p className="font-mono text-xs text-cyber-ghost mt-1 tracking-wider">
            UPLOAD AND MANAGE PHOTOSHOOT IMAGES PER BRANCH
          </p>
        </div>

        <div className="flex border border-cyber-gunmetal">
          <button
            onClick={() => setBranchSlug("gulberg-3")}
            className={`px-4 py-2 font-mono text-xs tracking-wider uppercase ${
              branchSlug === "gulberg-3"
                ? "bg-cyber-yellow text-cyber-black font-bold"
                : "text-cyber-ghost hover:text-cyber-yellow"
            }`}
          >
            Gulberg 3
          </button>
          <button
            onClick={() => setBranchSlug("airline-society")}
            className={`px-4 py-2 font-mono text-xs tracking-wider uppercase ${
              branchSlug === "airline-society"
                ? "bg-cyber-yellow text-cyber-black font-bold"
                : "text-cyber-ghost hover:text-cyber-yellow"
            }`}
          >
            Airline Society
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-cyber-charcoal border border-cyber-yellow/50 text-cyber-yellow font-mono text-xs">
          ℹ️ {message}
        </div>
      )}

      {/* Add Image Form */}
      <div className="bg-cyber-charcoal border border-cyber-yellow/30 p-6 mb-8">
        <h3 className="font-mono text-sm font-bold text-cyber-yellow uppercase tracking-wider mb-4">
          + ADD NEW PHOTOSHOOT IMAGE
        </h3>
        <form onSubmit={handleAddImage} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                Image URL (Direct link or upload URL)
              </label>
              <input
                type="text"
                required
                placeholder="https://..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
              >
                <option value="setup">Setup</option>
                <option value="events">Events</option>
                <option value="ambiance">Ambiance</option>
                <option value="gaming">Gaming</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] text-cyber-ghost uppercase mb-1">
              Caption / Description
            </label>
            <input
              type="text"
              required
              placeholder="e.g. VIP Gaming Lounge Night Setup"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className="w-full bg-cyber-black border border-cyber-gunmetal px-3 py-2 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={adding}
            className="px-6 py-2.5 bg-cyber-yellow text-cyber-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-cyber-gold transition-colors disabled:opacity-50"
          >
            {adding ? "ADDING..." : "+ ADD PHOTO"}
          </button>
        </form>
      </div>

      {/* Gallery List */}
      {loading ? (
        <p className="font-mono text-cyber-yellow animate-pulse">LOADING GALLERY...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="bg-cyber-charcoal border border-cyber-gunmetal/50 p-4 relative group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.thumbnailUrl || img.imageUrl}
                alt={img.caption}
                className="w-full h-48 object-cover mb-3 border border-cyber-gunmetal/30"
              />
              <p className="font-mono text-xs text-cyber-white font-semibold truncate">
                {img.caption}
              </p>
              <p className="font-mono text-[10px] text-cyber-yellow uppercase tracking-wider mt-1">
                Category: {img.category}
              </p>
              <button
                onClick={() => handleDeleteImage(img.id)}
                className="mt-3 w-full py-1.5 bg-cyber-red/20 border border-cyber-red/40 text-cyber-red font-mono text-[10px] tracking-wider uppercase hover:bg-cyber-red hover:text-white transition-colors"
              >
                🗑️ DELETE PHOTO
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
