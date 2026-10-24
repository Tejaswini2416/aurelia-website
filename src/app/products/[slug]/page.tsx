import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { products } from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return <Suspense fallback={<main className="product-detail-page" aria-label="Loading product" />}><ProductContent params={params} /></Suspense>;
}

async function ProductContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
