# ton-nfc-client

This React native library is developed to handle communication of Android smartphones/iPhones with NFC TON Labs Security cards. It provides a useful API to work with all functionality (i.e. APDU commands) supported by NFC TON Labs Security card.

For the case of iPhone you must have iOS version >= 13 and iPhone model >= 7. For the case of Android you should also check whether it supports NFC feature.

Android native code of ton-nfc-client uses [TonNfcClientAndroid library](https://github.com/tonlabs/TonNfcClientAndroid) to handle all NFC stuff., and iOS native code of ton-nfc-client respectively uses [TonNfcClientSwift library](https://github.com/tonlabs/TonNfcClientSwift).

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

For this to work you must have an appropriate nfc_tech_filter.xml file in your xml subfolder (\app\src\main\res\xml). File nfc_tech_filter.xml must looks as follows.
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

## More about responses format and errors

To get more information about responses formats and errors please visit this pages: [Android error list](https://github.com/tonlabs/TonNfcClientAndroid/blob/master/docs/ErrorrList.md), [iOS error list](https://github.com/tonlabs/TonNfcClientSwift/blob/master/docs/ErrorrList.md), [Android readme](https://github.com/tonlabs/TonNfcClientAndroid/blob/master/README.md), [iOS readme](https://github.com/tonlabs/TonNfcClientSwift/blob/master/README.md).



