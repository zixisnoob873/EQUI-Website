import Link from "next/link";

const QUICK_LINKS = [
  { href: "/pcs", label: "PCs" },
  { href: "/consoles", label: "Consoles" },
  { href: "/pricing", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative bg-cyber-void border-t border-cyber-yellow/10">
      {/* Scanline subtle overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-grid" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Equilibrium Gaming Logo"
                className="h-12 w-auto object-contain"
              />
              <div>
                <h3 className="font-display text-xl font-black tracking-[0.15em] text-cyber-gold text-glow-gold leading-none">
                  EQUILIBRIUM
                </h3>
                <p className="font-mono text-[9px] text-cyber-yellow uppercase tracking-[0.3em] mt-1 font-bold">
                  A TIER ABOVE
                </p>
              </div>
            </div>
            <p className="font-mono text-xs text-cyber-ghost leading-relaxed max-w-xs">
              Premium gaming lounge experience. Tier 1-3 competitive rigs, PS5 console arena, and a non-stop 24/7 community built for gamers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs text-cyber-yellow tracking-[0.3em] uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-xs text-cyber-ghost hover:text-cyber-yellow transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-2 h-[1px] bg-cyber-gunmetal group-hover:bg-cyber-yellow group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h4 className="font-mono text-xs text-cyber-yellow tracking-[0.3em] uppercase mb-4">
              Our Branches
            </h4>
            <div className="space-y-4">
              <div>
                <p className="font-mono text-xs text-cyber-white font-semibold">
                  Gulberg 3
                </p>
                <p className="font-mono text-[10px] text-cyber-ghost mt-1">
                  Lahore, Pakistan
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-cyber-white font-semibold">
                  Airline Society
                </p>
                <p className="font-mono text-[10px] text-cyber-ghost mt-1">
                  Lahore, Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-cyber-gunmetal/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-cyber-ghost tracking-wider">
            &copy; {new Date().getFullYear()} EQUI GAMING. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
            <span className="font-mono text-[10px] text-cyber-green tracking-wider">
              SYSTEMS ONLINE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
