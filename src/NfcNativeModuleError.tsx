export default class NfcNativeModuleError extends Error {
    public status: string;
    public errorCode: string;
    public errorTypeId: string;
    public errorType: string;
  
    constructor(public message: string, public theStatus: string, public theErrorCode: string, public theErrorTypeId: string, public theErrorType: string) {
        super(message);
        this.status = theStatus;
        this.errorCode = theErrorCode;        
        this.errorType = theErrorType;
        this.errorTypeId = theErrorTypeId;
    }
  }
  
