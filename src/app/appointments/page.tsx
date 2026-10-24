"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Check, Video } from "lucide-react";

export default function AppointmentsPage() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  async function submitAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/v1/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "We could not book that time. Please try again.");
      setSubmitted(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return <main className="appointment-page"><div className="appointment-intro"><p className="eyebrow">A moment, just for you</p><h1>Let’s find the<br /><em>piece that feels like you.</em></h1><p>Settle in with one of our jewelry stylists. Ask every question, try on ideas, and take your time. We’ll be right here.</p><div><Video size={17} /> A private 30-minute video consultation</div></div><section className="appointment-card">{submitted ? <div className="appointment-success"><Check size={28} /><p className="eyebrow">It’s a date</p><h2>Your consultation request is in.</h2><p>Our atelier team will be in touch shortly to confirm the details.</p></div> : <form onSubmit={submitAppointment}><p className="eyebrow">Choose a time</p><h2>We’d love to meet you.</h2><label>Your name<input autoComplete="name" name="name" placeholder="Your name" required /></label><label>Email address<input autoComplete="email" name="email" placeholder="you@example.com" required type="email" /></label><label>What would you like to explore?<select defaultValue="Engagement ring" name="topic"><option>Engagement ring</option><option>Fine jewelry</option><option>Custom design</option><option>Care & repair</option></select></label><label>Preferred time<input name="scheduledAt" required type="datetime-local" /></label>{message && <p className="form-error" role="alert">{message}</p>}<button className="button button-dark" disabled={pending}>{pending ? "Requesting…" : <>Request a consultation <ArrowUpRight size={15} /></>}</button><small>No pressure, no obligation. Just good conversation.</small></form>}</section></main>;
}
