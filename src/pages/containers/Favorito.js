import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, StatusBar} from 'react-native';
// import HeaderInicio from '../components/customHeaderInicio';

class Favorito extends Component {
  handlePress = () => {
    this.props.navigation.navigate('Empresas');
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <HeaderInicio navigation = {this.props.navigation} /> */}
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <Text style={styles.title}>Quienes Somos</Text>
        <Text style={styles.title}>Mision </Text>
        {/* <Button
          title="Ir a Empresas"
          onPress={this.handlePress}

        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    backgroundColor: 'white',
  },
});

export default Favorito;
