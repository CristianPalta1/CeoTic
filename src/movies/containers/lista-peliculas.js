import React, {Component} from 'react';
import {Text, FlatList, ScrollView, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import Busqueda from '../../pages/containers/Busqueda';
// import Registro from '../../screens/containers/Registro';
import ComponenteLista from '../components/layout-lista-peliculas';
import Empty from '../components/datos-vacios';
import Separador from '../../sections/components/separador-horizontal';
import Peliculas from '../components/datos-peliculas';
import Search from '../../sections/containers/search';
/// import
function mapStateToProps(state) {
  return {
    listaPeliculas: state.pelicuasList,
    busquedapelicula: state.busquedapelicula,
  };
}

class ListaAfiliados extends Component {
  idExtractor = (item) => item.id.toString();
  renderVacio = () => <Empty text="No hay sugerencias" />;
  itemSeparator = () => <Separador />;
  viewPromo = (item) => {
    this.props.dispatch({
      type: 'SET_BUSQUEDA',
      payload: {
        busquedapelicula: item,
      },
    });
  };
  renderPeliculas = ({item}) => {
    return (
      <Peliculas
        {...item}
        movie={item}
        onPress={() => {
          this.busquedapelicula(item);
        }}
      />
    );
  };
  renderHeader = () =>{
    return <Search/>
  }

  render() {
    if (this.props.busquedapelicula) {
      return <Busqueda />;
    }
    return (
      <ComponenteLista >
        {/* <Text>
          {JSON.stringify(this.props.busquedapelicula)}
        </Text> */}
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
