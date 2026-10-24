import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

const pages = {
  care: {
    eyebrow: "Made to be kept",
    title: "Care & repair",
    copy: "A little care keeps a beautiful thing beautiful. Clean your jewelry with warm water, mild soap, and a soft brush. Store each piece separately, away from direct sunlight and humidity.",
    detail: "AURELIA clients are welcome to complimentary annual cleaning and inspection. For repairs or a more considered restoration, our atelier can review your piece and recommend the right next step.",
  },
  shipping: {
    eyebrow: "A safe arrival",
    title: "Shipping & returns",
    copy: "Every order is carefully packed and shipped with signature confirmation. Complimentary express delivery is fully insured from our atelier to your door.",
    detail: "Ready-to-ship pieces typically arrive in 2–4 business days. Made-to-order pieces are handcrafted in 2–3 weeks. You have 30 days from delivery to request a return or exchange; personalized and engraved pieces may have different terms.",
  },
  contact: {
    eyebrow: "We’re right here",
    title: "Get in touch",
    copy: "A question about a piece, an order, or a story you’d like to tell us? Our small atelier team would love to hear from you.",
    detail: "Write to hello@aurelia.example and we’ll be in touch within two business days. For a more personal conversation, book a complimentary virtual consultation.",
  },
  privacy: {
    eyebrow: "Your trust matters",
    title: "Privacy",
    copy: "We collect only the information needed to respond to requests and support your shopping experience. This demo storefront stores cart, wishlist, currency, and gift preferences in your browser.",
    detail: "This sample privacy notice is not legal advice and must be replaced with a reviewed policy that describes your real processors, retention, cookies, and customer rights before launch.",
  },
  terms: {
    eyebrow: "Before you shop",
    title: "Terms of service",
    copy: "Product descriptions and pricing shown here are illustrative. The checkout is a demonstration only and does not create an order or collect payment.",
    detail: "This sample terms page is not legal advice. Add reviewed sale, returns, warranty, shipping, and jurisdiction terms before accepting orders.",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default function InformationPage({ params }: { params: Promise<{ slug: string }> }) {
  return <Suspense fallback={<main className="information-page" aria-label="Loading information" />}><InformationContent params={params} /></Suspense>;
}

async function InformationContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];
  if (!page) notFound();
  return <main className="information-page"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="information-lead">{page.copy}</p><p>{page.detail}</p><div className="information-promises"><span><ShieldCheck size={17} /> Thoughtfully handled</span><span><Sparkles size={17} /> Here for a lifetime</span></div><div className="information-links"><Link className="button button-dark" href="/appointments">Speak with our atelier <ArrowUpRight size={15} /></Link><Link className="text-link" href="/collections/all">Discover the collection ↗</Link></div></main>;
}
