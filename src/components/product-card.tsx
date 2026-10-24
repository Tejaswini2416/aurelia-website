"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import { useState } from "react";
import type { CSSProperties } from "react";
import { formatPrice, type Product } from "@/lib/catalog";
import { useStore } from "@/components/store-provider";

const metals = [
  { name: "18K Yellow Gold", color: "#c7a36b" },
  { name: "18K White Gold", color: "#d5d5d1" },
  { name: "14K Rose Gold", color: "#c98e7d" },
];
const metalPriceAdjustment: Record<string, number> = {
  "18K Yellow Gold": 0,
  "18K White Gold": 80,
  "14K Rose Gold": -120,
  Platinum: 420,
};

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, currency, toggleWishlist, wishlist } = useStore();
  const [metal, setMetal] = useState(product.metal);
  const [hovered, setHovered] = useState(false);
  const saved = wishlist.includes(product.id);

  return (
    <motion.article className="product-card" initial={{ opacity: 0, y: 12 }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} transition={{ duration: 0.35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}>
      <div className="product-card-visual">
        <Link
          aria-label={`Discover ${product.title}`}
          className={`product-photo${hovered ? " product-photo-hover" : ""}`}
          href={`/products/${product.slug}`}
          style={{ backgroundImage: `url("${hovered ? product.alternateImage : product.image}")` }}
        />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} className={`product-wishlist${saved ? " is-saved" : ""}`} onClick={() => toggleWishlist(product.id)}>
          <Heart fill={saved ? "currentColor" : "none"} size={18} strokeWidth={1.6} />
        </button>
        <button className="quick-add" onClick={() => addToCart({ ...product, price: product.price + (metalPriceAdjustment[metal] ?? 0) - (metalPriceAdjustment[product.metal] ?? 0) }, { metal })}><Plus size={16} /> Quick add</button>
      </div>
      <div className="product-card-info">
        <div className="product-name-row">
          <Link href={`/products/${product.slug}`}><h3>{product.title}</h3></Link>
          <span>{formatPrice(product.price, currency)}</span>
        </div>
        <p>{product.stone} · {product.carat}</p>
        <div aria-label="Choose metal" className="metal-swatches">
          {metals.map((option) => (
            <button
              aria-label={option.name}
              aria-pressed={metal === option.name}
              className={metal === option.name ? "swatch selected" : "swatch"}
              key={option.name}
              onClick={() => setMetal(option.name)}
              style={{ "--swatch": option.color } as CSSProperties}
              title={option.name}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}
