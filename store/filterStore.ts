import { create } from "zustand"

export type PropertyType = "apartment" | "house" | "studio" | "villa" |   "studio" | null

interface FilterState {
    search: string
    type:PropertyType
    minPrice: number | null
    maxPrice: number | null
    bedrooms: number | null

    setSearch: (value: string) => void
    setType: (value: PropertyType) => void
    setMinPrice: (value: number | null) => void
    setMaxPrice: (value: number | null) => void
    setBedrooms: (value: number | null) => void

    resetFilters: () => void
}

const useFilterStore = create<FilterState>((set) => ({
    search: '',
    type: null,
    minPrice: null,
    maxPrice: null,
    bedrooms: null,

    setSearch: (value) => set({ search: value }),
    setType: (value) => set({ type: value }),
    setMinPrice: (value) => set({ minPrice: value }),
    setMaxPrice: (value) => set({ maxPrice: value }),
    setBedrooms: (value) => set({ bedrooms: value }),

    resetFilters: () => set({
        search: '',
        type: null,
        minPrice: null,
        maxPrice: null,
        bedrooms: null,
    }),
}))

export default useFilterStore