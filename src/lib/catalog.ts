export type Product = {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  alternateImage: string;
  metal: string;
  stone: string;
  purity: "14K" | "18K" | "22K";
  cut: string;
  clarity: string;
  caratWeight: number;
  badge?: string;
  description: string;
  carat: string;
};

export const products: Product[] = [
  {
    id: "solitaire-ring",
    slug: "celeste-solitaire-ring",
    title: "The Céleste Solitaire",
    category: "Engagement rings",
    price: 2480,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1100&q=85",
    alternateImage:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1100&q=85",
    metal: "18K Yellow Gold",
    stone: "Lab-grown diamond",
    purity: "18K",
    cut: "Round",
    clarity: "VS1",
    caratWeight: 1,
    badge: "Bestseller",
    description:
      "A study in quiet brilliance. A responsibly-grown round brilliant diamond is held in a sculptural four-prong setting, handcrafted to let the light do what it does best.",
    carat: "1.00 ct",
  },
  {
    id: "emerald-pendant",
    slug: "verdant-emerald-pendant",
    title: "Verdant Emerald Pendant",
    category: "Necklaces",
    price: 1890,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1100&q=85",
    alternateImage:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1100&q=85",
    metal: "18K Yellow Gold",
    stone: "Zambian emerald",
    purity: "18K",
    cut: "Emerald",
    clarity: "A",
    caratWeight: 0.8,
    description:
      "A luminous emerald, selected for its rich garden-green hue, suspended from a fine gold chain. An heirloom in the making.",
    carat: "0.80 ct",
  },
  {
    id: "pearl-earrings",
    slug: "solenne-pearl-earrings",
    title: "Solenne Pearl Earrings",
    category: "Earrings",
    price: 1260,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1100&q=85",
    alternateImage:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1100&q=85",
    metal: "18K Yellow Gold",
    stone: "Akoya cultured pearl",
    purity: "18K",
    cut: "Other",
    clarity: "AAA",
    caratWeight: 0.4,
    badge: "Just arrived",
    description:
      "Modern heirlooms with a soft, luminous finish. Each pair is set by hand and made to move effortlessly from day to evening.",
    carat: "7.5 mm",
  },
  {
    id: "tennis-bracelet",
    slug: "lumiere-tennis-bracelet",
    title: "Lumière Tennis Bracelet",
    category: "Bracelets",
    price: 3640,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1100&q=85",
    alternateImage:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1100&q=85",
    metal: "18K White Gold",
    stone: "Lab-grown diamond",
    purity: "18K",
    cut: "Round",
    clarity: "VS1",
    caratWeight: 3,
    description:
      "A continuous line of hand-matched diamonds, individually set in luminous white gold for a considered take on a forever classic.",
    carat: "3.00 ct",
  },
  {
    id: "signet-ring",
    slug: "muse-signet-ring",
    title: "Muse Signet Ring",
    category: "Rings",
    price: 1480,
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1100&q=85",
    alternateImage:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1100&q=85",
    metal: "14K Rose Gold",
    stone: "White diamond",
    purity: "14K",
    cut: "Round",
    clarity: "VS2",
    caratWeight: 0.12,
    description:
      "An expressive signet softened by a single responsibly sourced diamond. Personal, timeless, and beautifully considered.",
    carat: "0.12 ct",
  },
  {
    id: "sapphire-ring",
    slug: "midnight-sapphire-ring",
    title: "Midnight Sapphire Ring",
    category: "Fine jewelry",
    price: 2920,
    image:
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1100&q=85",
    alternateImage:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1100&q=85",
    metal: "18K Yellow Gold",
    stone: "Ceylon sapphire",
    purity: "18K",
    cut: "Oval",
    clarity: "Eye-clean",
    caratWeight: 1.2,
    badge: "One of a kind",
    description:
      "A velvety blue sapphire, chosen for its unmistakable depth, framed in warm gold and finished by our master setters.",
    carat: "1.20 ct",
  },
];

export const categories = [
  {
    name: "Rings",
    slug: "rings",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Necklaces",
    slug: "necklaces",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Earrings",
    slug: "earrings",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Bracelets",
    slug: "bracelets",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Gemstones",
    slug: "gemstones",
    image:
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1000&q=85",
  },
];

export type Currency = "USD" | "EUR" | "GBP";

const exchangeRates: Record<Currency, number> = { USD: 1, EUR: 0.92, GBP: 0.79 };

export const formatPrice = (price: number, currency: Currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price * exchangeRates[currency]);
