import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Switch,
  ScrollView
} from 'react-native'

import Slider from '@react-native-community/slider'
import {
  Player,
  Recorder,
  MediaStates,
} from '@react-native-community/audio-toolkit'

import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
// import HeaderInicio from '../components/customHeaderInicio';
// import Perfil from '../containers'

const filename = 'audio.aac';
// const pathfile = ''

type Props = {};

type State = {
  playPauseButton: string,
  recordButton: string,

  stopButtonDisabled: boolean,
  playButtonDisabled: boolean,
  recordButtonDisabled: boolean,

  loopButtonStatus: boolean,
  progress: number,

  error: string | null
};

class Perfil extends Component {
  handlePress = () => {
    this.props.navigation.navigate('MyHomes')
  }
  handlePress2 = () => {
    this.props.navigation.navigate('Registro')
  }

  player: Player | null
  recorder: Recorder | null
  lastSeek: number
  _progressInterval: IntervalID

  constructor (props: Props) {
    super(props)

    this.state = {
      playPauseButton: 'Preparing...',
      recordButton: 'Preparing...',

      stopButtonDisabled: true,
      playButtonDisabled: true,
      recordButtonDisabled: true,

      loopButtonStatus: false,
      progress: 0,

      error: null,
      avatarSource: null,
      imageData: null,
    }
  }

  UNSAFE_componentWillMount () {
    this.player = null
    this.recorder = null
    this.lastSeek = 0

    this._reloadPlayer()
    this._reloadRecorder()

    this._progressInterval = setInterval(() => {
      if (this.player && this._shouldUpdateProgressBar()) {
        let currentProgress =
          Math.max(0, this.player.currentTime) / this.player.duration
        if (isNaN(currentProgress)) {
          currentProgress = 0
        }
        this.setState({progress: currentProgress})
      }
    }, 100)
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('ImageSource')
      if(value !== null) {
        this.setState({
          avatarSource: JSON.parse(value),
      })
      }
    } catch(e) {
      // error reading value
    }
  }

  componentWillUnmount () {
    clearInterval(this._progressInterval)
  }

  _shouldUpdateProgressBar () {
    // Debounce progress bar update by 200 ms
    return Date.now() - this.lastSeek > 200
  }

  _updateState (err) {
    this.setState({
      playPauseButton: this.player && this.player.isPlaying ? 'Pause' : 'Play',
      recordButton:
        this.recorder && this.recorder.isRecording ? 'Stop' : 'Record',

      stopButtonDisabled: !this.player || !this.player.canStop,
      playButtonDisabled:
        !this.player || !this.player.canPlay || this.recorder.isRecording,
      recordButtonDisabled:
        !this.recorder || (this.player && !this.player.isStopped),
    })
  }

  _playPause () {
    this.player.playPause((err, paused) => {
      if (err) {
        this.setState({
          error: err.message,
        })
      }
      this._updateState()
    })
  }

  _stop () {
    this.player.stop(() => {
      this._updateState()
    })
  }

  _seek (percentage) {
    if (!this.player) {
      return
    }

    this.lastSeek = Date.now()

    let position = percentage * this.player.duration

    this.player.seek(position, () => {
      this._updateState()
    })
  }

  _reloadPlayer () {
    if (this.player) {
      this.player.destroy()
    }

    this.player = new Player(filename, {
      autoDestroy: false,
    }).prepare(err => {
      if (err) {
        console.log('error at _reloadPlayer():')
        console.log(err)
      } else {
        this.player.looping = this.state.loopButtonStatus
      }

      this._updateState()
    })

    this._updateState()

    this.player.on('ended', () => {
      this._updateState()
    })
    this.player.on('pause', () => {
      this._updateState()
    })
  }

  _reloadRecorder () {
    if (this.recorder) {
      this.recorder.destroy()
    }

    this.recorder = new Recorder(filename, {
      bitrate: 256000,
      channels: 2,
      sampleRate: 44100,
      quality: 'max',
      format: 'aac',
      encoder: 'aac',
    })

    this._updateState()
  }

  _toggleRecord () {
    if (this.player) {
      this.player.destroy()
    }

    let recordAudioRequest
    if (Platform.OS == 'android') {
      recordAudioRequest = this._requestRecordAudioPermission()
    } else {
      recordAudioRequest = new Promise(function (resolve, reject) {
        resolve(true)
      })
    }

    recordAudioRequest.then(hasPermission => {
      if (!hasPermission) {
        this.setState({
          error: 'Record Audio Permission was denied',
        })
        return
      }

      this.recorder.toggleRecord((err, stopped) => {
        if (err) {
          this.setState({
            error: err.message + 'Este es error en toggle Record',
          })
        }
        if (stopped) {
          this._reloadPlayer()
          this._reloadRecorder()
        }

        this._updateState()
      })
    })
  }

  async _requestRecordAudioPermission () {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message:
            'ExampleApp needs access to your microphone to test react-native-audio-toolkit.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.error(err)
      return false
    }
  }

  _toggleLooping (value) {
    this.setState({
      loopButtonStatus: value,
    })
    if (this.player) {
      this.player.looping = value
    }
  }

  // Funcion para seleccionar imagen de perfil
  selectImage = () => {
    const options = {
        title: 'Selecciona un avatar',
        takePhotoButtonTitle: 'Tomar una foto...',
        chooseFromLibraryButtonTitle: 'Seleccionar desde galeria',
        cancelButtonTitle: 'Cancelar',
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        // storageOptions: {
        //     skipBackup: true,
        //     privateDirectory: true,
        // },
    };

    ImagePicker.showImagePicker(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
            console.log('User cancelled photo picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            let source = {uri: response.uri};
            console.log(source)
            this.setState({
                avatarSource: source,
                imageData: response
            })
            this.storeImagaSource(JSON.stringify(source));

        }
    });
}

