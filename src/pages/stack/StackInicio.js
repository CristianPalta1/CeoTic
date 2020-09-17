import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Text, StatusBar} from 'react-native'
import Inicio from '../containers/Inicio'

const StackInicio = createStackNavigator()
//

const navOptionHandler = () => ({
  haderShown: false,
  header: () => null,
})

// function Inicio (){
//     return(
//         <Text>Inicio</Text>
//     )
// }

function InicioStacks () {
  return (
    <StackInicio.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        
      }}>
      <StackInicio.Screen
        name='Inicio'
        options={{
            title: 'Películas',
            headerStyle: {
              backgroundColor: '#6a51ae',
            },
            headerTintColor: '#fff',
           
          }}
        component={Inicio}
      />
    </StackInicio.Navigator>
  )
}

export default InicioStacks
