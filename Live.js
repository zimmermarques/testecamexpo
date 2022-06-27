import React, {useState} from 'react';
import { Text, TextInput, View, Button, StatusBar, StyleSheet, SafeAreaView, PermissionsAndroid } from 'react-native';
import { NodeCameraView } from 'react-native-nodemediaclient';

export default function Live( props ) {

  const [playerRef, setPlayerRef] = useState(null);
  const [flashenable, setFlashenable] = useState(false);
  const stream = useState([props.stream]);

  let navigationOptions = {
    title: 'Push',
  };

  //console.log(JSON.stringify(props.route.params.stream));
  console.log('rtmps://global-live.mux.com:443/app/' + props.route.params.stream);
  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
        {
          title: 'LiveStreamExample need Camera And Microphone Permission',
          message:
            'LiveStreamExample needs access to your camera so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (
        granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        if (this.nodeCameraViewRef) this.nodeCameraViewRef.startPreview();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  requestCameraPermission();

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#333' }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <NodeCameraView
          style={{ flex: 1 }}
          ref={(vb) => { setPlayerRef(vb) }}
          outputUrl={'rtmps://global-live.mux.com:443/app/' + props.route.params.stream}
          camera={{ cameraId: 1, cameraFrontMirror: false }}
          audio={{ bitrate: 128000, profile: 1, samplerate: 44100 }}
          video={{ preset: 1, bitrate: 2000000, profile: 2, fps: 30, videoFrontMirror: true }}
          autopreview={true}
          onStatus={(code, msg) => {
            console.log("onStatus=" + code + " msg=" + msg);
          }}
        />

        
        
        <Button
          onPress={() => { playerRef.start(); }}
          title={"Iniciar"}
          color="#841584"
        />

        <Button
          onPress={() => { playerRef.stop(); }}
          title={"Parar"}
          color="#841584"
        />
     


      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
