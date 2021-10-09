import { NativeModules, Platform } from 'react-native'
//import { CardError, CardResponse, NfcNativeModuleError } from 'ton-nfc-client'
import CardResponse from './CardResponse'
import NfcNativeModuleError from './NfcNativeModuleError'
import CardError from './CardError'

const  STATUS_FIELD = "status";
const  ERROR_CODE_FIELD = "code";
const  ERROR_TYPE_FIELD = "errorType";
const  ERROR_TYPE_ID_FIELD = "errorTypeId";
const  MESSAGE_FIELD = "message";
const  CARD_INSTRUCTION_FIELD = "cardInstruction";
const  APDU_FIELD = "apdu";
const  ECS_HASH_FIELD = "ecsHash";
const  EP_HASH_FIELD = "epHash";
//const  KEY_INDEX_FIELD = "keyIndex";
const  KEY_LENGTH_FIELD = "length";
const  KEY_HMAC_FIELD = "hmac";
const  SN_FIELD = "serialNumber";
const  NUMBER_OF_KEYS_FIELD = "numberOfKeys";
const  OCCUPIED_SIZE_FIELD = "occupiedSize";
const  FREE_SIZE_FIELD = "freeSize";

const  CARD_ERROR_TYPE_ID = "0";

const  ANDROID_PLATFORM = "android";
const  IOS_PLATFORM = "ios";

const IOS_TIMEOUT = 4000;

export const WRONG_PLATFORM_ERROR = "This function is available only for Android OS!";
export const ERR_JSON_MUST_HAVE_MSG_FIELD = 'Json must have "' +  MESSAGE_FIELD + '" field!';
export const ERR_JSON_MUST_HAVE_STATUS_FIELD = 'Json must have "' + STATUS_FIELD + '" field!';
export const ERR_JSON_MUST_HAVE_ECS_EP_SN_FIELDS = 'Json must have "' + ECS_HASH_FIELD + '", "' + EP_HASH_FIELD + '", "' + SN_FIELD + '" fields!';
export const ERR_JSON_MUST_HAVE_OCCUPIED_FREE_SIZES_NUMBER_OF_KEYS_FIELDS = 'Json must have "' + OCCUPIED_SIZE_FIELD + '", "' + FREE_SIZE_FIELD + '" and "' + NUMBER_OF_KEYS_FIELD + '" fields!';
export const ERR_JSON_MUST_HAVE_CODE_FIELD = 'Json must have "' + ERROR_CODE_FIELD + '" field!';
export const ERR_JSON_MUST_HAVE_TYPE_FIELD =  'Json must have "' + ERROR_TYPE_FIELD + '" field!';
export const ERR_JSON_MUST_HAVE_TYPE_ID_FIELD = 'Json must have "' + ERROR_TYPE_ID_FIELD + '" field!';
export const ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD = 'Json must have "' + CARD_INSTRUCTION_FIELD + '" field!';
export const ERR_JSON_MUST_HAVE_APDU_FIELD = 'Json must have "' + APDU_FIELD + '" field!';
export const ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL = '"' + ERROR_TYPE_ID_FIELD + '" must have value!';
export const ERR_JSON_MUST_HAVE_KEY_HMAC_AND_LEN_FIELD = 'Json must have "' + KEY_HMAC_FIELD + '" and "' + KEY_LENGTH_FIELD + '" fields!';

export interface CardErrorResponse {
    message?: string
    status?: string
    code?: string
    errorTypeId?: string
    errorType?: string
    cardInstruction?: string
    apdu?: string
}

const { NfcCardModule } = NativeModules


export default class NfcCardModuleWrapper {

    public constructor(){

    }

    private async makeDelay() {
        if (Platform.OS === IOS_PLATFORM) {
            await new Promise(r => setTimeout(r, IOS_TIMEOUT))
        }
    }

