"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CircleDot, Gem, Ruler, Sparkles } from "lucide-react";
import { formatPrice, products } from "@/lib/catalog";
import { useStore } from "@/components/store-provider";
import { useRingBuilder } from "@/hooks/use-ring-builder";

const settings = [
  { name: "The Solenne", detail: "A refined four-prong solitaire", price: 1380, image: products[0].image },
  { name: "The Margot", detail: "A softly sculpted cathedral setting", price: 1640, image: products[4].image },
  { name: "The Celeste", detail: "A delicate hidden halo setting", price: 1790, image: products[5].image },
];
const stones = [
  { name: "Round brilliant", detail: "Exceptional fire, timeless form", carat: "1.00 ct", price: 1490 },
  { name: "Oval brilliant", detail: "A little more length, a lot of light", carat: "1.20 ct", price: 1680 },
  { name: "Emerald cut", detail: "A quiet, architectural brilliance", carat: "1.10 ct", price: 1580 },
];
const metals = ["18K Yellow Gold", "18K White Gold", "14K Rose Gold", "Platinum"];

export function RingBuilder() {
  const { addToCart, currency } = useStore();
  const { step, setStep, setting, setSetting, stone, setStone, metal, setMetal, size, setSize } = useRingBuilder();
  const [added, setAdded] = useState(false);
  const total = settings[setting].price + stones[stone].price + (metal === "Platinum" ? 490 : metal === "18K White Gold" ? 90 : 0);
  const preview = { ...products[0], title: `${settings[setting].name} ${stones[stone].name}`, price: total, metal, carat: stones[stone].carat, stone: "Certified diamond" };

  return (
    <main className="builder-page">
      <div className="builder-breadcrumb"><Link href="/">Home</Link><span>/</span><span>Ring builder</span></div>
      <div className="builder-page-heading"><p className="eyebrow">AURELIA, made yours</p><h1>Begin with a feeling.</h1><p>Three thoughtful choices. One ring, completely your own.</p></div>
      <div className="builder-workspace">
        <div className="builder-preview" style={{ backgroundImage: `url("${settings[setting].image}")` }}>
          <span className="preview-label"><Sparkles size={14} /> YOUR RING, TAKING SHAPE</span>
          <div className="preview-spec"><span>{metal}</span><span>{stones[stone].carat} · Size {size}</span></div>
        </div>
        <section className="builder-steps-panel">
          <div className="step-progress">{["Setting", "Stone", "Your details"].map((label, index) => <button aria-current={step === index ? "step" : undefined} className={step === index ? "step-marker active" : step > index ? "step-marker complete" : "step-marker"} key={label} onClick={() => setStep(index)}><span>{step > index ? <Check size={13} /> : `0${index + 1}`}</span>{label}</button>)}</div>
          {step === 0 && <><p className="eyebrow">Step one · choose a setting</p><h2>Start with the silhouette.</h2><div className="builder-option-list">{settings.map((option, index) => <button aria-pressed={setting === index} className={setting === index ? "builder-option selected" : "builder-option"} key={option.name} onClick={() => setSetting(index)}><span className="option-image" style={{ backgroundImage: `url("${option.image}")` }} /><span className="builder-option-copy"><strong>{option.name}</strong><small>{option.detail}</small></span><strong>{formatPrice(option.price, currency)}</strong></button>)}</div></>}
          {step === 1 && <><p className="eyebrow">Step two · find your stone</p><h2>One that speaks to you.</h2><div className="builder-option-list">{stones.map((option, index) => <button aria-pressed={stone === index} className={stone === index ? "builder-option stone-option selected" : "builder-option stone-option"} key={option.name} onClick={() => setStone(index)}><span className="stone-icon"><Gem size={21} strokeWidth={1.2} /></span><span className="builder-option-copy"><strong>{option.name}</strong><small>{option.detail} · {option.carat}</small></span><strong>{formatPrice(option.price, currency)}</strong></button>)}</div><p className="builder-note"><CircleDot size={15} /> Every center stone comes with an independent grading report.</p></>}
          {step === 2 && <><p className="eyebrow">Step three · your finishing touches</p><h2>Made for your hand.</h2><label className="builder-select-label">Choose your metal<select onChange={(event) => setMetal(event.target.value)} value={metal}>{metals.map((option) => <option key={option}>{option}</option>)}</select></label><label className="builder-select-label">Choose your ring size <span><Ruler size={14} /> Need help? <button onClick={() => window.print()}>View size guide</button></span><select onChange={(event) => setSize(event.target.value)} value={size}>{["5", "5.5", "6", "6.5", "7", "7.5", "8"].map((option) => <option key={option} value={option}>Size {option}</option>)}</select></label><div className="builder-total"><span>Your considered total</span><strong>{formatPrice(total, currency)}</strong><small>Includes setting, stone, and hand-finishing</small></div></>}
          <div className="builder-panel-footer">{step > 0 && <button className="builder-back" onClick={() => setStep(step - 1)}><ArrowLeft size={15} /> Back</button>}{step < 2 ? <button className="button button-dark" onClick={() => setStep(step + 1)}>Continue <ArrowRight size={15} /></button> : <button className="button button-dark" onClick={() => { addToCart(preview, { metal, ringSize: size }); setAdded(true); }}>{added ? <><Check size={16} /> Added to your bag</> : <>Make it yours · {formatPrice(total, currency)} <ArrowRight size={15} /></>}</button>}</div>
        </section>
      </div>
      <p className="builder-reassurance"><Sparkles size={15} /> Made to order in our atelier · 3–4 weeks · Complimentary insured delivery</p>
    </main>
  );
}
