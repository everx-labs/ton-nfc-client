import {
  Alert,
  DeviceEventEmitter,
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native'

const nfcEvents = new NativeEventEmitter(NativeModules.NfcEventEmitter)

type Subscription = {
  unsubscribe: () => void,
}

export default class NfcEventsEmitterWrapper {
  static addAndroidListeners = () => {
    DeviceEventEmitter.addListener("nfcTagIsConnected", () => Alert.alert("NFC hardware touched."))
    DeviceEventEmitter.addListener("nfcAdapterStateChanged", (state) => Alert.alert("NFC adapter state is changed: " + state + "."))
    DeviceEventEmitter.addListener("keyCardOnDisconnected", () => console.log("keycard disconnected"));
    DeviceEventEmitter.addListener("keyCardOnNFCEnabled", () => console.log("nfc enabled"));
    DeviceEventEmitter.addListener("keyCardOnNFCDisabled", () => console.log("nfc disabled"));
  };

  static addListener = (callback: (status: string) => void): Subscription => {
    // Create a subscription
    const subscription: EmitterSubscription = nfcEvents.addListener(
      'nfcTagConnected',
      res => callback("NFC hardware is touched! Data transfer is ongoing. Wait..."),
    );

    // Return the Subscription object to unsubscribe
    return {
      unsubscribe: () => {
        subscription.remove();
      }
    }
  };
}
