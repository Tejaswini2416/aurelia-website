"use client";

import Link from "next/link";
import { ArrowDownWideNarrow, Filter, Grid2X2, Grid3X3, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/catalog";
import { useCollectionFilters } from "@/hooks/use-collection-filters";

const metalOptions = ["Yellow Gold", "White Gold", "Rose Gold", "Platinum", "925 Silver"];
const purityOptions = ["14K", "18K", "22K"];
const stoneOptions = ["Diamond", "Emerald", "Ruby", "Sapphire"];
const cutOptions = ["Round", "Oval", "Princess", "Pear", "Emerald", "Cushion"];

export function CollectionView({ title, products }: { title: string; products: Product[] }) {
  const filters = useCollectionFilters(products);
  const {
    selectedMetals, setSelectedMetals, selectedPurities, setSelectedPurities,
    selectedStones, setSelectedStones, selectedCuts, setSelectedCuts,
    sort, setSort, columns, setColumns, filtersOpen, setFiltersOpen,
    maxPrice, setMaxPrice, visible, clearFilters,
  } = filters;
  const toggle = (value: string, selected: string[], setSelected: (items: string[]) => void) =>
    setSelected(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);

  const sidebar = (
    <>
      <div className="filter-group"><h3>Metal</h3>{metalOptions.map((metal) => <label className="filter-option" key={metal}><input checked={selectedMetals.includes(metal)} onChange={() => toggle(metal, selectedMetals, setSelectedMetals)} type="checkbox" />{metal}</label>)}</div>
      <div className="filter-group"><h3>Purity</h3>{purityOptions.map((purity) => <label className="filter-option" key={purity}><input checked={selectedPurities.includes(purity)} onChange={() => toggle(purity, selectedPurities, setSelectedPurities)} type="checkbox" />{purity}</label>)}</div>
      <div className="filter-group"><h3>Gemstone</h3>{stoneOptions.map((stone) => <label className="filter-option" key={stone}><input checked={selectedStones.includes(stone)} onChange={() => toggle(stone, selectedStones, setSelectedStones)} type="checkbox" />{stone}</label>)}</div>
      <div className="filter-group"><div className="filter-title-row"><h3>Price</h3><span>Up to ${maxPrice.toLocaleString()}</span></div><input aria-label="Maximum price" className="price-range" max="5000" min="500" onChange={(event) => setMaxPrice(Number(event.target.value))} step="100" type="range" value={maxPrice} /><div className="range-labels"><span>$500</span><span>$5,000+</span></div></div>
      <div className="filter-group"><h3>Diamond cut</h3>{cutOptions.map((cut) => <label className="filter-option" key={cut}><input checked={selectedCuts.includes(cut)} onChange={() => toggle(cut, selectedCuts, setSelectedCuts)} type="checkbox" />{cut}</label>)}</div>
      <button className="clear-filters" onClick={clearFilters}>Clear all filters</button>
    </>
  );

  return (
    <main className="collection-page">
      <div className="collection-breadcrumb"><Link href="/">Home</Link><span>/</span><span>{title}</span></div>
      <div className="collection-hero"><p className="eyebrow">The AURELIA collection</p><h1>{title}</h1><p>Thoughtfully made pieces, chosen to become part of your story.</p></div>
      <div className="collection-toolbar">
        <span>{visible.length} pieces</span>
        <div className="collection-toolbar-actions">
          <button className="mobile-filter-button" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={15} /> Filters</button>
          <label className="sort-select"><ArrowDownWideNarrow size={15} /><select aria-label="Sort products" onChange={(event) => setSort(event.target.value as typeof sort)} value={sort}><option>Popularity</option><option>Price: low to high</option><option>Price: high to low</option><option>Newest</option></select></label>
          <div className="grid-switcher"><button aria-label="Two columns" aria-pressed={columns === 2} onClick={() => setColumns(2)}><Grid2X2 size={16} /></button><button aria-label="Four columns" aria-pressed={columns === 4} onClick={() => setColumns(4)}><Grid3X3 size={16} /></button></div>
        </div>
      </div>
      <div className="collection-layout">
        <aside className="filters-sidebar"><div className="filters-sidebar-heading"><Filter size={16} /><span>Refine by</span></div>{sidebar}</aside>
        <div className={`collection-grid columns-${columns}`}>
          {visible.length ? visible.map((product) => <ProductCard key={product.id} product={product} />) : <div className="no-products"><p>No pieces found with those filters.</p><button className="text-link" onClick={clearFilters}>Clear filters ↗</button></div>}
        </div>
      </div>
      {filtersOpen && <div className="drawer-backdrop mobile-filters-backdrop" onMouseDown={() => setFiltersOpen(false)}><aside aria-label="Filters" aria-modal="true" className="filters-drawer" onMouseDown={(event) => event.stopPropagation()} role="dialog"><div className="drawer-heading"><h2>Refine by</h2><button aria-label="Close filters" className="icon-button" onClick={() => setFiltersOpen(false)}><X size={19} /></button></div>{sidebar}<button className="button button-dark" onClick={() => setFiltersOpen(false)}>Show {visible.length} pieces</button></aside></div>}
    </main>
  );
}
