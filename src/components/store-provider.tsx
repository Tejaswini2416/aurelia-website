"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { Minus, Plus, ShieldCheck, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice, type Currency, type Product } from "@/lib/catalog";

export type CartItem = {
  product: Product;
  quantity: number;
  metal: string;
  ringSize?: string;
  engraving?: string;
};

export type CheckoutOptions = {
  giftBox: boolean;
  giftNote: string;
  insured: boolean;
};

type StoreContextValue = {
  cart: CartItem[];
  wishlist: string[];
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  checkoutOptions: CheckoutOptions;
  setCheckoutOptions: (options: CheckoutOptions) => void;
  addToCart: (product: Product, options?: Partial<Omit<CartItem, "product" | "quantity">>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
  cartOpen: boolean;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used inside StoreProvider");
  return value;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [checkoutOptions, setCheckoutOptions] = useState<CheckoutOptions>({
    giftBox: true,
    giftNote: "",
    insured: true,
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const savedCart = localStorage.getItem("aurelia-cart");
        const savedWishlist = localStorage.getItem("aurelia-wishlist");
        const savedCurrency = localStorage.getItem("aurelia-currency");
        const savedCheckoutOptions = localStorage.getItem("aurelia-checkout-options");
        if (savedCart) setCart(JSON.parse(savedCart) as CartItem[]);
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist) as string[]);
        if (savedCurrency === "USD" || savedCurrency === "EUR" || savedCurrency === "GBP") setCurrency(savedCurrency);
        if (savedCheckoutOptions) setCheckoutOptions(JSON.parse(savedCheckoutOptions) as CheckoutOptions);
      } catch (error) {
        console.error("Unable to restore the saved Aurelia shopping bag.", error);
      } finally {
        setReady(true);
      }
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("aurelia-cart", JSON.stringify(cart));
    localStorage.setItem("aurelia-wishlist", JSON.stringify(wishlist));
    localStorage.setItem("aurelia-currency", currency);
    localStorage.setItem("aurelia-checkout-options", JSON.stringify(checkoutOptions));
  }, [cart, checkoutOptions, currency, wishlist, ready]);

  const addToCart = useCallback(
    (
      product: Product,
      options: Partial<Omit<CartItem, "product" | "quantity">> = {},
    ) => {
      const metal = options.metal ?? product.metal;
      const ringSize = options.ringSize;
      const engraving = options.engraving;
      const lineId = [product.id, metal, ringSize ?? "", engraving ?? ""].join(":");
      setCart((items) => {
        const existing = items.find(
          (item) =>
            [item.product.id, item.metal, item.ringSize ?? "", item.engraving ?? ""].join(":") ===
            lineId,
        );
        if (existing) {
          return items.map((item) =>
            item === existing ? { ...item, quantity: item.quantity + 1 } : item,
          );
        }
        return [...items, { product, quantity: 1, metal, ringSize, engraving }];
      });
      setCartOpen(true);
    },
    [],
  );

  const removeFromCart = useCallback((id: string) => {
    setCart((items) =>
      items.filter(
        (item) =>
          [item.product.id, item.metal, item.ringSize ?? "", item.engraving ?? ""].join(":") !==
          id,
      ),
    );
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCart((items) =>
      items
        .map((item) =>
          [item.product.id, item.metal, item.ringSize ?? "", item.engraving ?? ""].join(":") === id
            ? { ...item, quantity }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  }, []);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      currency,
      setCurrency,
      checkoutOptions,
      setCheckoutOptions,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart: () => setCart([]),
      toggleWishlist,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      cartOpen,
    }),
    [addToCart, cart, cartOpen, checkoutOptions, currency, removeFromCart, toggleWishlist, updateQuantity, wishlist],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <CartDrawer />
    </StoreContext.Provider>
  );
}

