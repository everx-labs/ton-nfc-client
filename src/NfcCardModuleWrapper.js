
import {NativeModules} from 'react-native';
const {NfcCardModule} = NativeModules;

export default class NfcCardModuleWrapper {

  /* Coin manager functions */

  static async getMaxPinTries() {
    let response = await NfcCardModule.getMaxPinTries();
    let json = JSON.parse(response);
    return json;
  }

  static async getSeVersion() {
    let response = await NfcCardModule.getSeVersion();
    let json = JSON.parse(response);
    return json;
  }

  static async getCsn(){
    let response = await NfcCardModule.getCsn();
    let json = JSON.parse(response);
    return json;
  }

  static async getDeviceLabel(){
    let response = await NfcCardModule.getDeviceLabel();
    let json = JSON.parse(response);
    return json;
  }

  static async setDeviceLabel(label){
    let response = await NfcCardModule.setDeviceLabel(label);
    let json = JSON.parse(response);
    return json;
  }

  static async getRemainingPinTries(){
    let response = await NfcCardModule.getRemainingPinTries();
    let json = JSON.parse(response);
    return json;
  }

  static async getRootKeyStatus(){
    let response = await NfcCardModule.getRootKeyStatus();
    let json = JSON.parse(response);
    return json;
  }

  static async getAvailableMemory(){
    let response = await NfcCardModule.getAvailableMemory();
    let json = JSON.parse(response);
    return json;
  }

  static async getAppsList(){
    let response = await NfcCardModule.getAppsList();
    let json = JSON.parse(response);
    return json;
  }

  static async generateSeed(pin){
    let response = await NfcCardModule.generateSeed(pin);
    let json = JSON.parse(response);
    return json;
  }

  static async resetWallet(){
    let response = await NfcCardModule.resetWallet();
    let json = JSON.parse(response);
    return json;
  }

  static async changePin(oldPin, newPin){
    let response = await NfcCardModule.changePin(oldPin, newPin);
    let json = JSON.parse(response);
    return json;
  }

  /* Commands to maintain keys for hmac */

  static async selectKeyForHmac(serialNumber){
    let response = await NfcCardModule.selectKeyForHmac(serialNumber);
    let json = JSON.parse(response);
    return json;
  }

  static async createKeyForHmac(authenticationPassword, commonSecret, serialNumber){
    let response = await NfcCardModule.createKeyForHmac(authenticationPassword, commonSecret, serialNumber);
    let json = JSON.parse(response);
    return json;
  }

  static async getCurrentSerialNumber(){
    let response = await NfcCardModule.getCurrentSerialNumber();
    let json = JSON.parse(response);
    return json;
  }

  static async getAllSerialNumbers(){
    let response = await NfcCardModule.getAllSerialNumbers();
    let json = JSON.parse(response);
    return json;
  }

  static async isKeyForHmacExist(serialNumber){
    let response = await NfcCardModule.isKeyForHmacExist(serialNumber);
    let json = JSON.parse(response);
    return json;
  }

  static async deleteKeyForHmac(serialNumber){
    let response = await NfcCardModule.deleteKeyForHmac(serialNumber);
    let json = JSON.parse(response);
    return json;
  }

  /* Card activation commands (TonWalletApplet) */

  static async turnOnWallet(newPin, authenticationPassword, commonSecret, initialVector){
    let response = await NfcCardModule.turnOnWallet(newPin, authenticationPassword, commonSecret, initialVector);
    let json = JSON.parse(response);
    return json;
  }

  static async turnOnWallet(authenticationPassword, commonSecret, initialVector){
    let response = await NfcCardModule.turnOnWallet(authenticationPassword, commonSecret, initialVector);
    let json = JSON.parse(response);
    return json;
  }

  static async getHashes(){
    let response = await NfcCardModule.getHashes();
    let json = JSON.parse(response);
    return json;
  }

  static async getHashOfEncryptedPassword(){
    let response = await NfcCardModule.getHashOfEncryptedPassword();
    let json = JSON.parse(response);
    return json;
  }

  static async getHashOfEncryptedCommonSecret(){
    let response = await NfcCardModule.getHashOfEncryptedCommonSecret();
    let json = JSON.parse(response);
    return json;
  }

  /* Common stuff (TonWalletApplet)  */

  static async getTonAppletState(){
    let response = await NfcCardModule.getTonAppletState();
    let json = JSON.parse(response);
    return json;
  }

  static async getSerialNumber(){
    let response = await NfcCardModule.getSerialNumber();
    let json = JSON.parse(response);
    return json;
  }

  /* Recovery data stuff (TonWalletApplet)  */

  static async addRecoveryData(recoveryData){
    let response = await NfcCardModule.addRecoveryData(recoveryData);
    let json = JSON.parse(response);
    return json;
  }

