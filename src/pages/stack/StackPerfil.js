import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {Text} from 'react-native'
// import DrawerMenu from '../drawer/drawer-menu';
import Perfil from '../containers/Perfil'
// import Registro from './Registro/StackRegistro';
// import Dashboard from '../containers/Dashboard';

const StackPerfil = createStackNavigator()

const navOptionHandler = () => ({
  haderShown: false,
  header: () => null,
})
// function Dashboard (){
//     return(
//         <Text>Dashboard</Text>
//     )
// }

function PerfilStack () {
  return (
    <StackPerfil.Navigator initialRouteName='Perfil'>
      <StackPerfil.Screen
        name='Perfil'
        options={{
            title: 'Perfil',
            headerStyle: {
              backgroundColor: '#6a51ae',
            },
            headerTintColor: '#fff',
           
          }}
        component={Perfil}
      />
      {/* <StackPerfil.Screen name="Registro" options= {navOptionHandler} component={Registro} />
      <StackPerfil.Screen
        name="Dashboard"
        options={navOptionHandler}
        component={Dashboard}
      /> */}
    </StackPerfil.Navigator>
  )
}

export default PerfilStack
