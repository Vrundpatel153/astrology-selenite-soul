export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  material: string;
  category: string;
  gemstone?: string;
  image: string;
  images?: string[];
  badge?: "NEW" | "SALE" | "SOLD OUT" | "BEST SELLER";
  savePercent?: number;
  swatches?: string[];
  concern?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  beadSize?: string;
  zodiac?: string[];
  chakra?: string;
  description?: string;
}

export const categories = [
  { id: "bracelets",  name: "All Bracelets",             image: "/cat-bracelets.webp",  count: 81 },
  { id: "pendants",   name: "Pendants",                  image: "/cat-pendants.webp",   count: 51 },
  { id: "rings",      name: "Rings",                     image: "/cat-rings.webp",       count: 28 },
  { id: "necklaces",  name: "Necklaces & Mala",          image: "/cat-necklaces.webp",  count: 22 },
  { id: "ear-studs",  name: "Ear Studs & Anklets",       image: "/cat-ear-studs.webp",  count: 18 },
  { id: "gemstones",  name: "Gemstones & Raw Crystals",  image: "/cat-gemstones.webp",  count: 34 },
];

export const concerns = [
  { id: "love",       name: "Love",       subtitle: "OPEN YOUR HEART",    image: "/concern-love.webp",       description: "Rose Quartz, Rhodochrosite, Rhodonite" },
  { id: "peace",      name: "Peace",      subtitle: "RELIEVE YOUR STRESS", image: "/concern-peace.webp",      description: "Amethyst, Amazonite, Selenite" },
  { id: "protection", name: "Protection", subtitle: "SHIELD YOUR ENERGY",  image: "/concern-protection.webp", description: "Black Tourmaline, Sulemani Hakik, Obsidian" },
  { id: "money",      name: "Money",      subtitle: "ATTRACT ABUNDANCE",   image: "/concern-money.webp",      description: "Citrine, Pyrite, Green Aventurine, Dhan Yog" },
  { id: "health",     name: "Health",     subtitle: "HEAL YOUR BODY",      image: "/concern-health.webp",     description: "Clear Quartz, Carnelian, Red Jasper, Turquoise" },
];

export const zodiacSigns = [
  { sign: "Aries",       dates: "Mar 21 - Apr 19", crystal: "Carnelian" },
  { sign: "Taurus",      dates: "Apr 20 - May 20", crystal: "Rose Quartz" },
  { sign: "Gemini",      dates: "May 21 - Jun 20", crystal: "Tiger Eye" },
  { sign: "Cancer",      dates: "Jun 21 - Jul 22", crystal: "Selenite" },
  { sign: "Leo",         dates: "Jul 23 - Aug 22", crystal: "Citrine" },
  { sign: "Virgo",       dates: "Aug 23 - Sep 22", crystal: "Amazonite" },
  { sign: "Libra",       dates: "Sep 23 - Oct 22", crystal: "Lapis Lazuli" },
  { sign: "Scorpio",     dates: "Oct 23 - Nov 21", crystal: "Unakite" },
  { sign: "Sagittarius", dates: "Nov 22 - Dec 21", crystal: "Turquoise" },
  { sign: "Capricorn",   dates: "Dec 22 - Jan 19", crystal: "Garnet" },
  { sign: "Aquarius",    dates: "Jan 20 - Feb 18", crystal: "Amethyst" },
  { sign: "Pisces",      dates: "Feb 19 - Mar 20", crystal: "Clear Quartz" },
];

