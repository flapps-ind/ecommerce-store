import { supabase } from './supabaseClient'; 
import Hero from '@/components/Hero';
import { FeatureVelocity } from '@/components/feature-velocity';
import ProductListing from '@/components/ProductListing';


export default async function HomePage() {
  // Fetch products live from your Supabase table securely on the server
  const { data: products, error } = await supabase
    .from('products')
    .select('*');

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-indigo-500">
      {/* 1. Global Navigation & Cinematic Hero Section */}
      
      <Hero />
      <FeatureVelocity />

      <ProductListing/>

      
    </div>
  );
}