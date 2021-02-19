# ton-nfc-client

This React native library is developed to handle communication of Android smartphones/iPhones with NFC TON Labs Security cards. It provides a useful API to work with all functionality (i.e. APDU commands) supported by NFC TON Labs Security card. The technical specification of TON Labs Security card can be found here https://ton.surf/scard.

+ For the case of iPhone you must have iOS version >= 13 and iPhone model >= 7. For the case of Android you should also check whether it supports NFC feature.
+ Android native code of ton-nfc-client uses [TonNfcClientAndroid library](https://github.com/tonlabs/TonNfcClientAndroid) to handle all NFC stuff, and iOS native code  respectively uses [TonNfcClientSwift library](https://github.com/tonlabs/TonNfcClientSwift).

## Installation 

`$ npm install ton-nfc-client --save`

Or take it from GitHub.

`$ npm install git+https://github.com/tonlabs/ton-nfc-client`

### Additional steps for Android

Also you need to add NFC related stuff into AndroidManifest.xml of your React native app.

```xml
<uses-permission android:name="android.permission.NFC" />
<uses-feature android:name="android.hardware.nfc" android:required="true" />
<intent-filter>
	<action android:name="android.nfc.action.NDEF_DISCOVERED" />
    	<action android:name="android.nfc.action.TECH_DISCOVERED" />
    	<action android:name="android.nfc.action.TAG_DISCOVERED" />
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

- Also there is possibility that you have to link libswiftCoreNFC library manually. For this go **Target->Application -> Build Phases -> Link Binary With Libraries" and add **libswiftCoreNFC.tbd**.

- Go to **Project -> Application -> Build Settings -> Search Paths -> Library Search Paths** and check that you have at least **swift-5.2** everywhere.

_Note_ : you can not work with NFC using simulator, you must run it on iPhone, so you also should set development team.

## Simple example

```javascript
import NfcCardModule from 'ton-nfc-client';

try {
	let hdInd = "1"            
	let result = await NfcCardModule.getPublicKey(hdInd);
  	alert("Public key: " + result)
}
catch (e) {
        alert(e.message)
}
```

Another way to use ton-nfc-client functions looks as follows.

```javascript
NfcCardModule.getPublicKey(hdIndex)
   .then((result) => alert("Public key for HD path m/44'/396'/0'/0'/" + hdIndex + "' : " + result))
   .catch((e) => alert(e.message))
```

## More about responses format and errors

To get more information about responses formats and errors please visit this pages: [Android error list](https://github.com/tonlabs/TonNfcClientAndroid/blob/master/docs/ErrorrList.md), [iOS error list](https://github.com/tonlabs/TonNfcClientSwift/blob/master/docs/ErrorList.md), [Android readme](https://github.com/tonlabs/TonNfcClientAndroid/blob/master/README.md), [iOS readme](https://github.com/tonlabs/TonNfcClientSwift/blob/master/README.md).

## Card activation

Detailed information about card activation is available here [Android readme](https://github.com/tonlabs/TonNfcClientAndroid/blob/master/README.md), [iOS readme](https://github.com/tonlabs/TonNfcClientSwift/blob/master/README.md), [card activation doc](https://github.com/tonlabs/TonNfcClientAndroid/blob/master/docs/CardActivation.md).

Here we just give exemplary code for React native app.

```javascript
try {
	let seedStatus = JSON.parse( await NfcCardModule.getRootKeyStatus().message;
	let pin = "5555"	
	if (seedStatus == "not generated") {
		await NfcCardModule.generateSeed(pin)
	}
           
	let state = JSON.parse( await NfcCardModule.getTonAppletState()).message;
	if (state !== "TonWalletApplet waits two-factor authorization.") {
		throw "Incorret applet state!"
	}

	let hashOfCommonSecret = JSON.parse( await NfcCardModule.getHashOfCommonSecret()).message;
	// check that hashOfCommonSecret is correct based on the data from smartcontract

	let hashOfEncryptedPassword = JSON.parse( await NfcCardModule.getHashOfEncryptedPassword()).message;
	// check that hashOfEncryptedPassword is correct based on the data from smartcontract
	
	let newPin = "7777";
	// prepare authenticationPassword, commonSecret, initialVector based on the data from smartcontract

	await NfcCardModule.turnOnWallet(newPin, authenticationPassword, commonSecret, initialVector);
}
catch (e) {
  console.log(e.message)
}
```

This code must work without any problems for Android. You connect NFC card only once, then run this code via pressing some button for example. And it does all operations for you. However, it is more complicated for iOS. Each time when we call NfcCardModule.someFunction() iPhone establishes new NFC session. You must reconnect the card each time. So in the above code snippet we need to reconnect the card 6 times. More over the above code will not work as it is. After finishing one NFC session iPhone need 5-10 seconds to be ready to establish new NFC session. So the following code may produce error "System resources unavailable" for iPhone.

```javascript
let hashOfCommonSecret = JSON.parse( await NfcHandler.NfcCardModule.getHashOfCommonSecret()).message;
let hashOfEncryptedPassword = JSON.parse( await NfcHandler.NfcCardModule.getHashOfEncryptedPassword()).message;
```

You may fix it in the following way.

```javascript
let hashOfCommonSecret = JSON.parse( await NfcHandler.NfcCardModule.getHashOfCommonSecret()).message;
await new Promise(r => setTimeout(r, 10000));
let hashOfEncryptedPassword = JSON.parse( await NfcHandler.NfcCardModule.getHashOfEncryptedPassword()).message;
```
If you do some time consuming actions between calls of getHashOfCommonSecret and getHashOfEncryptedPassword, then additional delay is not required.

## Recovery module

Detailed information about recovery functionality is available here [Android readme](https://github.com/tonlabs/TonNfcClientAndroid/blob/master/README.md), [iOS readme](https://github.com/tonlabs/TonNfcClientSwift/blob/master/README.md). Here we just give exemplary code for React native app. There is a snippet demonstrating the structure of recovery data and the way of adding it into TON Labs wallet applet.

```javascript
var aesjs = require('aes-js')
try {
	// get aesKeyHexString and testData from TON Labs service
	var aesKeyBytes = aesjs.utils.hex.toBytes(aesKeyHexString);
	//prepare json string containing recovery data, get
	var recoveryDataJson = JSON.stringify( {
            surfPublicKey:  testData.multisig.keyPair.public,
            multisigAddress:  testData.multisig.address,
            p1: testData.cards[0].P1, // authenticationPassword
            cs: testData.cards[0].CS // commonSecret
        });
	var recoveryDataBytes = aesjs.utils.utf8.toBytes(recoveryDataJson);
	var aesCtr = new aesjs.ModeOfOperation.ctr(aesKeyBytes, new aesjs.Counter(5));
  	var encryptedBytes = aesCtr.encrypt(recoveryDataBytes);
	var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
	var addRes = await NfcHandler.NfcCardModule.addRecoveryData(encryptedHex);
  	console.log("add Recovery data into card result  = " + addRes);
}
catch (e) {
  	console.log(e.message)
}
```

There is an exemplary snippet demonstrating how to get recovery data from TON Labs wallet applet.

```javascript
var aesjs = require('aes-js')
try {
	// get aesKeyHexString from somewhere
	var aesKeyBytes = aesjs.utils.hex.toBytes(aesKeyHexString);
  	var encryptedRecoveryDataFromSecurityCard = await NfcHandler.NfcCardModule.getRecoveryData()
	var encryptedRecoveryDataFromSecurityCardBytes =  aesjs.utils.hex.toBytes(encryptedRecoveryDataFromSecurityCard)
	var aesCtr = new aesjs.ModeOfOperation.ctr(aesKeyBytes, new aesjs.Counter(5))
  	var decryptedBytes = aesCtr.decrypt(encryptedRecoveryDataFromSecurityCardBytes)
 
  	// To print or store the binary data, you may convert it to hex
  	var decryptedRcoveryDataJson = aesjs.utils.utf8.fromBytes(decryptedBytes)
  	console.log("Decrypted recovery data : " + decryptedRcoveryDataJson)
}
catch (e) {
  console.log(e.message)
}
```

## Protection against MITM

We protect the most critical card operations (APDU commands) against MITM attack by HMAC SHA256 signature. In this case the data field of such APDU is extended by 32-bytes sault generated by the card and the final byte array is signed. The obtained signature is added to the end of APDU data, i.e. its data field has the structure: payload || sault ||  sign(payload || sault). When the card gets such APDU, first it verifies sault and signature.  

The secret key for HMAC SHA256 is produced based on card activation data (see above section). This key is saved into Android keystore or iOS keychain and then is used by the app to sign APDU commands data fields. Usually after correct card activation in the app (call of NfcCardModule.turnOnWallet) this key is produced and saved. So no extra code is required.

Another situation is possible. Let's suppose you activated the card earlier. After that you reinstalled the app working with NFC TON Labs security card or you started using new  device. Then Android keystore/iOS keycain does not have the key to sign APDU commands. You must create it.

```javascript
 NfcCardModule.createKeyForHmacAndGetJson(authenticationPassword, commonSecret, serialNumber);
```
     
You may work with multiple NFC TON Labs security cards. In this case in your  Android keystore/iOS keycain there is a bunch of keys. Each key is marked by corresponding SN. And you can get the list of serial numbers for which you have the key in keystore

The list of operations protected by HMAC SHA256:

- verifyPin, signForDefaultHdPath, sign (see below sections)
- all functions related to card keychain

## Request ED25519 signature

The basic functionality provided by NFC TON Labs security card is Ed25519 signature. You may request public key and request the signature for some message.

```javascript
import nacl from "tweetnacl";

static hexStringToByteArray(hexStr) {
  	var bytes = [];
  	while (hexStr.length >= 2) {
     		bytes.push(parseInt(hexStr.substring(0, 2), 16));
     		hexStr = hexStr.substring(2, hexStr.length);
  	}
  	return new Uint8Array(bytes);
}

try {
	let msg = "0000"; //Some hex string of even length 
	let pin = "5555";
	var signature = await NfcHandler.NfcCardModule.signForDefaultHdPath(msg, pin);
  	await new Promise(r => setTimeout(r, 10000))
  	var pk = await NfcHandler.NfcCardModule.getPublicKeyForDefaultPath();
	let msgBytes = HexHelper.hexStringToByteArray(msg);
  	let signatureBytes = HexHelper.hexStringToByteArray(signature);
  	let pkBytes = HexHelper.hexStringToByteArray(pubKey);
  	let sigVerificationRes = nacl.sign.detached.verify(msgBytes, signatureBytes, pkBytes);
  	if (sigVerificationRes == false) {
       		throw new Error("Signature is not correct.");
  	}
}
catch (e) {
  console.log(e.message)
}
```

_Note:_ Functions signForDefaultHdPath, sign are protected by HMAC SHA256 signature (see previous section). But also there is an additional protection for them by PIN code. You have 10 attempts to enter PIN, after 10th fail you will not be able to use existing seed (keys for ed25519) . The only way to unblock these functions is to reset the seed (see resetWallet function) and generate new seed (see generateSeed). After resetting the seed PIN will be also reset to default value 5555.

## Card keychain

Detailed information about card keychain is available here [Android readme](https://github.com/tonlabs/TonNfcClientAndroid/blob/master/README.md), [iOS readme](https://github.com/tonlabs/TonNfcClientSwift/blob/master/README.md). Here we just give exemplary code for React native app. The below snippet demonstrates the work with keychain. We add one key and then retrieve it from the card. Then we replace it by a new key. At the end we delete the key.

```javascript
try {
	let keyLen = 8192;
  	let key = HexHelper.genHexString(2*keyLen);
	await new Promise(r => setTimeout(r, 5000));
  	let keyHmac = await NfcHandler.NfcCardModule.addKeyIntoKeyChain(key);
	await new Promise(r => setTimeout(r, 5000));
	let keyFromCard = await NfcHandler.NfcCardModule.getKeyFromKeyChain(keyHmac);
  	//assertTrue(key === keyFromCard)
	let newKey = HexHelper.genHexString(2*keyLen);
  	await new Promise(r => setTimeout(r, 5000));
	var newKeyHmac = await NfcHandler.NfcCardModule.changeKey(newKey, keyHmac);
	await new Promise(r => setTimeout(r, 5000));
	let num1 = await NativeModules.NfcCardModule.getNumberOfKeys();
  	console.log("Number of keys = " + result);
	await new Promise(r => setTimeout(r, 5000))
  	await NativeModules.NfcCardModule.deleteKeyFromKeyChain(newKeyHmac);	
	await new Promise(r => setTimeout(r, 5000))
	let num2 = await NativeModules.NfcCardModule.getNumberOfKeys();
	console.log("Number of keys = " + result);
	//assertTrue(num2 === num1 - 1)
}
catch (e) {
  console.log(e.message)
}
```

_Note:_  await new Promise(r => setTimeout(r, 5000)) is necessary for running app on iPhone since multiple successive NFC sessions establishing may cause a trouble with system recourses. We need to make a pause between finishing one NFC session and starting a new NFC session. For Android it is not necessary.

## Full functions list 

The full list of functions provided by the library to communicate with the card you will find [here](https://github.com/tonlabs/ton-nfc-client/blob/master/docs/FuntionsList.md)

## Catching NFC related events from ton-nfc-client

Section will be added soon.
