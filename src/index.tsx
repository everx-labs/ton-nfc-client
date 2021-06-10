import NfcCardModuleWrapper from './NfcCardModuleWrapper'
//import NfcEventsEmitterWrapper from './NfcEventsEmitterWrapper'
import CardResponse from './CardResponse'
import NfcNativeModuleError from './NfcNativeModuleError'
import CardError from './CardError'
import NfcCardSigningBox from './NfcCardSigningBox'

const SUCCESS_STATUS = "ok";
const FAIL_STATUS = "fail";
const DONE_MSG = "done";
const FALSE_MSG = "false";
const TRUE_MSG = "true";
const GENERATED_MSG = "generated";
const NOT_GENERATED_MSG = "not generated";
const HMAC_KEYS_ARE_NOT_FOUND_MSG = "HMAC-SHA256 keys are not found.";

const INSTALLED_STATE_MSG =  "TonWalletApplet is invalid (is not personalized)";
const PERSONALIZED_STATE_MSG = "TonWalletApplet is personalized.";
const WAITE_AUTHENTICATION_MSG =  "TonWalletApplet waits two-factor authentication.";
const DELETE_KEY_FROM_KEYCHAIN_MSG = "TonWalletApplet is personalized and waits finishing key deleting from keychain.";
const BLOCKED_MSG = "TonWalletApplet is blocked.";

export {
    NfcCardModuleWrapper,
    //NfcEventsEmitterWrapper,
    CardResponse,
    CardError,
    NfcNativeModuleError,
    NfcCardSigningBox,
    SUCCESS_STATUS,
    FAIL_STATUS,
    DONE_MSG,
    FALSE_MSG,
    TRUE_MSG,
    GENERATED_MSG,
    NOT_GENERATED_MSG,
    HMAC_KEYS_ARE_NOT_FOUND_MSG,
    INSTALLED_STATE_MSG,
    PERSONALIZED_STATE_MSG,
    WAITE_AUTHENTICATION_MSG,
    DELETE_KEY_FROM_KEYCHAIN_MSG,
    BLOCKED_MSG
}