function CartDrawer() {
  const { cart, cartOpen, checkoutOptions, closeCart, currency, removeFromCart, setCheckoutOptions, updateQuantity } = useStore();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    if (!cartOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [cartOpen, closeCart]);

  if (!cartOpen) return null;

  return (
    <div className="drawer-backdrop" onMouseDown={closeCart}>
      <aside
        aria-label="Shopping bag"
        aria-modal="true"
        className="cart-drawer"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="drawer-heading">
          <div>
            <p className="eyebrow">A little something beautiful</p>
            <h2>Your bag <span>({count})</span></h2>
          </div>
          <button aria-label="Close bag" className="icon-button" onClick={closeCart}>
            <X size={20} />
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="empty-bag">
            <ShoppingBag size={34} strokeWidth={1.2} />
            <h3>Your bag is waiting</h3>
            <p>Discover a piece to treasure for a lifetime.</p>
            <button className="button button-dark" onClick={closeCart}>Explore the collection</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => {
                const id = [item.product.id, item.metal, item.ringSize ?? "", item.engraving ?? ""].join(":");
                return (
                  <article className="cart-item" key={id}>
                    <div
                      aria-label={item.product.title}
                      className="cart-item-image"
                      role="img"
                      style={{ backgroundImage: `url("${item.product.image}")` }}
                    />
                    <div className="cart-item-copy">
                      <div className="cart-item-top">
                        <div>
                          <h3>{item.product.title}</h3>
                          <p>{item.metal} · {item.product.carat}</p>
                          {item.ringSize && <p>Size {item.ringSize}</p>}
                          {item.engraving && <p>Engraving: “{item.engraving}”</p>}
                        </div>
                        <button
                          aria-label={`Remove ${item.product.title}`}
                          className="text-button"
                          onClick={() => removeFromCart(id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="cart-item-bottom">
                        <div className="quantity-control">
                          <button aria-label="Decrease quantity" onClick={() => updateQuantity(id, item.quantity - 1)}><Minus size={13} /></button>
                          <span>{item.quantity}</span>
                          <button aria-label="Increase quantity" onClick={() => updateQuantity(id, item.quantity + 1)}><Plus size={13} /></button>
                        </div>
                        <strong>{formatPrice(item.product.price * item.quantity, currency)}</strong>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="cart-extras">
              <label className="option-row">
                <input checked={checkoutOptions.giftBox} onChange={(event) => setCheckoutOptions({ ...checkoutOptions, giftBox: event.target.checked })} type="checkbox" />
                <span><strong>Complimentary gift packaging</strong><small>Wrapped with care, always on us</small></span>
              </label>
              {checkoutOptions.giftBox && <input className="gift-note" aria-label="Gift card note" maxLength={200} onChange={(event) => setCheckoutOptions({ ...checkoutOptions, giftNote: event.target.value })} placeholder="Add a note for your gift card (optional)" value={checkoutOptions.giftNote} />}
              <label className="option-row">
                <input checked={checkoutOptions.insured} onChange={(event) => setCheckoutOptions({ ...checkoutOptions, insured: event.target.checked })} type="checkbox" />
                <span><strong>Insure my delivery · $18</strong><small>Full coverage from our studio to your door</small></span>
              </label>
            </div>
            <div className="cart-summary">
              <div><span>Subtotal</span><strong>{formatPrice(subtotal, currency)}</strong></div>
              <div><span>Shipping</span><span>Complimentary</span></div>
              {checkoutOptions.insured && <div><span>Insured shipping</span><span>{formatPrice(18, currency)}</span></div>}
              <p><ShieldCheck size={15} /> Secure checkout · fully insured delivery</p>
              <Link className="button button-dark checkout-button" href="/checkout" onClick={closeCart}>
                Continue to checkout <span>{formatPrice(subtotal + (checkoutOptions.insured ? 18 : 0), currency)}</span>
              </Link>
              <button className="continue-shopping" onClick={closeCart}>Continue discovering</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
