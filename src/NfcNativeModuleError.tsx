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
