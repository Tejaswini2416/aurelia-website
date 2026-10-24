import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  metal: z.enum(["yellow-gold-14k", "yellow-gold-18k", "yellow-gold-22k", "white-gold-14k", "white-gold-18k", "rose-gold-14k", "platinum"]),
  metalWeightGrams: z.number().positive().max(500),
  gemstoneValue: z.number().min(0).max(10_000_000),
  makingCharges: z.number().min(0).max(1_000_000),
  taxRate: z.number().min(0).max(0.3).default(0),
});

const fallbackRatesPerGram: Record<string, number> = {
  "yellow-gold-14k": 48,
  "yellow-gold-18k": 62,
  "yellow-gold-22k": 76,
  "white-gold-14k": 51,
  "white-gold-18k": 66,
  "rose-gold-14k": 49,
  platinum: 44,
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid pricing inputs.", details: parsed.error.flatten() }, { status: 400 });
  }

  const { metal, metalWeightGrams, gemstoneValue, makingCharges, taxRate } = parsed.data;
  const envRate = process.env[`METAL_RATE_${metal.toUpperCase().replaceAll("-", "_")}`];
  const metalRate = envRate ? Number(envRate) : fallbackRatesPerGram[metal];
  if (!Number.isFinite(metalRate) || metalRate <= 0) {
    return NextResponse.json({ error: "A valid market rate is not configured for this metal." }, { status: 503 });
  }
  const metalCost = metalWeightGrams * metalRate;
  const beforeTax = metalCost + gemstoneValue + makingCharges;
  const tax = beforeTax * taxRate;
  return NextResponse.json({
    currency: "USD",
    marketRatePerGram: metalRate,
    breakdown: {
      metalCost: Number(metalCost.toFixed(2)),
      gemstoneValue,
      makingCharges,
      tax: Number(tax.toFixed(2)),
      total: Number((beforeTax + tax).toFixed(2)),
    },
    rateSource: envRate ? "configured market rate" : "illustrative fallback rate; configure a live market-rate provider before production",
  });
}
