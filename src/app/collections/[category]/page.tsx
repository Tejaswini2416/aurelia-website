import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CollectionView } from "@/components/collection-view";
import { products } from "@/lib/catalog";

const collectionNames: Record<string, string> = {
  all: "All jewelry",
  rings: "Rings",
  necklaces: "Necklaces",
  earrings: "Earrings",
  bracelets: "Bracelets",
  gemstones: "Gemstones",
  bridal: "Fine bridal",
};

export function generateStaticParams() {
  return Object.keys(collectionNames).map((category) => ({ category }));
}

export default function CollectionPage({ params }: { params: Promise<{ category: string }> }) {
  return <Suspense fallback={<main className="collection-page" aria-label="Loading collection" />}><CollectionContent params={params} /></Suspense>;
}

async function CollectionContent({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const title = collectionNames[category];
  if (!title) notFound();
  const items = category === "all"
    ? products
    : category === "bridal"
      ? products.filter((product) => product.category.toLowerCase().includes("engagement"))
      : category === "gemstones"
        ? products.filter((product) => ["emerald", "sapphire"].some((stone) => product.stone.toLowerCase().includes(stone)))
        : products.filter((product) => product.category.toLowerCase().includes(category.replace(/s$/, "")));

  return <CollectionView products={items} title={title} />;
}
