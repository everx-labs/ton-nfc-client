import { NativeModules } from 'react-native'
import { CardResponse, CardError, NfcNativeModuleError } from 'ton-nfc-client'
const { NfcCardModule } = NativeModules

export default class NfcCardModuleWrapper {
    private prepareCardResponse(response: string): CardResponse {
        const json = JSON.parse(response)
        if (!json.hasOwnProperty('message'))
            throw new Error("Json must have 'message' field!")
        if (!json.hasOwnProperty('status'))
            throw new Error("Json must have status' field!")
        return new CardResponse(json.message, json.status)
    }

    private throwError(errorMessage: string): Error {
        let json = {}
        try {
            json = JSON.parse(errorMessage)
        } catch (e) {
            throw new Error(errorMessage)
        }

        if (!json.hasOwnProperty('message'))
            throw new Error("Json must have 'message' field!")
        if (!json.hasOwnProperty('status'))
            throw new Error("Json must have 'status' field!")
        if (!json.hasOwnProperty('errorCode'))
            throw new Error("Json must have 'errorCode' field!")
        if (!json.hasOwnProperty('errorType'))
            throw new Error("Json must have 'errorType' field!")
        if (!json.hasOwnProperty('errorTypeId'))
            throw new Error("Json must have 'errorTypeId' field!")
        if (!json.hasOwnProperty('cardInstruction')) {
            throw new NfcNativeModuleError(
                json.message,
                json.status,
                json.errorCode,
                json.errorTypeId,
                json.errorType
            )
        } else if (!json.hasOwnProperty('apdu')) {
            throw new Error("Json must have 'apdu' field!")
        }
        throw new CardError(
            json.message,
            json.status,
            json.errorCode,
            json.errorTypeId,
            json.errorType,
            json.cardInstruction,
            json.apdu
        )
    }

    /* Coin manager functions */

    async getMaxPinTries(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getMaxPinTries()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getSeVersion(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getSeVersion()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getCsn(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getCsn()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getDeviceLabel(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getDeviceLabel()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async setDeviceLabel(label: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.setDeviceLabel(label)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getRemainingPinTries(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRemainingPinTries()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getRootKeyStatus(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRootKeyStatus()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getAvailableMemory(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getAvailableMemory()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getAppsList(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getAppsList()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async generateSeed(pin: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.generateSeed(pin)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async resetWallet(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.resetWallet()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async changePin(oldPin: string, newPin: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.changePin(oldPin, newPin)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    /* Commands to maintain keys for hmac */

    async selectKeyForHmac(serialNumber: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.selectKeyForHmac(serialNumber)
            return this.prepareCardResponse(response)
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
                serialNumber
            )
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getCurrentSerialNumber(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getCurrentSerialNumber()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getAllSerialNumbers(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getAllSerialNumbers()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async isKeyForHmacExist(serialNumber: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.isKeyForHmacExist(serialNumber)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async deleteKeyForHmac(serialNumber: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.deleteKeyForHmac(serialNumber)
            return this.prepareCardResponse(response)
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
            const response = await NfcCardModule.turnOnWallet(
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

    async turnOnWallet(
        authenticationPassword: string,
        commonSecret: string,
        initialVector: string
    ): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.turnOnWallet(
                authenticationPassword,
                commonSecret,
                initialVector
            )
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getHashes(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getHashes()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getHashOfEncryptedPassword(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getHashOfEncryptedPassword()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getHashOfEncryptedCommonSecret(): Promise<CardResponse> {
        try {
            const response =
                await NfcCardModule.getHashOfEncryptedCommonSecret()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    /* Common stuff (TonWalletApplet)  */

    async getTonAppletState(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getTonAppletState()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getSerialNumber(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getSerialNumber()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    /* Recovery data stuff (TonWalletApplet)  */

    async addRecoveryData(recoveryData: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.addRecoveryData(recoveryData)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getRecoveryData(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRecoveryData()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getRecoveryDataHash(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRecoveryDataHash()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getRecoveryDataLen(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRecoveryDataLen()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async isRecoveryDataSet(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.isRecoveryDataSet()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async resetRecoveryData(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.resetRecoveryData()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    /* Ed25519 stuff (TonWalletApplet)  */

    async verifyPin(pin: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.verifyPin(pin)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getPublicKey(hdIndex: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getPublicKey(hdIndex)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async signForDefaultHdPath(dataForSigning: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.signForDefaultHdPath(
                dataForSigning
            )
            return this.prepareCardResponse(response)
        } catch (e) {
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
                    pin
                )
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async sign(dataForSigning: string, hdIndex: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.sign(dataForSigning, hdIndex)
            return this.prepareCardResponse(response)
        } catch (e) {
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
                pin
            )
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getPublicKeyForDefaultPath(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getPublicKeyForDefaultPath()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    /* Keychain commands */

    async resetKeyChain(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.resetKeyChain()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getKeyChainDataAboutAllKeys(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getKeyChainDataAboutAllKeys()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getKeyChainInfo(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getKeyChainInfo()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getNumberOfKeys(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getNumberOfKeys()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getOccupiedStorageSize(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getOccupiedStorageSize()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getFreeStorageSize(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getFreeStorageSize()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getKeyFromKeyChain(keyHmac: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getKeyFromKeyChain(keyHmac)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async addKeyIntoKeyChain(newKey: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.addKeyIntoKeyChain(newKey)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async deleteKeyFromKeyChain(keyHmac: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.deleteKeyFromKeyChain(keyHmac)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async finishDeleteKeyFromKeyChainAfterInterruption(
        keyHmac: string
    ): Promise<CardResponse> {
        try {
            const response =
                await NfcCardModule.finishDeleteKeyFromKeyChainAfterInterruption(
                    keyHmac
                )
            return this.prepareCardResponse(response)
        } catch (e) {
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
                oldKeyHmac
            )
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getIndexAndLenOfKeyInKeyChain(
        keyHmac: string
    ): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getIndexAndLenOfKeyInKeyChain(
                keyHmac
            )
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async checkAvailableVolForNewKey(keySize: number): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkAvailableVolForNewKey(
                keySize
            )
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async checkKeyHmacConsistency(keyHmac: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkKeyHmacConsistency(
                keyHmac
            )
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }
}
