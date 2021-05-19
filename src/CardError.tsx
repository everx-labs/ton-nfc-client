import NfcNativeModuleError from './NfcNativeModuleError'

export default class CardError extends NfcNativeModuleError {
    public cardInstruction: string
    public apdu: string

    constructor(
        message: string,
        status: string,
        errorCode: string,
        errorTypeId: string,
        errorType: string,
        theCardInstruction: string,
        theApdu: string
    ) {
        super(message, status, errorCode, errorTypeId, errorType)
        this.cardInstruction = theCardInstruction
        this.apdu = theApdu
    }
}
