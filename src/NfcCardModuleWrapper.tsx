import { NativeModules, Platform } from 'react-native'
import { CardError, CardResponse, NfcNativeModuleError } from 'ton-nfc-client'
import React, { Component } from 'react'

const { NfcCardModule } = NativeModules

const  STATUS_FIELD = "status";
const  ERROR_CODE_FIELD = "code";
const  ERROR_TYPE_FIELD = "errorType";
const  ERROR_TYPE_ID_FIELD = "errorTypeId";
const  MESSAGE_FIELD = "message";
const  CARD_INSTRUCTION_FIELD = "cardInstruction";
const  APDU_FIELD = "apdu";
const  ECS_HASH_FIELD = "ecsHash";
const  EP_HASH_FIELD = "epHash";
const  KEY_INDEX_FIELD = "keyIndex";
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

const WRONG_PLATFORM_ERROR = "This function is available only for Android OS!";

export interface CardErrorResponse {
    message?: string
    status?: string
    code?: string
    errorTypeId?: string
    errorType?: string
    cardInstruction?: string
    apdu?: string
}

export default class NfcCardModuleWrapper {

    private async makeDelay() {
        if (Platform.OS === IOS_PLATFORM) {
            await new Promise(r => setTimeout(r, IOS_TIMEOUT))
        }
    }

    private prepareCardResponseWithoutDelay(response: string): CardResponse {
        const json = JSON.parse(response)
        if (!json.hasOwnProperty(MESSAGE_FIELD))
            throw new Error('Json must have "' +  MESSAGE_FIELD + '" field!')
        if (!json.hasOwnProperty(STATUS_FIELD))
            throw new Error('Json must have "' + STATUS_FIELD + '" field!')
        return new CardResponse(json.message, json.status, '', '', '', '', '', '', '', '', [])
    }

    private async prepareCardResponse(response: string): Promise<CardResponse> {
        await this.makeDelay()
        return this.prepareCardResponseWithoutDelay(response)
    }

    private async prepareCardResponseFromGetAllSerialNumbers(response: string): Promise<CardResponse> {
        const json = JSON.parse(response)
        if (!json.hasOwnProperty(MESSAGE_FIELD))
            throw new Error('Json must have "' +  MESSAGE_FIELD + '" field!')
        if (!json.hasOwnProperty(STATUS_FIELD))
            throw new Error('Json must have "' + STATUS_FIELD + '" field!')
        if (typeof json.message === "string") {
            return new CardResponse(json.message, json.status, '', '', '', '', '', '', '', [])
        }
        return new CardResponse('', json.status, '', '', '', '', '', '', '', '', json.message)    
    }

    private async prepareCardResponseFromGetHashes(response: string): Promise<CardResponse> {
        await this.makeDelay()
        const json = JSON.parse(response)
        if (!json.hasOwnProperty(ECS_HASH_FIELD) || !json.hasOwnProperty(EP_HASH_FIELD) || !json.hasOwnProperty(SN_FIELD))
            throw new Error('Json must have "' + ECS_HASH_FIELD + '", "' + EP_HASH_FIELD + '", "' + SN_FIELD + '" fields!')
        if (!json.hasOwnProperty(STATUS_FIELD))
            throw new Error('Json must have "' + STATUS_FIELD + '" field!')
        return new CardResponse('', json.status, json.ecsHash, json.epHash, json.serialNumber, '', '', '', '', '', [])
    }

    private async prepareCardResponseFromGetKeyChainInfo(response: string): Promise<CardResponse> {
        await this.makeDelay()
        const json = JSON.parse(response)
        if (!json.hasOwnProperty(OCCUPIED_SIZE_FIELD) || !json.hasOwnProperty(FREE_SIZE_FIELD) && !json.hasOwnProperty(NUMBER_OF_KEYS_FIELD))
            throw new Error('Json must have "' + OCCUPIED_SIZE_FIELD + '", "' + FREE_SIZE_FIELD + '" and "' + NUMBER_OF_KEYS_FIELD + '" fields!')
        if (!json.hasOwnProperty(STATUS_FIELD))
            throw new Error('Json must have "' + STATUS_FIELD + '" field!')
        return new CardResponse('', json.status, '', '', '', json.numberOfKeys, json.occupiedSize, json.freeSize, '', '', [])
    }

    private async prepareCardResponseFromGetHmac(response: string): Promise<CardResponse> {
        await this.makeDelay()
        const json = JSON.parse(response)
        if (!json.hasOwnProperty(KEY_HMAC_FIELD) || !json.hasOwnProperty(KEY_LENGTH_FIELD))
            throw new Error('Json must have "' + KEY_HMAC_FIELD + '" and "' + KEY_LENGTH_FIELD + '" fields!')
        if (!json.hasOwnProperty(STATUS_FIELD))
            throw new Error('Json must have "' + STATUS_FIELD + '" field!')
        return new CardResponse('', json.status, '', '', '', '', '', '', json.hmac, json.length, [])
    }

