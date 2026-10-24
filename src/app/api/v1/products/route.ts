import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { products } from "@/lib/catalog";

const querySchema = z.object({
  q: z.string().trim().max(100).optional(),
  category: z.string().trim().max(60).optional(),
  metal: z.string().trim().max(40).optional(),
  purity: z.enum(["14K", "18K", "22K"]).optional(),
  stone: z.string().trim().max(40).optional(),
  minCarat: z.coerce.number().min(0).max(100).optional(),
  maxCarat: z.coerce.number().min(0).max(100).optional(),
  clarity: z.string().trim().max(20).optional(),
  minPrice: z.coerce.number().min(0).max(1_000_000).optional(),
  maxPrice: z.coerce.number().min(0).max(1_000_000).optional(),
  cut: z.string().trim().max(30).optional(),
  sort: z.enum(["popular", "price-asc", "price-desc", "newest"]).default("popular"),
});

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid catalog filters.", details: parsed.error.flatten() }, { status: 400 });
  }

  const filters = parsed.data;
  let results = products.filter((product) => {
    const searchable = `${product.title} ${product.description} ${product.category} ${product.stone}`.toLowerCase();
    return (!filters.q || searchable.includes(filters.q.toLowerCase()))
      && (!filters.category || product.category.toLowerCase().includes(filters.category.toLowerCase()))
      && (!filters.metal || product.metal.toLowerCase().includes(filters.metal.toLowerCase()))
      && (!filters.purity || product.purity === filters.purity)
      && (!filters.stone || product.stone.toLowerCase().includes(filters.stone.toLowerCase()))
      && (filters.minCarat === undefined || product.caratWeight >= filters.minCarat)
      && (filters.maxCarat === undefined || product.caratWeight <= filters.maxCarat)
      && (!filters.clarity || product.clarity.toLowerCase().includes(filters.clarity.toLowerCase()))
      && (filters.minPrice === undefined || product.price >= filters.minPrice)
      && (filters.maxPrice === undefined || product.price <= filters.maxPrice)
      && (!filters.cut || product.cut.toLowerCase() === filters.cut.toLowerCase());
  });

  if (filters.sort === "price-asc") results = results.toSorted((a, b) => a.price - b.price);
  if (filters.sort === "price-desc") results = results.toSorted((a, b) => b.price - a.price);

  return NextResponse.json({
    products: results,
    total: results.length,
    facets: {
      metals: [...new Set(products.map((product) => product.metal))],
      purities: [...new Set(products.map((product) => product.purity))],
      stones: [...new Set(products.map((product) => product.stone))],
      cuts: [...new Set(products.map((product) => product.cut))],
      clarities: [...new Set(products.map((product) => product.clarity))],
      categories: [...new Set(products.map((product) => product.category))],
    },
  });
}
