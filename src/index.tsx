import NfcCardModuleWrapper from './NfcCardModuleWrapper'
import NfcEventsEmitterWrapper from './NfcEventsEmitterWrapper'
import CardResponse from './CardResponse'
import NfcNativeModuleError from './NfcNativeModuleError'
import CardError from './CardError'
import NfcCardSigningBox from './NfcCardSigningBox'

enum NfcNativeModuleErrorCodes {
    NfcConnectionInterrupted = "20000",
    
    IosNfcSessionEmpty = "210000",
    IosNfcTagNotDetected = "210001",
    IosNfcTagNotConnected = "210002",

    AndroidNfcConnectFailed = "220000", 
    AndroidNfcDisabled = "220001",
    AndroidNoNfcHardware = "220002",
    AndroidNoNfcTag = "220003",
    AndroidNfcDisconnectionFailed = "220004",
    AndroidNfcTransceiveFail = "220005",
    AndroidNfcBadResponse = "220006", 

    PasswordLengthIncorrect = "30000",
    CommonSecretLengthIncorrect = "30001", 
    InitilVectorLengthIncorrect = "30002",
    PasswordNotHex = "30003",
    CommonSecretNotHex = "30004", 
    InitilVectorNotHex = "30005",
    PinLengthIncorrect = "30006",
    PinNotNumeric = "30007",
    DataForSigningNotHex = "30008",
    DataForSigningLengthIncorrect = "30009",
    DataForSigningWithPathLengthIncorrect = "30010",
    RecoveryDataNotHex = "30011",
    RecoveryDataLengthIncorrect = "30012",
    HdIndexLengthIncorrect = "30013",
    HdIndexNotNumeric = "30014",
    DeviceLabelLengthIncorrect = "30015",
    DeviceLabelNotHex = "30016",
    KeyHmacLengthIncorrect = "30017",
    KeyHmacNotHex = "30018",
    KeyNotHex = "30019",
    KeyLengthIncorrect = "30020",
    KeySizeIncorrect = "30021",
    NewKeyLengthIncorrect = "30022",
    KeyIndexValueIncorrect = "30023",
    KeyIndexStringNotNumeric = "30024",
    SerialNumberLengthIncorrect = "30025",
    SerialNumberNotNumeric = "30026",

    ApduNotSupported = "50000",
    AppletDoesNotWaitAuthentication = "50001",
    AppletIsNotPersonalized = "50002",
    AppletDoesNotWaitToDeleteKey = "50003",

    KeyHmacNotFoundInIosKeychain = "60000",
    CurrentSerialNumberNotSetInIosKeyChain = "60001",
    UnableGetAnyKeyFromIosKeyChain = "60002",
    UnableGetKeyInfoFromIosKeyChain = "60003",
    UnableSaveKeyIntoIosKeyChain = "60004",
    UnableDeleteKeyFromIosKeyChain = "60005",
    UnableUpdateKeyInIosKeyChain = "60006",

    CardHaveIncorrectSerialNumber = "70000",

    KeyHmacNotFoundInAndroidKeystore = "80000",
    CurrentSerialNumberNotSetInAndroidKeyStore = "80001"
}

enum CardErrorCodes {
    WrongLength = "6700",
    AppletSelectFailed = "6999",
    ResponseBytesRemeining = "6100",
    ClaNotSupported = "6E00",
    CommandChainingNotSupported = "6884",
    CommandNotAllowed = "6986",
    ConditionsOfUseNotSatisfied = "6985",
    CorrectExpectedLength = "6C00",
    DataInvalid = "6984",
    NotEnoughMenorySpaceInFile = "6A84",
    FileInvalid = "6983",
    FileNotFound = "6A82",
    FunctionNotSupported = "6A81",
    IncorrectP1P2 = "6A86",
    InsNotSupported = "6D00",
    LogicalChannelNotSupported = "6881",
    RecordNotFound = "6883",
    SecureMessagingNotSupported = "6882",
    SecurityConditionNotSatisfied = "6982",
    CommandAborted = "6F00",
    WrongData = "6A80",
    WrongP1P2 = "6B00",
    
    InternalBufferIsNullOrTooSmall = "4F00",
    PersonalizationNotFinished = "4F01",
    IncorrectOffset = "4F02",
    IncorrectPayload = "4F03",
    
    IncorrectPasswordForCardActivation = "5F00",
    IncorrectPasswordCardIsBlocked = "5F01",
    
    SetCoinTypeFailed = "6F01",
    SetCurveFailed = "6F02",
    GetCoinPubDataFailed = "6F03",
    SignDataFailed = "6F04",
    
    CoinManagerIncorrectPin = "9B01",
    CoinManagerUpdatePinError = "9B02",
    IncorrectPin = "6F00",
    PinTriesExpired = "6F08",
    
    LoadSeedError = "9F03",

    IncorrectKeyIndex = "7F00",
    IncorrectKeyChunkStartOrLen = "7F01",
    IncorrectKeyChunkLen = "7F02",
    NotEnoughSpace = "7F03",
    KeySizeUnknown = "7F04",
    KeyLenIncorrect = "7F05",
    HmacExists = "7F06",
    IncorrectKeyIndexToChange = "7F07",
    MaxKeyNumbersExceeded = "7F08",
    DeleteKeyChunkNotFinished = "7F09",
    
    IncorrectSault = "8F01",
    DataIntegrityCorrupted = "8F02",
    IncorrectApduHmac  = "8F03",
    HmacVerificationTriesExpired = "8F04",
    
    RecoveryDataTooLong = "6F09",
    IncorrectStartPosOrLe = "6F0A",
    RecoveryDataIntwgrityCorrupted = "6F0B",
    RecoveryDataAlreadyExists = "6F0C",
    RecoveryDataNotSet = "6F0D"
}


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
    NfcEventsEmitterWrapper,
    CardResponse,
    CardError,
    NfcNativeModuleError,
    NfcCardSigningBox,
    CardResponseMessage,
    CardResponseStatus,
    CardStates,
    NfcNativeModuleErrorCodes,
    CardErrorCodes
}
