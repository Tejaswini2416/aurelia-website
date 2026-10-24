"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { products, type Currency } from "@/lib/catalog";
import { useStore } from "@/components/store-provider";

const links = [
  ["Rings", "/collections/rings"],
  ["Necklaces", "/collections/necklaces"],
  ["Earrings", "/collections/earrings"],
  ["Bracelets", "/collections/bracelets"],
  ["Fine bridal", "/collections/bridal"],
  ["The ring builder", "/builder"],
];

export function SiteHeader() {
  const { cart, currency, setCurrency, wishlist, openCart } = useStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term
      ? products.filter((product) => `${product.title} ${product.category} ${product.stone}`.toLowerCase().includes(term)).slice(0, 4)
      : products.slice(0, 3);
  }, [query]);

  return (
    <>
      <div className="announcement">
        Complimentary insured worldwide shipping <span>·</span> A little gift, always
      </div>
      <header className="site-header">
        <button aria-label="Open menu" className="mobile-menu-toggle icon-button" onClick={() => setMenuOpen(true)}>
          <Menu size={21} />
        </button>
        <Link aria-label="Aurelia home" className="wordmark" href="/">
          AURELIA <span>FINE JEWELRY</span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <button aria-label="Search jewelry" className="icon-button" onClick={() => setSearchOpen(true)}><Search size={19} /></button>
          <label className="currency-select"><span className="sr-only">Currency</span><select aria-label="Currency" onChange={(event) => setCurrency(event.target.value as Currency)} value={currency}><option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option></select></label>
          <button aria-label="Wishlist" className="icon-button wishlist-action" onClick={() => router.push("/wishlist")}>
            <Heart size={19} /><span>{wishlist.length}</span>
          </button>
          <button aria-label="Account" className="icon-button account-action" onClick={() => router.push("/account")}><UserRound size={19} /></button>
          <button aria-label={`Shopping bag, ${count} items`} className="icon-button bag-action" onClick={openCart}>
            <ShoppingBag size={19} /><span>{count}</span>
          </button>
        </div>
      </header>
      {searchOpen && (
        <div className="search-overlay" onMouseDown={() => setSearchOpen(false)}>
          <section aria-label="Search jewelry" className="search-panel" onMouseDown={(event) => event.stopPropagation()}>
            <div className="search-panel-input">
              <Search size={20} />
              <input autoFocus onChange={(event) => setQuery(event.target.value)} placeholder="Search by piece, stone, or feeling…" value={query} />
              <button aria-label="Close search" className="icon-button" onClick={() => setSearchOpen(false)}><X size={20} /></button>
            </div>
            <p className="eyebrow">{query ? "A few lovely finds" : "Most loved right now"}</p>
            {matches.length ? matches.map((product) => (
              <Link className="search-result" href={`/products/${product.slug}`} key={product.id} onClick={() => setSearchOpen(false)}>
                <span>{product.title}</span><span>{product.category}</span>
              </Link>
            )) : <p className="search-empty">We couldn’t find that just yet. Try “diamond” or “ring”.</p>}
          </section>
        </div>
      )}
      {menuOpen && (
        <div className="drawer-backdrop mobile-menu-backdrop" onMouseDown={() => setMenuOpen(false)}>
          <nav aria-label="Mobile navigation" className="mobile-menu" onMouseDown={(event) => event.stopPropagation()}>
            <div className="drawer-heading"><Link className="wordmark" href="/">AURELIA <span>FINE JEWELRY</span></Link><button aria-label="Close menu" className="icon-button" onClick={() => setMenuOpen(false)}><X size={20} /></button></div>
            {links.map(([label, href]) => <Link href={href} key={label} onClick={() => setMenuOpen(false)}>{label}<span>↗</span></Link>)}
            <p className="mobile-menu-note">Made slowly. Meant to last forever.</p>
          </nav>
        </div>
      )}
    </>
  );
}
