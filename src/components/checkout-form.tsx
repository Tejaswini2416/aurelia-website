"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, LockKeyhole, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import { useStore } from "@/components/store-provider";

export function CheckoutForm() {
  const { cart, checkoutOptions, clearCart, currency } = useStore();
  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState("Credit or debit card");
  const [complete, setComplete] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  const total = subtotal + (checkoutOptions.insured ? 18 : 0);

  function continueToPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep(1);
  }

  if (complete) {
    return (
      <main className="checkout-page checkout-complete">
        <div className="checkout-success">
          <span><Check size={25} /></span>
          <p className="eyebrow">Checkout preview complete</p>
          <h1>Thank you.</h1>
          <p>No payment was collected and no order was placed. Connect a payment provider and order API to enable live checkout.</p>
          <Link className="button button-dark" href="/">Return to AURELIA</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-main">
        <Link className="checkout-brand" href="/">AURELIA <span>FINE JEWELRY</span></Link>
        <div className="checkout-steps">
          <span className={step === 0 ? "current" : "done"}>01 · Delivery</span>
          <span>—</span>
          <span className={step === 1 ? "current" : ""}>02 · Payment</span>
        </div>
        {cart.length === 0 ? (
          <div className="checkout-empty">
            <h1>Your bag is waiting.</h1>
            <p>Choose a piece and it will be here when you’re ready.</p>
            <Link className="button button-dark" href="/collections/all">Explore the collection</Link>
          </div>
        ) : step === 0 ? (
          <section>
            <p className="eyebrow">Your delivery, thoughtfully handled</p>
            <h1>Where should we send it?</h1>
            <form className="checkout-form-grid" id="delivery-form" onSubmit={continueToPayment}>
              <label>First name<input autoComplete="given-name" name="givenName" placeholder="First name" required /></label>
              <label>Last name<input autoComplete="family-name" name="familyName" placeholder="Last name" required /></label>
              <label className="full">Email address<input autoComplete="email" name="email" placeholder="you@example.com" required type="email" /></label>
              <label className="full">Address<input autoComplete="street-address" name="address" placeholder="Street and number" required /></label>
              <label>City<input autoComplete="address-level2" name="city" placeholder="City" required /></label>
              <label>Postal code<input autoComplete="postal-code" name="postalCode" placeholder="ZIP / postal code" required /></label>
              <label>Country<select autoComplete="country-name" defaultValue="United States" name="country"><option>United States</option><option>United Kingdom</option><option>Canada</option><option>Australia</option></select></label>
              <label>Phone (optional)<input autoComplete="tel" name="phone" placeholder="+1" type="tel" /></label>
            </form>
            <div className="shipping-choice">
              <ShieldCheck size={18} />
              <span><strong>Express insured shipping</strong><small>Complimentary · 2–4 business days · signature required</small></span>
              <Check size={17} />
            </div>
            <button className="button button-dark checkout-next" form="delivery-form" type="submit">Continue to payment <ArrowRight size={16} /></button>
          </section>
        ) : (
          <section>
            <p className="eyebrow">A secure, considered checkout</p>
            <h1>How would you like to pay?</h1>
            <div className="payment-options">
              {["Credit or debit card", "Apple Pay", "Klarna · pay over time", "EMI · monthly installments"].map((option) => (
                <label className={payment === option ? "payment-option selected" : "payment-option"} key={option}>
                  <input checked={payment === option} name="payment" onChange={() => setPayment(option)} type="radio" />
                  <span>{option}</span>
                  <span>{payment === option ? <Check size={16} /> : null}</span>
                </label>
              ))}
            </div>
            <div className="secure-note"><LockKeyhole size={15} /> Payment provider connection required. This preview does not collect card details.</div>
            <div className="checkout-action-row">
              <button className="checkout-back" onClick={() => setStep(0)}><ArrowLeft size={15} /> Back</button>
              <button className="button button-dark" onClick={() => { setComplete(true); clearCart(); }}>Complete demo checkout · {formatPrice(total, currency)} <ArrowRight size={15} /></button>
            </div>
          </section>
        )}
      </div>
      {cart.length > 0 && (
        <aside className="checkout-summary">
          <p className="eyebrow">A little anticipation</p>
          <h2>Your pieces</h2>
          {cart.map((item) => (
            <div className="checkout-line-item" key={`${item.product.id}-${item.metal}-${item.ringSize}`}>
              <div className="checkout-line-image" style={{ backgroundImage: `url("${item.product.image}")` }}><span>{item.quantity}</span></div>
              <div><strong>{item.product.title}</strong><small>{item.metal}{item.ringSize ? ` · Size ${item.ringSize}` : ""}{item.engraving ? ` · Engraved “${item.engraving}”` : ""}</small></div>
              <span>{formatPrice(item.product.price * item.quantity, currency)}</span>
            </div>
          ))}
          {checkoutOptions.giftBox && checkoutOptions.giftNote && <p className="checkout-gift-note">Gift note: “{checkoutOptions.giftNote}”</p>}
          <div className="checkout-totals">
            <p><span>Subtotal</span><span>{formatPrice(subtotal, currency)}</span></p>
            <p><span>Express shipping</span><span>Complimentary</span></p>
            {checkoutOptions.insured && <p><span>Insured shipping</span><span>{formatPrice(18, currency)}</span></p>}
            <p className="checkout-grand-total"><strong>Total</strong><strong>{formatPrice(total, currency)}</strong></p>
          </div>
          <p className="checkout-summary-note"><ShieldCheck size={15} /> Your order will be fully insured from our atelier to your door.</p>
        </aside>
      )}
    </main>
  );
}
