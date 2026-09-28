import { Product, Review } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_nova_campaign_1790579613977.jpg';
export const DROP_IMAGE = '/src/assets/images/drop_nova_air_1790579627318.jpg';

export const CATEGORIES = [
  {
    id: 'fashion',
    name: 'Fashion',
    count: 24,
    description: 'Sculptural tailoring and effortless silhouettes crafted with organic wools and silks.',
    image: '/src/assets/images/category_fashion_look_1790579637753.jpg',
    tag: 'Autumn/Winter 26'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    count: 18,
    description: 'Acoustic fidelity meets tactile aluminum in audio hardware designed to last.',
    image: '/src/assets/images/category_audio_tech_1790579662193.jpg',
    tag: 'Hi-Res Audio'
  },
  {
    id: 'beauty',
    name: 'Beauty',
    count: 12,
    description: 'Clean botanicals, bio-active peptides, and restorative cold-pressed serums.',
    image: '/src/assets/images/category_home_ceramics_1790579649519.jpg',
    tag: 'Dermatological'
  },
  {
    id: 'home-living',
    name: 'Home & Living',
    count: 29,
    description: 'Architectural ceramics, ambient lighting, and objects of serene contemplation.',
    image: '/src/assets/images/category_home_ceramics_1790579649519.jpg',
    tag: 'Artisanal Studio'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    count: 16,
    description: 'Minimal carry goods, titanium hardware, and water-repellent urban essentials.',
    image: '/src/assets/images/product_aura_backpack_1790579725166.jpg',
    tag: 'Modular Carry'
  },
  {
    id: 'gadgets',
    name: 'Gadgets',
    count: 14,
    description: 'Precision instruments and haptic everyday tools engineered for focus.',
    image: '/src/assets/images/product_aurora_watch_1790579697680.jpg',
    tag: 'Connected Wear'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    count: 21,
    description: 'Mindful physical rituals, studio footwear, and morning workspace harmony.',
    image: '/src/assets/images/product_nova_sneakers_1790579712726.jpg',
    tag: 'Daily Routine'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'aurora-smart-watch',
    name: 'Aurora Smart Watch',
    subtitle: 'Grade 5 Titanium & Sapphire Crystal',
    category: 'Gadgets',
    price: 14999,
    originalPrice: 18999,
    discount: 21,
    rating: 4.9,
    reviewCount: 142,
    images: [
      '/src/assets/images/product_aurora_watch_1790579697680.jpg',
      '/src/assets/images/category_audio_tech_1790579662193.jpg'
    ],
    description: 'Monolithic aerospace-grade titanium watch with micro-OLED always-on display and 14-day battery reserve.',
    longDescription: 'Machined from a single block of Grade 5 titanium, the Aurora redefines wearable precision. Featuring continuous biometric ECG monitoring, dual-band GPS, and a tactile digital crown that provides subtle haptic feedback for every gesture.',
    badge: 'Trending',
    colors: [
      { name: 'Matte Titanium', hex: '#8E9196' },
      { name: 'Obsidian Black', hex: '#1C1D21' },
      { name: 'Brushed Gold', hex: '#C5A880' }
    ],
    specs: [
      { label: 'Chassis Material', value: 'Grade 5 Aerospace Titanium' },
      { label: 'Display', value: '1.42" AMOLED 466x466 (1500 nits)' },
      { label: 'Battery Life', value: 'Up to 14 days typical use' },
      { label: 'Water Resistance', value: '10 ATM (100 meters)' },
      { label: 'Sensors', value: 'ECG, Optical HR, SpO2, Skin Temp' }
    ],
    features: [
      'Sapphire crystal glass with anti-reflective coating',
      'Dual-frequency GNSS positioning',
      'Magnetic fast charging (0-80% in 35 mins)',
      'Subtle haptic notification engine'
    ],
    inStock: true,
    vibe: ['Everyday', 'Work', 'Fitness'],
    styleTag: 'Tech Forward',
    isCurated: true,
    isTrending: true
  },
  {
    id: 'echo-wireless-headphones',
    name: 'Echo Wireless Headphones',
    subtitle: 'Active Acoustic Cancelation with Memory Foam',
    category: 'Electronics',
    price: 12499,
    originalPrice: 16999,
    discount: 26,
    rating: 4.8,
    reviewCount: 98,
    images: [
      '/src/assets/images/drop_nova_air_1790579627318.jpg',
      '/src/assets/images/category_audio_tech_1790579662193.jpg'
    ],
    description: 'Precision 40mm beryllium drivers paired with hybrid ANC and lambskin ear cushions.',
    longDescription: 'Engineered for audio purists who move. Echo balances planar clarity with warm, organic sub-bass. The bespoke earcups are wrapped in buttery soft vegan lambskin memory foam for effortless 8-hour listening sessions.',
    badge: 'Best Seller',
    colors: [
      { name: 'Midnight Charcoal', hex: '#222328' },
      { name: 'Warm Chalk', hex: '#EAE6DF' },
      { name: 'Forest Moss', hex: '#2E3D30' }
    ],
    specs: [
      { label: 'Driver Unit', value: '40mm Beryllium-coated diaphragm' },
      { label: 'ANC Type', value: 'Dual-feedforward hybrid ANC (-38dB)' },
      { label: 'Battery', value: '45 hours with ANC enabled' },
      { label: 'Codecs', value: 'LDAC, aptX Adaptive, AAC, SBC' }
    ],
    features: [
      'Spatial Audio head-tracking',
      'Multipoint Bluetooth 5.4 connection',
      'Aluminum folding gimbal with magnetic detent',
      'Wired 3.5mm lossless bypass mode'
    ],
    inStock: true,
    vibe: ['Travel', 'Work', 'Everyday'],
    styleTag: 'Minimalist Chic',
    isCurated: true,
    isTrending: true
  },
  {
    id: 'nova-everyday-sneakers',
    name: 'Nova Everyday Sneakers',
    subtitle: 'Merino Wool & Natural Latex Sole',
    category: 'Fashion',
    price: 6499,
    originalPrice: 8999,
    discount: 28,
    rating: 4.9,
    reviewCount: 215,
    images: [
      '/src/assets/images/product_nova_sneakers_1790579712726.jpg',
      '/src/assets/images/category_fashion_look_1790579637753.jpg'
    ],
    description: 'Ultra-lightweight barefoot silhouette made from temperature-regulating merino knit.',
    longDescription: 'Designed for 20,000 steps without fatigue. The Nova Everyday Sneaker features an anatomically sculpted footbed that adapts to your arch, coupled with sustainably tapped Malaysian latex gum outsoles for quiet, grippy urban walking.',
    badge: 'New',
    colors: [
      { name: 'Bone White', hex: '#F3EFEA' },
      { name: 'Slate Grey', hex: '#7C818C' },
      { name: 'Umber Brown', hex: '#584337' }
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    specs: [
      { label: 'Upper', value: 'Extrafine 18.5µ Merino wool knit' },
      { label: 'Sole', value: 'Wild-harvested natural latex rubber' },
      { label: 'Insole', value: 'Castor bean bio-foam' },
      { label: 'Weight', value: '235g (Size 9)' }
    ],
    features: [
      'Machine washable removable footbed',
      'Natural odor-resistant properties',
      'Sockless comfort engineering',
      'Zero synthetic microplastics'
    ],
    inStock: true,
    vibe: ['Everyday', 'Travel', 'Fitness'],
    styleTag: 'Streetwear & Bold',
    isCurated: true,
    isTrending: true
  },
  {
    id: 'aura-minimal-backpack',
    name: 'Aura Minimal Backpack',
    subtitle: 'Cordura® Ballistic & Matte Anodized Alloy',
    category: 'Accessories',
    price: 5999,
    originalPrice: 7999,
    discount: 25,
    rating: 4.7,
    reviewCount: 84,
    images: [
      '/src/assets/images/product_aura_backpack_1790579725166.jpg',
      '/src/assets/images/product_nova_sneakers_1790579712726.jpg'
    ],
    description: 'Weatherproof 22-liter daypack with dedicated suspended 16-inch laptop cocoon.',
    longDescription: 'A study in architectural restraint. Aura holds its clean structural silhouette whether empty or packed. Includes quick-draw passport pocket, Fidlock magnetic sternum buckle, and water-sealed YKK AquaGuard zippers.',
    badge: 'Best Seller',
    colors: [
      { name: 'Obsidian Black', hex: '#1B1B1F' },
      { name: 'Desert Sand', hex: '#D2C4B1' }
    ],
    specs: [
      { label: 'Capacity', value: '22 Liters' },
      { label: 'Dimensions', value: '48 x 30 x 15 cm' },
      { label: 'Shell Material', value: '840D Recycled Cordura Ballistic' },
      { label: 'Laptop Sleeve', value: 'Fits up to 16" MacBook Pro' }
    ],
    features: [
      'Self-standing reinforced base',
      'Hidden luggage trolley pass-through',
      'Ergonomic dual-density EVA shoulder straps',
      'Internal cable routing ports'
    ],
    inStock: true,
    vibe: ['Work', 'Travel', 'Everyday'],
    styleTag: 'Minimalist Chic',
    isCurated: true,
    isTrending: false
  },
  {
    id: 'pulse-smart-lamp',
    name: 'Pulse Smart Lamp',
    subtitle: 'Circadian Ambient Luminaire & Solid Brass',
    category: 'Home & Living',
    price: 4499,
    originalPrice: 5999,
    discount: 25,
    rating: 4.8,
    reviewCount: 67,
    images: [
      '/src/assets/images/category_audio_tech_1790579662193.jpg',
      '/src/assets/images/category_home_ceramics_1790579649519.jpg'
    ],
    description: 'Touch-sensitive luminaire that mirrors the natural Kelvin spectrum of the sun throughout your day.',
    longDescription: 'Pulse transitions seamlessly from a warm 1800K candle glow for evening unwind to a crisp 5000K daylight beam for deep morning focus. Crafted with a heavy solid-machined brass dial that rotates with silky hydraulic damping.',
    badge: 'Trending',
    colors: [
      { name: 'Brushed Brass', hex: '#D4AF37' },
      { name: 'Matte White', hex: '#F5F5F7' }
    ],
    specs: [
      { label: 'Color Temperature', value: '1800K - 6500K Tunable White' },
      { label: 'Max Brightness', value: '950 Lumens (CRI > 97)' },
      { label: 'Base Weight', value: '1.4 kg Weighted Steel' },
      { label: 'Connectivity', value: 'Matter / Apple Home / Google Home' }
    ],
    features: [
      'Optical diffuser with zero flicker',
      'Step-less magnetic rotary dimmer',
      'Integrated 15W Qi wireless charger base',
      'Gentle sunrise wake-up alarm sequence'
    ],
    inStock: true,
    vibe: ['Home & Living', 'Work', 'Gifting'],
    styleTag: 'Luxury Contemporary',
    isCurated: true,
    isTrending: true
  },
  {
    id: 'orbit-portable-speaker',
    name: 'Orbit Portable Speaker',
    subtitle: '360° Omnidirectional Acoustic Sphere',
    category: 'Electronics',
    price: 3999,
    originalPrice: 4999,
    discount: 20,
    rating: 4.7,
    reviewCount: 112,
    images: [
      '/src/assets/images/category_audio_tech_1790579662193.jpg',
      '/src/assets/images/drop_nova_air_1790579627318.jpg'
    ],
    description: 'Pocket-sized powerhouse with acoustic acoustic passive radiator and waterproof IP67 rating.',
    longDescription: 'Formed from spun aluminum with acoustic fabric weave. Orbit delivers room-filling clarity and deep resonant percussion despite its palm-sized footprint. Ideal for poolside evenings, park retreats, or bedside listening.',
    badge: 'Best Seller',
    colors: [
      { name: 'Champagne Silver', hex: '#D8D4D0' },
      { name: 'Volcanic Ash', hex: '#313238' },
      { name: 'Terracotta', hex: '#A85943' }
    ],
    specs: [
      { label: 'Output Power', value: '25W RMS Peak' },
      { label: 'Frequency Response', value: '55Hz - 22,000Hz' },
      { label: 'Battery Life', value: '20 Hours at 60% Volume' },
      { label: 'Water Resistance', value: 'IP67 Waterproof & Dustproof' }
    ],
    features: [
      'Dual-speaker stereo pairing mode',
      'Built-in studio grade voice microphone',
      'Anodized carabiner attachment loop',
      'USB-C reverse charging powerbank'
    ],
    inStock: true,
    vibe: ['Travel', 'Fitness', 'Everyday', 'Gifting'],
    styleTag: 'Tech Forward',
    isCurated: true,
    isTrending: true
  },
  {
    id: 'luna-skincare-kit',
    name: 'Luna Skincare Kit',
    subtitle: 'Ceramide Elixir + Niacinamide Dew + Jade Roller',
    category: 'Beauty',
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 4.9,
    reviewCount: 178,
    images: [
      '/src/assets/images/category_home_ceramics_1790579649519.jpg',
      '/src/assets/images/category_fashion_look_1790579637753.jpg'
    ],
    description: 'Complete 3-step restorative ritual for radiant cellular hydration and moisture barrier repair.',
    longDescription: 'Harnessing cold-pressed botanical squalane, multi-molecular hyaluronic acid, and fermented green tea seed oil. Formulated without synthetic fragrances, parabens, or mineral oils. Packaged in recyclable UV-protective miron violet glass bottles.',
    badge: 'Trending',
    specs: [
      { label: 'Kit Contents', value: 'Cleanser 100ml, Serum 30ml, Cream 50ml' },
      { label: 'Skin Types', value: 'Suitable for all, including sensitive' },
      { label: 'Key Actives', value: '5% Niacinamide, 3% Bio-Ceramide Complex' },
      { label: 'Origin', value: 'Formulated in Seoul & Grasse' }
    ],
    features: [
      '100% Vegan & Leaping Bunny Certified',
      'Non-comedogenic clinical testing',
      'Handcrafted natural nephrite jade facial tool included',
      'Refillable glass pump cartridges'
    ],
    inStock: true,
    vibe: ['Everyday', 'Gifting', 'Fitness'],
    styleTag: 'Organic & Earthy',
    isCurated: true,
    isTrending: false
  },
  {
    id: 'terra-ceramic-set',
    name: 'Terra Ceramic Set',
    subtitle: 'Hand-thrown Stoneware Plates & Bowls (Set of 6)',
    category: 'Home & Living',
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    rating: 4.8,
    reviewCount: 93,
    images: [
      '/src/assets/images/category_home_ceramics_1790579649519.jpg',
      '/src/assets/images/category_fashion_look_1790579637753.jpg'
    ],
    description: 'Organic flared stoneware with tactile raw textured exterior and satin food-safe glaze.',
    longDescription: 'Individually shaped by ceramic masters using mineral-rich clay from the Himalayan foothills. Each piece features subtle organic variations that celebrate the beauty of slow craft. Dishwasher and microwave safe.',
    badge: 'Limited',
    colors: [
      { name: 'Oatmeal Specks', hex: '#DFD8CC' },
      { name: 'Matte Charcoal', hex: '#2A2A2E' },
      { name: 'Warm Terracotta', hex: '#9E5B47' }
    ],
    specs: [
      { label: 'Set Includes', value: '2 Dinner Plates, 2 Salad Plates, 2 Pasta Bowls' },
      { label: 'Material', value: 'High-fire Stoneware (1280°C)' },
      { label: 'Dishwasher Safe', value: 'Yes, commercial grade' },
      { label: 'Finish', value: 'Raw clay exterior, food-safe satin interior' }
    ],
    features: [
      'Scratch-resistant glaze formulation',
      'Stackable nesting geometry for compact storage',
      'Heavy substantial hand-feel (750g dinner plate)',
      '10-year chip resistance guarantee'
    ],
    inStock: true,
    vibe: ['Home & Living', 'Gifting', 'Everyday'],
    styleTag: 'Organic & Earthy',
    isCurated: true,
    isTrending: false
  },
  {
    id: 'nova-air-limited',
    name: 'NOVA AIR — Limited Edition',
    subtitle: 'Bespoke Carbon Fiber & Open-Back Soundstage',
    category: 'Electronics',
    price: 18499,
    originalPrice: 22999,
    discount: 20,
    rating: 5.0,
    reviewCount: 38,
    images: [
      '/src/assets/images/drop_nova_air_1790579627318.jpg',
      '/src/assets/images/category_audio_tech_1790579662193.jpg'
    ],
    description: 'Strictly numbered batch of 500 units worldwide. Nanomaterial diaphragms for acoustic transcendence.',
    longDescription: 'The pinnacle of acoustic industrial design. Hand-assembled in Munich with vacuum-infused forged carbon fiber and hand-stitched Alcantara. Features an open-back resonant acoustic chamber that puts you dead center in Abbey Road Studio 2.',
    badge: 'Limited',
    colors: [
      { name: 'Forged Carbon', hex: '#161618' },
      { name: 'Titanium Frost', hex: '#B2B4BA' }
    ],
    specs: [
      { label: 'Production Run', value: 'Limited to 500 Numbered Pieces' },
      { label: 'Diaphragm', value: '50mm Graphene Nano-layer' },
      { label: 'Frequency', value: '5Hz - 48,000Hz (Hi-Res Audio Certified)' },
      { label: 'Weight', value: '280g Ultra-lightweight' }
    ],
    features: [
      'Laser-etched individual serial number on headband',
      'Custom Pelican-grade waterproof hard travel case',
      'Silver-plated OFC modular audiophile cable',
      'Exclusive NOVA Vault VIP membership certificate'
    ],
    inStock: true,
    vibe: ['Work', 'Everyday', 'Gifting'],
    styleTag: 'Luxury Contemporary',
    isCurated: false,
    isTrending: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Aarav Mehta',
    rating: 5,
    date: '3 days ago',
    title: 'Surpassed every luxury brand I own',
    comment: 'The tactile precision on the Aurora watch is unbelievable. The Grade 5 titanium has this subtle silky matte finish that catches the light like an Audemars. Battery is easily delivering 12 days for me.',
    verified: true,
    helpfulCount: 42
  },
  {
    id: 'rev-2',
    author: 'Devika Singhania',
    rating: 5,
    date: '1 week ago',
    title: 'Packaging alone is a design masterpiece',
    comment: 'Ordered the Luna Skincare and Terra ceramic set. Unboxing felt like opening a private exhibition catalog. The ceramics have wonderful heft, and the serum absorbs instantly with zero tacky residue.',
    verified: true,
    helpfulCount: 29
  },
  {
    id: 'rev-3',
    author: 'Kabir Varma',
    rating: 5,
    date: '2 weeks ago',
    title: 'The soundstage on NOVA Air is otherworldly',
    comment: 'I test studio gear for a living. The openness of these drivers at this price point makes high-end Sennheisers sweat. Customer support also helped me swap the strap within 24 hours.',
    verified: true,
    helpfulCount: 19
  },
  {
    id: 'rev-4',
    author: 'Rhea Sen',
    rating: 4,
    date: '3 weeks ago',
    title: 'Nova sneakers are my new daily drivers',
    comment: 'Walked 18,000 steps around Mumbai on day one and zero blisters. The merino wool really does breathe in humid weather. Worth every rupee.',
    verified: true,
    helpfulCount: 15
  }
];

export const PROMO_COUPONS: Record<string, { discountPercent?: number; flatDiscount?: number; minOrder: number; description: string }> = {
  'NOVA10': { discountPercent: 10, minOrder: 1999, description: '10% off on orders above ₹1,999' },
  'FIRST500': { flatDiscount: 500, minOrder: 2499, description: '₹500 flat off on your first order above ₹2,499' },
  'DISTINCT': { discountPercent: 15, minOrder: 4999, description: '15% off on orders above ₹4,999' }
};
