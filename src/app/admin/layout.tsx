"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getStoredAuth, clearStoredAuth } from "@/lib/auth";

const ADMIN_LINKS = [
  { href: "/admin", label: "DASHBOARD", icon: "📊" },
  { href: "/admin/branches", label: "BRANCHES", icon: "📍" },
  { href: "/admin/pricing", label: "PRICING", icon: "💰" },
  { href: "/admin/pcs", label: "PC SETUPS", icon: "🖥️" },
  { href: "/admin/consoles", label: "CONSOLES", icon: "🎮" },
  { href: "/admin/contact", label: "CONTACTS", icon: "📞" },
  { href: "/admin/gallery", label: "GALLERY", icon: "🖼️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminName, setAdminName] = useState<string>("");

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsAuthenticated(true);
      return;
    }

    const { token, user } = getStoredAuth();
    if (!token) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
      if (user) setAdminName(user.name);
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center">
        <p className="font-mono text-cyber-yellow animate-pulse">CHECKING ADMIN SESSION...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-black flex flex-col md:flex-row pt-16">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-cyber-charcoal border-r border-cyber-gunmetal/50 p-6 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Header */}
          <div className="mb-8 pb-4 border-b border-cyber-gunmetal/50 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Equilibrium Gaming Logo"
              className="h-10 w-auto object-contain"
            />
            <div>
              <h2 className="font-display text-base font-black text-cyber-gold tracking-widest text-glow-gold leading-none">
                EQUILIBRIUM
              </h2>
              <p className="font-mono text-[9px] text-cyber-yellow tracking-[0.2em] font-bold mt-1">
                ADMIN CONTROL
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {ADMIN_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 font-mono text-xs tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-cyber-yellow text-cyber-black font-bold"
                      : "text-cyber-ghost hover:text-cyber-yellow hover:bg-cyber-gunmetal/30"
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout button */}
        <div className="pt-6 border-t border-cyber-gunmetal/50 mt-6">
          <button
            onClick={() => {
              clearStoredAuth();
              router.push("/admin/login");
            }}
            className="w-full py-2.5 px-4 bg-cyber-red/20 border border-cyber-red/40 text-cyber-red font-mono text-xs tracking-wider hover:bg-cyber-red hover:text-white transition-colors"
          >
            🚪 LOGOUT
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
