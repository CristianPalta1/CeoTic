import React, {Component} from 'react'
import {TextInput, StyleSheet, View, Image} from 'react-native'

import API from '../../../utils/api'
import {connect} from 'react-redux'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      query: '',
      fullData: [],
    }
  }

  handleSubmit = async () => {
    const busqueda = await API.getPelicula()
    // this.setState({
    //   data: busqueda
    // });
    const resultado = busqueda.filter(
      m => m.original_title === `${this.state.query}`,
    )
    // console.log(resultado)
    this.props.dispatch({
      type: 'SET_BUSQUEDA',
      payload: {
        busquedapelicula: resultado,
      },
    })
  }

  handleChange = text => {
    console.log('texto', text)
    this.setState({
      query: text,
    })
  }

  render () {
    return (
      <View style={styles.inputContainer}>
        <Image
          style={styles.inputIcon}
          source={require('../../../assets/icons/search.png')}
        />
        <TextInput
          placeholder='Que buscas'
          autoCorrect={false}
          autoCapitalize='words'
          underlineColorAndroid='transparent'
          onSubmitEditing={this.handleSubmit}
          onChangeText={this.handleChange}
          style={styles.inputs}
          // onChangeText={(password) => this.setState({password})}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#eaeaea',
    borderRadius: 20,
    borderBottomWidth: 1,
    width: 348,
    height: 40,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 40,
    marginLeft: 2,
    borderColor: '#eaeaea',
    justifyContent: 'center',
    fontSize: 15,
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 6,
    justifyContent: 'center',
  },
})

export default connect(null)(Search)
