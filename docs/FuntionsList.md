# Full functions list (ton-nfc-client)

Library ton-nfc-client provides a class NfcCardModuleWrapper exporting all API to work with NFC TON Labs Security cards. All functions in this API are async and put results into Promises. So you should work with them as follows.

```javascript
import {NfcCardModuleWrapper} from 'ton-nfc-client';

const nfcWrapper = new NfcCardModuleWrapper();
try {
	const hdIndex = "1";   
	const result = await nfcWrapper.getPublicKey(hdIndex);
	const publicKey = result.message;
  	alert("Public key: " + publicKey);
}
catch (e) {
        alert(e.message);
}
```

```javascript
nfcWrapper.getPublicKey(hdIndex)
   .then((result) => alert("Public key for HD path m/44'/396'/0'/0'/" + hdIndex + "' : " + result.message))
   .catch((e) => alert(e.message));
```

Each API function returns _Promise< CardResponse >_, where _CardResponse_ is defined as follows.
	
```javascript
export default class class CardResponse {
    public message: string
    public status: string
    public ecsHash: string
    public epHash: string
    public numberOfKeys: string
    public occupiedSize: string
    public freeSize: string
    public hmac: string
    public length: string
	...
}
```

_CardResponse_ contains all possible fields that can be met in responses from the card. But they are not all used at the same time. Each card response has _status_ field obligatory. And the most common typical response from the card has _message_ field containing payload. In this case other fields in _CardResponse_ are empty and contains just an empty string. But for some rare functions _message_ field will be empty and payload is put into another fields. In below functions list you may find all necessary details.

Below there is enum collecting constants that represent the most common _message_ field values that you can meet in responses from the card. You can use it in your app.

```javascript
enum CardResponseMessage {
    Done = 'done',
    False = 'false',
    True = 'true',
    Generated = 'generated',
    NotGenerated = 'not generated',
    HmacKeysNotFound = 'HMAC-SHA256 keys are not found'
}
```
There is the following enum collecting different string constants thta represent applet state.

```javascript
enum CardStates {
    Installed  = 'TonWalletApplet is invalid (is not personalized)',
    Personalized = 'TonWalletApplet is personalized.',
    WaiteAuthentication = 'TonWalletApplet waits two-factor authentication.',
    DeleteKeyFromKeychain = 'TonWalletApplet is personalized and waits finishing key deleting from keychain.',
    Blocked = 'TonWalletApplet is blocked.'
}
```

And finally there is enum collecting different card response statuses. 

```javascript
enum CardResponseStatus {
    Success = 'ok',
    Fail = 'fail'
}
```

_Note_: Below we specify how CardResponse looks like for each API function. And for simplicity of representation we omit empty fields of CardResponse everywhere.

All API functions can throw two main types of errors.	

```javascript
export default class NfcNativeModuleError extends Error {
    public status: string
    public errorCode: string
    public errorTypeId: string
    public errorType: string

    constructor(
        public message: string,
        status: string,
        errorCode: string,
        errorTypeId: string,
        errorType: string
    ) {
        super(message)
        this.status = status
        this.errorCode = errorCode
        this.errorType = errorType
        this.errorTypeId = errorTypeId
    }
}	
```

```javascript
export default class CardError extends NfcNativeModuleError {
    public cardInstruction: string
    public apdu: string
	...
}
```

