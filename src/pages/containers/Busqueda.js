import React, {Component} from 'react';
import Layout from '../components/layout';
// import VideoPromo from '../../videos/containers/video';
import {Text} from 'react-native'
import Header from '../../sections/components/header';
import Close from '../../sections/components/close';
import {connect} from 'react-redux';
import Detalles from '../../movies/components/detalles';
import {ScrollView} from 'react-native-gesture-handler';

// {/* <VideoPromo /> */}

class MoviePromo extends Component {
  closeVideo = () => {
    this.props.dispatch({
      type: 'SET_BUSQUEDA',
      payload: {
        busquedapelicula: null,
      },
    });
  };

  render() {
    return (
      <ScrollView>
        
           <Header>
            <Close onPress={this.closeVideo} />
          </Header> 

          <Detalles
           {...this.props.busquedapelicula}
            
          />

         
        
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    busquedapelicula: state.busquedapelicula,
  };
}

export default connect(mapStateToProps)(MoviePromo);
