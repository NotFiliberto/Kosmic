import {
    RefreshControl,
    StyleSheet,
    ScrollView,
    Pressable,
    Alert,
    GestureResponderEvent,
} from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Location from "../../components/Location";

import React, { useState } from "react";


export default function TabTwoScreen ()
{

    // List data: id's must be unic at the beginning
    const savedPlacesFromLocalDB = [
        { id: "1", name: "Vittorio Veneto", value: 21.08, pinned: true },
        { id: "2", name: "Mestre", value: 19.71, pinned: true },
        { id: "3", name: "45.3661, 11.6649", value: 15.18, pinned: true },
        { id: "4", name: "Silea", value: 21.08, pinned: true },
        { id: "5", name: "Treviso", value: 19.71, pinned: true },
        { id: "6", name: "Omae", value: 15.18, pinned: true },
        { id: "7", name: "Top", value: 21.08, pinned: true },
        { id: "8", name: "Idk", value: 19.71, pinned: true },
        { id: "9", name: "45.3661, 11.6649", value: 15.18, pinned: true }
    ] 

    // Data for ScrollView and State usage
    const [ places, setPlaces ] = useState<typeof savedPlacesFromLocalDB>(
        savedPlacesFromLocalDB
    );

    const [unic, setUnic] = React.useState(places.length + 1)  

    // Update any prop setting a specified value in a specified position in the List
    const updateListItem = (index: number, nameProp: string, value: any | undefined) => {
        // strategy: copy -> make changes: [index].prop = newValye -> set([...copy])
        const copy = places
        copy[ index ] = { ...copy[ index ], [ nameProp ]: value } // Remember that props names are seen as a list here
        // remember its'a list -> []
        setPlaces([...copy])
    };

    // Pushes a specified item { props: values} to the List if it's not undefined type
    const addListItem = ( item: {
        id: string; name: string; value: number; pinned: boolean } ) =>
    {
        // strategy: copy -> changes on Current if needed -> set
        const copy = places
        copy.push( item )
        setPlaces( [ ...copy ] ) // remember it's a list
    }
        
    // Handles add place button
    const handleOnPressAdd = ( event: GestureResponderEvent ) =>
    {
        setUnic( unic + 1 )
        addListItem( {
            id: unic.toString(),
            name: 'Place ' + ( unic ).toString() + ' (3.33, ' + ( Math.floor( Math.random() * 100 + places.length * 2.30 ) ).toString() + ')',
            value: Math.random() * 30 + ( 25 - 10 ),
            pinned: true
        } )
    };

    // Finds the position in data of an item through its specified ID
    const findPositionItem = ( id: string | undefined) => {
        for ( let i = 0; i < places.length;  i++){
            if ( places && places[i] ){
                const current = places[ i ]
                if ( current.id == id ){
                    return i;
                }
            }
        }
        return 0;
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
        <ScrollView
            style={ styles.container } 
        >
            <Text style={styles.title}>I miei luoghi</Text>
            { /* Header with button */ }
            {/* <View style={styles.header}>
                <Text style={styles.title}>I miei luoghi</Text>
                <Pressable 
                    style={ styles.button } 
                    onPress={ handleOnPressAdd }
                >
                    <Text style={styles.textButton}>Add</Text>
                </Pressable>
            </View> */}
            
            { /* ScrollView of Location(s) */ }
            <ScrollView style={ styles.list } >
                {
                    
                    places.map( ( place, index ) =>
                    {
                        return (   
                            <View style={ styles.item }
                                key={ index }>
                                {
                                    place && (
                                        <Location
                                            id={ place.id }
                                            name={ place.name }
                                            pinned={ place.pinned }
                                            value={ place.value }
                                            onTogglePinned={ handleTogglePin }
                                        />
                                    ) }
                            </View>
                        )}
                    ) }
            </ScrollView>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginBottom: 0,
    },
    header: {
        flexDirection: "row",
        alignItems: 'flex-start', 
        paddingRight: 10,
        marginBottom: 0,
    },
    title: {
        width: '70%',
        fontSize: 31,
        fontWeight: "bold",
        fontFamily: 'Roboto',
        marginBottom: 10,
        borderWidth: 2,
    },
    button: {
        flex: 0.5,
        borderWidth: 4,
        borderRadius: 15,
    },
    textButton: {
        flex: 1,
        fontSize: 25,
        fontWeight: '600',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    list: {
        width: '100%',
        borderColor: 'yellow',
        borderWidth: 4,

    },
    item: {
        flex: 1,
    }
});
