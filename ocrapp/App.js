import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  ToastAndroid,
  ScrollView,
  Share,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import uuid from 'uuid';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleCard } from "@paraboly/react-native-card";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
console.disableYellowBox = true;

class App extends Component {
  state = {
    image: null,
    uploading: false,
    googleResponse: null,
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  submitToGoogle = async () => {
      try {
        this.setState({ uploading: true });
        let { image } = this.state;
        let body = JSON.stringify({
          requests: [
            {
              features: [
                { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
              ],
              image: {
                source: {
                  imageUri: image
                }
              }
            }
          ]
        });
        let response = await fetch(
          "https://vision.googleapis.com/v1/images:annotate?key=" +
          "AIzaSyD4ibuxkZxlOfCtJvcSHy4HowiTxcbSZKg",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST",
            body: body
          }
        );
        let responseJson = await response.json();
        responseJson = responseJson.responses[0].fullTextAnnotation.text;
        this.setState({
          googleResponse: responseJson,
          uploading: false
        });
        } catch (error) {
          console.log(error);
        }
    };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <Text>{"\n\n"}</Text>
        <TouchableOpacity
          style={{
           height: 100,
           width: windowWidth - 50,
           borderRadius: 20,
           alignItems: 'center',
           justifyContent: 'center',
           shadowColor: "#000",
           shadowOffset: {
           	width: 0,
           	height: 6,
           },
           shadowOpacity: 0.39,
           shadowRadius: 8.30,

           elevation: 13,
         }}>
         <LinearGradient colors={['#3499FF', '#3A3985']} style={{
           borderRadius: 20,
           height: 100,
           width: windowWidth - 50,
           alignItems: 'center',
           justifyContent: 'center'
         }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
           <Image
             style={{height: 70, width: 250}}
             source = {require('./assets/login.png')}
           />
        </LinearGradient>
        </TouchableOpacity>
        <Text>{"\n"}</Text>
        <TouchableOpacity
          style={{
           height: 200,
           width: windowWidth - 50,
           borderRadius: 20,
           alignItems: 'center',
           justifyContent: 'center',
           shadowColor: "#000",
           shadowOffset: {
           	width: 0,
           	height: 6,
           },
           shadowOpacity: 0.39,
           shadowRadius: 8.30,

           elevation: 13,
         }}>
         <LinearGradient colors={['#121212', '#121212']} style={{
           borderRadius: 20,
           height: 200,
           width: windowWidth - 50,
           alignItems: 'center',
           justifyContent: 'center'
         }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
           <Text style={{fontWeight: 'bold', marginLeft: 20, marginRight: 20, fontSize: 15, color: '#FFF', textAlign: 'center'}}>OCR App by team Appendly - built for AGBI Hackathon. {"\n"}</Text>
           <Text style={{fontWeight: 'bold', marginLeft: 20, marginRight: 20, fontSize: 15 , color: '#FFF', textAlign: 'center'}}>An Application that enables the user to convert any form of handwritten or printed text into editable digital text by either directly taking photo of it or by using a image from the gallery. </Text>
        </LinearGradient>
        </TouchableOpacity>
        <Text>{"\n"}</Text>
        {this._maybeRenderUploadingOverlay()}
        <View style={{
          height: 200,
          width: windowWidth - 50,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: "#000",
          shadowOffset: {
          	width: 0,
          	height: 6,
          },
          shadowOpacity: 0.39,
          shadowRadius: 8.30,

          elevation: 13,
        }}>
        <LinearGradient colors={['#121212', '#121212']} style={{
          borderRadius: 20,
          height: 200,
          width: windowWidth - 50,
          alignItems: 'center',
          justifyContent: 'center'
        }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
        <TouchableOpacity
        style={styles.button}
        onPress={this._pickImage}>
        <LinearGradient colors={['#3499FF', '#3A3985']} style={styles.button} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
          <MaterialCommunityIcons name="file" style={{color: '#fff', alignSelf: 'center'}} size={30} />
        </LinearGradient>
        </TouchableOpacity>
        <Text>{"\n"}</Text>
        <TouchableOpacity
        style={styles.button}
        onPress={this._takePhoto}>
        <LinearGradient colors={['#3499FF', '#3A3985']} style={styles.button} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
          <MaterialCommunityIcons name="camera" style={{color: '#fff', alignSelf: 'center'}} size={30} />
        </LinearGradient>

        </TouchableOpacity>
        </LinearGradient>
        </View>

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#000" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
    await this.submitToGoogle();
    global.myVar = this.state.googleResponse;
    this.setState({ uploading: false });
    this.props.navigation.navigate('FormScreen');
  };
}

global.myVar = null;
class FormScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    this.setState({text: global.myVar});
  }

  pushSampleData () {
    ToastAndroid.show("Updating...", ToastAndroid.SHORT);
    const data = {
      'text': this.state.text,
    };
    const db = firebase.database().ref().child("ocr_records").push(data);
    this.setState({text: ''});
    const navigateToStack = this.props.navigation.navigate('Home');
  }


  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps='always'
      >
      <View style={styles.postContainer}>
        <Text>{"\n\n"}</Text>
        <Text
          style = {{
            alignSelf: 'center',
            fontSize: 30,
            fontWeight: 'bold',
          }}
        >OCR text{"\n"}</Text>
        <TextInput
          style = {{width: windowWidth - 50, height: windowHeight - 300, textAlignVertical: "top"}}
          label="Text"
          multiline={true}
          type='outlined'
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        <Text>{"\n"}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.pushSampleData()}>
          <LinearGradient colors={['#F54B64', '#F78361']} style={styles.button} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
            <Text style={styles.buttonText}> Push to database </Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text>{"\n\n"}</Text>
      </View>
      </ScrollView>
    );
  }
}


