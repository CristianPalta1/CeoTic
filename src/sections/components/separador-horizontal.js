import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native'
function SeparadorHorizontal(props){
    return(
        <View 
            style={styles.separador}
        />
    )
}

const styles = StyleSheet.create({
    separador:{
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: 'white'
    }
})

export default SeparadorHorizontal