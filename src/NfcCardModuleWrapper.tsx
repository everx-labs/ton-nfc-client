import { NativeModules, Platform } from 'react-native'
import { CardError, CardResponse, NfcNativeModuleError } from 'ton-nfc-client'

const { NfcCardModule } = NativeModules

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
    private prepareCardResponse(response: string): CardResponse {
        const json = JSON.parse(response)
        if (!json.hasOwnProperty('message'))
            throw new Error('Json must have "message" field!')
        if (!json.hasOwnProperty('status'))
            throw new Error('Json must have "status" field!')
        return new CardResponse(json.message, json.status, '', '', '', '', '', '', '')
    }

    private prepareCardResponseFromGetHashes(response: string): CardResponse {
        const json = JSON.parse(response)
        if (!json.hasOwnProperty('ecsHash') || !json.hasOwnProperty('epHash'))
            throw new Error('Json must have "ecsHash" and "epHash" fields!')
        if (!json.hasOwnProperty('status'))
            throw new Error('Json must have "status" field!')
        return new CardResponse('', json.status, json.ecsHash, json.epHash, '', '', '', '', '')
    }

    private prepareCardResponseFromGetKeyChainInfo(response: string): CardResponse {
        const json = JSON.parse(response)
        if (!json.hasOwnProperty('occupiedSize') || !json.hasOwnProperty('freeSize') && !json.hasOwnProperty('numberOfKeys'))
            throw new Error('Json must have "occupiedSize", "freeSize" and "numberOfKeys" fields!')
        if (!json.hasOwnProperty('status'))
            throw new Error('Json must have "status" field!')
        return new CardResponse('', json.status, '', '', json.numberOfKeys, json.occupiedSize, json.freeSize, '', '')
    }

    private prepareCardResponseFromGetHmac(response: string): CardResponse {
        const json = JSON.parse(response)
        if (!json.hasOwnProperty('hmac') || !json.hasOwnProperty('length'))
            throw new Error('Json must have "hmac" and "length" fields!')
        if (!json.hasOwnProperty('status'))
            throw new Error('Json must have "status" field!')
        return new CardResponse('', json.status, '', '', '', '', '', json.hmac, json.length)
    }

    private throwError(errorMessage: string): Error {
        let json: CardErrorResponse = {}
        try {
            json = JSON.parse(errorMessage)
        } catch (e) {
            throw new Error(errorMessage)
        }

        if (!json.message) {
            throw new Error('Json must have "message" field!')
        }

        if (!json.status) {
            throw new Error('Json must have "status" field!')
        }

        if (!json.code) {
            throw new Error('Json must have "code" field!')
        }

        if (!json.errorType) {
            throw new Error('Json must have "errorType" field!')
        }

        if (!json.hasOwnProperty('errorTypeId')) {
            throw new Error('Json must have "errorTypeId" field!')
        }

        if (json.errorTypeId === '0') {
            if (!json.cardInstruction) {
                throw new Error('Json must have "cardInstruction" field!')
            }

            if (!json.apdu) {
                throw new Error('Json must have "apdu" field!')
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
            throw new Error('"errorTypeId" must have value!')
        }

        throw new NfcNativeModuleError(
            json.message,
            json.status,
            json.code,
            json.errorTypeId,
            json.errorType,
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

    async getMaxPinTriesWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getMaxPinTriesWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getSeVersion(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getSeVersion()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getSeVersionWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getSeVersionWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getCsn(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getCsn()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getCsnWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getCsnWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getDeviceLabel(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getDeviceLabel()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getDeviceLabelWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getDeviceLabelWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async setDeviceLabel(label: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.setDeviceLabel(label)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async setDeviceLabelWithoutDialog(label: string): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.setDeviceLabelWithoutDialog(label)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getRemainingPinTries(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRemainingPinTries()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getRemainingPinTriesWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getRemainingPinTriesWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getRootKeyStatus(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRootKeyStatus()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getRootKeyStatusWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getRootKeyStatusWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getAvailableMemory(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getAvailableMemory()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getAvailableMemoryWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getAvailableMemoryWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getAppsList(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getAppsList()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getAppsListWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getAppsListWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async generateSeed(pin: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.generateSeed(pin)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async generateSeedWithoutDialog(pin: string): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.generateSeedWithoutDialog(pin)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async resetWallet(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.resetWallet()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async resetWalletWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.resetWalletWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async changePin(oldPin: string, newPin: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.changePin(oldPin, newPin)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async changePinWithoutDialog(oldPin: string, newPin: string): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.changePinWithoutDialog(oldPin, newPin)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
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
        serialNumber: string,
    ): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.createKeyForHmac(
                authenticationPassword,
                commonSecret,
                serialNumber,
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
        initialVector: string,
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
            throw this.throwError(e.message)
        }
    }

    async turnOnWalletWithPinWithoutDialog(
        newPin: string,
        authenticationPassword: string,
        commonSecret: string,
        initialVector: string
    ): Promise<CardResponse> {
        if(Platform.OS === 'android'){
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
        throw new Error("This function is available only for Android OS!");
    }

    async turnOnWallet(
        authenticationPassword: string,
        commonSecret: string,
        initialVector: string,
    ): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.turnOnWallet(
                authenticationPassword,
                commonSecret,
                initialVector,
            )
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async turnOnWalletWithoutDialog(
        authenticationPassword: string,
        commonSecret: string,
        initialVector: string,
    ): Promise<CardResponse> {
        if (Platform.OS === 'android') {
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
        throw new Error('This function is available only for Android OS!')
    }

    async getHashes(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getHashes()
            return this.prepareCardResponseFromGetHashes(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getHashesWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getHashesWithoutDialog()
                return this.prepareCardResponseFromGetHashes(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getHashOfEncryptedPassword(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getHashOfEncryptedPassword()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getHashOfEncryptedPasswordWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getHashOfEncryptedPasswordWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
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

    async getHashOfEncryptedCommonSecretWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getHashOfEncryptedCommonSecretWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
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

    async getTonAppletStateWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getTonAppletStateWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getSerialNumber(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getSerialNumber()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getSerialNumberWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getSerialNumberWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getSault(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getSault()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getSaultWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getSaultWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
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

    async addRecoveryDataWithoutDialog(recoveryData: string): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.addRecoveryDataWithoutDialog(recoveryData)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getRecoveryData(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRecoveryData()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getRecoveryDataWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getRecoveryDataWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getRecoveryDataHash(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRecoveryDataHash()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getRecoveryDataHashWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getRecoveryDataHashWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getRecoveryDataLen(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getRecoveryDataLen()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getRecoveryDataLenWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getRecoveryDataLenWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async isRecoveryDataSet(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.isRecoveryDataSet()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async isRecoveryDataSetWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.isRecoveryDataSetWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async resetRecoveryData(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.resetRecoveryData()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async resetRecoveryDataWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.resetRecoveryDataWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
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

    async verifyPinWithoutDialog(pin: string): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.verifyPinWithoutDialog(pin)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }


    async getPublicKey(hdIndex: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getPublicKey(hdIndex)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getPublicKeyWithoutDialog(hdIndex: string): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getPublicKeyWithoutDialog(hdIndex)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async signForDefaultHdPath(dataForSigning: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.signForDefaultHdPath(
                dataForSigning,
            )
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async signForDefaultHdPathWithoutDialog(dataForSigning: string): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.signForDefaultHdPathWithoutDialog(dataForSigning)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async verifyPinAndSignForDefaultHdPath(
        dataForSigning: string,
        pin: string,
    ): Promise<CardResponse> {
        try {
            const response =
                await NfcCardModule.verifyPinAndSignForDefaultHdPath(
                    dataForSigning,
                    pin,
                )
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async verifyPinAndSignForDefaultHdPathWithoutDialog(
        dataForSigning: string,
        pin: string,
    ): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.verifyPinAndSignForDefaultHdPathWithoutDialog(dataForSigning, pin)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async sign(dataForSigning: string, hdIndex: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.sign(dataForSigning, hdIndex)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async signWithoutDialog(
        dataForSigning: string,
        hdIndex: string,
    ): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.signWithoutDialog(dataForSigning, hdIndex)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async verifyPinAndSign(
        dataForSigning: string,
        hdIndex: string,
        pin: string,
    ): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.verifyPinAndSign(
                dataForSigning,
                hdIndex,
                pin,
            )
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async verifyPinAndSignWithoutDialog(
        dataForSigning: string,
        hdIndex: string,
        pin: string,
    ): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.verifyPinAndSignWithoutDialog(dataForSigning, hdIndex, pin)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getPublicKeyForDefaultPath(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getPublicKeyForDefaultPath()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getPublicKeyForDefaultPathWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getPublicKeyForDefaultPathWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
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

    async resetKeyChainWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.resetKeyChainWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getKeyChainDataAboutAllKeys(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getKeyChainDataAboutAllKeys()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getKeyChainDataAboutAllKeysWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getKeyChainDataAboutAllKeysWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getKeyChainInfo(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getKeyChainInfo()
            return this.prepareCardResponseFromGetKeyChainInfo(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getKeyChainInfoWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getKeyChainInfoWithoutDialog()
                return this.prepareCardResponseFromGetKeyChainInfo(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getNumberOfKeys(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getNumberOfKeys()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getNumberOfKeysWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getNumberOfKeysWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getOccupiedStorageSize(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getOccupiedStorageSize()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getOccupiedStorageSizeWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getOccupiedStorageSizeWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getFreeStorageSize(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getFreeStorageSize()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getFreeStorageSizeSizeWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getFreeStorageSizeWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getKeyFromKeyChain(keyHmac: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getKeyFromKeyChain(keyHmac)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getKeyFromKeyChainWithoutDialog(keyHmac: string): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getKeyFromKeyChainWithoutDialog(keyHmac)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async addKeyIntoKeyChain(newKey: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.addKeyIntoKeyChain(newKey)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async addKeyIntoKeyChainWithoutDialog(newKey: string): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.addKeyIntoKeyChainWithoutDialog(newKey)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async deleteKeyFromKeyChain(keyHmac: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.deleteKeyFromKeyChain(keyHmac)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async deleteKeyFromKeyChainWithoutDialog(keyHmac: string): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.deleteKeyFromKeyChainWithoutDialog(keyHmac)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async finishDeleteKeyFromKeyChainAfterInterruption(): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.finishDeleteKeyFromKeyChainAfterInterruption()
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async finishDeleteKeyFromKeyChainAfterInterruptionWithoutDialog(): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.finishDeleteKeyFromKeyChainAfterInterruptionWithoutDialog()
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async changeKeyInKeyChain(
        newKey: string,
        oldKeyHmac: string,
    ): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.changeKeyInKeyChain(
                newKey,
                oldKeyHmac,
            )
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async changeKeyInKeyChainWithoutDialog(
        newKey: string,
        oldKeyHmac: string,
    ): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.changeKeyInKeyChainWithoutDialog(newKey, oldKeyHmac)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getIndexAndLenOfKeyInKeyChain(
        keyHmac: string,
    ): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getIndexAndLenOfKeyInKeyChain(keyHmac)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getIndexAndLenOfKeyInKeyChainWithoutDialog(keyHmac: string): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getIndexAndLenOfKeyInKeyChainWithoutDialog(keyHmac)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async checkAvailableVolForNewKey(keySize: number): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkAvailableVolForNewKey(keySize)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async checkAvailableVolForNewKeyWithoutDialog(keySize: number): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.checkAvailableVolForNewKeyWithoutDialog(keySize)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async checkKeyHmacConsistency(keyHmac: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.checkKeyHmacConsistency(keyHmac)
            return this.prepareCardResponse(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async checkKeyHmacConsistencyWithoutDialog(keyHmac: string): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.checkKeyHmacConsistencyWithoutDialog(keyHmac)
                return this.prepareCardResponse(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }

    async getHmac(index: string): Promise<CardResponse> {
        try {
            const response = await NfcCardModule.getHmac(index)
            return this.prepareCardResponseFromGetHmac(response)
        } catch (e) {
            throw this.throwError(e.message)
        }
    }

    async getHmacWithoutDialog(index: string): Promise<CardResponse> {
        if (Platform.OS === 'android') {
            try {
                const response = await NfcCardModule.getHmacWithoutDialog(index)
                return this.prepareCardResponseFromGetHmac(response)
            } catch (e) {
                throw this.throwError(e.message)
            }
        }
        throw new Error('This function is available only for Android OS!')
    }


}