  static async getRecoveryData(){
    let response = await NfcCardModule.getRecoveryData();
    let json = JSON.parse(response);
    return json;
  }

  static async getRecoveryDataHash(){
    let response = await NfcCardModule.getRecoveryDataHash();
    let json = JSON.parse(response);
    return json;
  }

  static async getRecoveryDataLen(){
    let response = await NfcCardModule.getRecoveryDataLen();
    let json = JSON.parse(response);
    return json;
  }

  static async isRecoveryDataSet(){
    let response = await NfcCardModule.isRecoveryDataSet();
    let json = JSON.parse(response);
    return json;
  }

  static async resetRecoveryData(){
    let response = await NfcCardModule.resetRecoveryData();
    let json = JSON.parse(response);
    return json;
  }

  /* Ed25519 stuff (TonWalletApplet)  */

  static async verifyPin(pin){
    let response = await NfcCardModule.verifyPin(pin);
    let json = JSON.parse(response);
    return json;
  }

  static async getPublicKey(hdIndex){
    let response = await NfcCardModule.getPublicKey(hdIndex);
    let json = JSON.parse(response);
    return json;
  }

  static async signForDefaultHdPath(dataForSigning){
    let response = await NfcCardModule.verifyPinAndSignForDefaultHdPath(dataForSigning);
    let json = JSON.parse(response);
    return json;
  }

  static async verifyPinAndSignForDefaultHdPath(dataForSigning, pin){
    let response = await NfcCardModule.verifyPinAndSignForDefaultHdPath(dataForSigning, pin);
    let json = JSON.parse(response);
    return json;
  }

  static async sign(dataForSigning, hdIndex){
    let response = await NfcCardModule.verifyPinAndSign(dataForSigning, hdIndex);
    let json = JSON.parse(response);
    return json;
  }

  static async verifyPinAndSign(dataForSigning, hdIndex, pin){
    let response = await NfcCardModule.verifyPinAndSign(dataForSigning, hdIndex, pin);
    let json = JSON.parse(response);
    return json;
  }

  static async getPublicKeyForDefaultPath(){
    let response = await NfcCardModule.getPublicKeyForDefaultPath();
    let json = JSON.parse(response);
    return json;
  }

  /* Keychain commands */

  static async resetKeyChain(){
    let response = await NfcCardModule.resetKeyChain();
    let json = JSON.parse(response);
    return json;
  }

  static async getKeyChainDataAboutAllKeys(){
    let response = await NfcCardModule.getKeyChainDataAboutAllKeys();
    let json = JSON.parse(response);
    return json;
  }

  static async getKeyChainInfo(){
    let response = await NfcCardModule.getKeyChainInfo();
    let json = JSON.parse(response);
    return json;
  }

  static async getNumberOfKeys(){
    let response = await NfcCardModule.getNumberOfKeys();
    let json = JSON.parse(response);
    return json;
  }

  static async getOccupiedStorageSize(){
    let response = await NfcCardModule.getOccupiedStorageSize();
    let json = JSON.parse(response);
    return json;
  }

  static async getFreeStorageSize(){
    let response = await NfcCardModule.getFreeStorageSize();
    let json = JSON.parse(response);
    return json;
  }

  static async getKeyFromKeyChain(keyHmac){
    let response = await NfcCardModule.getKeyFromKeyChain(keyHmac);
    let json = JSON.parse(response);
    return json;
  }

  static async addKeyIntoKeyChain(newKey){
    let response = await NfcCardModule.addKeyIntoKeyChain(newKey);
    let json = JSON.parse(response);
    return json;
  }

  static async deleteKeyFromKeyChain(keyHmac){
    let response = await NfcCardModule.deleteKeyFromKeyChain(keyHmac);
    let json = JSON.parse(response);
    return json;
  }

  static async finishDeleteKeyFromKeyChainAfterInterruption(keyHmac){
    let response = await NfcCardModule.finishDeleteKeyFromKeyChainAfterInterruption(keyHmac);
    let json = JSON.parse(response);
    return json;
  }

  static async changeKeyInKeyChain(newKey, oldKeyHmac){
    let response = await NfcCardModule.changeKeyInKeyChain(newKey, oldKeyHmac);
    let json = JSON.parse(response);
    return json;
  }

  static async getIndexAndLenOfKeyInKeyChain(keyHmac){
    let response = await NfcCardModule.getIndexAndLenOfKeyInKeyChain(keyHmac);
    let json = JSON.parse(response);
    return json;
  }

  static async checkAvailableVolForNewKey(keySize){
    let response = await NfcCardModule.checkAvailableVolForNewKey(keySize);
    let json = JSON.parse(response);
    return json;
  }

  static async checkKeyHmacConsistency(keyHmac){
    let response = await NfcCardModule.checkKeyHmacConsistency(keyHmac);
    let json = JSON.parse(response);
    return json;
  }
}