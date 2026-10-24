"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense, useRef } from "react";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";

export function ProductRail() {
  const swiper = useRef<SwiperType | null>(null);
  return (
    <section className="best-sellers section-wrap">
      <div className="section-heading">
        <div><p className="eyebrow">The pieces you return to</p><h2>Considered classics</h2></div>
        <div className="rail-controls">
          <Link className="text-link" href="/collections/all">Discover all pieces <span>↗</span></Link>
          <button aria-label="Previous pieces" className="rail-arrow" onClick={() => swiper.current?.slidePrev()}><ChevronLeft size={18} /></button>
          <button aria-label="Next pieces" className="rail-arrow" onClick={() => swiper.current?.slideNext()}><ChevronRight size={18} /></button>
        </div>
      </div>
      <Suspense fallback={<div className="rail-loading" aria-label="Loading jewelry collection" />}>
        <Swiper
          breakpoints={{ 0: { slidesPerView: 1.35, spaceBetween: 14 }, 620: { slidesPerView: 2.25, spaceBetween: 18 }, 980: { slidesPerView: 3.5, spaceBetween: 22 }, 1280: { slidesPerView: 4, spaceBetween: 24 } }}
          modules={[Navigation, A11y]}
          onSwiper={(instance) => { swiper.current = instance; }}
          slidesPerView={4}
          spaceBetween={24}
        >
          {products.map((product) => <SwiperSlide key={product.id}><ProductCard product={product} /></SwiperSlide>)}
        </Swiper>
      </Suspense>
    </section>
  );
}
