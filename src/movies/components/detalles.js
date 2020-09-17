import React from 'react';
import {Text, View, StyleSheet, Image, Button, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';


// import {WebView} from 'react-native-webview';
// {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/UHiU8v3EZ_8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

const {height , width } = Dimensions.get('window')



function Detalles(props, {navigation}) {
  handlePress2 = () => {
    navigation.navigate('Login');
  };

  const id = '6PALd0RECjA';
  return (
    <ScrollView>
     
      <Image source={{uri: `http://image.tmdb.org/t/p/original/${props.[0].backdrop_path}`}} style={styles.cover} />

      <View style={styles.top}>
        <Text style={styles.title}>{props.[0].original_title}</Text>
      </View>
      <View style={styles.bottom}>
        <View styles={styles.details}>
          {/* <Text styles={styles.description}>{props.gender}</Text> */}
          <Text styles={styles.description2}>
          {props.[0].overview}
          </Text>
        </View>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  trailer: {
    height: height,
    width: width
  },
  details: {
    flexDirection: 'row',
    marginBottom: 10,
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
  title: {
    color: '#44546b',
    fontSize: 18,
    fontWeight: 'bold',
  },
  top: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    padding: 5,
    backgroundColor: 'white',
  },
  bottom: {
    padding: 18,
    flex: 1,
    marginBottom: 2,
  },
  description: {
    fontSize: 15,
    lineHeight: 22.5,
    color: '#4c4c4c',
    marginLeft: 10,
    flex: 1,
  },
  description2: {
    fontSize: 15,
    lineHeight: 22.5,
    color: '#4c4c4c',
    marginLeft: 10,
    flex: 1,
    marginBottom: 5,
  },
});

export default Detalles;
