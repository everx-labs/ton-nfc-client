
import {NativeModules} from 'react-native';
const {NfcCardModule} = NativeModules;

export default class NfcCardModuleWrapper {

  /* Coin manager functions */

  async getMaxPinTries() : Promise<object>  {
    let response = await NfcCardModule.getMaxPinTries();
    let json = JSON.parse(response);
    return json;
  }
 
  async getSeVersion() : Promise<object> {
    let response = await NfcCardModule.getSeVersion();
    let json = JSON.parse(response);
    return json;
  }

  async getCsn() : Promise<object> {
    let response = await NfcCardModule.getCsn();
    let json = JSON.parse(response);
    return json;
  }

  async getDeviceLabel() : Promise<object> {
    let response = await NfcCardModule.getDeviceLabel();
    let json = JSON.parse(response);
    return json;
  }

  async setDeviceLabel(label : string) : Promise<object> {
    let response = await NfcCardModule.setDeviceLabel(label);
    let json = JSON.parse(response);
    return json;
  }

  async getRemainingPinTries(): Promise<object> {
    let response = await NfcCardModule.getRemainingPinTries();
    let json = JSON.parse(response);
    return json;
  }

  async getRootKeyStatus(){
    let response = await NfcCardModule.getRootKeyStatus();
    let json = JSON.parse(response);
    return json;
  }

  async getAvailableMemory(): Promise<object> {
    let response = await NfcCardModule.getAvailableMemory();
    let json = JSON.parse(response);
    return json;
  }

  async getAppsList(): Promise<object> {
    let response = await NfcCardModule.getAppsList();
    let json = JSON.parse(response);
    return json;
  }

  async generateSeed(pin : string) : Promise<object> {
    let response = await NfcCardModule.generateSeed(pin);
    let json = JSON.parse(response);
    return json;
  }

  async resetWallet() : Promise<object> {
    let response = await NfcCardModule.resetWallet();
    let json = JSON.parse(response);
    return json;
  }

  async changePin(oldPin : string, newPin : string) : Promise<object> {
    let response = await NfcCardModule.changePin(oldPin, newPin);
    let json = JSON.parse(response);
    return json;
  }

  /* Commands to maintain keys for hmac */

  async selectKeyForHmac(serialNumber : string) : Promise<object> {
    let response = await NfcCardModule.selectKeyForHmac(serialNumber);
    let json = JSON.parse(response);
    return json;
  }

  async createKeyForHmac(authenticationPassword : string, commonSecret : string, serialNumber : string) : Promise<object> {
    let response = await NfcCardModule.createKeyForHmac(authenticationPassword, commonSecret, serialNumber);
    let json = JSON.parse(response);
    return json;
  }

  async getCurrentSerialNumber() : Promise<object> {
    let response = await NfcCardModule.getCurrentSerialNumber();
    let json = JSON.parse(response);
    return json;
  }

  async getAllSerialNumbers() : Promise<object> {
    let response = await NfcCardModule.getAllSerialNumbers();
    let json = JSON.parse(response);
    return json;
  }

  async isKeyForHmacExist(serialNumber : string) : Promise<object> {
    let response = await NfcCardModule.isKeyForHmacExist(serialNumber);
    let json = JSON.parse(response);
    return json;
  }

  async deleteKeyForHmac(serialNumber : string) : Promise<object> {
    let response = await NfcCardModule.deleteKeyForHmac(serialNumber);
    let json = JSON.parse(response);
    return json;
  }

  /* Card activation commands (TonWalletApplet) */
  

  async turnOnWalletWithPin(newPin : string, authenticationPassword : string, commonSecret : string, initialVector : string) : Promise<object> {
    let response = await NfcCardModule.turnOnWallet(newPin, authenticationPassword, commonSecret, initialVector);
    let json = JSON.parse(response);
    return json;
  }

  async turnOnWallet(authenticationPassword : string, commonSecret : string, initialVector : string) : Promise<object> {
    let response = await NfcCardModule.turnOnWallet(authenticationPassword, commonSecret, initialVector);
    let json = JSON.parse(response);
    return json;
  }

  async getHashes() : Promise<object> {
    let response = await NfcCardModule.getHashes();
    let json = JSON.parse(response);
    return json;
  }

  async getHashOfEncryptedPassword() : Promise<object> {
    let response = await NfcCardModule.getHashOfEncryptedPassword();
    let json = JSON.parse(response);
    return json;
  }

  async getHashOfEncryptedCommonSecret(): Promise<object> {
    let response = await NfcCardModule.getHashOfEncryptedCommonSecret();
    let json = JSON.parse(response);
    return json;
  }

  /* Common stuff (TonWalletApplet)  */

  async getTonAppletState(): Promise<object> {
    let response = await NfcCardModule.getTonAppletState();
    let json = JSON.parse(response);
    return json;
  }

  async getSerialNumber(): Promise<object> {
    let response = await NfcCardModule.getSerialNumber();
    let json = JSON.parse(response);
    return json;
  }

  /* Recovery data stuff (TonWalletApplet)  */
  

  async addRecoveryData(recoveryData : string) : Promise<object> {
    let response = await NfcCardModule.addRecoveryData(recoveryData);
    let json = JSON.parse(response);
    return json;
  }

