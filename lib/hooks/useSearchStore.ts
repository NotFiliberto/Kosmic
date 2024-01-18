import { Location } from "@lib/types"
import { create } from "zustand"

export interface SearchState {
	placesFound: Omit<Location, "_id" | "pinned" | "pollutionRate">[]
	searchInput: string | undefined
	setSearchInput: (input: string | undefined) => void
	setPlacesFound: (
		places: Omit<Location, "_id" | "pinned" | "pollutionRate">[]
	) => void
	reset: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
	searchInput: undefined,
	placesFound: [],
	setSearchInput: (input) => set(() => ({ searchInput: input })),
	setPlacesFound: (places) => set(() => ({ placesFound: [...places] })),
	reset: () => set(() => ({ searchInput: undefined, placesFound: [] })),
}))
