import Link from "next/link";
import { ArrowUpRight, Heart, PackageCheck, Sparkles } from "lucide-react";

export default function AccountPage() {
  return <main className="account-page"><p className="eyebrow">A more personal AURELIA</p><h1>Your account, beautifully simple.</h1><p>Sign-in and saved-order services are being prepared for launch. For now, our atelier is here to help with anything you need.</p><div className="account-tiles"><Link href="/wishlist"><Heart size={20} /><strong>Your wishlist</strong><span>Keep the pieces you love close.</span><ArrowUpRight size={15} /></Link><Link href="/appointments"><Sparkles size={20} /><strong>Book a consultation</strong><span>A little time, just for you.</span><ArrowUpRight size={15} /></Link><Link href="/shipping"><PackageCheck size={20} /><strong>Order care</strong><span>We’re happy to help with an order.</span><ArrowUpRight size={15} /></Link></div><a className="text-link" href="mailto:hello@aurelia.example">Write to our atelier <ArrowUpRight size={14} /></a></main>;
}
