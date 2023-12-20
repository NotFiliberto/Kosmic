import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Pressable,
} from "react-native";

import { View, Text } from "../../components/Themed";
import Location from "../../components/Location";

import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// List data: id's must be unic at the beginning
const savedPlacesFromLocalDB = [
	{
		id: "1",
		name: "NomeMoltoLungoNomeMoltoLungoNomeMoltoLungoNomeMoltoLungoNomeMoltoLungoNomeMoltoLungoNomeMoltoLungoNomeMoltoLungoNomeMoltoLungo",
		value: 30.0898392892839238292,
		pinned: true,
	},
	{ id: "2", name: "Vittorio Veneto", value: 19.71, pinned: true },
	{ id: "3", name: "Padova", value: 15.18, pinned: true },
	{ id: "4", name: "Silea", value: 21.08, pinned: true },
	{ id: "5", name: "Treviso", value: 19.71, pinned: true },
	{ id: "6", name: "Asseggiano", value: 15.18, pinned: true },
	{ id: "7", name: "Belluno", value: 21.08, pinned: true },
	{ id: "8", name: "Pieve di Soligo", value: 19.71, pinned: true },
	{ id: "9", name: "Mestre", value: 15.18, pinned: true },
	{ id: "10", name: "Montebelluna", value: 15.18, pinned: true },
	{ id: "11", name: "Villorba", value: 21.08, pinned: true },
];

export default function LocationScreen ()
{
    
    // ASYNC STORAGE STUFF

    /* 
        Converte l'array savedPlacesFromLocalDB in una stringa JSON e la salva con la 
        chiave @savedPlaces in AsyncStorage. Se il salvataggio ha successo, viene 
        visualizzato un messaggio di log.
    */
    const saveData = async (item : { id: string, name: string, value: number, pinned: boolean} | null) => {
        try
        {
            if ( item !== null && item )
            {
                addListItem(item)
            }
            await AsyncStorage.setItem( '@savedPlaces', JSON.stringify( places ) );
            console.log('Dati salvati correttamente.');
        } catch (error) {
            console.error('Errore nel salvataggio dei dati:', error);
        }
    };

    /* 
        Recupera i dati associati alla chiave @savedPlaces da AsyncStorage, li converte da stringa JSON e li utilizza. 
        Se non ci sono dati, viene visualizzato un messaggio di log.
    */
    const getData = async () => {
        try {
            const data = await AsyncStorage.getItem( '@savedPlaces' );
            if ( data !== null )
            {
                const parsedData = JSON.parse( data )
                console.log( 'Dati recuperati con successo: ' + (parsedData.length == 0 ? 'Last session cleaned all local storage' : 'n elem in storage: ' + parsedData.length) )
                // Quando faccio la get, la faccio al primo accesso e metto i dati precedenti
                // quelli che avevo salvato in locale l'ultima volta
                /* let copy = places
                copy = parsedData
                setPlaces([...copy]) */
            }
          
        } catch ( error )
        {
            console.error( 'Errore nel recupero dei dati:', error );

        }
    };

    const removeData = async () => {
         try {
            await AsyncStorage.removeItem( '@savedPlaces' );
            setPlaces([])
            console.log('Dati rimossi correttamente.');
        } catch (error) {
            console.error('Errore nel salvataggio dei dati:', error);
        }
    }


	// Data for ScrollView and State usage
    const [ places, setPlaces ] = useState<typeof savedPlacesFromLocalDB>(
        []
    );

    const [unic, setUnic] = React.useState( places ? places.length + 1 : 0) 
    
    // Add a specified place
    const addListItem = ( item: { id: string, name: string, value: number, pinned: boolean } ) =>
    {
        // Check id before add
        setUnic( unic + 1 )
        item.id = unic.toString()
        const copy = places
        if ( copy )
        {
            copy.push( item )
            setPlaces( [ ...copy ] )
        }
        saveData(null)
    }

    // Add a random place
    const addListItemRandom = () => {
        setUnic( unic + 1 )
        const id = unic.toString()
        const num = Math.floor( Math.random() * 25  + 15 )
        const s = 'Place ' + unic.toString()
        const item = { id: id, name: s, value: num, pinned: true }
        const copy = places
        if ( copy )
        {
            copy.push(item)
            setPlaces([...copy])
        } 
    }

	// Update any prop setting a specified value in a specified position in the List
	const updateListItem = (
		index: number,
		nameProp: string,
		value: any | undefined
	) => {
		// strategy: copy -> make changes: [index].prop = newValye -> set([...copy])
        const copy = places;
        if( copy )
		{copy[index] = { ...copy[index], [nameProp]: value }; // Remember that props names are seen as a list here
		// remember its'a list -> []
		setPlaces([...copy]);}
    };
    
    // Delete item with specified id
    const deleteListItem = ( index: number ) =>
    {
        const copy = places
        if ( copy )
        {copy.splice(index, 1)
        setPlaces( [ ...copy ] )  
        saveData(null)}
    }


	// Finds the position in data of an item through its specified ID
	const findPositionItem = (id: string | undefined) => {
		return places && places.findIndex((place) => place.id == id);
	};

	const getCurrentPinned = (index: number) => {
		const copy = places;
		return copy && copy[index].pinned;
	};

	// handles when Pin icon gets toggled
	const handleTogglePin = (id: string) => {
		// solution to handle pintoggle (use icon handler where there is the click handler)
        const position = findPositionItem( id );
        if( position )
		{const currentPinned = getCurrentPinned(position);
        updateListItem( position, "pinned", !currentPinned );
        deleteListItem(position)}
	};

        
    
    return (
        <SafeAreaView
            style={ styles.safe }
        >
            <View style={ styles.header }>
                <Pressable
                style={ [ styles.button_storage, { backgroundColor: 'red' } ]  }
                onPress={ () =>{ saveData(null) } }
            >
                <Text style={ styles.text_button_storage }
                >SAVE LOCAL</Text>
            </Pressable>
            <Pressable
                style={ [ styles.button_storage, { backgroundColor: 'lightgreen' }] }
                onPress={ () => removeData() }
            >
                <Text style={ styles.text_button_storage }
                >REMOVE ALL LOCAL</Text>
            </Pressable>
            <Pressable
                style={ [ styles.button_storage, { backgroundColor: 'lightblue' } ] }
                onPress={ () => addListItemRandom() }
            >
                <Text style={ styles.text_button_storage }
                >ADD PLACE</Text>
            </Pressable>
            </View>
            <ScrollView style={ styles.container } >
                {
                    places && places.map( ( place, index ) =>
                    {
                        return ( place.pinned &&
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
                    } )

                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create( {
    safe: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 40,
        borderWidth: 2,
        borderColor: 'red',
        paddingBottom: 100,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        gap: 20,
        backgroundColor: "#fff",
    },
    item: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        gap: 10,
        paddingBottom: 10,
    },
    button_storage: {
        //width: 200,
        borderRadius: 15,
    },
    text_button_storage: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5,
    },
});
