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
        cardInstruction: string,
        apdu: string
    ) {
        super(message, status, errorCode, errorTypeId, errorType)
        this.cardInstruction = cardInstruction
        this.apdu = apdu
    }
}
