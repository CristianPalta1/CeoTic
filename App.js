import 'react-native-gesture-handler'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './store'

import Loader from './src/sections/components/loading'
import {Text, Image, StyleSheet} from 'react-native'

import TabInicio from './src/pages/tabs/TabNavInicio'



const StackInicio = createStackNavigator()


const navOptionHandler = () => ({
  header: null,
})

function App () {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <NavigationContainer>
          <StackInicio.Navigator
            initialRouteName='TabsInicio'
            mode='modal'
            headerMode='none'>
            {/* <StackInicio.Screen
              name="MyHomes"
              options={{header: () => null}}
              component={DrawerMenu}
            /> */}
            <StackInicio.Screen
              name='TabsInicio'
              options={{
                header: () => null,
              }}
              component={TabInicio}
            />

            {/* <StackInicio.Screen
              name="About"
              options={{
                header: () => null
              }}
              component={About}
            />
            <StackInicio.Screen
              name="Login"
              options={{
                header: () => null
              }}
              component={Login}
            /> */}
          </StackInicio.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
const styles = StyleSheet.create({
  iconos: {
    width: 20,
    height: 20,
  },
})

export default App
