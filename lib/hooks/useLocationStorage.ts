import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Location } from "@lib/types"
import uuid from "react-native-uuid"

interface LocationsState {
	locations: Location[]
	addLocation: (l: Omit<Location, "_id">) => void
	removeLocation: (l: Location) => void
	removeAllLocations: () => void
}

export const useLocationsStorage = create<LocationsState>()(
	persist(
		(set, get) => ({
			locations: [],
			addLocation: (l) => {
				const { pinned, ...rest } = l
				return set({
					locations: [
						...get().locations,
						{
							_id: String(uuid.v4()),
							pinned: true,
							...rest,
						},
					],
				})
			},
			removeLocation: (l) => {
				const oldLocations = [...get().locations]
				return set({
					locations: oldLocations.filter((ll) => ll._id != l._id),
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
