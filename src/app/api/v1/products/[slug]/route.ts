import { NextResponse } from "next/server";
import { products } from "@/lib/catalog";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });
  return NextResponse.json({
    product,
    variants: ["14K Yellow Gold", "18K Yellow Gold", "18K White Gold", "14K Rose Gold", "Platinum"].map((metal) => ({
      metal,
      available: true,
      price: product.price
        + (metal === "Platinum" ? 420 : metal === "18K White Gold" ? 80 : metal === "14K Rose Gold" ? -120 : 0)
        - (product.metal === "Platinum" ? 420 : product.metal === "18K White Gold" ? 80 : product.metal === "14K Rose Gold" ? -120 : 0),
    })),
    certification: { issuer: "GIA / IGI", status: "Provided with eligible center stones" },
  });
}
