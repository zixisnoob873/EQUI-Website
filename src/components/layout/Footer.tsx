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
            <h3 className="font-display text-2xl font-black tracking-[0.2em] text-cyber-gold text-glow-gold mb-3">
              EQUI
            </h3>
            <p className="font-mono text-xs text-cyber-ghost leading-relaxed max-w-xs">
              Premium gaming lounge experience. Competitive rigs, immersive
              setups, and a community built for gamers.
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
