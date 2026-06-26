'use client';

import Link from 'next/link';
import { Terminal, Shield, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="sticky bottom-0 left-0 w-full bg-[#050505] text-neutral-400 font-mono py-16 px-6 lg:px-16 z-0 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        
        {/* Left Side: Brand Meta */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-black tracking-wider text-xl">
            <Terminal className="size-5 text-amber-500" />
            KINETIC.
          </div>
          <p className="text-xs max-w-xs leading-relaxed text-neutral-500 uppercase tracking-wider">
            Premium custom mechanical hardware & workspace peripherals. Engineered for endurance.
          </p>
        </div>

        {/* Right Side: Links Column */}
        <div className="flex flex-wrap gap-x-16 gap-y-8">
          <div className="space-y-3">
            <span className="text-[10px] text-neutral-600 font-bold tracking-[0.3em] block uppercase">// NAV</span>
            <ul className="space-y-2 text-xs uppercase tracking-widest">
              <li><Link href="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link href="/catalog" className="hover:text-amber-500 transition-colors">Catalog</Link></li>
              <li><Link href="/docs" className="hover:text-amber-500 transition-colors">Specifications</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] text-neutral-600 font-bold tracking-[0.3em] block uppercase">// SOCIAL</span>
            <ul className="space-y-2 text-xs uppercase tracking-widest">
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors inline-flex items-center gap-1">
                  GitHub <ArrowUpRight className="size-3" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors inline-flex items-center gap-1">
                  X (Twitter) <ArrowUpRight className="size-3" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors inline-flex items-center gap-1">
                  Discord <ArrowUpRight className="size-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-900/60 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-neutral-600 tracking-widest uppercase">
        <div>© 2026 KINETIC SYSTEMS. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center gap-2">
          <Shield className="size-3 text-amber-500/40" />
          SECURE TERMINAL CONNECTION ACTIVE
        </div>
      </div>
    </footer>
  );
}