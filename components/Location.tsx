import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View,  } from './Themed'
import { useState } from 'react'
import { PinIcon, PinOff } from 'lucide-react-native';




type LocationProps = {
    name: string,
    pinned: boolean,
    value: number,
}

function truncateNumber( num: number ) {
    return Math[num < 0 ? 'ceil' : 'floor'](num);
};

export default function Location( props: LocationProps ){

    const name = props.name
    const pinned = props.pinned
    //const [value, setValue] = useState(0)
    const value = props.value

    var colorValue

    if( value < 16 ){
        colorValue = '#f2003c'
    } else if( value >= 16 && value <= 20){
        colorValue = '#ff8f00'
    } else {
        colorValue = '#32cd32'
    }




    return (
        <View 
        style={ styles.icon } 
        lightColor='#eee'
        darkColor="rgba(255,255,255,0.1)"
        >
            <TouchableOpacity style={ styles.body }
            activeOpacity={1} //
            onPress={ () => {} }
            >
            <Text 
            style={ styles.place }
            >{ name }</Text>
            <Text 
            style={ { color: colorValue } }
            >{ truncateNumber(value * 100) / 100 }</Text>
            {/* <Text 
            style={ styles.icon }
            >{ pinned ? '' : '!'}Pinned</Text> */}
            { pinned ? 
                <PinIcon style={ styles.icon } size={24} color={'#f2003c'} /> 
                : 
                <PinOff  style={ styles.icon } size={24} color={'#f2003c'}/> }
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        margin: 30,
    },
    body: {
        flexDirection: 'row',
        borderColor: '#eee',
        borderWidth: 4,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        /* //margin: 10, // bad, 
        //use: 
        // ItemSeparatorComponent={() => 
        <View style={{height: 20}} />} 
         instead inside the flatList props
        */
    },
    place: {
        /* backgroundColor: 'blue', 
        color: 'red'*/
    },
    value: {
        /* backgroundColor: 'yellow', 
        color: 'green'*/
    },
    icon: {
        /* backgroundColor: 'red',
        color: 'black' */
    }

});