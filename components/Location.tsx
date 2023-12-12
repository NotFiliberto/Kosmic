import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View,  } from './Themed'
import { useState } from 'react'
import { PinIcon, PinOff } from 'lucide-react-native';
import { RefreshControl } from 'react-native-gesture-handler';




type LocationProps = {
    name: string,
    value: number,
    pinned: boolean,
    onTogglePinned: ( prop: { name: string, value: number, pinned: boolean }) => void,
}

function truncateNumber( num: number ) {
    return Math[num < 0 ? 'ceil' : 'floor'](num);
};

export default function Location( props: LocationProps ){

    const name = props.name
    const [pinned, setPinned] = useState(props.pinned)
    //const [value, setValue] = useState(0)
    const value = props.value
    const onToggle = props.onTogglePinned

    var colorValue

    if( value < 16 ){
        colorValue = 'red' // '#f2003c'
    } else if( value >= 16 && value <= 20){
        colorValue = '#ffc40c' // yellow
    } else {
        colorValue = 'green' // '#32cd32'
    }

    return (
        <View
        lightColor='#eee'
        darkColor="rgba(255,255,255,0.1)"
        >
            { /* Item body */ }
            <View style={ styles.body }
            >
                { /* Saved place name */}
                <Text 
                style={ styles.place }
                >{ name }</Text>
                { /* Pollution rate */}
                <Text 
                style={ 
                    { 
                        fontSize: 16,
                        fontWeight: '600',
                        color: colorValue
                    }
                }
                >{ truncateNumber(value * 100) / 100 }</Text>
                { /* Pressable Icon, toggles places to make them pinned or unpinned */}
                <TouchableOpacity
                activeOpacity={1} //
                onPress={ () => { 
                    //pinned === true ? setPinned(false): setPinned(true) 
                    onToggle( props )
                } } 
                
                >
                    { pinned ? 
                        <PinIcon style={ styles.icon } size={24} color={'#f2003c'} /> 
                            : 
                        <PinOff  style={ styles.icon } size={24} color={'#f2003c'}/> 
                    }

                </TouchableOpacity>
                
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    item: {
        //flex: 1,
        //alignItems: 'center',
       /*  flexDirection: 'column',
        justifyContent: 'space-between',
        borderWidth: 2, */
        //padding: 10,
    },
    body: {
        //flex: 1,
        flexDirection: 'row',
        // borderColor: 'white', // light: #eee, dark: rgba(255,255,255,0.1)
        borderWidth: 4,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        //marginVertical: 30,
    },
    place: {
        fontSize: 16,
        fontWeight: '600', // Semibold: 600
    },
    value: {
        //flex: 1,
    },
    icon: {
        //flex: 1,
    }

});