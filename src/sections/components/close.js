import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

function Close (props) {
    return(
        <TouchableOpacity
            onPress = {props.onPress}
            style = {styles.container}>
            <Text style = {styles.buttom}>X</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#14b739',
        borderRadius:12,
        width:25,
        height:25,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttom:{
       fontWeight: 'bold',
       color: 'white', 
    }
})
export default Close