    private throwError(errorMessage: string) {
        let json: CardErrorResponse = {}
        try {
            json = JSON.parse(errorMessage)
        } catch (e) {
            throw new Error(errorMessage)
        }

        if (!json.message) {
            throw new Error('Json must have "' +  MESSAGE_FIELD + '" field!')
        }

        if (!json.status) {
            throw new Error('Json must have "' + STATUS_FIELD + '" field!')
        }

        if (!json.code) {
            throw new Error('Json must have "' + ERROR_CODE_FIELD + '" field!')
        }

        if (!json.errorType) {
            throw new Error('Json must have "' + ERROR_TYPE_FIELD + '" field!')
        }

        if (!json.hasOwnProperty(ERROR_TYPE_ID_FIELD)) {
            throw new Error('Json must have "' + ERROR_TYPE_ID_FIELD + '" field!')
        }

        if (json.errorTypeId === CARD_ERROR_TYPE_ID) {
            if (!json.cardInstruction) {
                throw new Error('Json must have "' + CARD_INSTRUCTION_FIELD + '" field!')
            }

            if (!json.apdu) {
                throw new Error('Json must have "' + APDU_FIELD + '" field!')
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
            throw new Error('"' + ERROR_TYPE_ID_FIELD + '" must have value!')
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
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    /* NFC related functions */

    async checkIfNfcSupported(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkIfNfcSupported()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async checkIfNfcEnabled(): Promise<CardResponse> {
        if (Platform.OS ===  ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.checkIfNfcEnabled()
                return this.prepareCardResponse(response)
            } catch (e) {
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
            } catch (e) {
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
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getMaxPinTriesWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS ===  ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getMaxPinTriesWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getSeVersion(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getSeVersion()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getSeVersionWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS ===  ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getSeVersionWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getCsn(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getCsn()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getCsnWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS ===  ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getCsnWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getDeviceLabel(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getDeviceLabel()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getDeviceLabelWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS ===  ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getDeviceLabelWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async setDeviceLabel(label: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.setDeviceLabel(label)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async setDeviceLabelWithoutDialog(label: string): Promise<CardResponse> {
        if (Platform.OS ===  ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.setDeviceLabelWithoutDialog(label)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getRemainingPinTries(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRemainingPinTries()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getRemainingPinTriesWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS ===  ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getRemainingPinTriesWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getRootKeyStatus(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRootKeyStatus()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getRootKeyStatusWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS ===  ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getRootKeyStatusWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getAvailableMemory(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getAvailableMemory()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getAvailableMemoryWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS ===  ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getAvailableMemoryWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getAppsList(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getAppsList()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getAppsListWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS ===  ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getAppsListWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async generateSeed(pin: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.generateSeed(pin)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async generateSeedWithoutDialog(pin: string): Promise<CardResponse> {
        if (Platform.OS ===  ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.generateSeedWithoutDialog(pin)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async resetWallet(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.resetWallet()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async resetWalletWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS ===  ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.resetWalletWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async changePin(oldPin: string, newPin: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.changePin(oldPin, newPin)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async changePinWithoutDialog(oldPin: string, newPin: string): Promise<CardResponse> {
        if (Platform.OS ===  ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.changePinWithoutDialog(oldPin, newPin)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    /* Commands to maintain keys for hmac */

    async selectKeyForHmac(serialNumber: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.selectKeyForHmac(serialNumber)
            return this.prepareCardResponseWithoutDelay(response)
        } catch (e) {
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
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getCurrentSerialNumber(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getCurrentSerialNumber()
            return this.prepareCardResponseWithoutDelay(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getAllSerialNumbers(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getAllSerialNumbers()
            return this.prepareCardResponseFromGetAllSerialNumbers(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async isKeyForHmacExist(serialNumber: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.isKeyForHmacExist(serialNumber)
            return this.prepareCardResponseWithoutDelay(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async deleteKeyForHmac(serialNumber: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.deleteKeyForHmac(serialNumber)
            return this.prepareCardResponseWithoutDelay(response)
        } catch (e) {
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
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async turnOnWalletWithPinWithoutDialog(
        newPin: string,
        authenticationPassword: string,
        commonSecret: string,
        initialVector: string
    ): Promise<CardResponse> {
        if(Platform.OS === ANDROID_PLATFORM){
            try {
                const response = await NfcCardModule.turnOnWalletWithPinWithoutDialog(
                    newPin,
                    authenticationPassword,
                    commonSecret,
                    initialVector
                )
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR);
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
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async turnOnWalletWithoutDialog(
        authenticationPassword: string,
        commonSecret: string,
        initialVector: string
    ): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.turnOnWalletWithoutDialog(
                    authenticationPassword,
                    commonSecret,
                    initialVector,
                )
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getHashes(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getHashes()
            return this.prepareCardResponseFromGetHashes(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getHashesWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getHashesWithoutDialog()
                return this.prepareCardResponseFromGetHashes(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getHashOfEncryptedPassword(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getHashOfEncryptedPassword()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getHashOfEncryptedPasswordWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getHashOfEncryptedPasswordWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getHashOfEncryptedCommonSecret(): Promise<CardResponse> {
        try {
            const response =
                await NfcCardModule.getHashOfEncryptedCommonSecret()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getHashOfEncryptedCommonSecretWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getHashOfEncryptedCommonSecretWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    /* Common stuff (TonWalletApplet)  */

    async getTonAppletState(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getTonAppletState()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getTonAppletStateWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getTonAppletStateWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getSerialNumber(): Promise<CardResponse> {
        try {
            console.log("GETTT")
            const response = await NfcCardModule.getSerialNumber()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getSerialNumberWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getSerialNumberWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getSault(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getSault()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getSaultWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getSaultWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }


    /* Recovery data stuff (TonWalletApplet)  */

    async addRecoveryData(recoveryData: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.addRecoveryData(recoveryData)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async addRecoveryDataWithoutDialog(recoveryData: string): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.addRecoveryDataWithoutDialog(recoveryData)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getRecoveryData(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRecoveryData()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getRecoveryDataWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getRecoveryDataWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getRecoveryDataHash(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRecoveryDataHash()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getRecoveryDataHashWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getRecoveryDataHashWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getRecoveryDataLen(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRecoveryDataLen()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getRecoveryDataLenWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getRecoveryDataLenWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async isRecoveryDataSet(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.isRecoveryDataSet()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async isRecoveryDataSetWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.isRecoveryDataSetWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async resetRecoveryData(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.resetRecoveryData()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async resetRecoveryDataWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.resetRecoveryDataWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    /* Ed25519 stuff (TonWalletApplet)  */

    async verifyPin(pin: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.verifyPin(pin)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async verifyPinWithoutDialog(pin: string): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.verifyPinWithoutDialog(pin)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }


    async getPublicKey(hdIndex: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getPublicKey(hdIndex)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getPublicKeyWithoutDialog(hdIndex: string): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getPublicKeyWithoutDialog(hdIndex)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async checkSerialNumberAndGetPublicKey(serialNumber: string, hdIndex: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkSerialNumberAndGetPublicKey(serialNumber, hdIndex)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkSerialNumberAndGetPublicKeyWithoutDialog(serialNumber: string, hdIndex: string): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.checkSerialNumberAndGetPublicKeyWithoutDialog(serialNumber, hdIndex)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }


    async signForDefaultHdPath(dataForSigning: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.signForDefaultHdPath(dataForSigning)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async signForDefaultHdPathWithoutDialog(dataForSigning: string): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.signForDefaultHdPathWithoutDialog(dataForSigning)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async checkSerialNumberAndSignForDefaultHdPath(serialNumber: string, dataForSigning: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkSerialNumberAndSignForDefaultHdPath(
                serialNumber,
                dataForSigning 
            )
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkSerialNumberAndSignForDefaultHdPathWithoutDialog(serialNumber: string, dataForSigning: string): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.checkSerialNumberAndSignForDefaultHdPathWithoutDialog(serialNumber, dataForSigning)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
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
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async verifyPinAndSignForDefaultHdPathWithoutDialog(
        dataForSigning: string,
        pin: string
    ): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.verifyPinAndSignForDefaultHdPathWithoutDialog(dataForSigning, pin)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
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
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkSerialNumberAndVerifyPinAndSignForDefaultHdPathWithoutDialog(
        serialNumber: string,
        dataForSigning: string,
        pin: string
    ): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.checkSerialNumberAndVerifyPinAndSignForDefaultHdPathWithoutDialog(serialNumber, dataForSigning, pin)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async sign(dataForSigning: string, hdIndex: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.sign(dataForSigning, hdIndex)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async signWithoutDialog(
        dataForSigning: string,
        hdIndex: string
    ): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.signWithoutDialog(dataForSigning, hdIndex)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async checkSerialNumberAndSign(serialNumber: string, dataForSigning: string, hdIndex: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkSerialNumberAndSign(serialNumber, dataForSigning, hdIndex)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkSerialNumberAndSignWithoutDialog(
        serialNumber: string,
        dataForSigning: string,
        hdIndex: string
    ): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.checkSerialNumberAndSignWithoutDialog(serialNumber, dataForSigning, hdIndex)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
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
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async verifyPinAndSignWithoutDialog(
        dataForSigning: string,
        hdIndex: string,
        pin: string
    ): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.verifyPinAndSignWithoutDialog(dataForSigning, hdIndex, pin)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
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
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkSerialNumberAndVerifyPinAndSignWithoutDialog(
        serialNumber: string,
        dataForSigning: string,
        hdIndex: string,
        pin: string
    ): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.checkSerialNumberAndVerifyPinAndSignWithoutDialog(serialNumber, dataForSigning, hdIndex, pin)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getPublicKeyForDefaultPath(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getPublicKeyForDefaultPath()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getPublicKeyForDefaultPathWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getPublicKeyForDefaultPathWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async checkSerialNumberAndGetPublicKeyForDefaultPath(serialNumber: string): Promise<CardResponse> {
        try {
            
            const response = await NfcCardModule.checkSerialNumberAndGetPublicKeyForDefaultPath(serialNumber)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkSerialNumberAndGetPublicKeyForDefaultPathWithoutDialog(serialNumber: string): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.checkSerialNumberAndGetPublicKeyForDefaultPathWithoutDialog(serialNumber)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    /* Keychain commands */

    async resetKeyChain(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.resetKeyChain()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async resetKeyChainWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.resetKeyChainWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getKeyChainDataAboutAllKeys(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getKeyChainDataAboutAllKeys()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getKeyChainDataAboutAllKeysWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getKeyChainDataAboutAllKeysWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getKeyChainInfo(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getKeyChainInfo()
            return this.prepareCardResponseFromGetKeyChainInfo(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getKeyChainInfoWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getKeyChainInfoWithoutDialog()
                return this.prepareCardResponseFromGetKeyChainInfo(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getNumberOfKeys(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getNumberOfKeys()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getNumberOfKeysWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getNumberOfKeysWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getOccupiedStorageSize(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getOccupiedStorageSize()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getOccupiedStorageSizeWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getOccupiedStorageSizeWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getFreeStorageSize(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getFreeStorageSize()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getFreeStorageSizeSizeWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getFreeStorageSizeWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getKeyFromKeyChain(keyHmac: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getKeyFromKeyChain(keyHmac)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getKeyFromKeyChainWithoutDialog(keyHmac: string): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getKeyFromKeyChainWithoutDialog(keyHmac)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async addKeyIntoKeyChain(newKey: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.addKeyIntoKeyChain(newKey)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async addKeyIntoKeyChainWithoutDialog(newKey: string): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.addKeyIntoKeyChainWithoutDialog(newKey)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async deleteKeyFromKeyChain(keyHmac: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.deleteKeyFromKeyChain(keyHmac)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async deleteKeyFromKeyChainWithoutDialog(keyHmac: string): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.deleteKeyFromKeyChainWithoutDialog(keyHmac)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async finishDeleteKeyFromKeyChainAfterInterruption(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.finishDeleteKeyFromKeyChainAfterInterruption()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async finishDeleteKeyFromKeyChainAfterInterruptionWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.finishDeleteKeyFromKeyChainAfterInterruptionWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
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
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async changeKeyInKeyChainWithoutDialog(
        newKey: string,
        oldKeyHmac: string
    ): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.changeKeyInKeyChainWithoutDialog(newKey, oldKeyHmac)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getIndexAndLenOfKeyInKeyChain(
        keyHmac: string
    ): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getIndexAndLenOfKeyInKeyChain(keyHmac)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getIndexAndLenOfKeyInKeyChainWithoutDialog(keyHmac: string): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getIndexAndLenOfKeyInKeyChainWithoutDialog(keyHmac)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async checkAvailableVolForNewKey(keySize: number): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkAvailableVolForNewKey(keySize)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkAvailableVolForNewKeyWithoutDialog(keySize: number): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.checkAvailableVolForNewKeyWithoutDialog(keySize)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async checkKeyHmacConsistency(keyHmac: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkKeyHmacConsistency(keyHmac)
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async checkKeyHmacConsistencyWithoutDialog(keyHmac: string): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.checkKeyHmacConsistencyWithoutDialog(keyHmac)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getHmac(index: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getHmac(index)
            return this.prepareCardResponseFromGetHmac(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getHmacWithoutDialog(index: string): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getHmacWithoutDialog(index)
                return this.prepareCardResponseFromGetHmac(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getDeleteKeyRecordNumOfPackets(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getDeleteKeyRecordNumOfPackets()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getDeleteKeyRecordNumOfPacketsWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getDeleteKeyRecordNumOfPacketsWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }

    async getDeleteKeyChunkNumOfPackets(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getDeleteKeyChunkNumOfPackets()
            return this.prepareCardResponse(response)
        } catch (e) {
            await this.makeDelay()
            throw this.throwError(e.message)
        }
    }

    async getDeleteKeyChunkNumOfPacketsWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === ANDROID_PLATFORM) {
            try {
                const response = await NfcCardModule.getDeleteKeyChunkNumOfPacketsWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error(WRONG_PLATFORM_ERROR)
    }


}