  async getRecoveryData(): Promise<object> {
    let response = await NfcCardModule.getRecoveryData();
    let json = JSON.parse(response);
    return json;
  }

  async getRecoveryDataHash(){
    let response = await NfcCardModule.getRecoveryDataHash();
    let json = JSON.parse(response);
    return json;
  }

  async getRecoveryDataLen(): Promise<object> {
    let response = await NfcCardModule.getRecoveryDataLen();
    let json = JSON.parse(response);
    return json;
  }

  async isRecoveryDataSet(): Promise<object> {
    let response = await NfcCardModule.isRecoveryDataSet();
    let json = JSON.parse(response);
    return json;
  }

  async resetRecoveryData(): Promise<object> {
    let response = await NfcCardModule.resetRecoveryData();
    let json = JSON.parse(response);
    return json;
  }

  /* Ed25519 stuff (TonWalletApplet)  */

  async verifyPin(pin : string) : Promise<object> {
    let response = await NfcCardModule.verifyPin(pin);
    let json = JSON.parse(response);
    return json;
  }

  async getPublicKey(hdIndex : string) : Promise<object> {
    let response = await NfcCardModule.getPublicKey(hdIndex);
    let json = JSON.parse(response);
    return json;
  }

  async signForDefaultHdPath(dataForSigning :  string) : Promise<object> {
    let response = await NfcCardModule.verifyPinAndSignForDefaultHdPath(dataForSigning);
    let json = JSON.parse(response);
    return json;
  }

  async verifyPinAndSignForDefaultHdPath(dataForSigning:  string, pin:  string) : Promise<object>  {
    let response = await NfcCardModule.verifyPinAndSignForDefaultHdPath(dataForSigning, pin);
    let json = JSON.parse(response);
    return json;
  }

  async sign(dataForSigning:  string, hdIndex:  string): Promise<object> {
    let response = await NfcCardModule.verifyPinAndSign(dataForSigning, hdIndex);
    let json = JSON.parse(response);
    return json;
  }

  async verifyPinAndSign(dataForSigning:  string, hdIndex:  string, pin:  string): Promise<object> {
    let response = await NfcCardModule.verifyPinAndSign(dataForSigning, hdIndex, pin);
    let json = JSON.parse(response);
    return json;
  }

  async getPublicKeyForDefaultPath(): Promise<object> {
    let response = await NfcCardModule.getPublicKeyForDefaultPath();
    let json = JSON.parse(response);
    return json;
  }

  /* Keychain commands */
  

  async resetKeyChain(): Promise<object>{
    let response = await NfcCardModule.resetKeyChain();
    let json = JSON.parse(response);
    return json;
  }

  async getKeyChainDataAboutAllKeys(): Promise<object>{
    let response = await NfcCardModule.getKeyChainDataAboutAllKeys();
    let json = JSON.parse(response);
    return json;
  }

  async getKeyChainInfo(): Promise<object>{
    let response = await NfcCardModule.getKeyChainInfo();
    let json = JSON.parse(response);
    return json;
  }

  async getNumberOfKeys(): Promise<object>{
    let response = await NfcCardModule.getNumberOfKeys();
    let json = JSON.parse(response);
    return json;
  }

  async getOccupiedStorageSize(): Promise<object>{
    let response = await NfcCardModule.getOccupiedStorageSize();
    let json = JSON.parse(response);
    return json;
  }

  async getFreeStorageSize(): Promise<object>{
    let response = await NfcCardModule.getFreeStorageSize();
    let json = JSON.parse(response);
    return json;
  }

  async getKeyFromKeyChain(keyHmac : string) : Promise<object>{
    let response = await NfcCardModule.getKeyFromKeyChain(keyHmac);
    let json = JSON.parse(response);
    return json;
  }

  async addKeyIntoKeyChain(newKey : string): Promise<object>{
    let response = await NfcCardModule.addKeyIntoKeyChain(newKey);
    let json = JSON.parse(response);
    return json;
  }

  async deleteKeyFromKeyChain(keyHmac : string): Promise<object>{
    let response = await NfcCardModule.deleteKeyFromKeyChain(keyHmac);
    let json = JSON.parse(response);
    return json;
  }

  async finishDeleteKeyFromKeyChainAfterInterruption(keyHmac : string): Promise<object>{
    let response = await NfcCardModule.finishDeleteKeyFromKeyChainAfterInterruption(keyHmac);
    let json = JSON.parse(response);
    return json;
  }

  async changeKeyInKeyChain(newKey: string, oldKeyHmac: string): Promise<object>{
    let response = await NfcCardModule.changeKeyInKeyChain(newKey, oldKeyHmac);
    let json = JSON.parse(response);
    return json;
  }

  async getIndexAndLenOfKeyInKeyChain(keyHmac : string) : Promise<object>{
    let response = await NfcCardModule.getIndexAndLenOfKeyInKeyChain(keyHmac);
    let json = JSON.parse(response);
    return json;
  }

  async checkAvailableVolForNewKey(keySize : number) : Promise<object>{
    let response = await NfcCardModule.checkAvailableVolForNewKey(keySize);
    let json = JSON.parse(response);
    return json;
  }

  async checkKeyHmacConsistency(keyHmac : string): Promise<object>{
    let response = await NfcCardModule.checkKeyHmacConsistency(keyHmac);
    let json = JSON.parse(response);
    return json;
  }
}