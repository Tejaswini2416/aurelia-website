import Link from "next/link";
import { ArrowDown, ArrowUpRight, BadgeCheck, Box, HeartHandshake, RefreshCcw, ShieldCheck } from "lucide-react";
import { ProductRail } from "@/components/product-rail";
import { categories } from "@/lib/catalog";

const promises = [
  { icon: BadgeCheck, title: "Considered materials", copy: "Every stone is chosen with care and independently certified." },
  { icon: ShieldCheck, title: "A safe arrival", copy: "Complimentary, fully insured shipping wherever you call home." },
  { icon: RefreshCcw, title: "30 days to fall in love", copy: "Take your time. Returns and exchanges are always simple." },
  { icon: HeartHandshake, title: "Here for a lifetime", copy: "Complimentary cleaning and thoughtful lifetime care." },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="hero-kicker">For all the moments that become everything</p>
          <h1>A love that<br /><em>lasts forever.</em></h1>
          <p className="hero-copy">Jewelry to mark your becoming, your belonging, your always.</p>
          <div className="hero-actions">
            <Link className="button button-light" href="/collections/all">Explore the collection <ArrowUpRight size={16} /></Link>
            <Link className="hero-quiet-link" href="/appointments">Book a private consultation <span>↗</span></Link>
          </div>
        </div>
        <div className="hero-caption"><span>01 — 03</span><span>THE HEIRLOOM EDIT</span><ArrowDown size={15} /></div>
      </section>

      <section className="category-section section-wrap">
        <div className="section-heading category-heading">
          <div><p className="eyebrow">Find the piece that feels like you</p><h2>Made to be lived in.</h2></div>
          <p>Quietly extraordinary pieces, designed to hold the stories you make your own.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link className={`category-tile category-tile-${index + 1}`} href={`/collections/${category.slug}`} key={category.slug}>
              <div className="category-photo" style={{ backgroundImage: `url("${category.image}")` }} />
              <div className="category-tile-copy"><span>0{index + 1}</span><h3>{category.name}</h3><ArrowUpRight size={18} /></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="builder-feature">
        <div className="builder-feature-image" />
        <div className="builder-feature-copy">
          <p className="eyebrow">A ring, entirely your own</p>
          <h2>Some things are<br /><em>worth making yours.</em></h2>
          <p>Choose a setting. Find the stone that speaks to you. We’ll bring it to life, by hand, just for you.</p>
          <div className="builder-steps"><span><b>01</b> Choose a setting</span><span><b>02</b> Find your stone</span><span><b>03</b> Make it yours</span></div>
          <Link className="button button-dark" href="/builder">Begin your design <ArrowUpRight size={16} /></Link>
        </div>
      </section>

      <ProductRail />

      <section className="promise-section">
        <div className="promise-intro"><p className="eyebrow">A promise, in every detail</p><h2>Beautifully made.<br /><em>Thoughtfully kept.</em></h2></div>
        <div className="promise-grid">{promises.map(({ icon: Icon, title, copy }) => <div className="promise-item" key={title}><Icon size={22} strokeWidth={1.4} /><h3>{title}</h3><p>{copy}</p></div>)}</div>
      </section>

      <section className="editorial-section section-wrap">
        <div className="editorial-photo" />
        <div className="editorial-copy"><p className="eyebrow">A note from our atelier</p><h2>Made slowly.<br /><em>Meant to stay.</em></h2><p>We believe the most beautiful things are never hurried. Each AURELIA piece is shaped by skilled hands, made with intention, and created to become part of your story.</p><Link className="text-link" href="/our-story">Get to know us <span>↗</span></Link></div>
      </section>

      <section className="community-section">
        <div className="community-heading"><p className="eyebrow">AURELIA, out in the world</p><h2>Seen on you.<br /><em>Loved forever.</em></h2><a href="https://instagram.com" rel="noreferrer" target="_blank">@aureliafinejewelry ↗</a></div>
        <div className="community-gallery">
          <div className="community-photo community-photo-one" />
          <div className="community-photo community-photo-two" />
          <div className="community-photo community-photo-three" />
          <div className="community-photo community-photo-four" />
        </div>
      </section>

      <section className="journal-section section-wrap">
        <div><p className="eyebrow">The AURELIA journal</p><h2>Stories, in the making.</h2></div>
        <div className="journal-grid">
          <Link className="journal-card journal-one" href="/journal/a-guide-to-finding-your-ring"><div /><span>THE WEDDING EDIT · 6 MIN READ</span><h3>A guide to finding a ring that feels like you</h3></Link>
          <Link className="journal-card journal-two" href="/journal/a-lifetime-of-care"><div /><span>CARE NOTES · 4 MIN READ</span><h3>A little care goes a very long way</h3></Link>
          <Link className="journal-card journal-three" href="/journal/choosing-your-stone"><div /><span>THE STONE EDIT · 8 MIN READ</span><h3>Finding the color you’ll never tire of</h3></Link>
        </div>
      </section>

      <section className="newsletter-section"><Box size={23} strokeWidth={1.3} /><p className="eyebrow">A little note from us</p><h2>Good things, thoughtfully shared.</h2><p>New pieces, considered stories, and a little something on your first order.</p><form action="#" className="newsletter-form"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" placeholder="Your email address" type="email" /><button aria-label="Subscribe"><ArrowUpRight size={18} /></button></form><span>By subscribing, you agree to our privacy policy.</span></section>
    </main>
  );
}
