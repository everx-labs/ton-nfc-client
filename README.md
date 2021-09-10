# ton-nfc-client

The library is developed handle communication of Android smartphones/iPhones with NFC TON Labs Security cards. It provides a useful API to work with all functionality (i.e. APDU commands) supported by NFC TON Labs Security card. The technical specification of TON Labs Security card can be found here https://ton.surf/scard.

+ For the case of iPhone you must have iOS version >= 13 and iPhone model >= 7. For the case of Android you should also check whether it supports NFC feature.
+ Android native code of ton-nfc-client uses [TonNfcClientAndroid library](https://github.com/tonlabs/TonNfcClientAndroid) to handle NFC, and iOS native code  respectively uses [TonNfcClientSwift library](https://github.com/tonlabs/TonNfcClientSwift).

## Installation 

`$ npm install ton-nfc-client --save`

Or take it from GitHub.

`$ npm install git+https://github.com/tonlabs/ton-nfc-client`

### Additional steps for Android

Also you need to add NFC related stuff into AndroidManifest.xml of your React native app.

<!--
<uses-permission android:name="android.permission.NFC" />
<action android:name="android.nfc.action.TAG_DISCOVERED" />
-->

```xml
<intent-filter>
    	<action android:name="android.nfc.action.TECH_DISCOVERED" />
</intent-filter>
<meta-data android:name="android.nfc.action.TECH_DISCOVERED" android:resource="@xml/nfc_tech_filter" />
```

For this to work you must have an appropriate nfc_tech_filter.xml file in your xml subfolder (\app\src\main\res\xml).
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">
	<tech-list>
		<tech>android.nfc.tech.IsoDep</tech>
	    	<tech>android.nfc.tech.NfcA</tech>
  	</tech-list>
</resources>
```
### Additional steps for iOS

Run `pod install` from **ios** subdirectory of your React native app.

Also you must go through the following steps to make NFC working for you. 

- Open .workspace file of your project in Xcode.

- Go to Signing & Capabilities tab and add capability **Near Field Communication Tag Reading**.

- Add into info.plist the point **Privacy - NFC Scan Usage Description** and value for it **Test NFC**.

- Add into info.plist the point **ISO7816 application identifiers for NFC Tag Reader Session** and add for it the following items: 313132323333343435353636, A000000151000000.

- Add into info.plist the point **com.apple.developer.nfc.readersession.formats** and add for it string item **TAG**.

- Check that everywhere you have iOS11+ deployment version. Otherwise, pod installation will complain about it.

- Also there is possibility that you have to link libswiftCoreNFC library manually. For this go to **Target->Application -> Build Phases -> Link Binary With Libraries** and add **libswiftCoreNFC.tbd**.

- Go to **Project -> Application -> Build Settings -> Search Paths -> Library Search Paths** and check that you have at least **swift-5.2** everywhere.

## Simple example

```javascript
import {NfcCardModuleWrapper} from 'ton-nfc-client';

const nfcWrapper = new NfcCardModuleWrapper();
try {
	let hdIndex = "1";     
	let result = await nfcWrapper.getPublicKey(hdIndex);
	const publicKey = result.message;
  	alert("Public key: " + publicKey);
}
catch (e) {
        alert(e.message);
}
```

Another way to use ton-nfc-client functions looks as follows.

```javascript
nfcWrapper.getPublicKey(hdIndex)
   .then((result) => alert("Public key for HD path m/44'/396'/0'/0'/" + hdIndex + "' : " + result.message))
   .catch((e) => alert(e.message));
```

_Note_: You can not work with NFC using simulator. You must run it on smartphone/iPhone. So for iPhone you should set the development team.

## More about responses format and errors

To get more information about responses formats and errors please visit this pages: [Android error list](https://github.com/tonlabs/TonNfcClientAndroid/blob/master/docs/ErrorList.md), [iOS error list](https://github.com/tonlabs/TonNfcClientSwift/blob/master/docs/ErrorList.md), [Android readme](https://github.com/tonlabs/TonNfcClientAndroid/blob/master/README.md), [iOS readme](https://github.com/tonlabs/TonNfcClientSwift/blob/master/README.md).

## Card activation

Detailed information about card activation is available here [Android readme](https://github.com/tonlabs/TonNfcClientAndroid/blob/master/README.md), [iOS readme](https://github.com/tonlabs/TonNfcClientSwift/blob/master/README.md), [card activation doc](https://github.com/tonlabs/TonNfcClientAndroid/blob/master/docs/CardActivation.md). Here we just give exemplary code for React native app.

```javascript
import {NfcCardModuleWrapper, CardResponseMessage, CardStates, CardResponseStatus} from 'ton-nfc-client';

const nfcWrapper = new NfcCardModuleWrapper();
try {
	result = await nfcWrapper.getHashes();
	const hashOfCommonSecret = result.ecsHash;
	// check that hashOfCommonSecret is correct based on the data from smartcontract

	const hashOfEncryptedPassword = result.epHash;
	// check that hashOfEncryptedPassword is correct based on the data from smartcontract
	
	const newPin = "7777";
	// prepare authenticationPassword, commonSecret, initialVector based on the data from smartcontract
	
	const serialNumber = result.sn;

	await nfcWrapper.turnOnWallet(authenticationPassword, commonSecret, initialVector);
	//await nfcWrapper.turnOnWalletWithPin(newPin, authenticationPassword, commonSecret, initialVector)

}
catch (e) {
  console.log(e.message);
}
```

<!--This code must work without any problems for Android. You connect NFC card only once, then run this code via pressing some button for example. And it does all operations for you. However, it is more complicated for iOS. Each time when we call _nfcWrapper.someFunction()_ iPhone establishes new NFC session. You must reconnect the card each time. So in the above code snippet we need to reconnect the card 4-5 times. More over the above code will not work as it is. After finishing one NFC session iPhone need 5-10 seconds to be ready to establish new NFC session. So the following code may produce error "System resources unavailable" for iPhone.

```javascript
await nfcWrapper.getHashes();
await nfcWrapper.turnOnWallet(authenticationPassword, commonSecret, initialVector);
```

You may fix it in the following way.

```javascript
await nfcWrapper.getHashes();
await new Promise(r => setTimeout(r, 5000));
await nfcWrapper.turnOnWallet(authenticationPassword, commonSecret, initialVector);
```
If you do some time consuming actions between calls of two card operations, then additional delay is not required.-->

## Recovery module

Detailed information about recovery functionality is available in [Android readme](https://github.com/tonlabs/TonNfcClientAndroid/blob/master/README.md), [iOS readme](https://github.com/tonlabs/TonNfcClientSwift/blob/master/README.md). Here we just give the exemplary code for React native app. There is a snippet demonstrating the structure of recovery data and the way of adding it into TON Labs wallet applet.

```javascript
let aesjs = require('aes-js');
try {
	// get aesKeyHexString from TON Labs service
	const aesKeyBytes = aesjs.utils.hex.toBytes(aesKeyHexString);
	const surfPublicKey = "B81F0E0E07416DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A";
	const multisigAddr = "A11F0E0E07416DAB6C320ECC6BF3DBA48A70121C5251CC31B1D8F8A1B36E0F2F";
	const authenticationPassword = "F4B072E1DF2DB7CF6CD0CD681EC5CD2D071458D278E6546763CBB4860F8082FE14418C8A8A55E2106CBC6CB1174F4BA6D827A26A2D205F99B7E00401DA4C15ACC943274B92258114B5E11C16DA64484034F93771547FBE60DA70E273E6BD64F8A4201A9913B386BCA55B6678CFD7E7E68A646A7543E9E439DD5B60B9615079FE";
	const commonSecret = "7256EFE7A77AFC7E9088266EF27A93CB01CD9432E0DB66D600745D506EE04AC4";
	//in real app take surfPublicKey, multisigAddr, authenticationPassword, commonSecret from TON Labs service
	const recoveryDataJson = JSON.stringify( {
            surfPublicKey:  surfPublicKey,
            multisigAddress:  multisigAddr,
            p1: authenticationPassword, 
            cs: commonSecret 
        });
	const recoveryDataBytes = aesjs.utils.utf8.toBytes(recoveryDataJson);
	const aesCtr = new aesjs.ModeOfOperation.ctr(aesKeyBytes, new aesjs.Counter(5));
  	const encryptedBytes = aesCtr.encrypt(recoveryDataBytes);
	const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
	const result = await nfcWrapper.addRecoveryData(encryptedHex);
	const addRes = result.message;
  	console.log("Add recovery data into card result  = " + addRes);
}
catch (e) {
  	console.log(e.message);
}
```

There is an exemplary snippet demonstrating how to get the recovery data from TON Labs wallet applet.

```javascript
try {
	// get aesKeyHexString from somewhere
	const aesKeyBytes = aesjs.utils.hex.toBytes(aesKeyHexString);
	const result = await nfcWrapper.getRecoveryData();
  	const encryptedRecoveryDataFromSecurityCard = result.message;
	const encryptedRecoveryDataFromSecurityCardBytes =  aesjs.utils.hex.toBytes(encryptedRecoveryDataFromSecurityCard);
	const aesCtr = new aesjs.ModeOfOperation.ctr(aesKeyBytes, new aesjs.Counter(5));
  	const decryptedBytes = aesCtr.decrypt(encryptedRecoveryDataFromSecurityCardBytes);
  	const decryptedRecoveryDataJson = aesjs.utils.utf8.fromBytes(decryptedBytes);
  	console.log("Decrypted recovery data : " + decryptedRecoveryDataJson);
}
catch (e) {
  console.log(e.message);
}
```

## Protection against MITM

We protect the most critical card operations (APDU commands) against MITM attack by HMAC SHA256 signature. In this case the data field of such APDU is extended by 32-bytes sault generated by the card and the final byte array is signed. The obtained signature is added to the end of APDU data, i.e. its data field has the structure: payload || sault ||  sign(payload || sault). When the card gets such APDU, first it verifies sault and signature.  

The secret key for HMAC SHA256 is produced based on card activation data. This key is saved into Android keystore or iOS keychain and then is used by the app to sign APDU commands data fields. Usually after correct card activation in the app (call of nfcWrapper.turnOnWallet) this key is produced and saved. So no extra code is required.

Another situation is possible. Let's suppose you activated the card earlier. After that you reinstalled the app working with NFC TON Labs security card or you started using new  device. Then Android keystore/iOS keychain does not have the key to sign APDU commands. You must create it.

```javascript
 nfcWrapper.createKeyForHmac(authenticationPassword, commonSecret, serialNumber)
```
     
You may work with multiple NFC TON Labs security cards. In this case in your  Android keystore/iOS keychain there is a bunch of keys. Each key is marked by corresponding serial number. And you can get the list of serial numbers for which you have the key in keystore/keychain.

The list of operations protected by HMAC SHA256:

- verifyPin, signForDefaultHdPath, sign, verifyPinAndSign, verifyPinAndSignForDefaultHdPath, checkSerialNumberAndSign, checkSerialNumberAndVerifyPinAndSign, checkSerialNumberAndSignForDefaultHdPath, checkSerialNumberAndVerifyPinAndSignForDefaultHdPath;
- all functions related to card keychain.

## Request ED25519 signature

The basic functionality provided by NFC TON Labs security card is Ed25519 signature. You may request public key and request the signature for some message.

```javascript
import nacl from "tweetnacl";

hexStringToByteArray(hexStr) {
  	let bytes = [];
  	while (hexStr.length >= 2) {
     		bytes.push(parseInt(hexStr.substring(0, 2), 16));
     		hexStr = hexStr.substring(2, hexStr.length);
  	}
  	return new Uint8Array(bytes);
}

try {
	const msg = "0000"; //Some hex string of even length 
	const pin = "5555";
	let result = await nfcWrapper.verifyPinAndSignForDefaultHdPath(msg, pin);
	const signature = result.message;
	result = await nfcWrapper.getPublicKeyForDefaultPath();
  	const pubKey = result.message;
	const msgBytes = hexStringToByteArray(msg);
  	const signatureBytes = hexStringToByteArray(signature);
  	const pubKeyBytes = hexStringToByteArray(pubKey);
  	const sigVerificationRes = nacl.sign.detached.verify(msgBytes, signatureBytes, pubKeyBytes);
  	if (sigVerificationRes == false) {
       		throw new Error("Signature is not correct.");
  	}
}
catch (e) {
  console.log(e.message);
}
```

_Note:_ Functions _verifyPinAndSignForDefaultHdPath_, _verifyPinAndSign_ are protected by HMAC SHA256 signature. But also there is an additional protection for them by PIN code. You have 10 attempts to enter PIN. After 10th fail you will not be able to use existing seed (keys for ed25519). The only way to unblock these functions is to reset the seed (see _resetWallet_ function) and generate new seed (see _generateSeed_). After resetting the seed PIN will be also reset to default value _5555_.

## Card keychain

The detailed information about card keychain is available here [Android readme](https://github.com/tonlabs/TonNfcClientAndroid/blob/master/README.md), [iOS readme](https://github.com/tonlabs/TonNfcClientSwift/blob/master/README.md). Here we just give the exemplary code for React native app. The below snippet demonstrates the work with keychain. We add one key and then retrieve it from the card. Then we replace it by a new key of the same length. In the end we delete the key.

```javascript
try {
  	const key = "B81F0E0E07416DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A";
  	let result = await nfcWrapper.addKeyIntoKeyChain(key);
	const keyHmac = result.message;
	result = await nfcWrapper.getKeyFromKeyChain(keyHmac);
	const keyFromCard = result.message;
	const newKey = "AA1F0E0E07416DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F25";
	result = await nfcWrapper.changeKey(newKey, keyHmac);
	const newKeyHmac = result.message;
	result = await nfcWrapper.getNumberOfKeys();
	let numberOfKeys = result.message;
  	console.log("Number of keys = " + numberOfKeys);
  	await nfcWrapper.deleteKeyFromKeyChain(newKeyHmac);	
	result = await nfcWrapper.getNumberOfKeys();
	numberOfKeys = result.message;
	console.log("Number of keys = " + numberOfKeys);
}
catch (e) {
  console.log(e.message)
}
```

<!--_Note:_  await new Promise(r => setTimeout(r, 5000)) is necessary for running app on iPhone since multiple successive NFC sessions establishing may cause a trouble with system resourses. We need to make a pause between finishing one NFC session and starting a new NFC session. For Android it's not necessary.-->

## Full functions list 

The full list of functions provided by the library to communicate with the card you will find [here](https://github.com/tonlabs/ton-nfc-client/blob/master/docs/FuntionsList.md)

## Catching NFC related events from ton-nfc-client

For Android add into your app the following exemplary code:

```javascript
import {NfcEventsEmitterWrapper} from 'ton-nfc-client';
import Toast from 'react-native-simple-toast';

NfcEventsEmitterWrapper.addListener((msg) => {
  Toast.showWithGravity(msg, Toast.LONG, Toast.TOP);
  console.log(msg);
});
```

For iOS you additionaly should add this.

```javascript
if (Platform.OS === "ios") {
  nfcCardModuleWrapper.setNfcNotificator();
}
```