class AboutScreen extends Component {
  state = {
    image: null,
    uploading: false,
    googleResponse: null,
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  submitToGoogle = async () => {
      try {
        this.setState({ uploading: true });
        let { image } = this.state;
        let body = JSON.stringify({
          requests: [
            {
              features: [
                { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
              ],
              image: {
                source: {
                  imageUri: image
                }
              }
            }
          ]
        });
        let response = await fetch(
          "https://vision.googleapis.com/v1/images:annotate?key=" +
          "AIzaSyD4ibuxkZxlOfCtJvcSHy4HowiTxcbSZKg",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST",
            body: body
          }
        );
        let responseJson = await response.json();
        responseJson = responseJson.responses[0].fullTextAnnotation.text;
        this.setState({
          googleResponse: responseJson,
          uploading: false
        });
        } catch (error) {
          console.log(error);
        }
    };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <Text>{"\n\n"}</Text>
        <Text style={{color: "#fff", fontSize: 20, fontWeight: 'bold'}}>Start scanning{"\n"}</Text>
        {this._maybeRenderUploadingOverlay()}
        <View style={{
          height: 200,
          width: windowWidth - 50,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: "#000",
          shadowOffset: {
          	width: 0,
          	height: 6,
          },
          shadowOpacity: 0.39,
          shadowRadius: 8.30,

          elevation: 13,
        }}>
        <LinearGradient colors={['#121212', '#121212']} style={{
          borderRadius: 20,
          height: 200,
          width: windowWidth - 50,
          alignItems: 'center',
          justifyContent: 'center'
        }} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
        <TouchableOpacity
        style={styles.button}
        onPress={this._pickImage}>
        <LinearGradient colors={['#3499FF', '#3A3985']} style={styles.button} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
          <MaterialCommunityIcons name="file" style={{color: '#fff', alignSelf: 'center'}} size={30} />
        </LinearGradient>
        </TouchableOpacity>
        <Text>{"\n"}</Text>
        <TouchableOpacity
        style={styles.button}
        onPress={this._takePhoto}>
        <LinearGradient colors={['#3499FF', '#3A3985']} style={styles.button} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
          <MaterialCommunityIcons name="camera" style={{color: '#fff', alignSelf: 'center'}} size={30} />
        </LinearGradient>

        </TouchableOpacity>
        </LinearGradient>
        </View>

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#000" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
    await this.submitToGoogle();
    global.myVar = this.state.googleResponse;
    this.setState({ uploading: false });
    this.props.navigation.navigate('FormScreen');
  };
}


class StackScreen extends Component {
  render () {
    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#002bff',
              shadowColor: 'transparent',
              elevation: 0,
            },
            headerTintColor: '#FFF',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              //paddingBottom: 10
            },
          }}>
          <Stack.Screen
            name="Home" component={App}/>
            <Stack.Screen
            name="FormScreen" component={FormScreen}/>
        </Stack.Navigator>
    );
  }
}


class DeveloperScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
      <TouchableOpacity>
        <Image
             style={{
               borderRadius: 200,
               width: 150,
               height: 150,
             }}
             source={require('./assets/developer.jpg')}
         />
      </TouchableOpacity>
      <Text>{"\n"}</Text>
      <View style={{ marginTop: 16 }}>
        <SimpleCard backgroundColor="#212121" titleTextColor="#FFF" title="This app was developed by Team Appendly for AGBI Hackathon 2020. Source code copyrights © 2020 Appendly."/>
      </View>
      </View>
    );
  };
}

class AppScreen extends Component {
  render () {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Stack"
          tabBarOptions={{
            style: {
              borderTopColor: '#transparent',
            },
            labelStyle: {
              fontSize: 10,
            },
            activeBackgroundColor: '#1e1e1e',
            inactiveBackgroundColor: '#1e1e1e',
            inactiveTintColor: '#babbc0',
            activeTintColor: '#3499FF',
          }}
        >
          <Tab.Screen name="Stack" component={StackScreen}
            options= {{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="Post" component={AboutScreen}
            options= {{
              tabBarLabel: 'Scan',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="Invite" component={DeveloperScreen}
            options= {{
              tabBarLabel: 'Developers',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="github-circle" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContainer: {
    flex: 1,
    backgroundColor: '#edf0f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: 'center',
    shadowOpacity: 0.23,
    justifyContent: 'center',
    shadowRadius: 2.62,
    width: 150,
    height: 50,
    borderRadius: 30,
    backgroundColor:'#fff',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  setTextColor: {
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
  },
  stretch: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
    justifyContent: "center",
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignSelf: 'center',
    justifyContent: "center"
  },
});

export default AppScreen;
