import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
// import Search from '../../sections/containers/search';

LayoutPeliculas = (props) => {
    return(
        <View style = {styles.container}>
            {/* <Search /> */}
            <Text style = {styles.title}>{props.title}</Text>
             {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 5,
        paddingHorizontal: 6,
    },
    title:{
        color: '#4c4c4c',
        fontSize: 25,
        marginBottom : 5,
        fontWeight: 'bold',
        

    },
   
})

export default LayoutPeliculas;