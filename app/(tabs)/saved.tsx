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

const Card = function ({ name, qta }: CardProps) {
    return (
        <>
            <Text>
                {name} - {qta}
            </Text>
        </>
    );
};

export default function TabTwoScreen() {

    // Data for FlatList
    const [Places, setPlaces] = useState([
        { key: 1, name: "Vittorio Veneto", 
          value: 21.08, pinned: false },
        { key: 2, name: "Mestre", 
          value: 19.71, pinned: true },
        { key: 3, name: "45.3661, 11.6649", 
          value: 15.18, pinned: true },
    ])

    // set refresh value
    const [refreshing, setRefreshing] = React.useState(false)
    // handle refresh List
    const onRefreshSaved = React.useCallback(
        ()=>{
            setRefreshing(true)
            const newVal = Math.floor(Math.random() * (25 - 10) + 10)
            
            // Per testare il toggle del pin
            Places.forEach( (i) => { 
                console.log(i) 
                console.log("\n")
            }) 
            console.log("\n\n\n")

            // console.log("\n\n\n")

            setTimeout( () => {
                // opzionale per i test
                Places.push( 
                    {
                        key: (Places.length + 1),
                        name: 'Place ' + (Places.length + 1).toString(),
                        value: Math.floor(Math.random()  *  25 + (25 - 10)),
                        pinned: true,
                    }
                )
                setRefreshing(false)
            }, 1500)

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
                        alignContent: 'center',
                        marginTop: 20,
                    }
                }
                renderItem={ ( { item } ) => {

                    if( item.pinned == false ){
                        //deleteListItem(item.key - 1)

                        console.log("\nI love this\n")
                    }

                    return (
                    <Location
                    k={ item.key }
                    name={ item.name }
                    pinned={ item.pinned } 
                    value={ item.value }
                    onTogglePinned={ (index, value) => {
                        item.pinned = value ? false : true
                    }}  
                    ></Location>
                    ) } 
                }
                ItemSeparatorComponent={() => <View style={{height: 20}} />}
    
                >
                </FlatList>

            </RefreshControl>
            
            {/* <Card name="test" /> */}
            {/* <EditScreenInfo path="app/(tabs)/three.tsx" /> */}
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
        backgroundColor: 'blue',
        borderColor: 'grey',
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
        height: 1,
        width: "80%",
        //color: 'white'
    },
});
