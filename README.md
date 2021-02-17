# ton-nfc-client

This React native library is developed to handle communication of Android smartphones/iPhones with NFC TON Labs Security cards. It provides a useful API to work with all functionality (i.e. APDU commands) supported by NFC TON Labs Security card.

For the case of iPhone you must have iOS version >= 13 and iPhone model >= 7.

## Installation (Android)

`$ npm install ton-nfc-client --save`

Or take it from GitHub.

`$ npm install git+https://github.com/tonlabs/ton-nfc-client`

`$ react-native link ton-nfc-client`

Also you need to add NFC related stuff into AndroidManifest.xml of your React native app.

## Installation (iOS)

### Mostly automatic installation



## Usage
```javascript
import NfcCardModule from 'ton-nfc-client';

// TODO: What to do with the module?
NfcCardModule;
```
