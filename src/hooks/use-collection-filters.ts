"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";

export type CollectionSort = "Popularity" | "Price: low to high" | "Price: high to low" | "Newest";

export function useCollectionFilters(products: Product[]) {
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedPurities, setSelectedPurities] = useState<string[]>([]);
  const [selectedStones, setSelectedStones] = useState<string[]>([]);
  const [selectedCuts, setSelectedCuts] = useState<string[]>([]);
  const [sort, setSort] = useState<CollectionSort>("Popularity");
  const [columns, setColumns] = useState(4);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(5000);

  const visible = useMemo(() => {
    const result = products.filter((product) => {
      const metalMatch = !selectedMetals.length || selectedMetals.some((metal) => product.metal.includes(metal));
      const purityMatch = !selectedPurities.length || selectedPurities.includes(product.purity);
      const stoneMatch = !selectedStones.length || selectedStones.some((stone) => product.stone.toLowerCase().includes(stone.toLowerCase()));
      const cutMatch = !selectedCuts.length || selectedCuts.includes(product.cut);
      return metalMatch && purityMatch && stoneMatch && cutMatch && product.price <= maxPrice;
    });
    if (sort === "Price: low to high") result.sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") result.sort((a, b) => b.price - a.price);
    if (sort === "Newest") result.sort((a, b) => b.id.localeCompare(a.id));
    return result;
  }, [maxPrice, products, selectedCuts, selectedMetals, selectedPurities, selectedStones, sort]);

  function clearFilters() {
    setSelectedMetals([]);
    setSelectedPurities([]);
    setSelectedStones([]);
    setSelectedCuts([]);
    setMaxPrice(5000);
  }

  return {
    selectedMetals,
    setSelectedMetals,
    selectedPurities,
    setSelectedPurities,
    selectedStones,
    setSelectedStones,
    selectedCuts,
    setSelectedCuts,
    sort,
    setSort,
    columns,
    setColumns,
    filtersOpen,
    setFiltersOpen,
    maxPrice,
    setMaxPrice,
    visible,
    clearFilters,
  };
}
