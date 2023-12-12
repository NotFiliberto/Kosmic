import { RefreshControl, StyleSheet, ScrollView, Pressable, Alert } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import Location from "../../components/Location";

import React, { useState } from 'react'
import { FlatList } from "react-native-gesture-handler";

type CardProps = {
    name: string;
    qta?: number;
};

export default function TabTwoScreen() {

    // Data for FlatList
    const [Places, setPlaces] = useState([
        { key: 1, name: "Vittorio Veneto", 
          value: 21.08, pinned: true },
        { key: 2, name: "Mestre", 
          value: 19.71, pinned: true },
        { key: 3, name: "45.3661, 11.6649", 
          value: 15.18, pinned: true },
    ] )
    
    // Delete handler: take in accounts that data keys start from 1 to n and access is from 0 to n-1
    const deleteListItem = (index: number) => {
        Alert.alert('Delete', "Are you sure?", [
            {
                text: 'Cancel',
                onPress: () => {
                    console.log('Cancel operation confirmed')
                },
                style: 'cancel'
            },
            {
                text: 'Confirm',
                onPress: () => {
                    console.log('Okay, deleting  index', index)
                    setPlaces( ( prevState ) => {
                        console.log("State before:\n", prevState)
                        const removed = prevState.splice(index - 1, 1)
                        console.log("State after:\n", prevState)
                        return [...prevState]
                    });
                },
            },
        ]);
    }


    // set refresh value
    const [refreshing, setRefreshing] = React.useState(false)
    // handle refresh List
    const onRefreshSaved = React.useCallback(
        ()=>{
            setRefreshing(true)
            const newVal = Math.floor(Math.random() * (25 - 10) + 10)
            
            // Per testare il toggle del pin
            Places.forEach( (i) => { 
                console.log( i ) 
                /* if ( i.pinned == false )
                {
                    //deleteListItem(i.key)
                } */
                console.log("\n")
            }) 
            console.log("\n\n\n")

            setTimeout( () => {
                setRefreshing(false)
            }, 1500 )
            
            // opzionale per i test
            Places.push( 
                {
                    key: (Places.length + 1),
                    name: 'Place ' + (Places.length + 1).toString(),
                    value: newVal,
                    pinned: true,
                }
            )

        }, []
    );

    return (
        <View
        style={styles.container} 
        >
            { /* Controls the generic page refresh */ }
            <RefreshControl
                style={{ flex: 1,}}
                refreshing={refreshing}
                onRefresh={onRefreshSaved}
                colors={ ['#FF002B', '#0066FF', '#00FF11'] }
            >
            
                { /* Header with button */ }
                <View style={styles.header}>
                    <Text style={styles.title}>Luoghi salvati</Text>
                    <Pressable 
                    style={ styles.button } 
                    onPress={ onRefreshSaved }
                    >
                        <Text style={styles.textButton}>Clicca qui</Text>
                    </Pressable>
                </View>
                { /* Separator*/ }
                <View
                    style={styles.separator}
                    lightColor="#eee"
                    darkColor="rgba(255,255,255,0.1)"
                />
                { /* FlatList of Location(s) */ }
                <FlatList
                keyExtractor={(item, index) => index.toString() }
                data={Places}
                extraData={Places} // ultra importante per vedere quando i dati cambiano
                contentContainerStyle={
                    { 
                        /* alignContent: 'center',*/
                        justifyContent: 'center',
                        padding: 20, // padding resolves the problem
                        // spacing above and bottom
                        //marginVertical: 10, // margin creates the problem
                    }
                }
                    renderItem={ ( { item } ) =>
                    {
                        // test here
                        return (
                            <Location
                                name={ item.name }
                                pinned={ item.pinned } 
                                value={ item.value }
                                onTogglePinned={ ( props ) =>
                                {
                                    item.pinned = props.pinned == true ? false : true
                                    deleteListItem( item.key )
                                    //item.key= 
                                }}  
                    ></Location>
                    ) } 
                }
                ItemSeparatorComponent={() => <View style={{height: 20}} />}
    
                >
                </FlatList>

            </RefreshControl>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        /* alignItems: "center",
        justifyContent: "center", */
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        /* borderColor: 'orange',
        borderWidth: 4, */
        padding: 20,

    },
    button: {
        /* backgroundColor: 'blue',
        borderColor: 'grey', */
        borderWidth: 4,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
    },
    textButton: {
        fontSize: 20,
        fontWeight: '600',
        height: '25%',
        textAlign: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 3,
        width: "80%",
        //color: 'white'
    },
});
