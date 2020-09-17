import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Text} from 'react-native'
import Download from '../containers/Download'

const StackDownload = createStackNavigator()
const Tab = createBottomTabNavigator()

const navOptionHandler = () => ({
  haderShown: false,
  header: () => null,
})

// function Perfil (){
//     return(
//         <Text>Perfil</Text>
//     )
// }

function DownloadStack () {
  return (
    <StackDownload.Navigator>
      <StackDownload.Screen
        name='Download'
        options={{
          title: 'Descargas',
          headerStyle: {
            backgroundColor: '#6a51ae',
          },
          headerTintColor: '#fff',
        }}
        component={Download}
      />
    </StackDownload.Navigator>
  )
}

export default DownloadStack
