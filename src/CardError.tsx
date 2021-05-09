import NfcNativeModuleError from "./NfcNativeModuleError";

export default class CardError extends NfcNativeModuleError  {
    public cardInstruction: string;
    public apdu: string;
  
    constructor(public message: string, public theStatus: string, public theErrorCode: string, public theErrorTypeId: string, public theErrorType: string, 
        public theCardInstruction: string, public theApdu: string) {
        super(message, theStatus, theErrorCode, theErrorTypeId, theErrorType);
        this.cardInstruction = theCardInstruction;
        this.apdu = theApdu;        
    }
  }