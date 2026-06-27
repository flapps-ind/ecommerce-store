"use client";

import React, { useState, useEffect } from 'react';
import StaggeredMenu from './StaggeredMenu';
import { useCart } from "../context/CartContext";

// Explicit interface definition to provide solid local structures
interface MenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

// Dynamic script loader for Razorpay window interface
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Navbar() {
  const { cart, removeFromCart, getCartTotal, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isMobile, setIsMobile] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Compute total dynamic item count across quantity buffers
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Track window resizing to dynamically toggle the mobile menu item layout array
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768); // 768px matches Tailwind's 'md' breakpoint
    };
    
    checkViewport(); // Initial check
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Core desktop platform configuration map
  const baseMenuItems: MenuItem[] = [
    { label: '01 HARDWARE', ariaLabel: 'Go to hardware store', link: '#products' },
    { label: '02 INDEX', ariaLabel: 'Learn about us', link: '#about' },
    { label: '03 AUTH_PORTAL', ariaLabel: 'Sign in or sign up', link: '#auth' },
    { label: '04 NETWORK', ariaLabel: 'Get in touch', link: '#contact' }
  ];

  // If on mobile screen space, seamlessly inject CART as the 5th option item
  const menuItems = isMobile 
    ? [...baseMenuItems, { label: `05 CART [${totalItems}]`, ariaLabel: 'Open shopping cart stack', link: '#cart-trigger' }]
    : baseMenuItems;

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  // Checkout Handler via Razorpay Tunnel
  const handleRazorpayCheckout = async () => {
    setIsProcessing(true);

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("// SYSTEM_ERROR: CHECKOUT_ENGINE_LOAD_TIMEOUT");
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalAmount: getCartTotal() }),
      });

      const orderData = await response.json();

      if (!orderData.orderId) {
        alert("// GATEWAY_FAILURE: ORDER_STACK_REJECTED");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: orderData.amount,
        currency: "INR",
        name: "⬡ KINETIC LABS",
        description: "ARCHIVAL_HARDWARE_ACQUISITION",
        order_id: orderData.orderId,
        handler: function (response: any) {
          alert(`// TRANSACTION_SUCCESSFUL \n// PAYMENT_ID: ${response.razorpay_payment_id}`);
          clearCart(); // Wipes cart buffer on successful completion
          setIsCartOpen(false);
        },
        prefill: {
          name: "OPERATOR",
          email: "operator@kinetic.network",
        },
        theme: {
          color: "#ffaa00",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Critical gateway failure execution payload:", error);
      alert("// SYSTEM_CRITICAL: GATEWAY_TUNNEL_DISCONNECT");
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none font-mono">
      
      {/* ─── FIXED FLOATING CART BADGE (DESKTOP ONLY) ─── */}
      <div className={`fixed top-9 right-36 transition-all duration-200 hidden md:block ${
        isMenuOpen || isCartOpen ? 'z-0 opacity-0 pointer-events-none' : 'z-50 pointer-events-auto'
      }`}>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="font-mono text-xs tracking-wider flex items-center gap-2 group focus:outline-none bg-black/90 backdrop-blur-xs px-2.5 py-0.5 border-l border-r border-neutral-900 hover:border-neutral-700 rounded-xs transition-colors"
        >
          <span className="text-orange-500 group-hover:text-orange-400 font-bold">//</span> 
          <span className="text-white uppercase tracking-widest">CART</span>
          <span className={`px-1.5 py-0.5 text-[10px] font-bold border transition-all duration-300 ${
            totalItems > 0 
              ? "bg-orange-500 text-black border-orange-500 shadow-[0_0_10px_rgba(255,170,0,0.3)]" 
              : "bg-transparent text-neutral-400 border-neutral-800"
          }`}>
            [{totalItems}]
          </span>
        </button>
      </div>

      {/* ─── STAGGERED MENU CONTAINER WITH AUTO-CLOSE INTERCEPTOR ─── */}
      <div 
        className={`pointer-events-auto relative transition-all duration-200 ${isCartOpen ? 'z-20' : 'z-40'}`} 
        onClick={(e) => {
          const target = e.target as HTMLElement;
          
          if (target.textContent?.includes('05 CART')) {
            setIsCartOpen(true);
          }

          const clickedLink = target.closest('a');
          if (clickedLink) {
            const closeButton = document.querySelector('button[class*="menu"], div[class*="button"]') as HTMLElement;
            if (closeButton) {
              closeButton.click();
            }
          }
        }}
      >
        <StaggeredMenu
          position="right"
          className="" // FIXED: Added missing required className prop to resolve type error
          items={menuItems as any} 
          socialItems={socialItems as any} 
          displaySocials={true}
          displayItemNumbering={false}
          menuButtonColor="#ffaa00"
          openMenuButtonColor="#ffaa00"
          changeMenuColorOnOpen={true}
          colors={['#000000', '#09090b']} 
          logoUrl="⬡ KINETIC"
          accentColor="#ffaa00"
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
        />
      </div>

      {/* ─── DYNAMIC SLIDE-OUT CART PANEL DRAWER ─── */}
      {isCartOpen && (
        <div className="fixed inset-0 z-30 flex justify-end bg-black/70 backdrop-blur-xs transition-opacity duration-300 pointer-events-auto">
          <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

          <div className="relative w-full max-w-md h-full bg-neutral-950 border-l border-neutral-900 flex flex-col justify-between text-white font-mono shadow-2xl z-10">
            <div>
              <div className="flex justify-between items-center border-b border-neutral-900 pb-4 p-6">
                <h3 className="text-sm font-bold tracking-widest text-orange-500">// CART_BUFFER_STACK</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs text-neutral-500 hover:text-white border border-neutral-900 hover:border-neutral-700 px-2 py-1 transition-colors"
                >
                  ESC ✕
                </button>
              </div>

              <div className="mt-6 space-y-4 overflow-y-auto max-h-[65vh] px-6 pr-4 scrollbar-thin">
                {cart.length === 0 ? (
                  <div className="text-xs text-neutral-600 mt-4 tracking-wider leading-relaxed">
                    // SYSTEM_ERROR: NO_ACTIVE_ASSETS_FOUND <br />
                    // STATUS: WAITING_FOR_USER_INPUT...
                  </div>
                ) : (
                  cart.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex gap-4 p-3 bg-neutral-900/40 border border-neutral-900 items-center justify-between hover:border-neutral-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 overflow-hidden shrink-0">
                          <img 
                            src={`${item.image_url}?t=${new Date().getTime()}`} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white">{item.name}</h4>
                          <p className="text-[10px] text-neutral-500 mt-0.5">
                            VAL: ${item.price} × QTY: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] text-neutral-600 hover:text-orange-500 border border-neutral-900 hover:border-orange-500/30 px-2 py-1 transition-all"
                      >
                        [WIPE]
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bottom Form Checkout Execution Block */}
            <div className="border-t border-neutral-900 p-6 bg-neutral-950 mt-auto">
              <div className="flex justify-between text-xs tracking-widest">
                <span className="text-neutral-500">AGGREGATE_VAL:</span>
                <span className="font-bold text-orange-500 text-sm">${getCartTotal()}.00</span>
              </div>
              
              {cart.length > 0 ? (
                <button 
                  onClick={handleRazorpayCheckout}
                  disabled={isProcessing}
                  className="w-full h-12 mt-4 flex items-center justify-center bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-800 disabled:text-neutral-600 text-black text-xs font-bold uppercase tracking-widest transition-colors duration-200 cursor-pointer"
                >
                  {isProcessing ? "ESTABLISHING_ENCRYPTED_TUNNEL..." : "INITIALIZE_CHECKOUT_SEQUENCE"}
                </button>
              ) : (
                <button 
                  disabled
                  className="w-full h-12 mt-4 flex items-center justify-center bg-neutral-900 text-neutral-600 text-xs font-bold uppercase tracking-widest cursor-not-allowed border border-neutral-900"
                >
                  TERMINAL_LOCKED
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}