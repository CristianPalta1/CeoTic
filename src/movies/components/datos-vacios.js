import React from 'react'

import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

CargaInicial = (props) => {
    return (
        <View style = {styles.container}>
            <ActivityIndicator />
            <Text style = {styles.text}>
                {props.text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding:10,
    },
    text: {
        fontSize: 16,
        color: '#fff'
    }
})

export default CargaInicial;