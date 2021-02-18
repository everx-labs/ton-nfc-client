# ton-nfc-client

This React native library is developed to handle communication of Android smartphones/iPhones with NFC TON Labs Security cards. It provides a useful API to work with all functionality (i.e. APDU commands) supported by NFC TON Labs Security card.

For the case of iPhone you must have iOS version >= 13 and iPhone model >= 7.

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

## More about responses format

### Case of successful operation

In the case of successful operation with the card any function of ton-nfc-client library always creates json string with two fields "message" and "status". "status" will contain "ok". In the field "message" you will find an expected payload. So jsons may look like this.

	{"message":"done","status":"ok"}
	{"message":"generated","status":"ok"}
	{"message":"HMac key to sign APDU data is generated","status":"ok"}
	{"message":"980133A56A59F3A59F174FD457EB97BE0E3BAD59E271E291C1859C74C795A83368FD8C7405BC37E1C4146F4D175CF36421BF6AD2AFF4329F5A6C6D772247ED03","status":"ok"}
	etc.

### Case of error

If some error happened then functions of ton-nfc-client library produce error messages wrapped into json strings of special format. The structure of json depends on the  error class. There are two main classes of errors.

#### Applet (card) errors

It is the case when applet (installed on the card) threw some error status word (SW). So native code just catches it and throws away. The exemplary error json looks like this.

	{
		"message":"Incorrect PIN (from Ton wallet applet).",
		"status":"fail",
		"errorCode":"6F07",
		"errorTypeId":0,
		"errorType":"Applet fail: card operation error",
		"cardInstruction":"VERIFY_PIN",
		"apdu":"B0 A2 00 00 44 35353538EA579CD62F072B82DA55E9C780FCD0610F88F3FA1DD0858FEC1BB55D01A884738A94113A2D8852AB7B18FFCB9424B66F952A665BF737BEB79F216EEFC3A2EE37 FFFFFFFF "
	}
	
Here:
+ *errorCode* — error status word (SW) produced by the card (applet)

+ *cardInstruction* — title of APDU command that failed

+ *errorTypeId* — id of error type ( it will always be zero here)

+ *errorType* — description of error type 

+ *message* — contains error message corresponding to errorCode thrown by the card.

+ *apdu* — full text of failed APDU command in hex format

#### Native code errors

It is the case when error happened in native code itself. The basic examples: troubles with NFC connection or incorrect format of input data passed into ton-nfc-client library from the outside world. The exemplary error json looks like this.

	{
		"errorType": "Native code fail: incorrect format of input data",
		"errorTypeId": "3",
		"errorCode": "30006",
		"message": "Pin must be a numeric string of length 4.",
		"status": "fail"
	}
	
In this [document](https://github.com/tonlabs/ton-nfc-client/blob/master/docs/ErrorList.md) you may find the full list of json error messages (and their full classification) that can be thrown by the library.

### String format

The majority of input data passed into ton-nfc-client library is represented by hex strings of even length > 0. These hex strings are naturally converted into byte arrays inside the library, like: "0A0A" → [10, 10] as [UInt8]. 

And also the payload produced by the card and wrapped into json responses is usually represented by hex strings of even length > 0.  For example, this is a response from getPublicKey function  returning ed25519 public key.

	{"message":"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A","status":"ok"}

