import { TonClient} from '@tonclient/core'

import { AppSigningBox as SigningBox } from '@tonclient/core/dist';

import {NfcCardModuleWrapper, NfcNativeModuleError, CardResponse, CardError} from 'ton-nfc-client';

let  nfcCardModuleWrapper = new NfcCardModuleWrapper();

type ResultOfAppSigningBoxGetPublicKey = {
    public_key: string;
};

type ParamsOfAppSigningBoxSign = {
    unsigned: string;
};

type ResultOfAppSigningBoxSign = {
    signature: string;
};

const SERIAL_NUMBER_LENGTH = 24;
const SERIAL_NUMBER_BAD_LENGTH_ERROR_MSG = "Serial number is a numeric string of length 24."
const SERIAL_NUMBER_NOT_NUMERIC_ERROR_MSG = "Serial number is not a valid numeric string."

function onlyDigits(s: string) {
    for (let i = s.length - 1; i >= 0; i--) {
      const d = s.charCodeAt(i);
      if (d < 48 || d > 57) return false
    }
    return true
}

export default class NfcCardSigningBox implements SigningBox {

    serialNumber: string;
    publicKey: string;
    pin: string;

    constructor(serialNumber: string) {
        if (serialNumber.length != SERIAL_NUMBER_LENGTH) {
            throw SERIAL_NUMBER_BAD_LENGTH_ERROR_MSG;
        }
        if (!onlyDigits(serialNumber)) {
            throw SERIAL_NUMBER_NOT_NUMERIC_ERROR_MSG;    
        }
        this.serialNumber = serialNumber;
        this.publicKey = "";
        this.pin = "5555"
    }
    
    public setPin(pin: string) {
        this.pin = pin;
    }


    public async get_public_key():  Promise<ResultOfAppSigningBoxGetPublicKey> {
        console.log('>>> Before public key1')
        if (!this.publicKey) {
            console.log('>>> Request public key')
            const cardResponse = await nfcCardModuleWrapper.checkSerialNumberAndGetPublicKeyForDefaultPath(this.serialNumber);
            this.publicKey = cardResponse.message;
            console.log('✓');
            console.log("Signing box got public key from card = " + this.publicKey + ".");
        }
        console.log('>>> Got public key', this.publicKey);
        return {
            public_key: this.publicKey
        };
    }

    public async sign(params: ParamsOfAppSigningBoxSign): Promise<ResultOfAppSigningBoxSign> {
        const dataForSigning = params.unsigned;
        console.log('>>> Msg for signing:')
        console.log(dataForSigning)
        console.log('>>> Start signature requesting from the card')
        const cardResponse = await nfcCardModuleWrapper.checkSerialNumberAndVerifyPinAndSignForDefaultHdPath(this.serialNumber, dataForSigning, this.pin);
        const sig = cardResponse.message
        console.log('>>> Signature from card =  ' + sig)
        return {
            signature: sig
        };
    }
}