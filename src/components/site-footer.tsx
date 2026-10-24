import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-block"><Link className="wordmark footer-wordmark" href="/">AURELIA <span>FINE JEWELRY</span></Link><p>Pieces to hold close.<br />Stories to keep forever.</p><Link className="footer-social" href="https://instagram.com"><Camera size={17} /> Follow the moments <ArrowUpRight size={13} /></Link></div>
        <div className="footer-column"><h3>Discover</h3><Link href="/collections/all">All jewelry</Link><Link href="/collections/rings">Rings</Link><Link href="/collections/necklaces">Necklaces</Link><Link href="/collections/earrings">Earrings</Link><Link href="/builder">Create your ring</Link></div>
        <div className="footer-column"><h3>Here for you</h3><Link href="/appointments">Book a consultation</Link><Link href="/our-story">Our story</Link><Link href="/care">Care & repair</Link><Link href="/shipping">Shipping & returns</Link><Link href="/contact">Get in touch</Link></div>
        <div className="footer-newsletter"><h3>A note, now and then.</h3><p>New pieces, thoughtful stories, and little moments from our atelier.</p><Link href="/#newsletter" className="text-link">Join our letters <ArrowUpRight size={14} /></Link></div>
      </div>
      <div className="footer-bottom"><span>© 2026 AURELIA Fine Jewelry</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><span>Crafted with care, always.</span></div></div>
    </footer>
  );
}
