'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Eye, ArrowRight } from 'lucide-react';
import { supabase } from '../app/supabaseClient'; // Make sure this path points correctly to your client file

// Define the interface to type our database response
interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  description: string;
  price: number;
  tag: string;
  status: string;
  image_url: string | null;
}

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) throw error;
        if (data) setProducts(data);
      } catch (error) {
        console.error('Error fetching data from Supabase:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="bg-black py-32 px-6 lg:px-16 font-mono border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-neutral-800 pb-8">
          <div>
            <span className="text-xs text-amber-500 tracking-[0.4em] uppercase block mb-3">// ARCHIVAL HARDWARE</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
              AVAILABLE INVENTORY.
            </h2>
          </div>
          <div>
            <button className="flex items-center gap-2 text-xs text-neutral-400 hover:text-amber-500 transition-colors duration-300 uppercase tracking-widest group">
              View Full Catalog 
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Loading / Empty States */}
        {loading ? (
          <div className="text-center text-neutral-500 text-xs tracking-widest py-12 uppercase">
            // INITIALIZING DATABASE CONNECTION...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-neutral-500 text-xs tracking-widest py-12 uppercase">
            // NO PRODUCTS IN INVENTORY
          </div>
        ) : (
          /* Product Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="group bg-neutral-950 border border-neutral-900 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-500"
              >
                <div>
                  {/* Image Placeholder Frame */}
                  <div className="aspect-[4/3] w-full rounded-xl bg-neutral-900 border border-neutral-800 relative overflow-hidden flex items-center justify-center mb-6">
                    {/* Subtle Tech Crosshair overlay graphic using sku */}
                    
                    
                    {/* Display real image if it exists, otherwise use your fallback box */}
                    {product.image_url ? (
                      <img 
                        src={`${product.image_url}?t=${new Date().getTime()}`}
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-16 h-16 border border-neutral-800 rounded-lg flex items-center justify-center group-hover:border-amber-500/20 transition-colors duration-500">
                        <span className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">IMAGE_FILE</span>
                      </div>
                    )}

                    {/* Action Overlay Hover State */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button className="p-3 bg-neutral-900 border border-neutral-800 text-white rounded-xl hover:text-amber-500 hover:border-amber-500/50 transition-all">
                        <Eye className="size-5" />
                      </button>
                      <button className="p-3 bg-amber-500 text-black rounded-xl hover:bg-transparent hover:text-amber-500 hover:border hover:border-amber-500 transition-all">
                        <ShoppingCart className="size-5" />
                      </button>
                    </div>
                  </div>

                  {/* Product Meta */}
                  <div className="space-y-2">
                    <span className="text-[11px] text-neutral-500 tracking-wider block uppercase">{product.category}</span>
                    <h3 className="text-xl font-bold text-white tracking-tight uppercase group-hover:text-amber-500 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed opacity-80 pt-1">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Price & Purchase Drawer */}
                <div className="mt-8 pt-4 border-t border-neutral-900 flex items-center justify-between">
                  <span className="text-lg font-bold text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-amber-500 bg-amber-500/5 px-2 py-1 rounded border border-amber-500/10 tracking-widest uppercase">
                    {product.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}