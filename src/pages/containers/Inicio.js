import React, {Component} from 'react';

import {View, Text, StyleSheet, Button, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import API from '../../../utils/api';
import Lista from '../../movies/containers/lista-peliculas';
// import HeaderInicio from '../components/customHeaderInicio';
// import CustomHeader from '../components/customHeader';
// import Search from '../../sections/containers/search';

class Inicio extends Component {
  handlePress = () => {
    this.props.navigation.navigate('Login');
  };

  async componentDidMount() {
    const pelicuasList = await API.getPelicula();
    this.props.dispatch({
      type: 'SET_PELICULAS_LISTAS',
      payload: {
        pelicuasList,
      },
    });
  }
  render() {
    return (
      
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" /> 
          <Lista />
        </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex:1,
    
  },
});

export default connect(null)(Inicio);
