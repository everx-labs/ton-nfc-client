import NfcCardModuleWrapper from './NfcCardModuleWrapper'
//import NfcEventsEmitterWrapper from './NfcEventsEmitterWrapper'
import CardResponse from './CardResponse'
import NfcNativeModuleError from './NfcNativeModuleError'
import CardError from './CardError'
import NfcCardSigningBox from './NfcCardSigningBox'

enum CardStates {
    Installed  = 'TonWalletApplet is invalid (is not personalized)',
    Personalized = 'TonWalletApplet is personalized.',
    WaiteAuthentication = 'TonWalletApplet waits two-factor authentication.',
    DeleteKeyFromKeychain = 'TonWalletApplet is personalized and waits finishing key deleting from keychain.',
    Blocked = 'TonWalletApplet is blocked.'
}

enum CardResponseMessage {
    Done = 'done',
    False = 'false',
    True = 'true',
    Generated = 'generated',
    NotGenerated = 'not generated',
    HmacKeysNotFound = 'HMAC-SHA256 keys are not found'
}

enum CardResponseStatus {
    Success = 'ok',
    Fail = 'fail'
}

export {
    NfcCardModuleWrapper,
    //NfcEventsEmitterWrapper,
    CardResponse,
    CardError,
    NfcNativeModuleError,
    NfcCardSigningBox,
    CardResponseMessage,
    CardResponseStatus,
    CardStates
}
