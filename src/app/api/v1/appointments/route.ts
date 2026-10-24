import { NextResponse } from "next/server";
import { z } from "zod";
import { getPrismaClient } from "@/lib/prisma";

const appointmentSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  topic: z.enum(["Engagement ring", "Fine jewelry", "Custom design", "Care & repair"]),
  scheduledAt: z.string().min(1).max(50),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the consultation details.", details: parsed.error.flatten() }, { status: 400 });
  }
  const scheduledAt = new Date(parsed.data.scheduledAt);
  if (Number.isNaN(scheduledAt.getTime())) {
    return NextResponse.json({ error: "Please choose a valid consultation time." }, { status: 400 });
  }
  if (scheduledAt.getTime() < Date.now() + 60 * 60 * 1000) {
    return NextResponse.json({ error: "Please choose a time at least one hour from now." }, { status: 400 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Appointment booking is temporarily unavailable. Please contact our atelier." }, { status: 503 });
  }
  try {
    const appointment = await getPrismaClient().appointment.create({
      data: { ...parsed.data, scheduledAt },
      select: { id: true, name: true, scheduledAt: true, status: true },
    });
    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error) {
    console.error("Failed to persist consultation appointment.", error);
    return NextResponse.json({ error: "We couldn’t save your consultation request. Please try again." }, { status: 500 });
  }
}
