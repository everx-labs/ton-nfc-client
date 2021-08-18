import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native'

const nfcEvents = new NativeEventEmitter(NativeModules.NfcEventEmitter)

type Subscription = {
  unsubscribe: () => void,
}

export default class NfcEventsEmitterWrapper {
  static addListener = (callback: (status: string) => void): Subscription => {
    const subscriptionNfcTagConnected: EmitterSubscription = nfcEvents.addListener(
      'nfcTagConnected',
      () => callback("NFC tag connected."),
    );
    const subscriptionNfcAdapterStateChanged: EmitterSubscription = nfcEvents.addListener(
      'nfcAdapterStateChanged',
      (res: any) => callback("NFC Adapter state: " + res.state),
    );

    return {
      unsubscribe: () => {
        subscriptionNfcTagConnected.remove();
        subscriptionNfcAdapterStateChanged.remove();
      }
    }
  };
}