    prepareCardResponseWithoutDelay(response: string): CardResponse {
        const json = JSON.parse(response)
        if (!json.message)
            throw new Error(ERR_JSON_MUST_HAVE_MSG_FIELD)
        if (!json.status)
            throw new Error(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        return new CardResponse(json.message, json.status, '', '', '', -1, -1, -1, '', -1, [])
    }

    async prepareCardResponse(response: string): Promise<CardResponse> {
        await this.makeDelay()
        return this.prepareCardResponseWithoutDelay(response)
    }

    async prepareCardResponseFromGetAllSerialNumbers(response: string): Promise<CardResponse> {
        const json = JSON.parse(response)
        if (!json.message)
            throw new Error(ERR_JSON_MUST_HAVE_MSG_FIELD)
        if (!json.status)
            throw new Error(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        if (typeof json.message === "string") {
            return new CardResponse(json.message, json.status, '', '', '', -1, -1, -1, '', -1, [])
        }
        return new CardResponse('', json.status, '', '', '', -1, -1, -1, '', -1, json.message)    
    }

    async prepareCardResponseFromGetHashes(response: string): Promise<CardResponse> {
        await this.makeDelay()
        const json = JSON.parse(response)
        if (!json.ecsHash || !json.epHash || !json.serialNumber)
            throw new Error(ERR_JSON_MUST_HAVE_ECS_EP_SN_FIELDS)
        if (!json.status)
            throw new Error(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        return new CardResponse('', json.status, json.ecsHash, json.epHash, json.serialNumber, -1, -1, -1, '', -1, [])
    }

    async prepareCardResponseFromGetKeyChainInfo(response: string): Promise<CardResponse> {
        await this.makeDelay()
        const json = JSON.parse(response)
        if (!json.hasOwnProperty(OCCUPIED_SIZE_FIELD) || !json.hasOwnProperty(FREE_SIZE_FIELD)|| !json.hasOwnProperty(NUMBER_OF_KEYS_FIELD))
            throw new Error(ERR_JSON_MUST_HAVE_OCCUPIED_FREE_SIZES_NUMBER_OF_KEYS_FIELDS)
        if (!json.status)
            throw new Error(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        return new CardResponse('', json.status, '', '', '', json.numberOfKeys, json.occupiedSize, json.freeSize, '', -1, [])
    }

    async prepareCardResponseFromGetHmac(response: string): Promise<CardResponse> {
        await this.makeDelay()
        const json = JSON.parse(response)
        if (!json.hmac || !json.length)
            throw new Error(ERR_JSON_MUST_HAVE_KEY_HMAC_AND_LEN_FIELD)
        if (!json.status)
            throw new Error(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        return new CardResponse('', json.status, '', '', '', -1, -1, -1, json.hmac, json.length, [])
    }

    throwError(errorMessage: string) {
        let json: CardErrorResponse = {}
        try {
            json = JSON.parse(errorMessage)
        } catch (e: any) {
            throw new Error(errorMessage)
        }
        if (!json.message) {
            throw new Error(ERR_JSON_MUST_HAVE_MSG_FIELD)
        }

        if (!json.status) {
            throw new Error(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        }

        if (!json.code) {
            throw new Error(ERR_JSON_MUST_HAVE_CODE_FIELD)
        }

        if (!json.errorType) {
            throw new Error(ERR_JSON_MUST_HAVE_TYPE_FIELD )
        }

        if (!json.hasOwnProperty(ERROR_TYPE_ID_FIELD)) {
            throw new Error(ERR_JSON_MUST_HAVE_TYPE_ID_FIELD )
        }

        if (json.errorTypeId === CARD_ERROR_TYPE_ID) {
            if (!json.cardInstruction) {
                throw new Error(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD)
            }

            if (!json.apdu) {
                throw new Error(ERR_JSON_MUST_HAVE_APDU_FIELD)
            }

            throw new CardError(
                json.message,
                json.status,
                json.code,
                json.errorTypeId,
                json.errorType,
                json.cardInstruction,
                json.apdu,
            )
        }

        if (!json.errorTypeId) {
            throw new Error(ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL)
        }

        throw new NfcNativeModuleError(
            json.message,
            json.status,
            json.code,
            json.errorTypeId,
            json.errorType,
        )
    }

    setNfcNotificator() {
        try {
            NfcCardModule.setNfcNotificator()
        } catch (e: any) {
            throw this.throwError(e.message)
        }
    }

    /* NFC related functions */

    async checkIfNfcSupported(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkIfNfcSupported()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            throw this.throwError(e.message)
        }
    }

    async checkIfNfcEnabled(): Promise<CardResponse> {
        if (Platform.OS ===  ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.checkIfNfcEnabled()
                return this.prepareCardResponse(response)
            } catch (e: any) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async openNfcSettings(): Promise<CardResponse> {
        if (Platform.OS ===  ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.openNfcSettings()
                return this.prepareCardResponse(response)
            } catch (e: any) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    /* Coin manager functions */

    async getMaxPinTries(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getMaxPinTries()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getSeVersion(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getSeVersion()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getCsn(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getCsn()
            console.log("RESS:" + response)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            console.log("I am here: " +e.message)
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getDeviceLabel(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getDeviceLabel()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async setDeviceLabel(label: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.setDeviceLabel(label)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getRemainingPinTries(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRemainingPinTries()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getRootKeyStatus(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRootKeyStatus()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getAvailableMemory(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getAvailableMemory()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getAppsList(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getAppsList()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async generateSeed(pin: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.generateSeed(pin)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async resetWallet(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.resetWallet()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async changePin(oldPin: string, newPin: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.changePin(oldPin, newPin)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    /* Commands to maintain keys for hmac */

    async selectKeyForHmac(serialNumber: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.selectKeyForHmac(serialNumber)
            return this.prepareCardResponseWithoutDelay(response)
        } catch (e: any) {
            throw this.throwError(e.message)
        }
    }

    async createKeyForHmac(
        authenticationPassword: string,
        commonSecret: string,
        serialNumber: string
    ): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.createKeyForHmac(
                authenticationPassword,
                commonSecret,
                serialNumber,
            )
            return this.prepareCardResponseWithoutDelay(response)
        } catch (e: any) {
            throw this.throwError(e.message)
        }
    }

    async getCurrentSerialNumber(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getCurrentSerialNumber()
            return this.prepareCardResponseWithoutDelay(response)
        } catch (e: any) {
            throw this.throwError(e.message)
        }
    }

    async getAllSerialNumbers(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getAllSerialNumbers()
            return this.prepareCardResponseFromGetAllSerialNumbers(response)
        } catch (e: any) {
            throw this.throwError(e.message)
        }
    }

    async isKeyForHmacExist(serialNumber: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.isKeyForHmacExist(serialNumber)
            return this.prepareCardResponseWithoutDelay(response)
        } catch (e: any) {
            throw this.throwError(e.message)
        }
    }

    async deleteKeyForHmac(serialNumber: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.deleteKeyForHmac(serialNumber)
            return this.prepareCardResponseWithoutDelay(response)
        } catch (e: any) {
            throw this.throwError(e.message)
        }
    }

    /* Card activation commands (TonWalletApplet) */

    async turnOnWalletWithPin(
        newPin: string,
        authenticationPassword: string,
        commonSecret: string,
        initialVector: string
    ): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.turnOnWalletWithPin(
                newPin,
                authenticationPassword,
                commonSecret,
                initialVector,
            )
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async turnOnWallet(
        authenticationPassword: string,
        commonSecret: string,
        initialVector: string
    ): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.turnOnWallet(
                authenticationPassword,
                commonSecret,
                initialVector,
            )
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getHashes(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getHashes()
            return this.prepareCardResponseFromGetHashes(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getHashOfEncryptedPassword(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getHashOfEncryptedPassword()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getHashOfEncryptedCommonSecret(): Promise<CardResponse> {
        try {
            const response =
                await NfcCardModule.getHashOfEncryptedCommonSecret()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    /* Common stuff (TonWalletApplet)  */

    async getTonAppletState(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getTonAppletState()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getSerialNumber(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getSerialNumber()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getSault(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getSault()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }


    /* Recovery data stuff (TonWalletApplet)  */

    async addRecoveryData(recoveryData: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.addRecoveryData(recoveryData)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getRecoveryData(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRecoveryData()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getRecoveryDataHash(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRecoveryDataHash()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getRecoveryDataLen(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRecoveryDataLen()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async isRecoveryDataSet(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.isRecoveryDataSet()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async resetRecoveryData(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.resetRecoveryData()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    /* Ed25519 stuff (TonWalletApplet)  */

    async verifyPin(pin: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.verifyPin(pin)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getPublicKey(hdIndex: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getPublicKey(hdIndex)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkSerialNumberAndGetPublicKey(serialNumber: string, hdIndex: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkSerialNumberAndGetPublicKey(serialNumber, hdIndex)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async signForDefaultHdPath(dataForSigning: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.signForDefaultHdPath(dataForSigning)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkSerialNumberAndSignForDefaultHdPath(serialNumber: string, dataForSigning: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkSerialNumberAndSignForDefaultHdPath(
                serialNumber,
                dataForSigning 
            )
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async verifyPinAndSignForDefaultHdPath(
        dataForSigning: string,
        pin: string
    ): Promise<CardResponse> {
        try {
            const response =
                await NfcCardModule.verifyPinAndSignForDefaultHdPath(
                    dataForSigning,
                    pin,
                )
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkSerialNumberAndVerifyPinAndSignForDefaultHdPath(
        serialNumber: string,
        dataForSigning: string,
        pin: string
    ): Promise<CardResponse> {
        try {
            const response =
                await NfcCardModule.checkSerialNumberAndVerifyPinAndSignForDefaultHdPath(
                    serialNumber,
                    dataForSigning,
                    pin,
                )
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async sign(dataForSigning: string, hdIndex: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.sign(dataForSigning, hdIndex)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkSerialNumberAndSign(serialNumber: string, dataForSigning: string, hdIndex: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkSerialNumberAndSign(serialNumber, dataForSigning, hdIndex)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async verifyPinAndSign(
        dataForSigning: string,
        hdIndex: string,
        pin: string
    ): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.verifyPinAndSign(
                dataForSigning,
                hdIndex,
                pin,
            )
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkSerialNumberAndVerifyPinAndSign(
        serialNumber: string,
        dataForSigning: string,
        hdIndex: string,
        pin: string
    ): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkSerialNumberAndVerifyPinAndSign(
                serialNumber,
                dataForSigning,
                hdIndex,
                pin
            )
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getPublicKeyForDefaultPath(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getPublicKeyForDefaultPath()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkSerialNumberAndGetPublicKeyForDefaultPath(serialNumber: string): Promise<CardResponse> {
        try {
            
            const response = await NfcCardModule.checkSerialNumberAndGetPublicKeyForDefaultPath(serialNumber)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    /* Keychain commands */

    async resetKeyChain(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.resetKeyChain()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getKeyChainDataAboutAllKeys(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getKeyChainDataAboutAllKeys()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getKeyChainInfo(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getKeyChainInfo()
            return this.prepareCardResponseFromGetKeyChainInfo(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getNumberOfKeys(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getNumberOfKeys()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getOccupiedStorageSize(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getOccupiedStorageSize()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getFreeStorageSize(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getFreeStorageSize()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getKeyFromKeyChain(keyHmac: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getKeyFromKeyChain(keyHmac)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async addKeyIntoKeyChain(newKey: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.addKeyIntoKeyChain(newKey)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async deleteKeyFromKeyChain(keyHmac: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.deleteKeyFromKeyChain(keyHmac)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async finishDeleteKeyFromKeyChainAfterInterruption(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.finishDeleteKeyFromKeyChainAfterInterruption()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async changeKeyInKeyChain(
        newKey: string,
        oldKeyHmac: string
    ): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.changeKeyInKeyChain(
                newKey,
                oldKeyHmac,
            )
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getIndexAndLenOfKeyInKeyChain(
        keyHmac: string
    ): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getIndexAndLenOfKeyInKeyChain(keyHmac)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkAvailableVolForNewKey(keySize: number): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkAvailableVolForNewKey(keySize)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkKeyHmacConsistency(keyHmac: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkKeyHmacConsistency(keyHmac)
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getHmac(index: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getHmac(index)
            return this.prepareCardResponseFromGetHmac(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getDeleteKeyRecordNumOfPackets(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getDeleteKeyRecordNumOfPackets()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getDeleteKeyChunkNumOfPackets(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getDeleteKeyChunkNumOfPackets()
            return this.prepareCardResponse(response)
        } catch (e: any) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }
}
