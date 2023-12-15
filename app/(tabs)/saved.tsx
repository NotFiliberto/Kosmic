import {
    RefreshControl,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Pressable,
    Alert,
    GestureResponderEvent,
} from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Location from "../../components/Location";

import React, { useState } from "react";

// List data: id's must be unic at the beginning
    const savedPlacesFromLocalDB = [
        { id: "1", name: "Vittorio Venetofbiwbfiwbefbwiefbcwibcwicbiwcbiwcbiwcbwibcwbciwbciwbibieifbebfeibciebciebciebceicbeibcei", value: 21928392392839283293829.0898392892839238292, pinned: true },
        { id: "2", name: "Mestre", value: 19.71, pinned: true },
        { id: "3", name: "45.3661, 11.6649", value: 15.18, pinned: true },
        { id: "4", name: "Silea", value: 21.08, pinned: true },
        { id: "5", name: "Treviso", value: 19.71, pinned: true },
        { id: "6", name: "Omae", value: 15.18, pinned: true },
        { id: "7", name: "Top", value: 21.08, pinned: true },
        { id: "8", name: "Idk", value: 19.71, pinned: true },
        { id: "9", name: "45.3661, 11.6649", value: 15.18, pinned: true },
        { id: "7", name: "Top", value: 21.08, pinned: true },
        { id: "8", name: "Idk", value: 19.71, pinned: true },
        { id: "9", name: "45.3661, 11.6649", value: 15.18, pinned: true }
    ] 

export default function LocationScreen ()
{

    // Data for ScrollView and State usage
    const [ places, setPlaces ] = useState<typeof savedPlacesFromLocalDB>(
        savedPlacesFromLocalDB
    );

    // Update any prop setting a specified value in a specified position in the List
    const updateListItem = (index: number, nameProp: string, value: any | undefined) => {
        // strategy: copy -> make changes: [index].prop = newValye -> set([...copy])
        const copy = places
        copy[ index ] = { ...copy[ index ], [ nameProp ]: value } // Remember that props names are seen as a list here
        // remember its'a list -> []
        setPlaces([...copy])
    };

    // Finds the position in data of an item through its specified ID
    const findPositionItem = ( id: string | undefined) => {
        return places.findIndex( place => place.id == id )
    }

    const getCurrentPinned = ( index: number ) =>{
        const copy = places
        return copy[index].pinned
    }

    // handles when Pin icon gets toggled
    const handleTogglePin = ( id: string ) => {
        // solution to handle pintoggle (use icon handler where there is the click handler)
        const position = findPositionItem( id );
        const currentPinned = getCurrentPinned( position )
        updateListItem(position, 'pinned', !currentPinned)
        
};
    
    return (
        <SafeAreaView
            style={ styles.safe }
        >
        <ScrollView style={ styles.container } >
            {
                places.map( ( place, index ) =>
                {
                    return (   
                        <View style={ styles.item }
                            key={ index }>
                            {
                                (
                                    <Location
                                        id={ place.id }
                                        name={ place.name }
                                        pinned={ place.pinned }
                                        value={ place.value }
                                        onTogglePinned={ handleTogglePin }
                                    />
                                ) }
                        </View>
                    )
                })
            }
            <View
                style={{
                    marginBottom: 120,
                }}
            />
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create( {
    safe: {
        height: "100%",
        backgroundColor: "#fff",
        paddingTop: 100
    },
    container: {
        flex: 1,
        padding: 20,
        gap: 20,
        backgroundColor: "#fff",
    },
    item: {
        flex: 1,
    }
});
