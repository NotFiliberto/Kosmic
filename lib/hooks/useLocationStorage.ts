import { create } from "zustand"
import { persist, createJSONStorage, devtools } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Location } from "@lib/types"

interface LocationsState {
	locations: Location[]
	addLocation: (l: Omit<Location, "id">) => void
	removeLocation: (l: Location) => void
	removeAllLocations: () => void
}

export const useLocationsStorage = create<LocationsState>()(
	devtools(
		persist(
			(set, get) => ({
				locations: [],
				addLocation: (l) => {
					return set({
						locations: [
							...get().locations,
							{ id: String(get().locations.length), ...l },
						],
					})
				},
				removeLocation: (l) => {
					const oldLocations = [...get().locations]
					return set({
						locations: oldLocations.filter((ll) => ll.id != l.id),
					})
				},
				removeAllLocations: () => set({ locations: [] }),
			}),
			{
				name: "locations-storage", // name of the item in the storage (must be unique)
				storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
			}
		)
	)
)