export const products: Product[] = [
  {
    "id": 1,
    "name": "Amazonite Classic Harmony Bracelet",
    "price": 1099,
    "originalPrice": 1499,
    "material": "Natural Amazonite, Durable Stretch Cord",
    "category": "bracelets",
    "gemstone": "Amazonite",
    "image": "/products/amazonite-classic/image-1.webp",
    "images": [
      "/products/amazonite-classic/image-1.webp",
      "/products/amazonite-classic/image-2.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 27,
    "swatches": [
      "#7ec8b8",
      "#a8dadc"
    ],
    "concern": [
      "peace",
      "health"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Virgo",
      "Aries"
    ],
    "chakra": "Throat & Heart Chakra",
    "description": "Handcrafted with authentic soothing Amazonite beads known as the stone of courage and truth. Dissipates negative energy and calms the nervous system."
  },
  {
    "id": 2,
    "name": "Amazonite 10MM Power Energy Bracelet",
    "price": 1399,
    "originalPrice": 1799,
    "material": "Grade-A Amazonite (10mm), High-Tensile Elastic",
    "category": "bracelets",
    "gemstone": "Amazonite",
    "image": "/products/amazonite-10mm/image-1.webp",
    "images": [
      "/products/amazonite-10mm/image-1.webp",
      "/products/amazonite-10mm/image-2.webp",
      "/products/amazonite-10mm/image-3.webp",
      "/products/amazonite-10mm/image-4.webp",
      "/products/amazonite-10mm/image-5.webp",
      "/products/amazonite-10mm/image-6.webp"
    ],
    "badge": "NEW",
    "savePercent": 22,
    "swatches": [
      "#7ec8b8",
      "#457b9d"
    ],
    "concern": [
      "peace",
      "health"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Virgo"
    ],
    "chakra": "Throat Chakra",
    "description": "Bold 10mm Amazonite beads provide a strong energetic shield against electromagnetic stress while enhancing articulate self-expression."
  },
  {
    "id": 3,
    "name": "Amazonite 8MM Expression & Truth Bracelet",
    "price": 1199,
    "originalPrice": 1599,
    "material": "Selected Natural Amazonite (8mm), Elastic Cord",
    "category": "bracelets",
    "gemstone": "Amazonite",
    "image": "/products/amazonite-8mm/image-1.webp",
    "images": [
      "/products/amazonite-8mm/image-1.webp",
      "/products/amazonite-8mm/image-2.webp",
      "/products/amazonite-8mm/image-3.webp",
      "/products/amazonite-8mm/image-4.webp",
      "/products/amazonite-8mm/image-5.webp",
      "/products/amazonite-8mm/image-6.webp",
      "/products/amazonite-8mm/image-7.webp"
    ],
    "badge": null,
    "savePercent": 25,
    "swatches": [
      "#7ec8b8",
      "#a8dadc"
    ],
    "concern": [
      "peace"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Virgo",
      "Aries"
    ],
    "chakra": "Throat Chakra",
    "description": "Classic 8mm polished Amazonite beads encourage peaceful dialogue, inner balance, and deep emotional clarity."
  },
  {
    "id": 4,
    "name": "Spiritual Amethyst Meditation Bracelet",
    "price": 1199,
    "originalPrice": 1599,
    "material": "Natural Deep Purple Amethyst, Stretch Cord",
    "category": "bracelets",
    "gemstone": "Amethyst",
    "image": "/products/amethyst-classic/image-1.webp",
    "images": [
      "/products/amethyst-classic/image-1.webp",
      "/products/amethyst-classic/image-2.webp",
      "/products/amethyst-classic/image-3.webp",
      "/products/amethyst-classic/image-4.webp",
      "/products/amethyst-classic/image-5.webp",
      "/products/amethyst-classic/image-6.webp",
      "/products/amethyst-classic/image-7.webp",
      "/products/amethyst-classic/image-8.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 25,
    "swatches": [
      "#7b2cbf",
      "#9d4edd"
    ],
    "concern": [
      "peace",
      "protection"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Aquarius",
      "Pisces"
    ],
    "chakra": "Crown & Third Eye Chakra",
    "description": "Consecrated with Vedic mantras under the full moon to awaken spiritual wisdom, relieve insomnia, and calm restless thoughts."
  },
  {
    "id": 5,
    "name": "Royal Amethyst 10MM Aura Cleansing Bracelet",
    "price": 1499,
    "originalPrice": 1999,
    "material": "Deep Purple Brazilian Amethyst (10mm), Elastic",
    "category": "bracelets",
    "gemstone": "Amethyst",
    "image": "/products/amethyst-10mm/image-1.webp",
    "images": [
      "/products/amethyst-10mm/image-1.webp",
      "/products/amethyst-10mm/image-2.webp",
      "/products/amethyst-10mm/image-3.webp"
    ],
    "badge": "NEW",
    "savePercent": 25,
    "swatches": [
      "#5a189a",
      "#7b2cbf"
    ],
    "concern": [
      "peace",
      "protection"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Aquarius",
      "Pisces"
    ],
    "chakra": "Crown Chakra",
    "description": "Substantial 10mm Amethyst spheres emit high-frequency spiritual vibrations, providing an energetic cocoon against negative vibes."
  },
  {
    "id": 6,
    "name": "Pure Amethyst 8MM Stress Relief Bracelet",
    "price": 1099,
    "originalPrice": 1499,
    "material": "Natural Amethyst Beads (8mm), Stretch String",
    "category": "bracelets",
    "gemstone": "Amethyst",
    "image": "/products/amethyst-8mm/image-1.webp",
    "images": [
      "/products/amethyst-8mm/image-1.webp",
      "/products/amethyst-8mm/image-2.webp",
      "/products/amethyst-8mm/image-3.webp"
    ],
    "badge": "SALE",
    "savePercent": 27,
    "swatches": [
      "#7b2cbf",
      "#c77dff"
    ],
    "concern": [
      "peace"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Aquarius",
      "Pisces"
    ],
    "chakra": "Crown Chakra",
    "description": "Ideal everyday spiritual companion for daily mindfulness, anxiety relief, and deep restorative sleep."
  },
  {
    "id": 7,
    "name": "Anti-Anger & Self-Love Healing Bracelet",
    "price": 1399,
    "originalPrice": 1899,
    "material": "Rose Quartz, Howlite & Rhodonite Synergy Blend",
    "category": "bracelets",
    "gemstone": "Multi-stone",
    "image": "/products/anti-anger-self-love/image-1.webp",
    "images": [
      "/products/anti-anger-self-love/image-1.webp",
      "/products/anti-anger-self-love/image-2.webp",
      "/products/anti-anger-self-love/image-3.webp",
      "/products/anti-anger-self-love/image-4.webp",
      "/products/anti-anger-self-love/image-5.webp",
      "/products/anti-anger-self-love/image-6.webp",
      "/products/anti-anger-self-love/image-7.webp",
      "/products/anti-anger-self-love/image-8.webp",
      "/products/anti-anger-self-love/image-9.webp",
      "/products/anti-anger-self-love/image-10.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 26,
    "swatches": [
      "#f48fb1",
      "#f5f5f5",
      "#c2185b"
    ],
    "concern": [
      "love",
      "peace"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Taurus",
      "Cancer",
      "Libra"
    ],
    "chakra": "Heart Chakra",
    "description": "Formulated specifically to dissolve bottled-up frustration, emotional volatility, and resentment, replacing them with tender self-acceptance."
  },
  {
    "id": 8,
    "name": "Rare Azurite 8MM Third Eye Awakening Bracelet",
    "price": 1799,
    "originalPrice": 2399,
    "material": "Natural Deep Blue Azurite Beads (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Azurite",
    "image": "/products/azurite-8mm/image-1.webp",
    "images": [
      "/products/azurite-8mm/image-1.webp",
      "/products/azurite-8mm/image-2.webp",
      "/products/azurite-8mm/image-3.webp",
      "/products/azurite-8mm/image-4.webp",
      "/products/azurite-8mm/image-5.webp",
      "/products/azurite-8mm/image-6.webp",
      "/products/azurite-8mm/image-7.webp",
      "/products/azurite-8mm/image-8.webp",
      "/products/azurite-8mm/image-9.webp",
      "/products/azurite-8mm/image-10.webp",
      "/products/azurite-8mm/image-11.webp",
      "/products/azurite-8mm/image-12.webp",
      "/products/azurite-8mm/image-13.webp",
      "/products/azurite-8mm/image-14.webp",
      "/products/azurite-8mm/image-15.webp"
    ],
    "badge": "NEW",
    "savePercent": 25,
    "swatches": [
      "#1d3557",
      "#457b9d"
    ],
    "concern": [
      "peace",
      "protection"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Sagittarius",
      "Aquarius"
    ],
    "chakra": "Third Eye Chakra",
    "description": "Often called the Stone of Heaven, rare Azurite clears psychic blockages, unlocks intuitive sight, and enhances meditation depth."
  },
  {
    "id": 9,
    "name": "Black Tourmaline Root Defense Bracelet",
    "price": 1099,
    "originalPrice": 1499,
    "material": "Raw Black Tourmaline Polished Spheres, Elastic",
    "category": "bracelets",
    "gemstone": "Black Tourmaline",
    "image": "/products/black-tourmaline-classic/image-1.webp",
    "images": [
      "/products/black-tourmaline-classic/image-1.webp",
      "/products/black-tourmaline-classic/image-2.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 27,
    "swatches": [
      "#1a1a1a",
      "#333333"
    ],
    "concern": [
      "protection"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Capricorn",
      "Scorpio"
    ],
    "chakra": "Root Chakra",
    "description": "The ultimate psychic shield. Grounds spiritual energy while neutralizing environmental toxins, negative thoughts, and psychic vampirism."
  },
  {
    "id": 10,
    "name": "Black Tourmaline 10MM Aura Shield Bracelet",
    "price": 1399,
    "originalPrice": 1899,
    "material": "Dense Black Tourmaline (10mm), Heavy Duty Elastic",
    "category": "bracelets",
    "gemstone": "Black Tourmaline",
    "image": "/products/black-tourmaline-10mm/image-1.webp",
    "images": [
      "/products/black-tourmaline-10mm/image-1.webp",
      "/products/black-tourmaline-10mm/image-2.webp",
      "/products/black-tourmaline-10mm/image-3.webp",
      "/products/black-tourmaline-10mm/image-4.webp"
    ],
    "badge": "SALE",
    "savePercent": 26,
    "swatches": [
      "#111111",
      "#222222"
    ],
    "concern": [
      "protection"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Capricorn",
      "Scorpio"
    ],
    "chakra": "Root Chakra",
    "description": "Heavyweight 10mm protection spheres establish an impenetrable energetic fortress around the bearer's aura."
  },
  {
    "id": 11,
    "name": "Black Tourmaline 8MM Psychic Protection Bracelet",
    "price": 1199,
    "originalPrice": 1599,
    "material": "Genuine Black Tourmaline (8mm), Elastic Cord",
    "category": "bracelets",
    "gemstone": "Black Tourmaline",
    "image": "/products/black-tourmaline-8mm/image-1.webp",
    "images": [
      "/products/black-tourmaline-8mm/image-1.webp",
      "/products/black-tourmaline-8mm/image-2.webp",
      "/products/black-tourmaline-8mm/image-3.webp"
    ],
    "badge": null,
    "savePercent": 25,
    "swatches": [
      "#1a1a1a"
    ],
    "concern": [
      "protection"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Capricorn",
      "Scorpio"
    ],
    "chakra": "Root Chakra",
    "description": "Essential daily armor for empaths, healers, and professionals working in high-stress or emotionally dense environments."
  },
  {
    "id": 12,
    "name": "Clear Quartz (Sphatik) Master Healer Bracelet",
    "price": 999,
    "originalPrice": 1399,
    "material": "Natural Clear Quartz Crystal (Sphatik), Elastic",
    "category": "bracelets",
    "gemstone": "Clear Quartz",
    "image": "/products/clear-quartz-classic/image-1.webp",
    "images": [
      "/products/clear-quartz-classic/image-1.webp",
      "/products/clear-quartz-classic/image-2.webp",
      "/products/clear-quartz-classic/image-3.webp",
      "/products/clear-quartz-classic/image-4.webp",
      "/products/clear-quartz-classic/image-5.webp",
      "/products/clear-quartz-classic/image-6.webp",
      "/products/clear-quartz-classic/image-7.webp",
      "/products/clear-quartz-classic/image-8.webp",
      "/products/clear-quartz-classic/image-9.webp",
      "/products/clear-quartz-classic/image-10.webp",
      "/products/clear-quartz-classic/image-11.webp",
      "/products/clear-quartz-classic/image-12.webp",
      "/products/clear-quartz-classic/image-13.webp",
      "/products/clear-quartz-classic/image-14.webp",
      "/products/clear-quartz-classic/image-15.webp",
      "/products/clear-quartz-classic/image-16.webp",
      "/products/clear-quartz-classic/image-17.webp",
      "/products/clear-quartz-classic/image-18.webp",
      "/products/clear-quartz-classic/image-19.webp",
      "/products/clear-quartz-classic/image-20.webp",
      "/products/clear-quartz-classic/image-21.webp",
      "/products/clear-quartz-classic/image-22.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 29,
    "swatches": [
      "#ffffff",
      "#e0e0e0"
    ],
    "concern": [
      "peace",
      "health"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "All Signs"
    ],
    "chakra": "All Chakras (Crown Primary)",
    "description": "Pure Himalayan Sphatik beads amplify spiritual intentions, clarify mental fog, and balance the bio-electromagnetic field."
  },
  {
    "id": 13,
    "name": "Clear Quartz 10MM Master Amplification Bracelet",
    "price": 1299,
    "originalPrice": 1699,
    "material": "Optical Grade Clear Quartz (10mm), Elastic",
    "category": "bracelets",
    "gemstone": "Clear Quartz",
    "image": "/products/clear-quartz-10mm/image-1.webp",
    "images": [
      "/products/clear-quartz-10mm/image-1.webp",
      "/products/clear-quartz-10mm/image-2.webp",
      "/products/clear-quartz-10mm/image-3.webp",
      "/products/clear-quartz-10mm/image-4.webp"
    ],
    "badge": "NEW",
    "savePercent": 24,
    "swatches": [
      "#ffffff",
      "#f5f5f5"
    ],
    "concern": [
      "peace",
      "health"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "All Signs"
    ],
    "chakra": "Crown Chakra",
    "description": "10mm crystalline globes radiate supreme light frequency, purifying any stagnant energy in your personal sanctuary."
  },
  {
    "id": 14,
    "name": "Clear Quartz 12MM Sovereign Statement Bracelet",
    "price": 1599,
    "originalPrice": 2199,
    "material": "Rare Jumbo Clear Quartz (12mm), Heavy Cord",
    "category": "bracelets",
    "gemstone": "Clear Quartz",
    "image": "/products/clear-quartz-12mm/image-1.webp",
    "images": [
      "/products/clear-quartz-12mm/image-1.webp",
      "/products/clear-quartz-12mm/image-2.webp",
      "/products/clear-quartz-12mm/image-3.webp",
      "/products/clear-quartz-12mm/image-4.webp",
      "/products/clear-quartz-12mm/image-5.webp"
    ],
    "badge": "NEW",
    "savePercent": 27,
    "swatches": [
      "#ffffff"
    ],
    "concern": [
      "peace",
      "health"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "12mm",
    "zodiac": [
      "All Signs"
    ],
    "chakra": "Crown Chakra",
    "description": "Majestic 12mm water-clear Sphatik beads. Designed for master practitioners, energy workers, and crystal connoisseurs."
  },
  {
    "id": 15,
    "name": "Clear Quartz 8MM Divine Radiance Bracelet",
    "price": 1099,
    "originalPrice": 1499,
    "material": "Pure Sphatik Quartz Beads (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Clear Quartz",
    "image": "/products/clear-quartz-8mm/image-1.webp",
    "images": [
      "/products/clear-quartz-8mm/image-1.webp",
      "/products/clear-quartz-8mm/image-2.webp",
      "/products/clear-quartz-8mm/image-3.webp",
      "/products/clear-quartz-8mm/image-4.webp"
    ],
    "badge": null,
    "savePercent": 27,
    "swatches": [
      "#ffffff"
    ],
    "concern": [
      "peace",
      "health"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "All Signs"
    ],
    "chakra": "Crown Chakra",
    "description": "Cooling and purifying on the wrist, harmonizing planetary imbalances and enhancing concentration."
  },
  {
    "id": 16,
    "name": "Faceted Clear Quartz Cut 10MM Diamond-Facet Bracelet",
    "price": 1499,
    "originalPrice": 1999,
    "material": "Diamond-Cut Faceted Sphatik Quartz (10mm), Elastic",
    "category": "bracelets",
    "gemstone": "Clear Quartz",
    "image": "/products/clear-quartz-cut-10mm/image-1.webp",
    "images": [
      "/products/clear-quartz-cut-10mm/image-1.webp",
      "/products/clear-quartz-cut-10mm/image-2.webp",
      "/products/clear-quartz-cut-10mm/image-3.webp",
      "/products/clear-quartz-cut-10mm/image-4.webp",
      "/products/clear-quartz-cut-10mm/image-5.webp",
      "/products/clear-quartz-cut-10mm/image-6.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 25,
    "swatches": [
      "#ffffff",
      "#e0e0e0"
    ],
    "concern": [
      "peace",
      "health",
      "money"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "10mm Cut",
    "zodiac": [
      "All Signs"
    ],
    "chakra": "Crown Chakra",
    "description": "Precision micro-faceted 10mm Sphatik gems catch and refract sunlight into prismatic rainbows, raising physical vibration."
  },
  {
    "id": 17,
    "name": "Faceted Clear Quartz Cut 8MM Prismatic Light Bracelet",
    "price": 1299,
    "originalPrice": 1699,
    "material": "Diamond-Faceted Pure Quartz (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Clear Quartz",
    "image": "/products/clear-quartz-cut-8mm/image-1.webp",
    "images": [
      "/products/clear-quartz-cut-8mm/image-1.webp",
      "/products/clear-quartz-cut-8mm/image-2.webp",
      "/products/clear-quartz-cut-8mm/image-3.webp",
      "/products/clear-quartz-cut-8mm/image-4.webp",
      "/products/clear-quartz-cut-8mm/image-5.webp",
      "/products/clear-quartz-cut-8mm/image-6.webp",
      "/products/clear-quartz-cut-8mm/image-7.webp",
      "/products/clear-quartz-cut-8mm/image-8.webp",
      "/products/clear-quartz-cut-8mm/image-9.webp"
    ],
    "badge": "SALE",
    "savePercent": 24,
    "swatches": [
      "#ffffff",
      "#f0f0f0"
    ],
    "concern": [
      "peace",
      "health"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm Cut",
    "zodiac": [
      "All Signs"
    ],
    "chakra": "Crown Chakra",
    "description": "Sparkling multifaceted Sphatik beads create a continuous halo of clarity, shielding your personal prana throughout the day."
  },
  {
    "id": 18,
    "name": "Sacred Carnelian Fire Bracelet",
    "price": 999,
    "originalPrice": 1399,
    "material": "Natural Sunset Carnelian Agate, Elastic Cord",
    "category": "bracelets",
    "gemstone": "Carnelian",
    "image": "/products/carnelian-classic/image-1.webp",
    "images": [
      "/products/carnelian-classic/image-1.webp",
      "/products/carnelian-classic/image-2.webp",
      "/products/carnelian-classic/image-3.webp",
      "/products/carnelian-classic/image-4.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 29,
    "swatches": [
      "#d94e24",
      "#e76f51"
    ],
    "concern": [
      "health",
      "love"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Aries",
      "Leo",
      "Virgo"
    ],
    "chakra": "Sacral & Root Chakra",
    "description": "Known as the Singer's Stone and ancient talisman of courage. Kindles the fire of passion, motivation, and physical stamina."
  },
  {
    "id": 19,
    "name": "Carnelian 10MM Vitality & Passion Bracelet",
    "price": 1299,
    "originalPrice": 1699,
    "material": "Fiery Orange Carnelian (10mm), High-Grade Elastic",
    "category": "bracelets",
    "gemstone": "Carnelian",
    "image": "/products/carnelian-10mm/image-1.webp",
    "images": [
      "/products/carnelian-10mm/image-1.webp",
      "/products/carnelian-10mm/image-2.webp",
      "/products/carnelian-10mm/image-3.webp",
      "/products/carnelian-10mm/image-4.webp",
      "/products/carnelian-10mm/image-5.webp",
      "/products/carnelian-10mm/image-6.webp",
      "/products/carnelian-10mm/image-7.webp"
    ],
    "badge": "NEW",
    "savePercent": 24,
    "swatches": [
      "#c1440e",
      "#e76f51"
    ],
    "concern": [
      "health"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Aries",
      "Leo"
    ],
    "chakra": "Sacral Chakra",
    "description": "Bold 10mm Carnelian beads stimulate circulation, dispel lethargy, and instill courageous determination."
  },
  {
    "id": 20,
    "name": "Carnelian 8MM Creative Fire Bracelet",
    "price": 1099,
    "originalPrice": 1499,
    "material": "Polished Natural Carnelian (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Carnelian",
    "image": "/products/carnelian-8mm/image-1.webp",
    "images": [
      "/products/carnelian-8mm/image-1.webp",
      "/products/carnelian-8mm/image-2.webp",
      "/products/carnelian-8mm/image-3.webp",
      "/products/carnelian-8mm/image-4.webp",
      "/products/carnelian-8mm/image-5.webp",
      "/products/carnelian-8mm/image-6.webp"
    ],
    "badge": null,
    "savePercent": 27,
    "swatches": [
      "#d94e24",
      "#f4a261"
    ],
    "concern": [
      "health",
      "money"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Aries",
      "Virgo"
    ],
    "chakra": "Sacral Chakra",
    "description": "Inspires artists, entrepreneurs, and leaders with unwavering focus and creative drive."
  },
  {
    "id": 21,
    "name": "Natural Cat's Eye (Lehsunia) 8MM Ketu Aura Shield Bracelet",
    "price": 1599,
    "originalPrice": 2199,
    "material": "Natural Chatoyant Chrysoberyl Cat's Eye (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Cats Eye",
    "image": "/products/cats-eye-8mm/image-1.webp",
    "images": [
      "/products/cats-eye-8mm/image-1.webp",
      "/products/cats-eye-8mm/image-2.webp",
      "/products/cats-eye-8mm/image-3.webp",
      "/products/cats-eye-8mm/image-4.webp",
      "/products/cats-eye-8mm/image-5.webp",
      "/products/cats-eye-8mm/image-6.webp",
      "/products/cats-eye-8mm/image-7.webp",
      "/products/cats-eye-8mm/image-8.webp",
      "/products/cats-eye-8mm/image-9.webp",
      "/products/cats-eye-8mm/image-10.webp",
      "/products/cats-eye-8mm/image-11.webp",
      "/products/cats-eye-8mm/image-12.webp",
      "/products/cats-eye-8mm/image-13.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 27,
    "swatches": [
      "#a3b18a",
      "#588157"
    ],
    "concern": [
      "protection",
      "money"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Pisces",
      "Scorpio"
    ],
    "chakra": "Solar Plexus & Crown",
    "description": "Vedic gemstone for planet Ketu. Protects against sudden financial setbacks, evil eye, and hidden enemies while attracting sudden wealth."
  },
  {
    "id": 22,
    "name": "Golden Citrine Gem-Cut Abundance Bracelet",
    "price": 1399,
    "originalPrice": 1899,
    "material": "Faceted Natural Citrine Quartz, Gold Elastic",
    "category": "bracelets",
    "gemstone": "Citrine",
    "image": "/products/citrine-gem-classic/image-1.webp",
    "images": [
      "/products/citrine-gem-classic/image-1.webp",
      "/products/citrine-gem-classic/image-2.webp",
      "/products/citrine-gem-classic/image-3.webp",
      "/products/citrine-gem-classic/image-4.webp",
      "/products/citrine-gem-classic/image-5.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 26,
    "swatches": [
      "#f39c12",
      "#f1c40f"
    ],
    "concern": [
      "money",
      "health"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm Gem",
    "zodiac": [
      "Gemini",
      "Leo",
      "Sagittarius"
    ],
    "chakra": "Solar Plexus Chakra",
    "description": "The Merchant's Stone in exquisite gem cut. Directly channels the solar abundance ray to attract business prosperity and financial freedom."
  },
  {
    "id": 23,
    "name": "Golden Citrine Gem-Grade 10MM Wealth Attractor Bracelet",
    "price": 1699,
    "originalPrice": 2299,
    "material": "Gem-Grade Citrine Crystal (10mm), Elastic",
    "category": "bracelets",
    "gemstone": "Citrine",
    "image": "/products/citrine-gem-10mm/image-1.webp",
    "images": [
      "/products/citrine-gem-10mm/image-1.webp",
      "/products/citrine-gem-10mm/image-2.webp",
      "/products/citrine-gem-10mm/image-3.webp",
      "/products/citrine-gem-10mm/image-4.webp",
      "/products/citrine-gem-10mm/image-5.webp"
    ],
    "badge": "NEW",
    "savePercent": 26,
    "swatches": [
      "#e67e22",
      "#f39c12"
    ],
    "concern": [
      "money"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm Gem",
    "zodiac": [
      "Leo",
      "Gemini"
    ],
    "chakra": "Solar Plexus Chakra",
    "description": "Substantial 10mm gem-grade Citrine radiates optimism and unshakeable confidence, unlocking new streams of revenue."
  },
  {
    "id": 24,
    "name": "Golden Citrine Gem-Grade 8MM Prosperity Bracelet",
    "price": 1499,
    "originalPrice": 1999,
    "material": "Selected Transparent Golden Citrine (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Citrine",
    "image": "/products/citrine-gem-8mm/image-1.webp",
    "images": [
      "/products/citrine-gem-8mm/image-1.webp",
      "/products/citrine-gem-8mm/image-2.webp",
      "/products/citrine-gem-8mm/image-3.webp",
      "/products/citrine-gem-8mm/image-4.webp",
      "/products/citrine-gem-8mm/image-5.webp",
      "/products/citrine-gem-8mm/image-6.webp",
      "/products/citrine-gem-8mm/image-7.webp"
    ],
    "badge": "SALE",
    "savePercent": 25,
    "swatches": [
      "#f1c40f",
      "#f39c12"
    ],
    "concern": [
      "money"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm Gem",
    "zodiac": [
      "Leo",
      "Sagittarius"
    ],
    "chakra": "Solar Plexus Chakra",
    "description": "Does not hold negative energy, making it an everlasting magnet for joy, self-worth, and material wealth."
  },
  {
    "id": 25,
    "name": "Dhan Yog (Wealth & Abundance) Sacred Synergy Bracelet",
    "price": 1499,
    "originalPrice": 1999,
    "material": "Pyrite, Citrine, Green Aventurine & Tiger Eye Synergy",
    "category": "bracelets",
    "gemstone": "Multi-stone",
    "image": "/products/dhanyog-wealth-synergy/image-1.webp",
    "images": [
      "/products/dhanyog-wealth-synergy/image-1.webp",
      "/products/dhanyog-wealth-synergy/image-2.webp",
      "/products/dhanyog-wealth-synergy/image-3.webp",
      "/products/dhanyog-wealth-synergy/image-4.webp",
      "/products/dhanyog-wealth-synergy/image-5.webp",
      "/products/dhanyog-wealth-synergy/image-6.webp",
      "/products/dhanyog-wealth-synergy/image-7.webp",
      "/products/dhanyog-wealth-synergy/image-8.webp",
      "/products/dhanyog-wealth-synergy/image-9.webp",
      "/products/dhanyog-wealth-synergy/image-10.webp",
      "/products/dhanyog-wealth-synergy/image-11.webp",
      "/products/dhanyog-wealth-synergy/image-12.webp",
      "/products/dhanyog-wealth-synergy/image-13.webp",
      "/products/dhanyog-wealth-synergy/image-14.webp",
      "/products/dhanyog-wealth-synergy/image-15.webp",
      "/products/dhanyog-wealth-synergy/image-16.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 25,
    "swatches": [
      "#c8a951",
      "#ffd54f",
      "#81c784",
      "#8b6914"
    ],
    "concern": [
      "money",
      "protection"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Taurus",
      "Leo",
      "Virgo",
      "Capricorn"
    ],
    "chakra": "Solar Plexus & Heart",
    "description": "Formulated by Vedic Jyotish practitioners combining the 4 supreme wealth crystals: Pyrite for money luck, Citrine for cash flow, Green Aventurine for opportunity, and Tiger Eye for execution."
  },
  {
    "id": 26,
    "name": "Saraswati Vidya & Focus Study Bracelet",
    "price": 1299,
    "originalPrice": 1699,
    "material": "Sodalite, Rainbow Fluorite, Amethyst & Clear Quartz",
    "category": "bracelets",
    "gemstone": "Multi-stone",
    "image": "/products/education-focus-study/image-1.webp",
    "images": [
      "/products/education-focus-study/image-1.webp",
      "/products/education-focus-study/image-2.webp",
      "/products/education-focus-study/image-3.webp",
      "/products/education-focus-study/image-4.webp",
      "/products/education-focus-study/image-5.webp",
      "/products/education-focus-study/image-6.webp",
      "/products/education-focus-study/image-7.webp",
      "/products/education-focus-study/image-8.webp",
      "/products/education-focus-study/image-9.webp",
      "/products/education-focus-study/image-10.webp"
    ],
    "badge": "SALE",
    "savePercent": 24,
    "swatches": [
      "#3f51b5",
      "#00bcd4",
      "#9c27b0",
      "#ffffff"
    ],
    "concern": [
      "peace",
      "health"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Gemini",
      "Virgo",
      "Aquarius"
    ],
    "chakra": "Third Eye & Throat Chakra",
    "description": "Consecrated with Saraswati Mantras for students, exam aspirants, and researchers. Banishes brain fog, calms exam jitters, and supercharges information retention."
  },
  {
    "id": 27,
    "name": "Deep Crimson Garnet Prana Bracelet",
    "price": 1199,
    "originalPrice": 1599,
    "material": "Natural Almandine Garnet, Elastic Cord",
    "category": "bracelets",
    "gemstone": "Garnet",
    "image": "/products/garnet-classic/image-1.webp",
    "images": [
      "/products/garnet-classic/image-1.webp",
      "/products/garnet-classic/image-2.webp",
      "/products/garnet-classic/image-3.webp",
      "/products/garnet-classic/image-4.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 25,
    "swatches": [
      "#6b0f1a",
      "#8b0000"
    ],
    "concern": [
      "health",
      "love"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Capricorn",
      "Aquarius",
      "Aries"
    ],
    "chakra": "Root Chakra",
    "description": "Deep wine-red Garnet rekindles passion, restores healthy libido, purifies toxins from the bloodstream, and grounds scattered prana."
  },
  {
    "id": 28,
    "name": "Bohemian Garnet 10MM Kundalini Strength Bracelet",
    "price": 1499,
    "originalPrice": 1999,
    "material": "Selected Crimson Garnet (10mm), Strong Elastic",
    "category": "bracelets",
    "gemstone": "Garnet",
    "image": "/products/garnet-10mm/image-1.webp",
    "images": [
      "/products/garnet-10mm/image-1.webp",
      "/products/garnet-10mm/image-2.webp",
      "/products/garnet-10mm/image-3.webp",
      "/products/garnet-10mm/image-4.webp"
    ],
    "badge": "NEW",
    "savePercent": 25,
    "swatches": [
      "#4a0e17",
      "#6b0f1a"
    ],
    "concern": [
      "health"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Capricorn",
      "Aries"
    ],
    "chakra": "Root Chakra",
    "description": "Heavier 10mm Garnet beads deliver an unwavering feeling of physical security, survival instinct, and endurance."
  },
  {
    "id": 29,
    "name": "Bohemian Garnet 8MM Vitality & Passion Bracelet",
    "price": 1299,
    "originalPrice": 1699,
    "material": "Natural Garnet Spheres (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Garnet",
    "image": "/products/garnet-8mm/image-1.webp",
    "images": [
      "/products/garnet-8mm/image-1.webp",
      "/products/garnet-8mm/image-2.webp",
      "/products/garnet-8mm/image-3.webp",
      "/products/garnet-8mm/image-4.webp",
      "/products/garnet-8mm/image-5.webp"
    ],
    "badge": null,
    "savePercent": 24,
    "swatches": [
      "#6b0f1a"
    ],
    "concern": [
      "health",
      "love"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Capricorn",
      "Aquarius"
    ],
    "chakra": "Root Chakra",
    "description": "Known as the Stone of Commitment. Inspires devotion in relationships and revitalizes depleted bio-energy."
  },
  {
    "id": 30,
    "name": "Premium Faceted Garnet Gem 8MM Luxury Energy Bracelet",
    "price": 1599,
    "originalPrice": 2199,
    "material": "Micro-Faceted Gem-Grade Garnet (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Garnet",
    "image": "/products/garnet-gem-8mm/image-1.webp",
    "images": [
      "/products/garnet-gem-8mm/image-1.webp",
      "/products/garnet-gem-8mm/image-2.webp",
      "/products/garnet-gem-8mm/image-3.webp",
      "/products/garnet-gem-8mm/image-4.webp",
      "/products/garnet-gem-8mm/image-5.webp",
      "/products/garnet-gem-8mm/image-6.webp",
      "/products/garnet-gem-8mm/image-7.webp",
      "/products/garnet-gem-8mm/image-8.webp",
      "/products/garnet-gem-8mm/image-9.webp",
      "/products/garnet-gem-8mm/image-10.webp",
      "/products/garnet-gem-8mm/image-11.webp",
      "/products/garnet-gem-8mm/image-12.webp",
      "/products/garnet-gem-8mm/image-13.webp",
      "/products/garnet-gem-8mm/image-14.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 27,
    "swatches": [
      "#800020",
      "#6b0f1a"
    ],
    "concern": [
      "love",
      "health"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm Gem",
    "zodiac": [
      "Capricorn",
      "Scorpio"
    ],
    "chakra": "Root & Heart Chakra",
    "description": "Luxurious faceted cut refracts blood-red light with royal grace. Ideal for evening wear, romance, and spiritual grounding."
  },
  {
    "id": 31,
    "name": "Lucky Green Aventurine Opportunity Bracelet",
    "price": 999,
    "originalPrice": 1399,
    "material": "Natural Jade-Green Aventurine, Elastic Cord",
    "category": "bracelets",
    "gemstone": "Green Aventurine",
    "image": "/products/green-aventurine-classic/image-1.webp",
    "images": [
      "/products/green-aventurine-classic/image-1.webp",
      "/products/green-aventurine-classic/image-2.webp",
      "/products/green-aventurine-classic/image-3.webp",
      "/products/green-aventurine-classic/image-4.webp",
      "/products/green-aventurine-classic/image-5.webp",
      "/products/green-aventurine-classic/image-6.webp",
      "/products/green-aventurine-classic/image-7.webp",
      "/products/green-aventurine-classic/image-8.webp",
      "/products/green-aventurine-classic/image-9.webp",
      "/products/green-aventurine-classic/image-10.webp",
      "/products/green-aventurine-classic/image-11.webp",
      "/products/green-aventurine-classic/image-12.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 29,
    "swatches": [
      "#2d6a4f",
      "#52b788"
    ],
    "concern": [
      "money",
      "love"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Taurus",
      "Virgo"
    ],
    "chakra": "Heart Chakra",
    "description": "The Premier Stone of Opportunity and luck. Attracts favorable synchronicities, lottery luck, and commercial triumphs."
  },
  {
    "id": 32,
    "name": "Green Aventurine 10MM Prosperity & Growth Bracelet",
    "price": 1299,
    "originalPrice": 1699,
    "material": "Vibrant Green Aventurine (10mm), Elastic",
    "category": "bracelets",
    "gemstone": "Green Aventurine",
    "image": "/products/green-aventurine-10mm/image-1.webp",
    "images": [
      "/products/green-aventurine-10mm/image-1.webp",
      "/products/green-aventurine-10mm/image-2.webp",
      "/products/green-aventurine-10mm/image-3.webp",
      "/products/green-aventurine-10mm/image-4.webp",
      "/products/green-aventurine-10mm/image-5.webp",
      "/products/green-aventurine-10mm/image-6.webp",
      "/products/green-aventurine-10mm/image-7.webp",
      "/products/green-aventurine-10mm/image-8.webp"
    ],
    "badge": "NEW",
    "savePercent": 24,
    "swatches": [
      "#1b4332",
      "#40916c"
    ],
    "concern": [
      "money"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Taurus",
      "Virgo"
    ],
    "chakra": "Heart Chakra",
    "description": "10mm Aventurine beads anchor an expansive mindset of abundance, shielding the heart against financial anxiety."
  },
  {
    "id": 33,
    "name": "Green Aventurine 8MM Good Fortune Bracelet",
    "price": 1099,
    "originalPrice": 1499,
    "material": "Selected Green Aventurine (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Green Aventurine",
    "image": "/products/green-aventurine-8mm/image-1.webp",
    "images": [
      "/products/green-aventurine-8mm/image-1.webp",
      "/products/green-aventurine-8mm/image-2.webp",
      "/products/green-aventurine-8mm/image-3.webp",
      "/products/green-aventurine-8mm/image-4.webp",
      "/products/green-aventurine-8mm/image-5.webp",
      "/products/green-aventurine-8mm/image-6.webp",
      "/products/green-aventurine-8mm/image-7.webp"
    ],
    "badge": "SALE",
    "savePercent": 27,
    "swatches": [
      "#2d6a4f"
    ],
    "concern": [
      "money",
      "health"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Taurus",
      "Virgo"
    ],
    "chakra": "Heart Chakra",
    "description": "Daily talisman for wealth seekers, investors, and anyone undertaking a bold new business venture."
  },
  {
    "id": 34,
    "name": "Maha Mrityunjaya Wellness & Vitality Healing Bracelet",
    "price": 1399,
    "originalPrice": 1899,
    "material": "Bloodstone, Green Jade, Clear Quartz & Carnelian",
    "category": "bracelets",
    "gemstone": "Multi-stone",
    "image": "/products/health-wellness-vitality/image-1.webp",
    "images": [
      "/products/health-wellness-vitality/image-1.webp",
      "/products/health-wellness-vitality/image-2.webp",
      "/products/health-wellness-vitality/image-3.webp",
      "/products/health-wellness-vitality/image-4.webp",
      "/products/health-wellness-vitality/image-5.webp",
      "/products/health-wellness-vitality/image-6.webp",
      "/products/health-wellness-vitality/image-7.webp",
      "/products/health-wellness-vitality/image-8.webp",
      "/products/health-wellness-vitality/image-9.webp",
      "/products/health-wellness-vitality/image-10.webp",
      "/products/health-wellness-vitality/image-11.webp",
      "/products/health-wellness-vitality/image-12.webp",
      "/products/health-wellness-vitality/image-13.webp",
      "/products/health-wellness-vitality/image-14.webp",
      "/products/health-wellness-vitality/image-15.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 26,
    "swatches": [
      "#2e7d32",
      "#81c784",
      "#f5f5f5",
      "#d94e24"
    ],
    "concern": [
      "health"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "All Signs"
    ],
    "chakra": "Heart, Root & Solar Plexus",
    "description": "Vedic healing blend designed to strengthen cellular vitality, accelerate recovery from fatigue, and detoxify the physical vessel."
  },
  {
    "id": 35,
    "name": "Radiant Golden Sun Citrine Bracelet",
    "price": 1099,
    "originalPrice": 1499,
    "material": "Golden Madeira Citrine, Elastic Cord",
    "category": "bracelets",
    "gemstone": "Citrine",
    "image": "/products/heated-citrine-classic/image-1.webp",
    "images": [
      "/products/heated-citrine-classic/image-1.webp",
      "/products/heated-citrine-classic/image-2.webp",
      "/products/heated-citrine-classic/image-3.webp",
      "/products/heated-citrine-classic/image-4.webp",
      "/products/heated-citrine-classic/image-5.webp",
      "/products/heated-citrine-classic/image-6.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 27,
    "swatches": [
      "#e67e22",
      "#d35400"
    ],
    "concern": [
      "money"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Leo",
      "Gemini"
    ],
    "chakra": "Solar Plexus Chakra",
    "description": "Warm golden-amber hues radiate cheerful enthusiasm and manifest new professional opportunities with ease."
  },
  {
    "id": 36,
    "name": "Golden Sun Citrine 10MM Solar Energy Bracelet",
    "price": 1399,
    "originalPrice": 1799,
    "material": "Warm Honey Citrine (10mm), Strong Cord",
    "category": "bracelets",
    "gemstone": "Citrine",
    "image": "/products/heated-citrine-10mm/image-1.webp",
    "images": [
      "/products/heated-citrine-10mm/image-1.webp",
      "/products/heated-citrine-10mm/image-2.webp",
      "/products/heated-citrine-10mm/image-3.webp",
      "/products/heated-citrine-10mm/image-4.webp",
      "/products/heated-citrine-10mm/image-5.webp",
      "/products/heated-citrine-10mm/image-6.webp",
      "/products/heated-citrine-10mm/image-7.webp"
    ],
    "badge": "NEW",
    "savePercent": 22,
    "swatches": [
      "#d35400",
      "#e67e22"
    ],
    "concern": [
      "money"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Leo"
    ],
    "chakra": "Solar Plexus Chakra",
    "description": "Bold 10mm golden beads provide a continuous solar recharge, eradicating lethargy and self-doubt."
  },
  {
    "id": 37,
    "name": "Golden Sun Citrine 8MM Radiance & Success Bracelet",
    "price": 1199,
    "originalPrice": 1599,
    "material": "Sun-Kissed Amber Citrine (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Citrine",
    "image": "/products/heated-citrine-8mm/image-1.webp",
    "images": [
      "/products/heated-citrine-8mm/image-1.webp",
      "/products/heated-citrine-8mm/image-2.webp",
      "/products/heated-citrine-8mm/image-3.webp",
      "/products/heated-citrine-8mm/image-4.webp",
      "/products/heated-citrine-8mm/image-5.webp",
      "/products/heated-citrine-8mm/image-6.webp",
      "/products/heated-citrine-8mm/image-7.webp"
    ],
    "badge": "SALE",
    "savePercent": 25,
    "swatches": [
      "#e67e22"
    ],
    "concern": [
      "money",
      "peace"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Leo",
      "Sagittarius"
    ],
    "chakra": "Solar Plexus Chakra",
    "description": "Brings the warmth of midsummer sunlight to your wrist, promoting joyful abundance and steady financial growth."
  },
  {
    "id": 38,
    "name": "Royal Lapis Lazuli Sovereign Wisdom Bracelet",
    "price": 1299,
    "originalPrice": 1799,
    "material": "Natural Afghan Lapis Lazuli with Gold Pyrite Specks",
    "category": "bracelets",
    "gemstone": "Lapis Lazuli",
    "image": "/products/lapis-lazuli-classic/image-1.webp",
    "images": [
      "/products/lapis-lazuli-classic/image-1.webp",
      "/products/lapis-lazuli-classic/image-2.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 28,
    "swatches": [
      "#1d3557",
      "#c8a951"
    ],
    "concern": [
      "peace",
      "protection"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Sagittarius",
      "Libra"
    ],
    "chakra": "Throat & Third Eye Chakra",
    "description": "The sacred stone of ancient Pharaohs and celestial seers. Stimulates clear speech, honest communication, and profound insight."
  },
  {
    "id": 39,
    "name": "Celestial Lapis Lazuli 10MM Inner Truth Bracelet",
    "price": 1699,
    "originalPrice": 2299,
    "material": "Deep Ultramarine Lapis (10mm), Pyrite Flecked",
    "category": "bracelets",
    "gemstone": "Lapis Lazuli",
    "image": "/products/lapis-lazuli-10mm/image-1.webp",
    "images": [
      "/products/lapis-lazuli-10mm/image-1.webp",
      "/products/lapis-lazuli-10mm/image-2.webp",
      "/products/lapis-lazuli-10mm/image-3.webp",
      "/products/lapis-lazuli-10mm/image-4.webp",
      "/products/lapis-lazuli-10mm/image-5.webp",
      "/products/lapis-lazuli-10mm/image-6.webp",
      "/products/lapis-lazuli-10mm/image-7.webp"
    ],
    "badge": "NEW",
    "savePercent": 26,
    "swatches": [
      "#03045e",
      "#c8a951"
    ],
    "concern": [
      "peace"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Sagittarius"
    ],
    "chakra": "Throat & Third Eye",
    "description": "Rich royal blue 10mm beads with shimmering natural pyrite crystals provide an aura of undeniable dignity and poise."
  },
  {
    "id": 40,
    "name": "Celestial Lapis Lazuli 8MM Insight & Vision Bracelet",
    "price": 1399,
    "originalPrice": 1899,
    "material": "Grade-A Lapis Lazuli (8mm), Stretch Cord",
    "category": "bracelets",
    "gemstone": "Lapis Lazuli",
    "image": "/products/lapis-lazuli-8mm/image-1.webp",
    "images": [
      "/products/lapis-lazuli-8mm/image-1.webp",
      "/products/lapis-lazuli-8mm/image-2.webp",
      "/products/lapis-lazuli-8mm/image-3.webp",
      "/products/lapis-lazuli-8mm/image-4.webp"
    ],
    "badge": null,
    "savePercent": 26,
    "swatches": [
      "#1d3557"
    ],
    "concern": [
      "peace",
      "protection"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Sagittarius",
      "Libra"
    ],
    "chakra": "Throat Chakra",
    "description": "Connects intellectual discernment with spiritual understanding, liberating the voice from stage fright and anxiety."
  },
  {
    "id": 41,
    "name": "Grounding Mahogany Obsidian Earth Shield Bracelet",
    "price": 1099,
    "originalPrice": 1499,
    "material": "Natural Volcanic Mahogany Obsidian, Elastic",
    "category": "bracelets",
    "gemstone": "Mahogany Obsidian",
    "image": "/products/mahogany-obsidian-classic/image-1.webp",
    "images": [
      "/products/mahogany-obsidian-classic/image-1.webp",
      "/products/mahogany-obsidian-classic/image-2.webp",
      "/products/mahogany-obsidian-classic/image-3.webp",
      "/products/mahogany-obsidian-classic/image-4.webp",
      "/products/mahogany-obsidian-classic/image-5.webp"
    ],
    "badge": null,
    "savePercent": 27,
    "swatches": [
      "#3d0c02",
      "#1a1a1a"
    ],
    "concern": [
      "protection"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Scorpio",
      "Sagittarius"
    ],
    "chakra": "Root & Sacral Chakra",
    "description": "Rich reddish-brown volcanic glass balances fierce protection with gentle, nurturing earth grounding."
  },
  {
    "id": 42,
    "name": "Mahogany Obsidian 10MM Strength & Release Bracelet",
    "price": 1399,
    "originalPrice": 1799,
    "material": "Deep Brown-Black Obsidian (10mm), Elastic",
    "category": "bracelets",
    "gemstone": "Mahogany Obsidian",
    "image": "/products/mahogany-obsidian-10mm/image-1.webp",
    "images": [
      "/products/mahogany-obsidian-10mm/image-1.webp",
      "/products/mahogany-obsidian-10mm/image-2.webp",
      "/products/mahogany-obsidian-10mm/image-3.webp",
      "/products/mahogany-obsidian-10mm/image-4.webp",
      "/products/mahogany-obsidian-10mm/image-5.webp"
    ],
    "badge": "NEW",
    "savePercent": 22,
    "swatches": [
      "#2b0900",
      "#111111"
    ],
    "concern": [
      "protection"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Scorpio"
    ],
    "chakra": "Root Chakra",
    "description": "10mm grounding beads pull excessive mental chatter down into the earth, relieving chronic emotional exhaustion."
  },
  {
    "id": 43,
    "name": "Mahogany Obsidian 8MM Gentle Protection Bracelet",
    "price": 1199,
    "originalPrice": 1599,
    "material": "Polished Mahogany Obsidian (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Mahogany Obsidian",
    "image": "/products/mahogany-obsidian-8mm/image-1.webp",
    "images": [
      "/products/mahogany-obsidian-8mm/image-1.webp",
      "/products/mahogany-obsidian-8mm/image-2.webp",
      "/products/mahogany-obsidian-8mm/image-3.webp",
      "/products/mahogany-obsidian-8mm/image-4.webp",
      "/products/mahogany-obsidian-8mm/image-5.webp"
    ],
    "badge": "SALE",
    "savePercent": 25,
    "swatches": [
      "#3d0c02"
    ],
    "concern": [
      "protection"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Scorpio",
      "Sagittarius"
    ],
    "chakra": "Root Chakra",
    "description": "Assists with severing karmic ties and attachments while protecting against psychic invasions."
  },
  {
    "id": 44,
    "name": "Multi-Gemstone Cosmic Harmony Rainbow Bracelet",
    "price": 1399,
    "originalPrice": 1899,
    "material": "Amethyst, Rose Quartz, Citrine, Aventurine, Lapis & Tiger Eye",
    "category": "bracelets",
    "gemstone": "Multi-stone",
    "image": "/products/multi-gemstone-harmony/image-1.webp",
    "images": [
      "/products/multi-gemstone-harmony/image-1.webp",
      "/products/multi-gemstone-harmony/image-2.webp",
      "/products/multi-gemstone-harmony/image-3.webp",
      "/products/multi-gemstone-harmony/image-4.webp",
      "/products/multi-gemstone-harmony/image-5.webp",
      "/products/multi-gemstone-harmony/image-6.webp",
      "/products/multi-gemstone-harmony/image-7.webp",
      "/products/multi-gemstone-harmony/image-8.webp",
      "/products/multi-gemstone-harmony/image-9.webp",
      "/products/multi-gemstone-harmony/image-10.webp",
      "/products/multi-gemstone-harmony/image-11.webp",
      "/products/multi-gemstone-harmony/image-12.webp",
      "/products/multi-gemstone-harmony/image-13.webp",
      "/products/multi-gemstone-harmony/image-14.webp",
      "/products/multi-gemstone-harmony/image-15.webp",
      "/products/multi-gemstone-harmony/image-16.webp",
      "/products/multi-gemstone-harmony/image-17.webp",
      "/products/multi-gemstone-harmony/image-18.webp",
      "/products/multi-gemstone-harmony/image-19.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 26,
    "swatches": [
      "#9c27b0",
      "#e91e63",
      "#ffeb3b",
      "#4caf50",
      "#2196f3"
    ],
    "concern": [
      "peace",
      "love",
      "money",
      "protection",
      "health"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "All Signs"
    ],
    "chakra": "All 7 Chakras",
    "description": "A complete spectrum of crystalline harmony. Aligns the bio-energetic meridians from root to crown in complete balance."
  },
  {
    "id": 45,
    "name": "Rare Untreated Natural Kundalini Citrine Bracelet",
    "price": 1699,
    "originalPrice": 2299,
    "material": "100% Earth-Mined Natural Citrine, Elastic",
    "category": "bracelets",
    "gemstone": "Natural Citrine",
    "image": "/products/natural-citrine-classic/image-1.webp",
    "images": [
      "/products/natural-citrine-classic/image-1.webp",
      "/products/natural-citrine-classic/image-2.webp",
      "/products/natural-citrine-classic/image-3.webp",
      "/products/natural-citrine-classic/image-4.webp",
      "/products/natural-citrine-classic/image-5.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 26,
    "swatches": [
      "#d4af37",
      "#f4d03f"
    ],
    "concern": [
      "money"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Leo",
      "Gemini"
    ],
    "chakra": "Solar Plexus Chakra",
    "description": "Pure untreated Kundalini Citrine from the Congo. Smoky golden hues signify authentic geological genesis, free of thermal treatment."
  },
  {
    "id": 46,
    "name": "Natural Kundalini Citrine 10MM Pure Wealth Magnet Bracelet",
    "price": 2199,
    "originalPrice": 2899,
    "material": "Untreated Geological Citrine (10mm), Elastic",
    "category": "bracelets",
    "gemstone": "Natural Citrine",
    "image": "/products/natural-citrine-10mm/image-1.webp",
    "images": [
      "/products/natural-citrine-10mm/image-1.webp",
      "/products/natural-citrine-10mm/image-2.webp",
      "/products/natural-citrine-10mm/image-3.webp",
      "/products/natural-citrine-10mm/image-4.webp",
      "/products/natural-citrine-10mm/image-5.webp",
      "/products/natural-citrine-10mm/image-6.webp",
      "/products/natural-citrine-10mm/image-7.webp",
      "/products/natural-citrine-10mm/image-8.webp",
      "/products/natural-citrine-10mm/image-9.webp"
    ],
    "badge": "NEW",
    "savePercent": 24,
    "swatches": [
      "#c59b27",
      "#e5c07b"
    ],
    "concern": [
      "money"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Leo",
      "Gemini"
    ],
    "chakra": "Solar Plexus Chakra",
    "description": "Rare collector's grade 10mm spheres of genuine untreated Citrine. The definitive physical anchor for monumental abundance."
  },
  {
    "id": 47,
    "name": "Natural Kundalini Citrine 8MM Manifestation Bracelet",
    "price": 1799,
    "originalPrice": 2399,
    "material": "Natural Earth-Grown Citrine (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Natural Citrine",
    "image": "/products/natural-citrine-8mm/image-1.webp",
    "images": [
      "/products/natural-citrine-8mm/image-1.webp",
      "/products/natural-citrine-8mm/image-2.webp",
      "/products/natural-citrine-8mm/image-3.webp",
      "/products/natural-citrine-8mm/image-4.webp",
      "/products/natural-citrine-8mm/image-5.webp",
      "/products/natural-citrine-8mm/image-6.webp",
      "/products/natural-citrine-8mm/image-7.webp",
      "/products/natural-citrine-8mm/image-8.webp"
    ],
    "badge": "SALE",
    "savePercent": 25,
    "swatches": [
      "#d4af37"
    ],
    "concern": [
      "money"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Leo",
      "Gemini"
    ],
    "chakra": "Solar Plexus Chakra",
    "description": "Holds the pure vibration of golden sunlight trapped in crystalline quartz over millions of years."
  },
  {
    "id": 48,
    "name": "Golden Pyrite Iron Sun Wealth Armor Bracelet",
    "price": 1199,
    "originalPrice": 1599,
    "material": "Peruvian Natural Pyrite Spheres, Elastic",
    "category": "bracelets",
    "gemstone": "Pyrite",
    "image": "/products/pyrite-classic/image-1.webp",
    "images": [
      "/products/pyrite-classic/image-1.webp",
      "/products/pyrite-classic/image-2.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 25,
    "swatches": [
      "#c8a951",
      "#b8973d"
    ],
    "concern": [
      "money",
      "protection"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Leo",
      "Capricorn"
    ],
    "chakra": "Solar Plexus Chakra",
    "description": "Known as Fool's Gold, this metallic mineral possesses fierce masculine sun energy. Blocks financial leaks and attracts sudden wealth."
  },
  {
    "id": 49,
    "name": "Golden Pyrite 10MM Abundance & Wealth Magnet Bracelet",
    "price": 1599,
    "originalPrice": 2099,
    "material": "Dense Metallic Pyrite (10mm), Heavy Duty Cord",
    "category": "bracelets",
    "gemstone": "Pyrite",
    "image": "/products/pyrite-10mm/image-1.webp",
    "images": [
      "/products/pyrite-10mm/image-1.webp",
      "/products/pyrite-10mm/image-2.webp",
      "/products/pyrite-10mm/image-3.webp",
      "/products/pyrite-10mm/image-4.webp",
      "/products/pyrite-10mm/image-5.webp",
      "/products/pyrite-10mm/image-6.webp"
    ],
    "badge": "NEW",
    "savePercent": 24,
    "swatches": [
      "#a5762a",
      "#c8a951"
    ],
    "concern": [
      "money",
      "protection"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Leo",
      "Capricorn"
    ],
    "chakra": "Solar Plexus Chakra",
    "description": "Heavy, weighty 10mm Pyrite beads instill an unshakeable aura of authority, financial abundance, and leadership prowess."
  },
  {
    "id": 50,
    "name": "Golden Pyrite 8MM Prosperity & Solar Power Bracelet",
    "price": 1299,
    "originalPrice": 1699,
    "material": "High-Grade Peruvian Pyrite (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Pyrite",
    "image": "/products/pyrite-8mm/image-1.webp",
    "images": [
      "/products/pyrite-8mm/image-1.webp",
      "/products/pyrite-8mm/image-2.webp",
      "/products/pyrite-8mm/image-3.webp",
      "/products/pyrite-8mm/image-4.webp",
      "/products/pyrite-8mm/image-5.webp",
      "/products/pyrite-8mm/image-6.webp"
    ],
    "badge": "SALE",
    "savePercent": 24,
    "swatches": [
      "#c8a951"
    ],
    "concern": [
      "money"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Leo"
    ],
    "chakra": "Solar Plexus Chakra",
    "description": "Essential gemstone remedy for entrepreneurs and professionals seeking to break through financial ceilings."
  },
  {
    "id": 51,
    "name": "Sacred Red Jasper Supreme Nurturer Bracelet",
    "price": 999,
    "originalPrice": 1399,
    "material": "Deep Terracotta Red Jasper, Elastic Cord",
    "category": "bracelets",
    "gemstone": "Red Jasper",
    "image": "/products/red-jasper-classic/image-1.webp",
    "images": [
      "/products/red-jasper-classic/image-1.webp",
      "/products/red-jasper-classic/image-2.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 29,
    "swatches": [
      "#a03020",
      "#c0392b"
    ],
    "concern": [
      "health"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Aries",
      "Scorpio"
    ],
    "chakra": "Root Chakra",
    "description": "Ancient warrior talisman. Grounding and stabilizing, providing quiet strength in emotional crisis and sustaining physical stamina."
  },
  {
    "id": 52,
    "name": "Red Jasper 10MM Earth Grounding & Stamina Bracelet",
    "price": 1299,
    "originalPrice": 1699,
    "material": "Dense Red Jasper Beads (10mm), Elastic",
    "category": "bracelets",
    "gemstone": "Red Jasper",
    "image": "/products/red-jasper-10mm/image-1.webp",
    "images": [
      "/products/red-jasper-10mm/image-1.webp",
      "/products/red-jasper-10mm/image-2.webp",
      "/products/red-jasper-10mm/image-3.webp",
      "/products/red-jasper-10mm/image-4.webp",
      "/products/red-jasper-10mm/image-5.webp"
    ],
    "badge": "NEW",
    "savePercent": 24,
    "swatches": [
      "#872314",
      "#a03020"
    ],
    "concern": [
      "health"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Aries",
      "Scorpio"
    ],
    "chakra": "Root Chakra",
    "description": "10mm earthy beads reconnect the subtle body directly to Mother Earth, dispersing inertia and self-defeating patterns."
  },
  {
    "id": 53,
    "name": "Red Jasper 8MM Physical Endurance & Courage Bracelet",
    "price": 1099,
    "originalPrice": 1499,
    "material": "Selected Red Jasper (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Red Jasper",
    "image": "/products/red-jasper-8mm/image-1.webp",
    "images": [
      "/products/red-jasper-8mm/image-1.webp",
      "/products/red-jasper-8mm/image-2.webp",
      "/products/red-jasper-8mm/image-3.webp",
      "/products/red-jasper-8mm/image-4.webp",
      "/products/red-jasper-8mm/image-5.webp",
      "/products/red-jasper-8mm/image-6.webp",
      "/products/red-jasper-8mm/image-7.webp",
      "/products/red-jasper-8mm/image-8.webp"
    ],
    "badge": null,
    "savePercent": 27,
    "swatches": [
      "#a03020"
    ],
    "concern": [
      "health"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Aries"
    ],
    "chakra": "Root Chakra",
    "description": "Awakens Kundalini serpent energy safely at the base of the spine, fueling healthy ambition and stamina."
  },
  {
    "id": 54,
    "name": "Sacred Inca Rose Rhodochrosite 8MM Divine Love Bracelet",
    "price": 1899,
    "originalPrice": 2499,
    "material": "Natural Pink Argentinian Rhodochrosite (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Rhodochrosite",
    "image": "/products/rhodochrosite-8mm/image-1.webp",
    "images": [
      "/products/rhodochrosite-8mm/image-1.webp",
      "/products/rhodochrosite-8mm/image-2.webp",
      "/products/rhodochrosite-8mm/image-3.webp",
      "/products/rhodochrosite-8mm/image-4.webp",
      "/products/rhodochrosite-8mm/image-5.webp",
      "/products/rhodochrosite-8mm/image-6.webp",
      "/products/rhodochrosite-8mm/image-7.webp",
      "/products/rhodochrosite-8mm/image-8.webp",
      "/products/rhodochrosite-8mm/image-9.webp",
      "/products/rhodochrosite-8mm/image-10.webp",
      "/products/rhodochrosite-8mm/image-11.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 24,
    "swatches": [
      "#e056fd",
      "#ff7979",
      "#f6e58d"
    ],
    "concern": [
      "love",
      "peace"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Leo",
      "Scorpio"
    ],
    "chakra": "Heart & Solar Plexus",
    "description": "The national gemstone of Argentina with raspberry pink banding. Heals deep inner-child wounds, dissolves grief, and magnetizes soulmate connections."
  },
  {
    "id": 55,
    "name": "Rhodonite 10MM Emotional Rescue & Forgiveness Bracelet",
    "price": 1499,
    "originalPrice": 1999,
    "material": "Rose-Pink & Black Dendritic Rhodonite (10mm), Elastic",
    "category": "bracelets",
    "gemstone": "Rhodonite",
    "image": "/products/rhodonite-10mm/image-1.webp",
    "images": [
      "/products/rhodonite-10mm/image-1.webp",
      "/products/rhodonite-10mm/image-2.webp",
      "/products/rhodonite-10mm/image-3.webp",
      "/products/rhodonite-10mm/image-4.webp",
      "/products/rhodonite-10mm/image-5.webp",
      "/products/rhodonite-10mm/image-6.webp",
      "/products/rhodonite-10mm/image-7.webp"
    ],
    "badge": "NEW",
    "savePercent": 25,
    "swatches": [
      "#c2185b",
      "#212121"
    ],
    "concern": [
      "love",
      "peace"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Taurus"
    ],
    "chakra": "Heart Chakra",
    "description": "Features captivating black manganese inclusions that ground emotional shock, panic, and heartbreaks."
  },
  {
    "id": 56,
    "name": "Rhodonite 8MM Heart Clearing & Compassion Bracelet",
    "price": 1299,
    "originalPrice": 1699,
    "material": "Natural Pink Rhodonite (8mm), Stretch String",
    "category": "bracelets",
    "gemstone": "Rhodonite",
    "image": "/products/rhodonite-8mm/image-1.webp",
    "images": [
      "/products/rhodonite-8mm/image-1.webp",
      "/products/rhodonite-8mm/image-2.webp",
      "/products/rhodonite-8mm/image-3.webp",
      "/products/rhodonite-8mm/image-4.webp",
      "/products/rhodonite-8mm/image-5.webp",
      "/products/rhodonite-8mm/image-6.webp",
      "/products/rhodonite-8mm/image-7.webp",
      "/products/rhodonite-8mm/image-8.webp"
    ],
    "badge": "SALE",
    "savePercent": 24,
    "swatches": [
      "#c2185b",
      "#f48fb1"
    ],
    "concern": [
      "love"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Taurus"
    ],
    "chakra": "Heart Chakra",
    "description": "Fosters self-worth, emotional maturity, and the grace to forgive past relationship betrayals."
  },
  {
    "id": 57,
    "name": "Madagascar Rose Quartz Unconditional Love Bracelet",
    "price": 1099,
    "originalPrice": 1499,
    "material": "Soft Pink Madagascar Rose Quartz, Elastic",
    "category": "bracelets",
    "gemstone": "Rose Quartz",
    "image": "/products/rose-quartz-classic/image-1.webp",
    "images": [
      "/products/rose-quartz-classic/image-1.webp",
      "/products/rose-quartz-classic/image-2.webp",
      "/products/rose-quartz-classic/image-3.webp",
      "/products/rose-quartz-classic/image-4.webp",
      "/products/rose-quartz-classic/image-5.webp",
      "/products/rose-quartz-classic/image-6.webp",
      "/products/rose-quartz-classic/image-7.webp",
      "/products/rose-quartz-classic/image-8.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 27,
    "swatches": [
      "#f48fb1",
      "#f8bbd9"
    ],
    "concern": [
      "love",
      "peace"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Taurus",
      "Libra"
    ],
    "chakra": "Heart Chakra",
    "description": "The quintessential stone of unconditional love. Opens the heart to receive romance, friendship, and profound self-worth."
  },
  {
    "id": 58,
    "name": "Madagascar Rose Quartz 10MM Emotional Healing Bracelet",
    "price": 1399,
    "originalPrice": 1799,
    "material": "Translucent Pink Rose Quartz (10mm), Strong Elastic",
    "category": "bracelets",
    "gemstone": "Rose Quartz",
    "image": "/products/rose-quartz-10mm/image-1.webp",
    "images": [
      "/products/rose-quartz-10mm/image-1.webp"
    ],
    "badge": "NEW",
    "savePercent": 22,
    "swatches": [
      "#f48fb1"
    ],
    "concern": [
      "love"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Taurus",
      "Libra"
    ],
    "chakra": "Heart Chakra",
    "description": "Luminous 10mm pink spheres transmit soothing frequencies that melt emotional ice and invite tender affection."
  },
  {
    "id": 59,
    "name": "Madagascar Rose Quartz 8MM Loving Grace Bracelet",
    "price": 1199,
    "originalPrice": 1599,
    "material": "Grade-A Rose Quartz Spheres (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Rose Quartz",
    "image": "/products/rose-quartz-8mm/image-1.webp",
    "images": [
      "/products/rose-quartz-8mm/image-1.webp",
      "/products/rose-quartz-8mm/image-2.webp",
      "/products/rose-quartz-8mm/image-3.webp",
      "/products/rose-quartz-8mm/image-4.webp",
      "/products/rose-quartz-8mm/image-5.webp",
      "/products/rose-quartz-8mm/image-6.webp",
      "/products/rose-quartz-8mm/image-7.webp",
      "/products/rose-quartz-8mm/image-8.webp",
      "/products/rose-quartz-8mm/image-9.webp"
    ],
    "badge": "SALE",
    "savePercent": 25,
    "swatches": [
      "#f48fb1",
      "#fce4ec"
    ],
    "concern": [
      "love"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Taurus",
      "Libra"
    ],
    "chakra": "Heart Chakra",
    "description": "A must-have foundational crystal. Radiates gentleness and tenderness across all interpersonal relationships."
  },
  {
    "id": 60,
    "name": "Divine Light Selenite Lunar Cleansing Bracelet",
    "price": 999,
    "originalPrice": 1399,
    "material": "Silky White Moroccan Selenite (Gypsum), Elastic",
    "category": "bracelets",
    "gemstone": "Selenite",
    "image": "/products/selenite-classic/image-1.webp",
    "images": [
      "/products/selenite-classic/image-1.webp",
      "/products/selenite-classic/image-2.webp",
      "/products/selenite-classic/image-3.webp",
      "/products/selenite-classic/image-4.webp",
      "/products/selenite-classic/image-5.webp",
      "/products/selenite-classic/image-6.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 29,
    "swatches": [
      "#ffffff",
      "#f5f5f5"
    ],
    "concern": [
      "peace",
      "protection"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Cancer",
      "Taurus"
    ],
    "chakra": "Crown & Third Eye",
    "description": "Named after Selene, the Greek Moon Goddess. Holds liquid white light frequency, automatically purifying the other crystals on your wrist."
  },
  {
    "id": 61,
    "name": "White Satin Selenite 10MM Angelic Ray Bracelet",
    "price": 1299,
    "originalPrice": 1699,
    "material": "Satin Spar Selenite (10mm), Elastic Cord",
    "category": "bracelets",
    "gemstone": "Selenite",
    "image": "/products/selenite-10mm/image-1.webp",
    "images": [
      "/products/selenite-10mm/image-1.webp",
      "/products/selenite-10mm/image-2.webp",
      "/products/selenite-10mm/image-3.webp",
      "/products/selenite-10mm/image-4.webp"
    ],
    "badge": "NEW",
    "savePercent": 24,
    "swatches": [
      "#ffffff"
    ],
    "concern": [
      "peace"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Cancer"
    ],
    "chakra": "Crown Chakra",
    "description": "10mm luminous spheres of fiber-optic Selenite connect your consciousness with angelic guidance and higher wisdom."
  },
  {
    "id": 62,
    "name": "White Satin Selenite 8MM Moonbeam Purifying Bracelet",
    "price": 1099,
    "originalPrice": 1499,
    "material": "Selected Selenite Gypsum (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Selenite",
    "image": "/products/selenite-8mm/image-1.webp",
    "images": [
      "/products/selenite-8mm/image-1.webp",
      "/products/selenite-8mm/image-2.webp",
      "/products/selenite-8mm/image-3.webp",
      "/products/selenite-8mm/image-4.webp"
    ],
    "badge": "SALE",
    "savePercent": 27,
    "swatches": [
      "#ffffff",
      "#fafafa"
    ],
    "concern": [
      "peace",
      "protection"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Cancer"
    ],
    "chakra": "Crown Chakra",
    "description": "Provides instant relief from energetic heaviness after crowded social events or taxing meetings."
  },
  {
    "id": 63,
    "name": "Mystical Sulemani Hakik 8MM Nazar Suraksha Bracelet",
    "price": 1199,
    "originalPrice": 1599,
    "material": "Natural Sulemani Agate (8mm), Durable Cord",
    "category": "bracelets",
    "gemstone": "Sulemani Hakik",
    "image": "/products/sulemani-hakik-8mm/image-1.webp",
    "images": [
      "/products/sulemani-hakik-8mm/image-1.webp",
      "/products/sulemani-hakik-8mm/image-2.webp",
      "/products/sulemani-hakik-8mm/image-3.webp",
      "/products/sulemani-hakik-8mm/image-4.webp",
      "/products/sulemani-hakik-8mm/image-5.webp",
      "/products/sulemani-hakik-8mm/image-6.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 25,
    "swatches": [
      "#212121",
      "#757575"
    ],
    "concern": [
      "protection"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Capricorn",
      "Aquarius"
    ],
    "chakra": "Root Chakra",
    "description": "Ancient Vedic protection amulet against Evil Eye (Buri Nazar), psychic envy, and dark planetary afflictions."
  },
  {
    "id": 64,
    "name": "Classic Sulemani Hakik Evil Eye Ward Bracelet",
    "price": 1099,
    "originalPrice": 1499,
    "material": "Black & Grey Banded Agate, Elastic",
    "category": "bracelets",
    "gemstone": "Sulemani Hakik",
    "image": "/products/sulemani-hakik-classic/image-1.webp",
    "images": [
      "/products/sulemani-hakik-classic/image-1.webp",
      "/products/sulemani-hakik-classic/image-2.webp",
      "/products/sulemani-hakik-classic/image-3.webp",
      "/products/sulemani-hakik-classic/image-4.webp",
      "/products/sulemani-hakik-classic/image-5.webp",
      "/products/sulemani-hakik-classic/image-6.webp",
      "/products/sulemani-hakik-classic/image-7.webp"
    ],
    "badge": "SALE",
    "savePercent": 27,
    "swatches": [
      "#1a1a1a",
      "#9e9e9e"
    ],
    "concern": [
      "protection"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Capricorn"
    ],
    "chakra": "Root Chakra",
    "description": "Neutralizes planetary malefic effects of Rahu and Ketu, creating a stable mental anchor during challenging transits."
  },
  {
    "id": 65,
    "name": "Sulemani Hakik 10MM Rahu-Ketu Pacifying Bracelet",
    "price": 1499,
    "originalPrice": 1999,
    "material": "Heavy Banded Sulemani Agate (10mm), Elastic",
    "category": "bracelets",
    "gemstone": "Sulemani Hakik",
    "image": "/products/sulemani-hakik-10mm/image-1.webp",
    "images": [
      "/products/sulemani-hakik-10mm/image-1.webp",
      "/products/sulemani-hakik-10mm/image-2.webp",
      "/products/sulemani-hakik-10mm/image-3.webp",
      "/products/sulemani-hakik-10mm/image-4.webp",
      "/products/sulemani-hakik-10mm/image-5.webp",
      "/products/sulemani-hakik-10mm/image-6.webp",
      "/products/sulemani-hakik-10mm/image-7.webp",
      "/products/sulemani-hakik-10mm/image-8.webp"
    ],
    "badge": "NEW",
    "savePercent": 25,
    "swatches": [
      "#000000",
      "#616161"
    ],
    "concern": [
      "protection"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Capricorn",
      "Aquarius"
    ],
    "chakra": "Root Chakra",
    "description": "Robust 10mm agate beads with natural geological banding, absorbing heavy negative energies from your surroundings."
  },
  {
    "id": 66,
    "name": "Rare Red Sulemani Hakik 10MM Courage & Shield Bracelet",
    "price": 1599,
    "originalPrice": 2199,
    "material": "Natural Red Banded Agate (10mm), Elastic",
    "category": "bracelets",
    "gemstone": "Sulemani Hakik",
    "image": "/products/sulemani-hakik-red-10mm/image-1.webp",
    "images": [
      "/products/sulemani-hakik-red-10mm/image-1.webp",
      "/products/sulemani-hakik-red-10mm/image-2.webp",
      "/products/sulemani-hakik-red-10mm/image-3.webp",
      "/products/sulemani-hakik-red-10mm/image-4.webp",
      "/products/sulemani-hakik-red-10mm/image-5.webp"
    ],
    "badge": "NEW",
    "savePercent": 27,
    "swatches": [
      "#8b0000",
      "#d32f2f"
    ],
    "concern": [
      "protection",
      "health"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Aries",
      "Scorpio"
    ],
    "chakra": "Root & Sacral Chakra",
    "description": "Rare red-hued Sulemani Agate spheres combine warrior courage with impenetrable occult shielding."
  },
  {
    "id": 67,
    "name": "Sparkling Sunstone Solar Leadership Bracelet",
    "price": 1299,
    "originalPrice": 1699,
    "material": "Natural Oregon-Style Aventurine Sunstone, Elastic",
    "category": "bracelets",
    "gemstone": "Sunstone",
    "image": "/products/sunstone-classic/image-1.webp",
    "images": [
      "/products/sunstone-classic/image-1.webp",
      "/products/sunstone-classic/image-2.webp",
      "/products/sunstone-classic/image-3.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 24,
    "swatches": [
      "#e67e22",
      "#f39c12"
    ],
    "concern": [
      "money",
      "love"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Leo",
      "Libra"
    ],
    "chakra": "Sacral & Solar Plexus",
    "description": "Infused with golden hematite or copper platelets that shimmer under sunlight, awakening leadership magnetism and boundless vitality."
  },
  {
    "id": 68,
    "name": "Golden Sunstone 10MM Sovereign Charisma Bracelet",
    "price": 1599,
    "originalPrice": 2099,
    "material": "Shimmering Sunstone Spheres (10mm), Elastic",
    "category": "bracelets",
    "gemstone": "Sunstone",
    "image": "/products/sunstone-10mm/image-1.webp",
    "images": [
      "/products/sunstone-10mm/image-1.webp",
      "/products/sunstone-10mm/image-2.webp",
      "/products/sunstone-10mm/image-3.webp",
      "/products/sunstone-10mm/image-4.webp",
      "/products/sunstone-10mm/image-5.webp",
      "/products/sunstone-10mm/image-6.webp"
    ],
    "badge": "NEW",
    "savePercent": 24,
    "swatches": [
      "#d35400",
      "#f39c12"
    ],
    "concern": [
      "money"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Leo"
    ],
    "chakra": "Solar Plexus Chakra",
    "description": "10mm golden solar beads boost masculine Yang energy, career authority, and authentic stage presence."
  },
  {
    "id": 69,
    "name": "Golden Sunstone 8MM Joy & Pranic Radiance Bracelet",
    "price": 1399,
    "originalPrice": 1799,
    "material": "Polished Natural Sunstone (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Sunstone",
    "image": "/products/sunstone-8mm/image-1.webp",
    "images": [
      "/products/sunstone-8mm/image-1.webp",
      "/products/sunstone-8mm/image-2.webp",
      "/products/sunstone-8mm/image-3.webp",
      "/products/sunstone-8mm/image-4.webp",
      "/products/sunstone-8mm/image-5.webp",
      "/products/sunstone-8mm/image-6.webp"
    ],
    "badge": "SALE",
    "savePercent": 22,
    "swatches": [
      "#e67e22"
    ],
    "concern": [
      "money",
      "love"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Leo",
      "Libra"
    ],
    "chakra": "Sacral & Solar Plexus",
    "description": "Dispels seasonal affective melancholy and codependency, encouraging you to shine your authentic light unapologetically."
  },
  {
    "id": 70,
    "name": "Golden Tiger Eye Fearless Action Bracelet",
    "price": 1099,
    "originalPrice": 1499,
    "material": "Chatoyant Golden-Brown Tiger Eye, Elastic",
    "category": "bracelets",
    "gemstone": "Tiger Eye",
    "image": "/products/tiger-eye-classic/image-1.webp",
    "images": [
      "/products/tiger-eye-classic/image-1.webp",
      "/products/tiger-eye-classic/image-2.webp",
      "/products/tiger-eye-classic/image-3.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 27,
    "swatches": [
      "#8b6914",
      "#c8a951"
    ],
    "concern": [
      "money",
      "protection"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Gemini",
      "Leo",
      "Capricorn"
    ],
    "chakra": "Solar Plexus & Root",
    "description": "Classic stone of courage, discernment, and practical focus. Helps navigate complex business negotiations with predatory precision."
  },
  {
    "id": 71,
    "name": "Golden Tiger Eye 10MM Courage & Grounding Bracelet",
    "price": 1399,
    "originalPrice": 1799,
    "material": "Rich Banded Tiger Eye (10mm), Strong Elastic",
    "category": "bracelets",
    "gemstone": "Tiger Eye",
    "image": "/products/tiger-eye-10mm/image-1.webp",
    "images": [
      "/products/tiger-eye-10mm/image-1.webp",
      "/products/tiger-eye-10mm/image-2.webp",
      "/products/tiger-eye-10mm/image-3.webp",
      "/products/tiger-eye-10mm/image-4.webp"
    ],
    "badge": "NEW",
    "savePercent": 22,
    "swatches": [
      "#6b4e07",
      "#8b6914"
    ],
    "concern": [
      "money",
      "protection"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Leo",
      "Capricorn"
    ],
    "chakra": "Solar Plexus Chakra",
    "description": "Substantial 10mm chatoyant spheres shimmer like molten gold under light, repelling self-doubt and fear of failure."
  },
  {
    "id": 72,
    "name": "Golden Tiger Eye 8MM Clarity & Confidence Bracelet",
    "price": 1199,
    "originalPrice": 1599,
    "material": "Grade-A Tiger Eye (8mm), Elastic Cord",
    "category": "bracelets",
    "gemstone": "Tiger Eye",
    "image": "/products/tiger-eye-8mm/image-1.webp",
    "images": [
      "/products/tiger-eye-8mm/image-1.webp",
      "/products/tiger-eye-8mm/image-2.webp",
      "/products/tiger-eye-8mm/image-3.webp",
      "/products/tiger-eye-8mm/image-4.webp",
      "/products/tiger-eye-8mm/image-5.webp"
    ],
    "badge": "SALE",
    "savePercent": 25,
    "swatches": [
      "#8b6914"
    ],
    "concern": [
      "money",
      "protection"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Gemini",
      "Leo"
    ],
    "chakra": "Solar Plexus Chakra",
    "description": "Balances solar and terrestrial energies, keeping you grounded while pursuing ambitious financial horizons."
  },
  {
    "id": 73,
    "name": "Tibetan Turquoise Sacred Sky Healer Bracelet",
    "price": 1399,
    "originalPrice": 1899,
    "material": "Natural Turquoise with Matrix, Elastic",
    "category": "bracelets",
    "gemstone": "Turquoise",
    "image": "/products/turquoise-classic/image-1.webp",
    "images": [
      "/products/turquoise-classic/image-1.webp",
      "/products/turquoise-classic/image-2.webp",
      "/products/turquoise-classic/image-3.webp",
      "/products/turquoise-classic/image-4.webp",
      "/products/turquoise-classic/image-5.webp",
      "/products/turquoise-classic/image-6.webp",
      "/products/turquoise-classic/image-7.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 26,
    "swatches": [
      "#16a085",
      "#1abc9c"
    ],
    "concern": [
      "health",
      "protection"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Sagittarius",
      "Pisces"
    ],
    "chakra": "Throat Chakra",
    "description": "Cherished for thousands of years by Himalayan shamans. A premier master healing stone that protects travelers and aligns all meridians."
  },
  {
    "id": 74,
    "name": "Natural Turquoise 10MM Traveler Protection Bracelet",
    "price": 1799,
    "originalPrice": 2399,
    "material": "Selected Turquoise (10mm), Heavy Duty Elastic",
    "category": "bracelets",
    "gemstone": "Turquoise",
    "image": "/products/turquoise-10mm/image-1.webp",
    "images": [
      "/products/turquoise-10mm/image-1.webp",
      "/products/turquoise-10mm/image-2.webp",
      "/products/turquoise-10mm/image-3.webp",
      "/products/turquoise-10mm/image-4.webp",
      "/products/turquoise-10mm/image-5.webp",
      "/products/turquoise-10mm/image-6.webp"
    ],
    "badge": "NEW",
    "savePercent": 25,
    "swatches": [
      "#0e6655",
      "#16a085"
    ],
    "concern": [
      "protection",
      "health"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Sagittarius"
    ],
    "chakra": "Throat Chakra",
    "description": "Bold 10mm robin-egg turquoise beads provide profound energetic cushioning during long journeys and major life transitions."
  },
  {
    "id": 75,
    "name": "Natural Turquoise 8MM Serenity & Communication Bracelet",
    "price": 1499,
    "originalPrice": 1999,
    "material": "Natural Turquoise Beads (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Turquoise",
    "image": "/products/turquoise-8mm/image-1.webp",
    "images": [
      "/products/turquoise-8mm/image-1.webp",
      "/products/turquoise-8mm/image-2.webp",
      "/products/turquoise-8mm/image-3.webp",
      "/products/turquoise-8mm/image-4.webp",
      "/products/turquoise-8mm/image-5.webp",
      "/products/turquoise-8mm/image-6.webp",
      "/products/turquoise-8mm/image-7.webp",
      "/products/turquoise-8mm/image-8.webp"
    ],
    "badge": "SALE",
    "savePercent": 25,
    "swatches": [
      "#16a085"
    ],
    "concern": [
      "peace",
      "health"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Sagittarius",
      "Pisces"
    ],
    "chakra": "Throat Chakra",
    "description": "Promotes peaceful communication, dissolves creative blocks, and shields against psychic depletion."
  },
  {
    "id": 76,
    "name": "Gem-Grade Turquoise 10MM Master Blessing Bracelet",
    "price": 2199,
    "originalPrice": 2899,
    "material": "Premium Sleeping Beauty Quality Turquoise (10mm)",
    "category": "bracelets",
    "gemstone": "Turquoise",
    "image": "/products/turquoise-gem-10mm/image-1.webp",
    "images": [
      "/products/turquoise-gem-10mm/image-1.webp",
      "/products/turquoise-gem-10mm/image-2.webp",
      "/products/turquoise-gem-10mm/image-3.webp",
      "/products/turquoise-gem-10mm/image-4.webp",
      "/products/turquoise-gem-10mm/image-5.webp"
    ],
    "badge": "NEW",
    "savePercent": 24,
    "swatches": [
      "#00bcd4",
      "#0097a7"
    ],
    "concern": [
      "health",
      "protection"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm Gem",
    "zodiac": [
      "Sagittarius"
    ],
    "chakra": "Throat Chakra",
    "description": "Flawless cyan-blue gem-grade turquoise spheres of museum quality, sanctified for spiritual leadership and total health rejuvenation."
  },
  {
    "id": 77,
    "name": "Gem-Grade Turquoise 8MM Celestial Blue Bracelet",
    "price": 1899,
    "originalPrice": 2499,
    "material": "Gem-Grade Natural Turquoise (8mm), Elastic",
    "category": "bracelets",
    "gemstone": "Turquoise",
    "image": "/products/turquoise-gem-8mm/image-1.webp",
    "images": [
      "/products/turquoise-gem-8mm/image-1.webp",
      "/products/turquoise-gem-8mm/image-2.webp",
      "/products/turquoise-gem-8mm/image-3.webp",
      "/products/turquoise-gem-8mm/image-4.webp",
      "/products/turquoise-gem-8mm/image-5.webp",
      "/products/turquoise-gem-8mm/image-6.webp",
      "/products/turquoise-gem-8mm/image-7.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 24,
    "swatches": [
      "#00bcd4"
    ],
    "concern": [
      "health",
      "peace"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm Gem",
    "zodiac": [
      "Sagittarius",
      "Pisces"
    ],
    "chakra": "Throat Chakra",
    "description": "Pristine vibrant blue beads devoid of harsh matrix, delivering pure throat-chakra resonance."
  },
  {
    "id": 78,
    "name": "Unakite Epidote Vision & Rebirth Bracelet",
    "price": 999,
    "originalPrice": 1399,
    "material": "Natural Green Epidote & Pink Feldspar Unakite",
    "category": "bracelets",
    "gemstone": "Unakite",
    "image": "/products/unakite-classic/image-1.webp",
    "images": [
      "/products/unakite-classic/image-1.webp",
      "/products/unakite-classic/image-2.webp",
      "/products/unakite-classic/image-3.webp",
      "/products/unakite-classic/image-4.webp",
      "/products/unakite-classic/image-5.webp",
      "/products/unakite-classic/image-6.webp",
      "/products/unakite-classic/image-7.webp",
      "/products/unakite-classic/image-8.webp",
      "/products/unakite-classic/image-9.webp",
      "/products/unakite-classic/image-10.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 29,
    "swatches": [
      "#556b2f",
      "#f48fb1"
    ],
    "concern": [
      "health",
      "love"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Scorpio",
      "Taurus"
    ],
    "chakra": "Heart & Third Eye",
    "description": "Harmonious union of forest green Epidote and delicate salmon-pink Feldspar. Nurtures emotional balance during rebirth and pregnancy."
  },
  {
    "id": 79,
    "name": "Unakite Jasper 10MM Emotional Healing & Rebirth Bracelet",
    "price": 1299,
    "originalPrice": 1699,
    "material": "Selected Unakite (10mm), Heavy Duty Elastic",
    "category": "bracelets",
    "gemstone": "Unakite",
    "image": "/products/unakite-10mm/image-1.webp",
    "images": [
      "/products/unakite-10mm/image-1.webp",
      "/products/unakite-10mm/image-2.webp",
      "/products/unakite-10mm/image-3.webp",
      "/products/unakite-10mm/image-4.webp",
      "/products/unakite-10mm/image-5.webp",
      "/products/unakite-10mm/image-6.webp",
      "/products/unakite-10mm/image-7.webp",
      "/products/unakite-10mm/image-8.webp"
    ],
    "badge": "NEW",
    "savePercent": 24,
    "swatches": [
      "#425424",
      "#e27b9c"
    ],
    "concern": [
      "health"
    ],
    "isNew": true,
    "isBestSeller": false,
    "beadSize": "10mm",
    "zodiac": [
      "Scorpio"
    ],
    "chakra": "Heart Chakra",
    "description": "10mm earthy beads release buried emotional trauma from the heart and cellular memory, assisting in deep convalescence."
  },
  {
    "id": 80,
    "name": "Unakite Jasper 8MM Fertility & Balance Bracelet",
    "price": 1099,
    "originalPrice": 1499,
    "material": "Grade-A Unakite (8mm), Elastic Cord",
    "category": "bracelets",
    "gemstone": "Unakite",
    "image": "/products/unakite-8mm/image-1.webp",
    "images": [
      "/products/unakite-8mm/image-1.webp",
      "/products/unakite-8mm/image-2.webp",
      "/products/unakite-8mm/image-3.webp"
    ],
    "badge": "SALE",
    "savePercent": 27,
    "swatches": [
      "#556b2f",
      "#f48fb1"
    ],
    "concern": [
      "health",
      "love"
    ],
    "isNew": false,
    "isBestSeller": false,
    "beadSize": "8mm",
    "zodiac": [
      "Scorpio",
      "Taurus"
    ],
    "chakra": "Heart Chakra",
    "description": "Renowned talisman for healthy reproductive balance, harmonious partnerships, and grounded emotional healing."
  },
  {
    "id": 81,
    "name": "Yin Yang Dual Harmony Balancing Bracelet",
    "price": 1299,
    "originalPrice": 1699,
    "material": "Black Obsidian & White Howlite Dual Polarity Beads",
    "category": "bracelets",
    "gemstone": "Multi-stone",
    "image": "/products/yin-yang-harmony/image-1.webp",
    "images": [
      "/products/yin-yang-harmony/image-1.webp",
      "/products/yin-yang-harmony/image-2.webp",
      "/products/yin-yang-harmony/image-3.webp",
      "/products/yin-yang-harmony/image-4.webp",
      "/products/yin-yang-harmony/image-5.webp",
      "/products/yin-yang-harmony/image-6.webp",
      "/products/yin-yang-harmony/image-7.webp",
      "/products/yin-yang-harmony/image-8.webp",
      "/products/yin-yang-harmony/image-9.webp"
    ],
    "badge": "BEST SELLER",
    "savePercent": 24,
    "swatches": [
      "#111111",
      "#f5f5f5"
    ],
    "concern": [
      "protection",
      "peace"
    ],
    "isNew": false,
    "isBestSeller": true,
    "beadSize": "8mm",
    "zodiac": [
      "Gemini",
      "Libra",
      "Pisces"
    ],
    "chakra": "Root & Crown Chakra",
    "description": "Embodying the ancient Taoist principle of polar equilibrium. Integrates shadow and light, masculine and feminine, logic and intuition."
  }
];

export const newArrivals = products.filter(p => p.isNew);
export const bestSellers = products.filter(p => p.isBestSeller);
