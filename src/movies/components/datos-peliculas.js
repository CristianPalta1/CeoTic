import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
// Functions DE REDUX
import {connect} from 'react-redux';
import { addFavorite, deleteFavorite } from '../../../actions/favorites';

function Peliculas ({isFavorite, favoritos, ...props}) {

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          style={styles.cover}
          source={{
            uri: `http://image.tmdb.org/t/p/original/${props.backdrop_path}`,
          }}
        />
        <Text style={styles.title}>{props.original_title}</Text>
        <View style={styles.categoria}>
          <Text style={styles.catName}>{props.overview}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 15,
          height: 80,
        }}>
        <View
          style={{
            flex: 1,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {
              isFavorite ? 
                <TouchableOpacity 
                  style={styles.buttonContainer}
                  onPress={() => props.deleteFavorite(props.movie.id)}
                >
                  <Text style={styles.loginText2}>ELIMINAR DE FAVORITOS</Text>
                </TouchableOpacity>
              :
                  <>
                  <TouchableOpacity 
                    style={styles.buttonContainer}
                    onPress={() => props.addFavorite(props.movie)}
                  >
                    <Text style={styles.loginText2}>AGREGAR A FAVORITOS</Text>
                  </TouchableOpacity>
                  </>
            }
          
        </View>
        <View
          style={{
            flex: 1,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {
              isFavorite ? 
                null
              :
                <TouchableOpacity style={styles.buttonContainer}>
                  <Text style={styles.loginText2}>DESCARGAR</Text>
                </TouchableOpacity>
            }
          
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex:1,
  },
  left: {},
  right: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  cover: {
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  categoria: {
    borderRadius: 10,
    position: 'relative',
    left: 0,
    top: 0,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 7,
  },
  catName: {
    color: 'black',
    fontSize: 13,
  },
  title: {
    fontSize: 20,
    color: 'black',
    backgroundColor: 'white',
  },
  informacion: {
    backgroundColor: '#70b124',
    paddingVertical: 4,
    paddingHorizontal: 6,
    color: 'white',
    fontSize: 11,
    borderRadius: 5,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  contacto: {
    color: '#6b6b6b',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    height: 45,

    justifyContent: 'center',
    alignItems: 'center',

    width: 250,
    borderRadius: 30,
  },
  buttonContainer2: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    width: 100,
    borderRadius: 30,
    marginRight: 5,
  },
  loginButton2: {
    backgroundColor: '#15bcce',
    height: 50,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginText2: {
    color: '#6a51ae',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer3: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    width: 100,
    borderRadius: 30,
    marginLeft: 5,
  },
})

function mapStateToProps(state) {
  return{
    favoritos: state.favoritos,
  }
}

export default connect(mapStateToProps, {addFavorite, deleteFavorite})(Peliculas)
