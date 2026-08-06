"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setStoredAuth } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@equigaming.pk");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Invalid login credentials");
      }

      setStoredAuth(json.data.token, json.data.user);
      router.push("/admin");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to connect to backend API";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center p-4 bg-grid pt-16">
      <div className="w-full max-w-md bg-cyber-charcoal border border-cyber-yellow/40 p-8 relative shadow-neon-yellow">
        {/* Corner accents */}
        <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-cyber-yellow" />
        <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-cyber-yellow" />
        <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-cyber-yellow" />
        <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-cyber-yellow" />

        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-black text-cyber-gold text-glow-gold tracking-widest">
            EQUI ADMIN
          </h1>
          <p className="font-mono text-xs text-cyber-ghost mt-2 tracking-wider">
            AUTHENTICATION REQUIRED
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-cyber-red/20 border border-cyber-red/50 text-cyber-red font-mono text-xs">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-mono text-xs text-cyber-yellow uppercase tracking-wider mb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-cyber-black border border-cyber-gunmetal px-4 py-3 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-cyber-yellow uppercase tracking-wider mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-cyber-black border border-cyber-gunmetal px-4 py-3 font-mono text-sm text-cyber-white focus:border-cyber-yellow focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-cyber-yellow text-cyber-black font-mono text-sm font-bold tracking-[0.2em] uppercase hover:bg-cyber-gold transition-colors disabled:opacity-50"
          >
            {loading ? "AUTHENTICATING..." : "LOGIN TO DASHBOARD →"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-cyber-gunmetal/30 text-center">
          <p className="font-mono text-[10px] text-cyber-ghost">
            Default credentials: <span className="text-cyber-yellow">admin@equigaming.pk</span> / <span className="text-cyber-yellow">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
