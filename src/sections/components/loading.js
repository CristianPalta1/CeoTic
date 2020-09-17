import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

function Loader(props) {
  return (
    // <SafeAreaView>

    <View style={styles.container}>
      
        <Image
          source={require('../../../assets/images/logoCeoTic2.jpg')}
          style={styles.logo}
        />

        <ActivityIndicator size="large" color="#000" />
     
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 10,
    width: 350,
    height: 200,
    resizeMode: 'contain',
  },
  indicador: {
    color: 'white',
  },
  fondo: {
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
   
    width: '100%',
    height: '100%',
  },
});
export default Loader;
