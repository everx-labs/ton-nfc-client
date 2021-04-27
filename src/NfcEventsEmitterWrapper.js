import {Alert, DeviceEventEmitter, NativeEventEmitter, NativeModules} from 'react-native';

const nfcEvents = new NativeEventEmitter(NativeModules.NfcEventEmitter)

export default class NfcEventsEmitterWrapper {
  supscription = null;

  static addAndroidListeners = () => {
    DeviceEventEmitter.addListener("nfcTagIsConnected", () => Alert.alert("NFC hardware touched."))
    DeviceEventEmitter.addListener("nfcAdapterStateChanged", (state) => Alert.alert("NFC adapter state is changed: " + state + "."))
    DeviceEventEmitter.addListener("keyCardOnDisconnected", () => console.log("keycard disconnected"));
    DeviceEventEmitter.addListener("keyCardOnNFCEnabled", () => console.log("nfc enabled"));
    DeviceEventEmitter.addListener("keyCardOnNFCDisabled", () => console.log("nfc disabled"));
  };

  static addListener = (callback) => {
    this.supscription = 
    nfcEvents.addListener(
       'nfcTagConnected',
       res => callback("NFC hardware is touched! Data transfer is ongoing. Wait..."),
     );
   };

  static addListener = (callback) => {
   this.supscription = 
   nfcEvents.addListener(
      'nfcTagConnected',
      res => callback("NFC hardware is touched! Data transfer is ongoing. Wait..."),
    );
  };

  static removeListener = () => {
    if (this.supscription) {
      this.supscription?.remove();
      this.supscription = null;
    }
  };
}
