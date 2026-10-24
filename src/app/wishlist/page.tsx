"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/components/store-provider";
import { products } from "@/lib/catalog";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const saved = products.filter((product) => wishlist.includes(product.id));
  return <main className="wishlist-page"><p className="eyebrow">The pieces that feel like you</p><h1>Your wishlist</h1>{saved.length ? <div className="wishlist-grid">{saved.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="wishlist-empty"><Heart size={28} strokeWidth={1.2} /><h2>A place for the pieces you love.</h2><p>Save a little something and come back to it whenever you like.</p><Link className="button button-dark" href="/collections/all">Discover the collection</Link></div>}</main>;
}
