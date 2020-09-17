import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, StatusBar, ScrollView} from 'react-native';
// import HeaderInicio from '../components/customHeaderInicio';
import {connect} from 'react-redux';
import Peliculas from '../../movies/components/datos-peliculas';

class Favorito extends Component {
  handlePress = () => {
    this.props.navigation.navigate('Empresas');
  };
  render() {
    return (
      <>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <ScrollView style={styles.container}>
          {
            this.props.favoritos.map((item, key) => (
              <Peliculas
                key={key}
                {...item}
                movie={item}
                isFavorite={true}
              />  
            ))
          }
      </ScrollView>
      </>
    );
  }
}

function mapStateToProps(state) {
  return{
    favoritos: state.favoritos,
  }
}

export default connect(mapStateToProps)(Favorito);

const styles = StyleSheet.create({
  container: {
    
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    backgroundColor: 'white',
  },
  estilo1: {
    flex: 1,
  }
});


