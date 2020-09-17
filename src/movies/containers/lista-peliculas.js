import React, {Component} from 'react';
import {Text, FlatList, ScrollView, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
// import MoviePromo from '../../screens/containers/videoprom';
// import Registro from '../../screens/containers/Registro';
import ComponenteLista from '../components/layout-lista-peliculas';
import Empty from '../components/datos-vacios';
import Separador from '../../sections/components/separador-horizontal';
import Peliculas from '../components/datos-peliculas';
import Search from '../../sections/containers/search';

function mapStateToProps(state) {
  return {
    listaPeliculas: state.pelicuasList,
    // moviePromo: state.moviePromo,
  };
}

class ListaAfiliados extends Component {
  idExtractor = (item) => item.id.toString();
  renderVacio = () => <Empty text="No hay sugerencias" />;
  itemSeparator = () => <Separador />;
  viewPromo = (item) => {
    this.props.dispatch({
      type: 'SET_PROMOMOVIE',
      payload: {
        moviePromo: item,
      },
    });
  };
  renderPeliculas = ({item}) => {
    return (
      <Peliculas
        {...item}
        onPress={() => {
          this.viewPromo(item);
        }}
      />
    );
  };
  renderHeader = () =>{
    return <Search/>
  }

  render() {
    // if (this.props.moviePromo) {
    //   return <MoviePromo />;
    // }
    return (
      <ComponenteLista >
        <FlatList
          // data puede ser una lista o un array
          //La forma que renderizo es con la propiedad renderItem
          //Render item recibe una funcion. Y mi funcion renderiza un componente
          //Item es la pabra reservada para tomar el id de cada objeto en el array completo
          ListHeaderComponent = {this.renderHeader}
          keyExtractor={this.idExtractor}
          data={this.props.listaPeliculas}
          ListEmptyComponent={this.renderVacio}
          ItemSeparatorComponent={this.itemSeparator}
          renderItem={this.renderPeliculas}
        />
      </ComponenteLista>
    );
  }
}

export default connect(mapStateToProps)(ListaAfiliados);
