import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Text, Image, StyleSheet} from 'react-native'

import HomeStack from '../stack/StackInicio'
import FavoritoStack from '../stack/StackFavorito'
import PerfilStack from '../stack/StackPerfil'
import DescargasStack from '../stack/StackDowload'

const Tab = createBottomTabNavigator()
const tabs = true

// getTabBarVisibility = route => {
//   const routeName = route.state
//     ? route.state.routes[route.state.index].name
//     : ''

//   if (routeName === 'Lista') {
//     return false
//   }

//   return true
// }

function TabsInicio () {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName

          if (route.name === 'Lista') {
            iconName = focused
              ? require('../../../assets/icons/ajustar.png')
              : require('../../../assets/icons/ajustar-black.png')
          } else if (route.name === 'Favoritos') {
            iconName = focused
              ? require('../../../assets/icons/estrella.png')
              : require('../../../assets/icons/estrella-black.png')
          } else if (route.name === 'Descargas') {
            iconName = focused
              ? require('../../../assets/icons/descargar.png')
              : require('../../../assets/icons/descargar-black.png')
          } else if (route.name === 'Perfil') {
            iconName = focused
              ? require('../../../assets/icons/usuario.png')
              : require('../../../assets/icons/usuario-black.png')
          }

          // You can return any component that you like here!
          return (
            <Image
              source={iconName}
              style={styles.iconos}
              resizeMode='contain'
            />
          )
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        style: {
            backgroundColor: '#6a51ae',
          }
      }}>
      <Tab.Screen name='Lista'>{() => <HomeStack />}</Tab.Screen>
      <Tab.Screen name='Favoritos'>{() => <FavoritoStack />}</Tab.Screen>
      <Tab.Screen name='Descargas'>{() => <DescargasStack />}</Tab.Screen>
      <Tab.Screen name='Perfil'>{() => <PerfilStack />}</Tab.Screen>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  iconos: {
    width: 20,
    height: 20,
  },
})
export default TabsInicio
