"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { HUDCard } from "@/components/ui/HUDCard";
import { BranchSwitcher, useBranchParam } from "@/components/ui/BranchSwitcher";
import { getContact, getBranch } from "@/lib/api";
import type { Contact, Branch } from "@/types";

function ContactContent() {
  const activeBranch = useBranchParam();
  const [contact, setContact] = useState<Contact | null>(null);
  const [branch, setBranch] = useState<Branch | null>(null);

  useEffect(() => {
    getContact(activeBranch).then(setContact);
    getBranch(activeBranch).then(setBranch);
  }, [activeBranch]);

  if (!contact || !branch) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center">
        <p className="font-mono text-cyber-yellow animate-pulse">LOADING CONTACT INFO...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-metallic-subtle bg-grid pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="CONTACT US" subtitle="Get in touch — we are here to help" />

        <div className="flex justify-center mb-12">
          <BranchSwitcher activeBranch={activeBranch} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info Card */}
          <HUDCard title={`${branch.name} — CONTACT`} accentColor="yellow">
            <div className="space-y-6 py-2">
              {/* Phone Primary */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-mono text-[10px] text-cyber-yellow tracking-[0.3em] uppercase mb-1">
                    Primary Phone
                  </p>
                  <a
                    href={`tel:${contact.phonePrimary.replace(/\s/g, "")}`}
                    className="font-mono text-lg text-cyber-white hover:text-cyber-yellow transition-colors"
                  >
                    {contact.phonePrimary}
                  </a>
                </div>
              </div>

              {/* Phone Secondary */}
              {contact.phoneSecondary && (
                <div className="flex items-start gap-4">
                  <span className="text-2xl">☎️</span>
                  <div>
                    <p className="font-mono text-[10px] text-cyber-yellow tracking-[0.3em] uppercase mb-1">
                      Landline
                    </p>
                    <a
                      href={`tel:${contact.phoneSecondary.replace(/\s/g, "")}`}
                      className="font-mono text-lg text-cyber-white hover:text-cyber-yellow transition-colors"
                    >
                      {contact.phoneSecondary}
                    </a>
                  </div>
                </div>
              )}

              {/* WhatsApp */}
              {contact.whatsapp && (
                <div className="flex items-start gap-4">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="font-mono text-[10px] text-cyber-yellow tracking-[0.3em] uppercase mb-1">
                      WhatsApp
                    </p>
                    <a
                      href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-cyber-green hover:text-cyber-yellow transition-colors underline underline-offset-4 decoration-cyber-green/30"
                    >
                      Chat on WhatsApp →
                    </a>
                  </div>
                </div>
              )}

              {/* Email */}
              {contact.email && (
                <div className="flex items-start gap-4">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="font-mono text-[10px] text-cyber-yellow tracking-[0.3em] uppercase mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-mono text-sm text-cyber-white hover:text-cyber-yellow transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              )}

              {/* Address */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-mono text-[10px] text-cyber-yellow tracking-[0.3em] uppercase mb-1">
                    Address
                  </p>
                  <p className="font-mono text-sm text-cyber-white leading-relaxed">
                    {branch.address}
                  </p>
                </div>
              </div>
            </div>
          </HUDCard>

          {/* Operating Hours Card - WE NEVER CLOSE! */}
          <HUDCard title="OPERATING HOURS" accentColor="gold">
            <div className="py-8 text-center flex flex-col items-center justify-center min-h-[320px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="space-y-1 my-auto"
              >
                <p className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-cyber-gold text-glow-gold tracking-[0.2em] leading-none uppercase">
                  WE
                </p>
                <p className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-cyber-yellow text-glow-yellow tracking-[0.2em] leading-none uppercase my-2">
                  NEVER
                </p>
                <p className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-cyber-white tracking-[0.15em] leading-none uppercase">
                  CLOSE!
                </p>

                <div className="pt-6">
                  <span className="inline-block bg-cyber-yellow/10 border border-cyber-yellow/40 text-cyber-yellow font-mono text-xs tracking-[0.3em] font-bold px-4 py-1.5 uppercase">
                    24 / 7 / 365 DAYS
                  </span>
                </div>
              </motion.div>

              <div className="w-full bg-cyber-charcoal/80 border border-cyber-green/40 p-3 text-center mt-6">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2.5 h-2.5 bg-cyber-green rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-cyber-green font-bold tracking-[0.2em]">
                    SYSTEMS ONLINE — OPEN NOW
                  </span>
                </div>
              </div>
            </div>
          </HUDCard>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cyber-black flex items-center justify-center">
          <p className="font-mono text-cyber-yellow animate-pulse">LOADING CONTACT DATA...</p>
        </div>
      }
    >
      <ContactContent />
    </Suspense>
  );
}
