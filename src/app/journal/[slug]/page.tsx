import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

const stories = {
  "a-guide-to-finding-your-ring": {
    category: "The wedding edit · 6 min read",
    title: "A guide to finding a ring that feels like you",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    copy: "The right ring is less about rules and more about recognition. Start with the pieces you already reach for: the metal tones you love, the shapes that feel natural, and the details you want to see every day.",
  },
  "a-lifetime-of-care": {
    category: "Care notes · 4 min read",
    title: "A little care goes a very long way",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1600&q=85",
    copy: "The small rituals matter. A soft brush, a little warm water, and a safe place to rest between wears will help your jewelry keep its quiet glow for years to come.",
  },
  "choosing-your-stone": {
    category: "The stone edit · 8 min read",
    title: "Finding the color you’ll never tire of",
    image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1600&q=85",
    copy: "A gemstone can feel like a place, a season, or a memory. Look beyond a single shade and notice how the color shifts in different light. The stone you love is the one that keeps surprising you.",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(stories).map((slug) => ({ slug }));
}

export default function JournalPage({ params }: { params: Promise<{ slug: string }> }) {
  return <Suspense fallback={<main className="journal-article" aria-label="Loading journal story" />}><JournalContent params={params} /></Suspense>;
}

async function JournalContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories[slug as keyof typeof stories];
  if (!story) notFound();
  return <main className="journal-article"><div className="journal-article-image" style={{ backgroundImage: `url("${story.image}")` }} /><article><p className="eyebrow">{story.category}</p><h1>{story.title}</h1><p>{story.copy}</p><p>At AURELIA, we believe the most meaningful pieces are the ones that become part of your everyday. Take your time, ask questions, and choose what feels unmistakably yours.</p><Link className="text-link" href="/collections/all">Explore the collection ↗</Link></article></main>;
}
