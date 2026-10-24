import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function OurStoryPage() {
  return <main className="story-page"><div className="story-hero-image" /><div className="story-copy"><p className="eyebrow">A note from our atelier</p><h1>Made slowly.<br /><em>Meant to stay.</em></h1><p>We started AURELIA with a simple belief: the pieces we keep closest should be made with care for the people who make them, and the world we share.</p><p>So we work with skilled craftspeople, choose our stones with intention, and take the time each piece deserves. The result is jewelry that feels like yours from the very first moment — and stays that way for a lifetime.</p><Link className="button button-dark" href="/collections/all">Discover our pieces <ArrowUpRight size={16} /></Link></div></main>;
}