storeImagaSource = async (value) => {
  try {
    await AsyncStorage.setItem('ImageSource', value)
  } catch (e) {
    console.log(e)
  }
}

  render () {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
        <View style={styles.container}>
          <StatusBar barStyle='light-content' backgroundColor='#6a51ae' />
          {/* <Image
          source={require('../../../assets/images/Logo_Somos_sobre_color-01.png')}
          style={styles.logo}
        /> */}
          <View style={styles.container3}>
            <View style={styles.header1}>
              <Image
                style={styles.profileImage}
                source={this.state.avatarSource ? this.state.avatarSource : require('../../../assets/icons/profile.png')}
              />
            </View>
            <View style={styles.header2}>
              <TouchableOpacity
                style={styles.fondo2}
                onPress={this.selectImage}>
                <Text style={{color: 'white'}}>Camara</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            {/* <Image
            style={styles.inputIcon}
            source={require('../../../assets/icons/usuario.png')}
          /> */}
            <TextInput
              style={styles.inputs}
              placeholder='NOBRE'
              keyboardType='default'
              underlineColorAndroid='transparent'
              // onChangeText={(email) => this.setState({email})}
            />
          </View>

          <View style={styles.inputContainer}>
            {/* <Image
            style={styles.inputIcon}
            source={require('../../../assets/icons/bloquear.png')}
          /> */}
            <TextInput
              style={styles.inputs}
              placeholder='CORREO'
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              // onChangeText={(password) => this.setState({password})}
            />
          </View>
          <View style={styles.inputContainer}>
            {/* <Image
            style={styles.inputIcon}
            source={require('../../../assets/icons/bloquear.png')}
          /> */}
            <TextInput
              style={styles.inputs}
              placeholder='CELULAR'
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              // onChangeText={(password) => this.setState({password})}
            />
          </View>
          

          <View>
            <Text style={styles.title}>Playback</Text>
          </View>
          <View>
            <Button
              title={this.state.playPauseButton}
              disabled={this.state.playButtonDisabled}
              onPress={() => this._playPause()}
            />
            <Button
              title={'Stop'}
              disabled={this.state.stopButtonDisabled}
              onPress={() => this._stop()}
            />
          </View>
          <View style={styles.settingsContainer}>
            <Switch
              onValueChange={value => this._toggleLooping(value)}
              value={this.state.loopButtonStatus}
            />
            <Text>Toggle Looping</Text>
          </View>
          <View style={styles.slider}>
            <Slider
              step={0.0001}
              disabled={this.state.playButtonDisabled}
              onValueChange={percentage => this._seek(percentage)}
              value={this.state.progress}
            />
          </View>
          <View>
            <Text style={styles.title}>Recording</Text>
          </View>
          <View>
            <Button
              title={this.state.recordButton}
              disabled={this.state.recordButtonDisabled}
              onPress={() => this._toggleRecord()}
            />
          </View>
          <View>
            <Text style={styles.errorMessage}>{this.state.error}</Text>
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container3: {
    backgroundColor: 'white',
    height: 130,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 95,
    justifyContent: 'space-between',
    position: 'relative',
  },

  header1: {
    marginTop: 20,
    marginBottom: 20,
    width: 100,
    height: 100,
    // backgroundColor: 'red',
    borderRadius: 100,
    overflow: 'hidden',

  },
  profileImage: {
    ...StyleSheet.absoluteFill,
    height: undefined,
    width: undefined,
  },
  header2: {
    paddingTop: 50,
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  fondo2: {
    borderRadius: 10,
    width: 70,
    position: 'relative',
    left: 0,
    top: 0,
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 7,
  },
  fondoCam: {
    height: '100%',
    width: '100%',

    resizeMode: 'contain',
  },
  fondo: {
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',

    width: '100%',
    height: '100%',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#e1e1e1',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 330,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#15bcce',
  },
  loginButton2: {
    backgroundColor: 'gray',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginText2: {
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 120,
    marginBottom: 25,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    height: 10,
    margin: 10,
    marginBottom: 50,
  },
  settingsContainer: {
    alignItems: 'center',
  },
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  errorMessage: {
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
    color: 'red',
  },
})

export default Perfil
