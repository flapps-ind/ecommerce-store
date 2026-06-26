'use client'
import { cn } from '@/lib/utils'
import { Brain, Database, Palette } from 'lucide-react'

export const FeatureVelocity = () => {
  return (
    <section className="bg-black py-32 px-6 min-h-screen font-mono relative overflow-hidden">
      {/* Background Dither/Line Grid */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#252525_0px_1px,transparent_1px_8px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-neutral-800 pb-12">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              ENGINEERED
              <br />
              SPECIFICATIONS.
            </h2>
          </div>
          <p className="max-w-xs text-gray-500 font-mono text-sm leading-relaxed uppercase tracking-widest">
            Architecture designed for maximum precise tactile feedback and enduring hardware performance.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'CNC ALUMINUM',
              label: 'MATERIAL ARCHITECTURE',
              icon: Brain,
            },
            {
              title: 'SWITCH MATRIX',
              label: 'TACTILE ENGINEERING',
              icon: Database,
            },
            {
              title: 'MONO LAYOUT',
              label: 'VISUAL SYMMETRY',
              icon: Palette,
            },
          ].map((card, i) => (
            <div
              key={i}
              className="group relative bg-neutral-950 border border-neutral-800 rounded-2xl p-12 overflow-hidden hover:border-amber-500/50 transition-all duration-500 ease-out"
            >
              {/* 🎯 ORANGE GLOW ACCENT: Subtle industrial ambient backlight on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 space-y-16">
                {/* Icon Container with subtle color transition */}
                <div className="size-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all duration-300">
                  <card.icon className="size-6 text-white group-hover:text-amber-500 transition-colors duration-300" />
                </div>
                
                <div className="space-y-4">
                  <span className="text-[15px] font-mono text-gray-500 uppercase tracking-[0.3em] group-hover:text-amber-500/70 transition-colors duration-300">
                    {card.label}
                  </span>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
                    {card.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}