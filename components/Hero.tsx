'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 1. Unicorn Studio Script Loader (Desktop Background Canvas Animation)
    const embedScript = document.createElement('script');
    embedScript.type = 'text/javascript';
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `;
    document.head.appendChild(embedScript);

    const style = document.createElement('style');
    style.textContent = `
      [data-us-project] { position: relative !important; overflow: hidden !important; }
      [data-us-project] canvas { clip-path: inset(0 0 10% 0) !important; }
      [data-us-project] * { pointer-events: none !important; }
      [data-us-project] a[href*="unicorn"], .unicorn-brand, [class*="credit"], [class*="watermark"] {
        display: none !important; visibility: hidden !important; opacity: 0 !important;
      }
    `;
    document.head.appendChild(style);

    // 2. High-Performance Mobile Matrix Starfield Canvas Simulation
    const canvas = canvasRef.current;
    let animationFrameId: number;
    
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const stars: { x: number; y: number; z: number; speed: number; size: number }[] = [];
        const numStars = 65;

        for (let i = 0; i < numStars; i++) {
          stars.push({
            x: Math.random() * width - width / 2,
            y: Math.random() * height - height / 2,
            z: Math.random() * width,
            speed: 1.5 + Math.random() * 2,
            size: 0.5 + Math.random() * 1.2
          });
        }

        const render = () => {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.fillRect(0, 0, width, height);

          ctx.fillStyle = '#ffffff';
          for (let i = 0; i < numStars; i++) {
            const star = stars[i];
            star.z -= star.speed;

            if (star.z <= 0) {
              star.z = width;
              star.x = Math.random() * width - width / 2;
              star.y = Math.random() * height - height / 2;
            }

            const k = 128.0 / star.z;
            const px = star.x * k + width / 2;
            const py = star.y * k + height / 2;

            if (px >= 0 && px <= width && py >= 0 && py <= height) {
              const size = star.size * k * 0.4;
              ctx.fillRect(px, py, Math.max(1, size), Math.max(1, size));
            }
          }
          animationFrameId = requestAnimationFrame(render);
        };

        const handleResize = () => {
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        render();

        return () => {
          window.removeEventListener('resize', handleResize);
          cancelAnimationFrame(animationFrameId);
        };
      }
    }

    return () => {
      document.head.removeChild(embedScript);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black font-mono">
      {/* Desktop Animation Wrapper */}
      <div className="absolute inset-0 w-full h-full hidden lg:block">
        <div 
          data-us-project="OMzqyUv6M3kSnv0JeAtC" 
          style={{ width: '100%', height: '100%', minHeight: '100vh' }}
        />
      </div>

      {/* High-end Interactive Starfield Canvas for Mobile Layouts */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block lg:hidden pointer-events-none opacity-60"
      />

      {/* Frame Outlines */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/30 z-20"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/30 z-20"></div>
      <div className="absolute left-0 w-8 h-8 border-b-2 border-l-2 border-white/30 z-20" style={{ bottom: '5vh' }}></div>
      <div className="absolute right-0 w-8 h-8 border-b-2 border-r-2 border-white/30 z-20" style={{ bottom: '5vh' }}></div>

      {/* Content Interface Overlay */}
      <div className="relative z-10 flex min-h-screen items-center justify-center lg:justify-end px-6 pt-16 lg:pt-0">
        {/* 🎯 FIXED DESKTOP WRAPPER: Centers content inside its specific half-panel zone */}
        <div className="w-full lg:w-1/2 lg:px-20 lg:pr-[8%] flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="max-w-md w-full relative lg:ml-auto flex flex-col items-center lg:items-start">
            
            {/* Horizontal Line Wrapper */}
            <div className="flex items-center gap-2 mb-6 w-full opacity-50">
              <div className="flex-1 h-px bg-white"></div>
              <span className="text-white text-[10px]">▼</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>

            {/* Headline - Pushed back to a crisp, uniform left baseline alignment on desktop */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight tracking-wider uppercase" style={{ letterSpacing: '0.08em' }}>
              NEXT-GEN HARDWARE
            </h1>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm lg:text-base text-gray-400 mb-8 leading-relaxed opacity-90 max-w-sm">
              Custom-built mechanical keycaps, premium aluminum tool kits, and high-performance desktop peripherals. Built for creators, developers, and engineers.
            </p>

            {/* Buttons Wrapper */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto min-w-[280px] sm:min-w-0">
              <a href="#products" className="relative text-center px-6 py-3 bg-amber-500 text-black border-amber-500 hover:bg-transparent hover:text-amber-500 font-bold text-xs hover:bg-transparent hover:text-white border hover:border-white transition-all duration-200 tracking-widest uppercase">
                BROWSE SHOP
              </a>
              <a href="#products">
                <button className="relative text-center px-6 py-3 bg-transparent border border-white/30 text-white/80 font-bold text-xs hover:border-white hover:text-white transition-all duration-200 tracking-widest uppercase">
                  NEW RELEASES
                </button>
              </a>
                
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}