"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Heart, Ruler, ShieldCheck, Sparkles, X } from "lucide-react";
import { formatPrice, type Product } from "@/lib/catalog";
import { useStore } from "@/components/store-provider";

const metalPrices: Record<string, number> = {
  "18K Yellow Gold": 0,
  "18K White Gold": 80,
  "14K Rose Gold": -120,
  Platinum: 420,
};

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart, currency, wishlist, toggleWishlist } = useStore();
  const [metal, setMetal] = useState(product.metal);
  const [ringSize, setRingSize] = useState("6");
  const [engraving, setEngraving] = useState("");
  const [sizeGuide, setSizeGuide] = useState(false);
  const [certificate, setCertificate] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState("Details");
  const [added, setAdded] = useState(false);
  const gallery = [product.image, product.alternateImage, product.image, product.alternateImage];
  const price = product.price + (metalPrices[metal] ?? 0) - (metalPrices[product.metal] ?? 0);
  const saved = wishlist.includes(product.id);
  const certificateIssuer = product.stone.toLowerCase().includes("diamond")
    ? "GIA · GEMOLOGICAL INSTITUTE OF AMERICA"
    : "AURELIA · GEMSTONE REPORT";

  return (
    <main className="product-detail-page">
      <div className="collection-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/collections/all">Fine jewelry</Link><span>/</span><span>{product.title}</span></div>
      <div className="product-detail-layout">
        <div className="product-gallery">
          <div className="gallery-main" style={{ backgroundImage: `url("${gallery[galleryIndex]}")` }}>
            <span className="gallery-view-label">DETAIL VIEW 0{galleryIndex + 1} / 04</span>
            <button aria-label={saved ? "Remove from wishlist" : "Save to wishlist"} className={`product-wishlist${saved ? " is-saved" : ""}`} onClick={() => toggleWishlist(product.id)}><Heart fill={saved ? "currentColor" : "none"} size={19} /></button>
            <button className="gallery-zoom" onClick={() => setZoomOpen(true)}>Explore detail <ArrowUpRight size={14} /></button>
          </div>
          <div className="gallery-thumbnails">{gallery.map((image, index) => <button aria-label={`View image ${index + 1}`} aria-pressed={index === galleryIndex} className={galleryIndex === index ? "gallery-thumb selected" : "gallery-thumb"} key={`${image}-${index}`} onClick={() => setGalleryIndex(index)} style={{ backgroundImage: `url("${image}")` }} />)}</div>
          <div className="rotation-control"><span>360° view</span><input aria-label="Rotate product view" max={3} min={0} onChange={(event) => setGalleryIndex(Number(event.target.value))} step={1} type="range" value={galleryIndex} /><Sparkles size={15} /></div>
          {engraving && <div aria-label={`Engraving preview: ${engraving}`} className="engraving-preview"><span>{engraving}</span><small>ENGRAVING PREVIEW</small></div>}
        </div>
        <section className="product-detail-copy">
          <p className="eyebrow">{product.category} · AURELIA atelier</p>
          <h1>{product.title}</h1>
          <p className="detail-price">{formatPrice(price, currency)} <span>· Complimentary insured shipping</span></p>
          <div className="detail-rating"><span>★★★★★</span><span>4.9 · 28 considered reviews</span></div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-choice-group"><div className="detail-label-row"><span>Metal</span><span>{metal}</span></div><div className="metal-choice-list">{Object.keys(metalPrices).map((option) => <button aria-pressed={metal === option} className={metal === option ? "metal-choice selected" : "metal-choice"} key={option} onClick={() => setMetal(option)}>{option}<span>{metalPrices[option] > 0 ? `+${formatPrice(metalPrices[option], currency)}` : metalPrices[option] < 0 ? `−${formatPrice(Math.abs(metalPrices[option]), currency)}` : ""}</span></button>)}</div></div>
          <div className="detail-choice-group"><div className="detail-label-row"><span>Ring size</span><button className="text-link size-guide-link" onClick={() => setSizeGuide(true)}><Ruler size={14} /> Find your size</button></div><div className="ring-sizes">{["5", "5.5", "6", "6.5", "7", "7.5", "8"].map((size) => <button aria-pressed={ringSize === size} className={ringSize === size ? "ring-size selected" : "ring-size"} key={size} onClick={() => setRingSize(size)}>{size}</button>)}</div></div>
          <div className="engraving-field"><label htmlFor="engraving">A personal touch <span>Complimentary</span></label><div><input id="engraving" maxLength={16} onChange={(event) => setEngraving(event.target.value)} placeholder="Add an engraving (up to 16 characters)" value={engraving} /><span>{engraving.length}/16</span></div><small>A small secret, kept close.</small></div>
          <button className={`button button-dark add-to-bag${added ? " added" : ""}`} onClick={() => { addToCart({ ...product, price }, { metal, ringSize, engraving: engraving || undefined }); setAdded(true); window.setTimeout(() => setAdded(false), 1800); }}>{added ? <><Check size={17} /> Added to your bag</> : <>Add to bag · {formatPrice(price, currency)} <ArrowUpRight size={16} /></>}</button>
          <button className="certificate-link" onClick={() => setCertificate(true)}><ShieldCheck size={16} /> A stone with a story. View its certificate <ArrowUpRight size={14} /></button>
          <div className="detail-promises"><span><ShieldCheck size={16} /> Insured delivery</span><span><Sparkles size={16} /> Lifetime care</span></div>
          <div className="detail-accordions">{[
            ["Details", `${product.carat} ${product.stone.toLowerCase()}. Hand-finished in solid ${metal}. Designed in our New York atelier and made to order in 2–3 weeks.`],
            ["A transparent price", `Metal · ${formatPrice(Math.round(price * 0.31), currency)} / Stone · ${formatPrice(Math.round(price * 0.48), currency)} / Craftsmanship · ${formatPrice(Math.round(price * 0.16), currency)} / Duties & care · ${formatPrice(Math.round(price * 0.05), currency)}`],
            ["Shipping & insurance", "Complimentary express delivery, fully insured from our atelier to your door. Each piece arrives in our signature keepsake box. Ships in 2–3 weeks."],
            ["Care & cleaning", "A little warm water, mild soap, and a soft brush will bring back the glow. Enjoy complimentary annual cleaning and inspection at any AURELIA atelier."],
          ].map(([title, content]) => <div className="detail-accordion" key={title}><button aria-expanded={openAccordion === title} onClick={() => setOpenAccordion(openAccordion === title ? "" : title)}>{title}<ChevronDown className={openAccordion === title ? "rotated" : ""} size={17} /></button>{openAccordion === title && <p>{content}</p>}</div>)}</div>
        </section>
      </div>
      {sizeGuide && <div className="modal-backdrop" onMouseDown={() => setSizeGuide(false)}><section aria-label="Ring size guide" aria-modal="true" className="info-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog"><button aria-label="Close" className="modal-close icon-button" onClick={() => setSizeGuide(false)}><X size={19} /></button><p className="eyebrow">Find your perfect fit</p><h2>Ring size guide</h2><p>Choose a size to see its inside diameter. For the most comfortable fit, measure at the end of the day.</p><label className="size-guide-select">Your AURELIA size<select onChange={(event) => setRingSize(event.target.value)} value={ringSize}>{["5", "5.5", "6", "6.5", "7", "7.5", "8"].map((size) => <option key={size}>{size}</option>)}</select></label><div className="measurement-card"><span>Inside diameter</span><strong>{(15.7 + (Number(ringSize) - 5) * 0.4).toFixed(1)} mm</strong></div><button className="button button-dark" onClick={() => setSizeGuide(false)}>Use size {ringSize}</button><button className="print-guide" onClick={() => window.print()}>Print a sizing guide</button></section></div>}
      {certificate && <div className="modal-backdrop" onMouseDown={() => setCertificate(false)}><section aria-label="Certificate of authenticity" aria-modal="true" className="info-modal certificate-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog"><button aria-label="Close" className="modal-close icon-button" onClick={() => setCertificate(false)}><X size={19} /></button><ShieldCheck size={26} strokeWidth={1.3} /><p className="eyebrow">A promise you can hold</p><h2>Certificate of authenticity</h2><p>Eligible center stones arrive with an independent grading report.</p><div className="certificate-paper"><span>{certificateIssuer}</span><strong>STONE GRADING REPORT</strong><small>Illustrative sample · not an issued grading report</small><div><span>Stone & cut</span><b>{product.stone} · {product.cut}</b></div><div><span>Carat weight</span><b>{product.carat}</b></div><div><span>Quality grade</span><b>{product.clarity}</b></div><small>Final report is specific to the stone selected for your piece.</small></div><button className="button button-dark" onClick={() => setCertificate(false)}>Lovely, thank you</button></section></div>}
      {zoomOpen && <div className="modal-backdrop zoom-backdrop" onMouseDown={() => setZoomOpen(false)}><section aria-label="Product image detail" aria-modal="true" className="zoom-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog"><button aria-label="Close image detail" className="modal-close icon-button" onClick={() => setZoomOpen(false)}><X size={20} /></button><div className="zoom-modal-image" style={{ backgroundImage: `url("${gallery[galleryIndex]}")` }} /><span>DETAIL VIEW 0{galleryIndex + 1} / 04 · Select a view below</span><div className="zoom-modal-thumbnails">{gallery.map((image, index) => <button aria-label={`View image ${index + 1}`} aria-pressed={index === galleryIndex} className={galleryIndex === index ? "gallery-thumb selected" : "gallery-thumb"} key={`${image}-zoom-${index}`} onClick={() => setGalleryIndex(index)} style={{ backgroundImage: `url("${image}")` }} />)}</div></section></div>}
    </main>
  );
}