NfcNativeModuleError corresponds to error happened in Android/iOS code itself. Whereas CardError corresponds to error happened in applet. For more details see section _More about responses format_ in readmes [TonNfcClientAndroid](https://github.com/tonlabs/TonNfcClientAndroid), [TonNfcClientSwift](https://github.com/tonlabs/TonNfcClientSwift).
	
## NFC related functions

Here there are functions to check/change the state of your NFC hardware.  

- **async checkIfNfcSupported(): Promise< CardResponse >**  _(available for Android and iOS)_

    Check if your Android/iPhone device has NFC hardware. 

    *Responses:*

        {"message":"true","status":"ok"}
        {"message":"false","status":"ok"}

- **async checkIfNfcEnabled(): Promise< CardResponse >** _(available for Android)_

    Check if NFC option is turned on for your Android device.

    *Responses:*

    	{"message":"true","status":"ok"}
    	{"message":"false","status":"ok"}

- **async openNfcSettings(): Promise< CardResponse >** _(available for Android)_

     Open "Settings" panel to mantain NFC option.

    *Response:*

    	{"message":"done","status":"ok"}

    
## CoinManager functions 

Here there are functions to call APDU commands of CoinManager. CoinManager is an additional software integrated into NFC TON Labs Security card. It is responsible for maintaining ed25519 seed, related PIN and it provides some auxiliary operations. 

- **async setDeviceLabel(label: string): Promise< CardResponse >** _(available for Android and iOS)_<br/> 

    This function is used to set the device label. Now we do not use this device label stored in Coin Manager.

    *Arguments requirements:*
    
        deviceLabel — hex string of length 64, 
        example: '005815A3942073A6ADC70C035780FDD09DF09AFEEA4173B92FE559C34DCA0550'

    *Response:*

        {"message":"done","status":"ok"}


- **async getDeviceLabel(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    This function is used to get device label. Now we do not use this device label stored in Coin Manager.

    *Exemplary response:*

        {"message":"005815A3942073A6ADC70C035780FDD09DF09AFEEA4173B92FE559C34DCA0550","status":"ok"}

- **async getSeVersion(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    This function is used to get SE (secure element) version. 

    *Response:*

        {"message":"1008","status":"ok"}


- **async getCsn(): Promise< CardResponse >**  _(available for Android and iOS)_<br/>

    This function is used to get CSN (SEID).

    *Exemplary response:*

        {"message":"11223344556677881122334455667788","status":"ok"}


- **async getMaxPinTries(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    This function is used to get retry maximum times of PIN. 

    *Response:*

        {"message":"10","status":"ok"}

- **async getRemainingPinTries(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    This function is used to get remaining retry times of PIN.

    *Exemplary response:*

        {"message":"10","status":"ok"}


- **async getRootKeyStatus(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    This function is used to get the status of seed for ed25519: is it generated or not.

    *Response:*
    
        a) If seed is present: {"message":"generated","status":"ok"}
        b) If seed is not present: {"message":"not generated","status":"ok"}


- **async resetWallet(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    This function is used to reset the wallet state to the initial state. After resetting the wallet, the default PIN value would be 5555. The remaining number of retry for PIN will be reset to MAX (default is 10). The seed for ed25519 will be erased. And after its calling any card operation (except of CoinManager stuff) will fail with 6F02 error. TON Labs wallet applet does not work without seed at all.

    *Response:*

        {"message":"done","status":"ok"}


- **async getAvailableMemory(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    This function is used to obtain the amount of memory of the specified type that is available to the applet. Note that implementation-dependent memory overhead structures may also use the same memory pool.
        
    *Exemplary response:*

        will be added soon


- **async getAppsList(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    This function is used to get application list. It returns list of applets AIDs that were installed onto card.

    *Exemplary response:*

        {"message":"4F0D31313232333334343535363600","status":"ok"}

    _Note:_ Here 313132323333343435353636 is AID of our TON Labs wallet applet

- **async generateSeed(pin: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    This function is used to generate the seed for ed25519 with RNG.

    *Arguments requirements:*

        pin — numeric string of length 4, example: '5555'

    By the way 5555 is a default PIN for all cards. 

    *Response:*

        If seed does not exist then: {"message":"done","status":"ok"}
        If seed already exists and you call generateSeed then it will throw a error.


- **async changePin(oldPin: string, newPin: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    This function is used to change PIN.

    *Arguments requirements:*
           
        oldPin — numeric string of length 4, example: '5555'
        newPin — numeric string of length 4, example: '6666'

    *Response:*

        {"message":"done","status":"ok"}


## Functions to work with TON Labs wallet applet

TON Labs wallet applet is software developed by TON Labs team and integrated into NFC TON Labs Security card. It provides main card functionality. It takes seed for ed25519 signature from CoinManager entity.

### Common functions

- **async getTonAppletState(): Promise< CardResponse >** _(available for Android and iOS)_<br/>
 
    This function returns state of TON Labs wallet applet.

    *Exemplary responses:*

        {"message":"TonWalletApplet waits two-factor authentication.","status":"ok"}
        {"message":"TonWalletApplet is personalized.","status":"ok"}

- **async getSerialNumber(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    This function returns serial number (SN). It must be identical to SN printed on the card.

    *Exemplary response:*

        {"message":"504394802433901126813236","status":"ok"}

- **async getSault(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    This function returns fresh 32 bytes sault generated by the card. 

    *Exemplary response:*

        {"message":"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A","status":"ok"}

### Functions to mantain keys for HMAC SHA256 

- **async selectKeyForHmac(serialNumber: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Manually select new active card (it selects the serial number and correspondingly choose the appropriate key HMAC SHA256 from Android keystore/iOS keychain).

    *Arguments requirements:*

        serialNumber — numeric string of length 24, example: "50439480243390112681323"

    *Response:*

        {"message":"done","status":"ok"}

- **async createKeyForHmac(authenticationPassword: string, commonSecret: string, serialNumber: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    If you reinstalled app and lost HMAC SHA256 symmetric key for the card from your Android keystore/iOS keychain, then create the key for your card using this function.

    *Arguments requirements:*

        authenticationPassword — hex string of length 256, 
        example:    "4A0FD62FFC3249A45ED369BD9B9CB340829179E94B8BE546FB19A1BC67C9411BC5DC85B5E38F96689B921A64DEF1A3B6F4D2F5C7D2B0BD7CCE420DBD281BA1CC82EE0B233820EB5CFE505B7201903ABB12959B251A5A8525B2515F57ACDE30905E70C2A375D5C0EC10A5EA6E264206395BF163969632398FA4A88D359FEA21D9"

        commonSecret — hex string of length 64, example: "9CEE28E284487EEB8FA6CE7C101C1184BB368F0CCAD057C9D89F7EC3307E72BA"

        serialNumber — numeric string of length 24, example: "50439480243390112681323"

    _Note:_ Use here activation data tuple  (authenticationPassword, commonSecret) that is correct for your card, i.e. corresponds to your serialNumber.

    *Response:*

        {"message":"done","status":"ok"}

- **async getCurrentSerialNumber(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Get serial number of currently active key (card). In fact this is a serialNumber of the card with which your app communicated last time.

    *Exemplary response:*

        {"message":"504394802433901126813236","status":"ok"}

- **async getAllSerialNumbers(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Get the list of card serial numbers for which we have keys in Android keystore/iOS keychain.

    *Exemplary response:*

    {"message":["504394802433901126813236", "455324585319848551839771"],"status":"ok"}

- **async isKeyForHmacExist(serialNumber: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Check if key for given serialNumber exists in Android keystore/iOS keychain.

    *Arguments requirements:*

        serialNumber — numeric string of length 24, example: "50439480243390112681323"

    *Exemplary response:*

        {"message":"true","status":"ok"}

- **async deleteKeyForHmac(serialNumber: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Delete key for given serialNumber from Android keystore/iOS keychain.

    *Arguments requirements:*

        serialNumber — numeric string of length 24, example: "50439480243390112681323"

    *Response:*

        {"message":"done","status":"ok"}

### Functions related to card activation

When user gets NFC TON Labs security card  at the first time, the applet on the card is in a special state. It waits for user authentication. And the main functionality of applet is blocked for now. At this point you may call all functions from previous subsections. And also some special functions are available to complete card activation. 

- **async turnOnWalletWithPin(newPin: string, authenticationPassword: string, commonSecret: string, initialVector: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    This function makes TON Labs wallet applet activation. After its succesfull call applet will be in working personalized state (so getTonAppletState() will return {"message":"TonWalletApplet is personalized.","status":"ok"}). At the begining of its work it reset seed and pin and generate new seed.

    *Arguments requirements:*

        newPin — numeric string of length 4, example: '7777'

        authenticationPassword — hex string of length 256, 
        example: "4A0FD62FFC3249A45ED369BD9B9CB340829179E94B8BE546FB19A1BC67C9411BC5DC85B5E38F96689B921A64DEF1A3B6F4D2F5C7D2B0BD7CCE420DBD281BA1CC82EE0B233820EB5CFE505B7201903ABB12959B251A5A8525B2515F57ACDE30905E70C2A375D5C0EC10A5EA6E264206395BF163969632398FA4A88D359FEA21D9"

        commonSecret — hex string of length 64, example: "9CEE28E284487EEB8FA6CE7C101C1184BB368F0CCAD057C9D89F7EC3307E72BA"

        initialVector — hex string of length 32, example: "E439F75C6FC516F1C4725E825164216C"

    _Note:_ Use here activation data tuple  (authenticationPassword, commonSecret, initialVector) that is correct for your card, i.e. corresponds to your serialNumber.

    *Response:*

        {"message":"TonWalletApplet is personalized.","status":"ok"}
	
- **async turnOnWallet(authenticationPassword: string, commonSecret: string, initialVector: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    This function makes TON Labs wallet applet activation. After its succesfull call applet will be in working personalized state (so getTonAppletState() will return {"message":"TonWalletApplet is personalized.","status":"ok"}). It uses default PIN '5555'. At the begining of its work it reset seed and pin and generate new seed.

    *Arguments requirements:*

        authenticationPassword — hex string of length 256, 
        example: "4A0FD62FFC3249A45ED369BD9B9CB340829179E94B8BE546FB19A1BC67C9411BC5DC85B5E38F96689B921A64DEF1A3B6F4D2F5C7D2B0BD7CCE420DBD281BA1CC82EE0B233820EB5CFE505B7201903ABB12959B251A5A8525B2515F57ACDE30905E70C2A375D5C0EC10A5EA6E264206395BF163969632398FA4A88D359FEA21D9"

        commonSecret — hex string of length 64, example: "9CEE28E284487EEB8FA6CE7C101C1184BB368F0CCAD057C9D89F7EC3307E72BA"

        initialVector — hex string of length 32, example: "E439F75C6FC516F1C4725E825164216C"

    _Note:_ Use here activation data tuple  (authenticationPassword, commonSecret, initialVector) that is correct for your card, i.e. corresponds to your serialNumber.

    *Response:*

        {"message":"TonWalletApplet is personalized.","status":"ok"}

- **async getHashOfEncryptedCommonSecret(): Promise< CardResponse >** _(available for Android and iOS)_<br/>
 
    Return SHA256 hash of encrypted common secret.

    *Exemplary response:*

        {"message":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF","status":"ok"}

- **async getHashOfEncryptedPassword(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Return SHA256 hash of encrypted password.

    *Exemplary responses:*

        {"message":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","status":"ok"}
	
- **async getHashes(): Promise< CardResponse >**  _(available for Android and iOS)_<br/>

    Generate seed if it's absent and then return SHA256 hash of encrypted password, hash of encrypted common secret, serial number.

    *Exemplary responses:*

        {"ecsHash":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","epHash":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF", "serialNumber":"929526125066377952749605", "status":"ok"}


### Functions related to ed25519

Here there are functions related to ed25519 signature.

- **async getPublicKeyForDefaultPath(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Return public key for HD path m/44'/396'/0'/0'/0'.

    *Exemplary response:*

        {"message":"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A","status":"ok"}
	
- **async checkSerialNumberAndGetPublicKeyForDefaultPath(serialNumber: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>
	
    Read serial number of currently connected security card and compare it with serialNumber argument. If they are identical then return public key for HD path m/44'/396'/0'/0'/0'. Else reject the card.
	
    *Arguments requirements:*

        serialNumber — numeric string of length 24, example: "50439480243390112681323"
	
    *Exemplary response:*

        {"message":"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A","status":"ok"}

- **async verifyPin(pin: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Make pin verification.

    *Arguments requirements:*

        pin — numeric string of length 4, example: '5555'

    *Response:*

        {"message":"done","status":"ok"}

- **async signForDefaultHdPath(dataForSigning: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Make data signing by key for HD path m/44'/396'/0'/0'/0'. Prior to call this function you must call verifyPin.

    *Arguments requirements:*

        dataForSigning — hex string of even length ≥ 2 and ≤ 378.

    *Exemplary response:*

         {"message":
            "2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605",
          "status":"ok"
         }
- **async checkSerialNumberAndSignForDefaultHdPath(serialNumber: string, dataForSigning: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>
	
    Read serial number of currently connected security card and compare it with serialNumber argument. If they are identical then make data signing by key for HD path m/44'/396'/0'/0'/0'. Else reject the card. Prior to call this function you must call verifyPin.
    
    *Arguments requirements:*

        serialNumber — numeric string of length 24, example: "50439480243390112681323".
        
        dataForSigning — hex string of even length ≥ 2 and ≤ 378.
	
    *Exemplary response:*

        {"message":
            "2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605",
          "status":"ok"
         }

- **async sign(dataForSigning: string, hdIndex: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Make data signing by key for HD path m/44'/396'/0'/0'/hdIndex'. Prior to call this function you must call verifyPin.

    *Arguments requirements:*

        hdIndex — numeric string of length > 0 and ≤ 10.

        dataForSigning — hex string of even length ≥ 2 and ≤ 356.

    *Exemplary response:*

        {"message":
            "13FB836213B12BBD41209273F81BCDCF7C226947B18128F73E9A6E96C84B30C3288E51C622C045488981B6544D02D0940DE54D68A0A78BC2A5F9523B8757B904",
         "status":"ok"
        }

- **async checkSerialNumberAndSign(serialNumber: string, dataForSigning: string, hdIndex: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>
	
    Read serial number of currently connected security card and compare it with serialNumber argument. If they are identical then make data signing by key for HD path m/44'/396'/0'/0'/hdIndex'. Else reject the card. Prior to call this function you must call verifyPin.
    
    *Arguments requirements:*
    
    	hdIndex — numeric string of length > 0 and ≤ 10.

        serialNumber — numeric string of length 24, example: "50439480243390112681323".
        
        dataForSigning — hex string of even length ≥ 2 and ≤ 356.
	
	
    *Exemplary response:*

        {"message":
            "13FB836213B12BBD41209273F81BCDCF7C226947B18128F73E9A6E96C84B30C3288E51C622C045488981B6544D02D0940DE54D68A0A78BC2A5F9523B8757B904",
         "status":"ok"
        }

- **async getPublicKey(hdIndex: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Return public key for HD path m/44'/396'/0'/0'/hdIndex'.

    *Arguments requirements:*

        hdIndex — numeric string of length > 0 and ≤ 10.

    *Exemplary response:*

        {"message":"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A","status":"ok"}
	
- **async checkSerialNumberAndGetPublicKey(serialNumber: string, hdIndex: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>
	
    Read serial number of currently connected security card and compare it with serialNumber argument. If they are identical then return public key for HD path m/44'/396'/0'/0'/hdIndex'. Else reject the card.
	
    *Arguments requirements:*
    
    	hdIndex — numeric string of length > 0 and ≤ 10.

        serialNumber — numeric string of length 24, example: "50439480243390112681323"
	
    *Exemplary response:*

        {"message":"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A","status":"ok"}

- **async verifyPinAndSignForDefaultHdPath(dataForSigning: string, pin: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Make pin verification and data signing by key for HD path m/44'/396'/0'/0'/0'.

    *Arguments requirements:*

        pin — numeric string of length 4, example: '5555'

        dataForSigning — hex string of even length ≥ 2 and ≤ 378.

    *Exemplary response:*

        {"message":
            "2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605",   
         "status":"ok"
        }
- **async checkSerialNumberAndVerifyPinAndSignForDefaultHdPath(serialNumber: string, dataForSigning: string, pin: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>
	
    Read serial number of currently connected security card and compare it with serialNumber argument. If they are identical then make pin verification and data signing by key for HD path m/44'/396'/0'/0'/0'. Else reject the card.
    
    *Arguments requirements:*
    
    	serialNumber — numeric string of length 24, example: "50439480243390112681323"

        pin — numeric string of length 4, example: '5555'

        dataForSigning — hex string of even length ≥ 2 and ≤ 378.

    *Exemplary response:*

        {"message":
            "2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605",   
         "status":"ok"
        }


- **async verifyPinAndSign(dataForSigning: string, hdIndex: string, pin: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>
 
    Make pin verification and data signing by key for HD path m/44'/396'/0'/0'/hdIndex'.

    *Arguments requirements:*

        pin — numeric string of length 4, example: '5555'

        hdIndex — numeric string of length > 0 and ≤ 10.

        data — hex string of even length ≥ 2 and ≤ 356.

    *Exemplary response:*

        {"message":
            "13FB836213B12BBD41209273F81BCDCF7C226947B18128F73E9A6E96C84B30C3288E51C622C045488981B6544D02D0940DE54D68A0A78BC2A5F9523B8757B904",
         "status":"ok"
        }
	
- **async checkSerialNumberAndVerifyPinAndSign(serialNumber: string, dataForSigning: string, hdIndex: string, pin: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>
  
   Read serial number of currently connected security card and compare it with serialNumber argument. If they are identical then make pin verification and data signing by key for HD path m/44'/396'/0'/0'/hdIndex'. Else reject the card.
   
   *Arguments requirements:*
   
   	serialNumber — numeric string of length 24, example: "50439480243390112681323"

        pin — numeric string of length 4, example: '5555'

        hdIndex — numeric string of length > 0 and ≤ 10.

        data — hex string of even length ≥ 2 and ≤ 356.

    *Exemplary response:*

        {"message":
            "13FB836213B12BBD41209273F81BCDCF7C226947B18128F73E9A6E96C84B30C3288E51C622C045488981B6544D02D0940DE54D68A0A78BC2A5F9523B8757B904",
         "status":"ok"
        }

### Functions related to card recovery module

- **async getRecoveryDataLen(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Read actual recovery data length.

    *Exemplary response:* 

        {"message":"7","status":"ok"}

- **async getRecoveryDataHash(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Read recovery data SHA256 hash.

    *Exemplary response:* 

        {"message":"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A","status":"ok"}

- **async getRecoveryData(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Read recovery data from TON Labs Wallet applet.

    *Exemplary response:* 

        {"message":"00112233445566","status":"ok"}

- **async addRecoveryData(recoveryData: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Save recovery data into TON Labs Wallet applet. 

    *Arguments requirements:*

        recoveryData — hex string of even length ≥ 2 and ≤ 4096.

    *Response:*

        {"message":"done","status":"ok"}

- **async isRecoveryDataSet(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Return 'true'/'false' if recovery data exists/does not exist.

    *Response:*

        1) If we added recovery data, then: {"message":"true","status":"ok"}
        2) If we did not add recovery data, then: {"message":"false","status":"ok"}

- **async resetRecoveryData(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Clear recovery data.

    *Response:*

        {"message":"done","status":"ok"}

### Functions related to card keychain

- **async resetKeyChain(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Clear keychain, i.e. remove all stored keys.

    *Response:*

        {"message":"done","status":"ok"}

- **async getKeyChainDataAboutAllKeys(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Return list of pairs (keyHmac, keyLength)  in json format.

    *Exemplary response:*

        {
            "message":
                [
                    {"hmac":"D7E0DFB66A2F72AAD7D66D897C805D307EE1F1CB8077D3B8CF1A942D6A5AC2FF","length":"6"},           
                    {"hmac":"D31D1D600F8E5B5951275B9C6DED079011FD852ABB62C14A2EECA2E6924452C0","length":"3"}
                ],
            "status":"ok"
         }

- **async getKeyChainInfo(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Return json characterizing the state of keychain. 

    *Exemplary response:*

        {"numberOfKeys":0,"occupiedSize":0,"freeSize":32767,"status":"ok"}

- **async getNumberOfKeys(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Return number of keys in card keychain.

    *Exemplary response:*

        {"message":"1","status":"ok"}

- **async getOccupiedStorageSize(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Return the volume of occupied size in card keychain (in bytes).

    *Exemplary response:*

        {"message":"0","status":"ok"}

- **async getFreeStorageSize(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Return the volume of free size in card keychain (in bytes).

    *Exemplary response:*

        {"message":"32767","status":"ok"}

- **async getKeyFromKeyChain(keyHmac: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Read key from card keychain based on its hmac.

    *Arguments requirements:*

        keyHmac — hex string of length 64.

    *Exemplary response:*

        {"message":"001122334455","status":"ok"}

- **async addKeyIntoKeyChain(newKey: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Save new key into card keychain.

    *Arguments requirements:*

        neyKey — hex string of even length ≥ 2 and ≤ 16384.

    *Response:*

        {"message":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF","status":"ok"}

    where "message" contains hmac of newKey.

- **async deleteKeyFromKeyChain(keyHmac: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Delete key from card keychain based on its hmac.

    *Arguments requirements:*

        keyHmac — hex string of length 64.

    *Exemplary response:*

        {"message":"5","status":"ok"}

    where "message" field contains the number of remaining keys

- **async finishDeleteKeyFromKeyChainAfterInterruption(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Finish the process of deleting key from card keychain. It may be necessary if previous DELETE operation was occassionally interrupted (like card disconnection).

    *Exemplary response:*

        {"message":"5","status":"ok"}

    where "message" field contains the number of remaining keys

- **async changeKeyInKeyChain(newKey: string, oldKeyHmac: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Replace existing key by new key. The length of new key must be equal to length of old key.

    *Arguments requirements:*

        newKey — hex string of even length ≥ 2 and ≤ 16384. 

        oldKeyHmac — hex string of length 64.

    *Response:*

        {"message":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF","status":"ok"}

    where "message" contains hmac of newKey.

- **async getIndexAndLenOfKeyInKeyChain(keyHmac: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Read index (inside internal applet storage) and length of key by its hmac.

    *Arguments requirements:*

        keyHmac — hex string of length 64.

    *Exemplary response:*

        {"message":"{\"index\":1,\"length\":3}","status":"ok"}

- **async checkAvailableVolForNewKey(keySize: number): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Check if there is enough free volume in card keychain to add new key of length = keySize. If there is no enough space then it throws an exception

    *Arguments requirements:*

        keySize — numeric string representing short value > 0 and ≤ 8192.

    *Response:*

        {"message":"done","status":"ok"}

- **async checkKeyHmacConsistency(keyHmac: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Checks if card's keychain stores a key with such keyHmac and if this hmac really corresponds to the key.

    *Response:*

        {"message":"done","status":"ok"}

- **async getHmac(index: string): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Get hmac of key in card keychain by its index. 

    *Arguments requirements:*

        index — digital string storing an integer ≥ 0 and ≤1023.

    *Exemplary response:*
    
    	{"hmac":"2222222222222222222222222222222", "length":5, "status":"ok"}


- **async getDeleteKeyRecordNumOfPackets(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Returns the number of keys records packets that must be deleted to finish deleting of key.

    *Exemplary response:*

        {"message":"2","status":"ok"}

- **async getDeleteKeyChunkNumOfPackets(): Promise< CardResponse >** _(available for Android and iOS)_<br/>

    Returns the number of keys chunks packets that must be deleted to finish deleting of key.

    *Exemplary response:*

        {"message":"5","status":"ok"}

