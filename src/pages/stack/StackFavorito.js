import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import Favorito from '../containers/Favorito';

const StackFavorito = createStackNavigator();


const navOptionHandler = () => ({
  haderShown: false,
  header: () => null,
});

// function Perfil (){
//     return(
//         <Text>Perfil</Text>
//     )
// }

function FavoritoStack() {
  return (
    <StackFavorito.Navigator>
      <StackFavorito.Screen name="Favorito"  
      options={{
        title: 'Peliculas Favoritas',
        headerStyle: {
          backgroundColor: '#6a51ae',
        },
        headerTintColor: '#fff',
       
      }}component={Favorito} />
    </StackFavorito.Navigator>
  );
}

export default FavoritoStack;
