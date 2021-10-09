import type { AppSigningBox as SigningBox } from '@tonclient/core/dist';

import { NfcCardModuleWrapper } from 'ton-nfc-client';

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
            throw new Error(SERIAL_NUMBER_BAD_LENGTH_ERROR_MSG);
        }

        if (!onlyDigits(serialNumber)) {
            throw new Error(SERIAL_NUMBER_NOT_NUMERIC_ERROR_MSG);    
        }

        this.serialNumber = serialNumber;
        this.publicKey = "";
        this.pin = "5555"
    }
    
    public setPin(pin: string) {
        this.pin = pin;
    }

    public async get_public_key():  Promise<ResultOfAppSigningBoxGetPublicKey> {
        console.log('>>> Get the public key')

        if (this.publicKey) {
            console.log('✓ Got public key from the cache');
            return {
                public_key: this.publicKey
            };
        }

        console.log('>>> Request the public key if it\'s not loaded yet...')
        try {
            const cardResponse = await nfcCardModuleWrapper
                .checkSerialNumberAndGetPublicKeyForDefaultPath(this.serialNumber);
            this.publicKey = cardResponse.message;
            console.log('Signing box got the public key from the card:', this.publicKey);

            console.log('✓ Got public key from the card');
            return {
                public_key: this.publicKey
            };
        } catch (error) {
            console.error('Failed to get the public key with error:', error);
            throw error;
        }
    }

    public async sign(params: ParamsOfAppSigningBoxSign): Promise<ResultOfAppSigningBoxSign> {
        console.log('>>> Sign the message');
        
        const dataForSigning = Buffer.from(params.unsigned, 'base64').toString('hex');
        console.log('>>> Message to signing:', dataForSigning);

        try {
            console.log('>>> Sign the message with the card');
            const cardResponse = await nfcCardModuleWrapper
                .checkSerialNumberAndVerifyPinAndSignForDefaultHdPath(
                    this.serialNumber, 
                    dataForSigning, 
                    this.pin,
                );

            const signature = cardResponse.message
            console.log('>>> Signature received from the card:', signature)

            return { signature };
        } catch (error) {
            console.error('Failed to sign the message with error:', error);
            throw error;
        }
    }
}