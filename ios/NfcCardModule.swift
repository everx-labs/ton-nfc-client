//
//  NfcCardModule.swift
//  ton-nfc-client
//
//  Created by Alina Alinovna on 16.02.2021.
//

import Foundation
import PromiseKit
import CryptoKit
import TonNfcClientSwift

@available(iOS 13.0, *)
@objc(NfcCardModule)
class NfcCardModule: NSObject {
    
    var cardCoinManagerNfcApi: CardCoinManagerNfcApi = CardCoinManagerNfcApi()
    var cardCryptoNfcApi: CardCryptoNfcApi = CardCryptoNfcApi()
    var cardActivationNfcApi: CardActivationNfcApi = CardActivationNfcApi()
    var cardKeyChainNfcApi: CardKeyChainNfcApi = CardKeyChainNfcApi()
    var recoveryDataApi: RecoveryDataApi = RecoveryDataApi()
    var nfcApi: NfcApi = NfcApi()
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    @objc func catchNotification() {
        print("catchNotification ")
        NfcEventEmitter.emitter.sendEvent(withName: ApduRunner.NFC_TAG_CONNECTED_EVENT, body: nil)
    }
    
    @objc
    func setNfcNotificator(/*_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock*/) {
        print("setNfcNotificator")
        ApduRunner.setNotificator(observer: self, notificationAction: #selector(self.catchNotification))
        print("setNfcNotificator  done")
    }
    
    @objc
    func checkIfNfcSupported(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        nfcApi.checkIfNfcSupported(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    /* Coinmanager stuff*/
    
    @objc
    func getRemainingPinTries(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCoinManagerNfcApi.getRemainingPinTries(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getSeVersion(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCoinManagerNfcApi.getSeVersion(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getCsn(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        
        cardCoinManagerNfcApi.getCsn(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getDeviceLabel(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCoinManagerNfcApi.getDeviceLabel(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func setDeviceLabel(_ label: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCoinManagerNfcApi.setDeviceLabel(deviceLabel: label, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getMaxPinTries(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCoinManagerNfcApi.getMaxPinTries(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    
    
    @objc
    func getRootKeyStatus(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCoinManagerNfcApi.getRootKeyStatus(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getAvailableMemory(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCoinManagerNfcApi.getAvailableMemory(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getAppsList(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCoinManagerNfcApi.getAppsList(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func generateSeed(_ pin: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCoinManagerNfcApi.generateSeed(pin: pin, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func resetWallet(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCoinManagerNfcApi.resetWallet(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func changePin(_ oldPin: String, newPin: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCoinManagerNfcApi.changePin(oldPin: oldPin, newPin: newPin, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    /* Ton wallet applet common stuff */
    @objc
    func getSault(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.getSault(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getSerialNumber(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.getSerialNumber(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getTonAppletState(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.getTonAppletState(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    /* Commands to maintain keys for hmac */
    
    @objc
    func selectKeyForHmac(_ serialNumber: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardActivationNfcApi.selectKeyForHmacAndReturnIntoCallback(serialNumber : serialNumber, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func createKeyForHmac(_ password: String, commonSecret : String, serialNumber: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardActivationNfcApi.createKeyForHmac(authenticationPassword : password, commonSecret : commonSecret, serialNumber: serialNumber, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getCurrentSerialNumber(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardActivationNfcApi.getCurrentSerialNumberAndPutIntoCallback(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getAllSerialNumbers(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardActivationNfcApi.getAllSerialNumbers(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func isKeyForHmacExist(_ serialNumber: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardActivationNfcApi.isKeyForHmacExistAndReturnIntoCallback(serialNumber: serialNumber, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func deleteKeyForHmac(_ serialNumber: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardActivationNfcApi.deleteKeyForHmac(serialNumber: serialNumber, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    /* Ton wallet applet card activation related stuff */
    

    @objc
    func turnOnWalletWithPin(_ newPin: String, password: String, commonSecret : String, initialVector : String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardActivationNfcApi.turnOnWallet(newPin: newPin, authenticationPassword: password, commonSecret: commonSecret, initialVector: initialVector, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
	
	@objc
    func turnOnWallet(_ password: String, commonSecret : String, initialVector : String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardActivationNfcApi.turnOnWallet(authenticationPassword: password, commonSecret: commonSecret, initialVector: initialVector, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func verifyPassword(_ password: String, initialVector: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardActivationNfcApi.verifyPassword(password: password, initialVector: initialVector, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
	
	@objc
    func getHashes(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardActivationNfcApi.generateSeedAndGetHashes(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
	
    @objc
    func getHashOfEncryptedCommonSecret(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardActivationNfcApi.getHashOfEncryptedCommonSecret(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getHashOfEncryptedPassword(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardActivationNfcApi.getHashOfEncryptedPassword(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    /* Ton wallet applet recovery data stuff*/
    
    @objc
    func resetRecoveryData(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        recoveryDataApi.resetRecoveryData(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getRecoveryDataHash(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        recoveryDataApi.getRecoveryDataHash(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getRecoveryDataLen(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        recoveryDataApi.getRecoveryDataLen(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func isRecoveryDataSet(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        recoveryDataApi.isRecoveryDataSet(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getRecoveryData(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        recoveryDataApi.getRecoveryData(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func addRecoveryData(_ recoveryData: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        recoveryDataApi.addRecoveryData(recoveryData: recoveryData, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    

    /* Ton wallet applet ed25519 related stuff*/
    @objc
    func getPublicKeyForDefaultPath(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.getPublicKeyForDefaultPath(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func checkSerialNumberAndGetPublicKeyForDefaultPath(_ serialNumber: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.checkSerialNumberAndGetPublicKeyForDefaultPath(serialNumber: serialNumber, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    
    @objc
    func getPublicKey(_ hdIndex: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.getPublicKey(hdIndex: hdIndex, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func checkSerialNumberAndGetPublicKey(_ serialNumber: String, hdIndex: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.checkSerialNumberAndGetPublicKey(serialNumber: serialNumber, hdIndex: hdIndex, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func verifyPin(_ pin: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.verifyPin(pin: pin, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func verifyPinAndSignForDefaultHdPath(_ data: String, pin : String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.verifyPinAndSignForDefaultHdPath(data: data, pin: pin, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func checkSerialNumberAndVerifyPinAndSignForDefaultHdPath(_ serialNumber: String, data: String, pin : String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.checkSerialNumberAndVerifyPinAndSignForDefaultHdPath(serialNumber: serialNumber, data: data, pin: pin, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func verifyPinAndSign(_ data: String, hdIndex: String, pin : String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.verifyPinAndSign(data: data, hdIndex: hdIndex, pin: pin, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func checkSerialNumberAndVerifyPinAndSign(_ serialNumber: String, data: String, hdIndex: String, pin : String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.checkSerialNumberAndVerifyPinAndSign(serialNumber: serialNumber, data: data, hdIndex: hdIndex, pin: pin, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func signForDefaultHdPath(_ data: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.signForDefaultHdPath(data: data, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func checkSerialNumberAndSignForDefaultHdPath(_ serialNumber: String, data: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.checkSerialNumberAndSignForDefaultHdPath(serialNumber: serialNumber, data: data, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func sign(_ data: String, hdIndex: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.sign(data: data, hdIndex: hdIndex, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func checkSerialNumberAndSign(_ serialNumber: String, data: String, hdIndex: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardCryptoNfcApi.checkSerialNumberAndSign(serialNumber: serialNumber, data: data, hdIndex: hdIndex, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    /* Ton wallet applet keychain related stuff */
    @objc
    func getKeyChainDataAboutAllKeys(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.getKeyChainDataAboutAllKeys(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getKeyChainInfo(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.getKeyChainInfo(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func finishDeleteKeyFromKeyChainAfterInterruption(_ keyMac : String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.finishDeleteKeyFromKeyChainAfterInterruption(keyMac : keyMac, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func deleteKeyFromKeyChain(_ keyMac : String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.deleteKeyFromKeyChain(keyMac : keyMac, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getKeyFromKeyChain(_ keyMac : String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.getKeyFromKeyChain(keyMac : keyMac, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func addKeyIntoKeyChain(_ newKey: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.addKeyIntoKeyChain(newKey : newKey, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func changeKeyInKeyChain(_ newKey: String, oldKeyHMac : String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.changeKeyInKeyChain(newKey : newKey, oldKeyHMac: oldKeyHMac, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    
    @objc
    func resetKeyChain(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.resetKeyChain(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getDeleteKeyChunkNumOfPackets(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.getDeleteKeyChunkNumOfPackets(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getDeleteKeyRecordNumOfPackets(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.getDeleteKeyRecordNumOfPackets(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getNumberOfKeys(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.getNumberOfKeys(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getOccupiedStorageSize(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.getOccupiedStorageSize(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getFreeStorageSize(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.getFreeStorageSize(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func checkKeyHmacConsistency(_ keyHmac: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.checkKeyHmacConsistency(keyHmac: keyHmac, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func checkAvailableVolForNewKey(_ keySize: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.checkAvailableVolForNewKey(keySize: keySize, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getIndexAndLenOfKeyInKeyChain(_ keyHmac: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.getIndexAndLenOfKeyInKeyChain(keyHmac: keyHmac, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
    
    @objc
    func getHmac(_ index: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        cardKeyChainNfcApi.getHmac(index: index, resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
    }
}
