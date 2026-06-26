import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key)

dummy_products = [
    {
        "name": "Cyberpunk Mechanical Keyboard",
        "price": 189,
        "description": "Hot-swappable linear switches with custom per-key RGB routing.",
        "image_url": "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500"
    },
    {
        "name": "Minimalist Desk Mat",
        "price": 35,
        "description": "Premium felt wool desk mat designed to elevate your workspace tracking.",
        "image_url": "https://images.unsplash.com/photo-1632292224971-0d45778bd364?w=500"
    },
    {
        "name": "Aluminum Laptop Stand",
        "price": 65,
        "description": "Fully adjustable sandblasted anodized aluminum laptop riser.",
        "image_url": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500"
    }
]

print("🚀 Connecting to the kitchen pantry...")

for product in dummy_products:
    try:
        data = supabase.table("products").insert(product).execute()
        print(f"✅ Successfully added: {product['name']}")
    except Exception as e:
        print(f"❌ Failed to add {product['name']}: {e}")

print("✨ Database successfully seeded!")