import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, Image, Dimensions, Button, TouchableHighlight } from 'react-native';
import { Constants, Audio } from 'expo';

Audio.setIsEnabledAsync(true);
let sound = new Audio.Sound();
var first = true;
var playing = false;

class FButton extends React.Component{ 
  constructor(props){
    super(props);
    this.state  = {
      respects: 0,
    };
  }
  onButtonPress = () => {
    this.setState({respects: this.state.respects+1});
  }
  render (){
    return(
      <View style={styles.respectFahad}>
        <Text style={styles.respectFahadText}>Respects Payed: {this.state.respects}</Text>
        <Button onPress={this.onButtonPress} title="F"/>
      </View> 
    );
  }
}

export default class App extends React.Component {
  _handlePlaySoundAsync = async () => {
    if(first){
      await sound.loadAsync(require('./Assets/sound/RIP.mp3'));
      await sound.playAsync();
      first = false;
    }
    playing ? await sound.pauseAsync() : await sound.playAsync();
    playing = !playing;
    sound.setIsLoopingAsync(true);  
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>In Memory of Fahad RIP</Text>
        <TouchableHighlight onPress={this._handlePlaySoundAsync} underlayColor={'#006c35'}>
          <Image style={styles.imgFahad} source={require('./Assets/images/fahadRipCircle.png')} resizeMode='contain' />
        </TouchableHighlight>
        <Text style={styles.year}>1996 - 2017</Text>
        <FButton />
      </View>
    );
  }
}

const win = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      }
    }),
    backgroundColor: '#006c35',

    height: win.height,
  },
  imgFahad: {
    alignSelf:  'center',   
    height: win.height/2,
    width: win.height/2,
  },
  title: {
    fontSize: win.width/15,
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: 'white',
    fontFamily: 'Roboto',
    marginBottom: 20,
    marginTop: 20,
  },
  year: {
    fontSize: win.width/15,
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: 'white',
    fontFamily: 'Roboto',
    marginBottom: 5,
    marginTop: 5,
  },
  respectFahad: {
    margin:10,
  },
  respectFahadText: {
    textAlign:  'center',
    marginTop: 5, 
    marginBottom: 40, 
    color: '#FFFFFF',
    fontSize: win.width/20,
  }
});
