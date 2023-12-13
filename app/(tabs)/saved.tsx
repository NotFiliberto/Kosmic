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

    // List data
    const savedPlacesFromLocalDB = [
        { id: "1", name: "Vittorio Veneto", value: 21.08, pinned: true },
        { id: "2", name: "Mestre", value: 19.71, pinned: true },
        { id: "3", name: "45.3661, 11.6649", value: 15.18, pinned: true }
	/* { id: "3", name: "45.3661, 11.6649", value: 15.18, pinned: true },
	{ id: "3", name: "45.3661, 11.6649", value: 15.18, pinned: true },
	{ id: "3", name: "45.3661, 11.6649", value: 6.18, pinned: true } */
    ] 

    // Data for ScrollView and State usage
    const [ places, setPlaces ] = useState<typeof savedPlacesFromLocalDB>(
        savedPlacesFromLocalDB
    );

    const [unic, setUnic] = React.useState(3)  

    // Delete handler
    const deleteListItem = ( index: number ) =>
    {
        Alert.alert( 'Delete', "Are you sure?", [
            {
                text: 'Confirm',
                onPress: () => {
                    console.log( 'Okay, deleting  index', index )
                    handleDeleteItem(index)
                },
            },
        ] );
    }

    // Update pin when false added -> maybe not needed
    const updatePinnedAllOrCondition = ( flag: boolean, conditionTrue: boolean, conditionFalse: boolean ) => {
        places.forEach( ( i ) =>
        {
            if ( i )
            {
                if (i &&  conditionTrue && i.pinned == false )
                    i.pinned = true
                /* if( conditionTrue )
                    i.pinned = true */
                if ( i && !conditionFalse && !conditionTrue )
                {
                    i.pinned = flag
                }
            }
        })
    };

    // Use full type: list: ( { id: string; name: string; value: number; pinned: boolean } | undefined )[]
    const updatePinnedListItem = ( id: string | undefined, pinned: boolean) =>
    {
        places.forEach( ( i ) =>
        {
            if ( i && i?.id == id )
            {
                i.pinned = pinned
            }
        })
    }
        
    // Handles add place button
    const handleOnPressAdd = ( event: GestureResponderEvent ) =>
    {
        setUnic( unic + 1 )
        const copy = places
        // remember this is an array! You need []
        setPlaces([...copy, {
                id: (unic).toString(),
                name: 'Place ' + (unic).toString() + ' (3.33, ' + (Math.floor(Math.random() * 100 + places.length * 2.30)).toString() + ')',
                value: Math.random() * 30 + (40 - 10), 
                pinned: true,
        } ] )
        
        console.log(places)
        console.log('Button pressed! Unic: ', unic);
		
    };

    // Deletes the item from the list at the specified index
    const handleDeleteItem = (index: number) =>
    {
        const copy = places
        copy.splice(index, 1)
        setPlaces( [ ...copy ])
    }

    // Finds the position in data of an item through its specified ID
    const findPositionItem = ( id: string | undefined) => {
        for ( let i = 0; i < places.length;  i++)
        {
            if ( places && places[i] )
            {
                const current = places[ i ]
                if ( current.id == id )
                {
                    return i;
                }
            }
        }
        return 0;
    }

    // handles when Pin icon gets toggled
    const handleTogglePin = ( item: { id: string; name: string; value: number; pinned: boolean } | undefined ) =>
    {
        // Each tap has means changes in the data
        updatePinnedListItem( item?.id, item?.pinned == true )
        updatePinnedAllOrCondition( true, true, false )
        for ( let i = 0; i < places.length; i++ )
        {
            console.log( "Luoghi prima:", places[ i ], "\n" )
        }
        // Assume that id's are unic so you have to search their new position first
        const position = findPositionItem( item?.id )
        console.log( "Selected place name: ", item?.name, " data list position: ", position) 
        deleteListItem( position )
         for ( let i = 0; i < places.length; i++ )
        {
            console.log( "Luoghi dopo:", places[ i ], "\n" )
        }
    }
    

    return (
        <View
            style={ styles.container } 
        >
           {/*  <RefreshControl
                //style={{ flex: 1,}}
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={ ['#FF002B', '#0066FF', '#00FF11'] }
            > */}

                { /* Header with button */ }
                <View style={styles.header}>
                    <Text style={styles.title}>I miei luoghi</Text>
                    <Pressable 
                        style={ styles.button } 
                        onPress={ handleOnPressAdd }
                    >
                        <Text style={styles.textButton}>Add</Text>
                    </Pressable>
            </View>
            
            { /* ScrollView of Location(s) */ }
            <ScrollView style={ styles.list } >
                {
                    
                    places.map( ( place, index ) =>
                    {
                        return (   
                            <View style={ {
                                flex: 1,
                                justifyContent: 'space-between'
                            } } key={ index }>
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
            
            {/* <Card name="test" /> */}
            {/* <EditScreenInfo path="app/(tabs)/three.tsx" /> */}
        {/*</RefreshControl> */}
            
        </View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		/* alignItems: "center",
        justifyContent: "center", 
        backgroundColor: 'red',*/
        paddingHorizontal: 20,
        //marginVertical: 10,
        paddingBottom: 10,
	},
    header: {
        //flex: 1, // we leave it static because otherwise conflicts with list ScrollView
		flexDirection: "row",
		alignItems: 'flex-start', // y
		justifyContent: 'space-between', // x
        /* borderColor: 'orange', */
         borderWidth: 4,
        //marginBottom: 0,
        paddingRight: 10,
        marginBottom: 10,
    },
    title: {
        //flex: 1,
		fontSize: 30,
        fontWeight: "bold",
        //fontStyle: 'italic',
        //textAlign: "center"
	},
    button: {
        //flex: 0.5,
        /* width: '30%',
        height: '50%', */
        /* backgroundColor: 'blue',
        borderColor: 'grey', */
        borderWidth: 4,
        borderRadius: 15,
        justifyContent: 'space-evenly',
        //alignItems: 'center',
        //padding: 20,
        /* marginHorizontal: 20,
        marginVertical: 40, */

    },
    textButton: {
        //flex: 1,
        //borderWidth: 2,
        fontSize: 25,
        fontWeight: '600',
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 8,
    },
    list: {
        flex: 1,
        borderWidth: 4,
        //marginVertical: 20, // has no effect
        marginTop: 10,
        marginBottom: 0,
    }
});
