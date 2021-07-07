#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "RCTEventDispatcher.h"
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(NfcCardModule, NSObject)


RCT_EXTERN_METHOD(setNfcNotificator)

RCT_EXTERN_METHOD(
                  checkIfNfcSupported: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )

/* Coinmanager stuff*/
RCT_EXTERN_METHOD(
                  getSeVersion: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getCsn: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getDeviceLabel: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  setDeviceLabel: (NSString *)label
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getMaxPinTries: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getRemainingPinTries: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getRootKeyStatus: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getAvailableMemory: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getAppsList: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  generateSeed: (NSString *)pin
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  resetWallet: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  changePin: (NSString *)oldPin
                  newPin:(NSString *)newPin
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )

/* Ton wallet applet stuff*/
RCT_EXTERN_METHOD(
                  getSault: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getSerialNumber: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getTonAppletState: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )

/* Commands to maintain keys for hmac */
RCT_EXTERN_METHOD(
                  selectKeyForHmac: (NSString *) serialNumber
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  createKeyForHmac: (NSString *) password
                  commonSecret: (NSString *) commonSecret
                  serialNumber: (NSString *) serialNumber
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getCurrentSerialNumber: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getAllSerialNumbers: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  isKeyForHmacExist: (NSString *) serialNumber
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  deleteKeyForHmac: (NSString *) serialNumber
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )

/* Ton wallet applet card activation related stuff */
RCT_EXTERN_METHOD(
                  turnOnWallet: (NSString *)newPin
                  password: (NSString *) password
                  commonSecret: (NSString *) commonSecret
                  initialVector: (NSString *)initialVector
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  turnOnWallet: (NSString *) password
                  commonSecret: (NSString *) commonSecret
                  initialVector: (NSString *)initialVector
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )				  
RCT_EXTERN_METHOD(
                  verifyPassword: (NSString *)password
                  initialVector: (NSString *)initialVector
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getHashes: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )				  
RCT_EXTERN_METHOD(
                  getHashOfEncryptedCommonSecret: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getHashOfEncryptedPassword: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )

/* Ton wallet applet recovery data stuff*/
RCT_EXTERN_METHOD(
                  resetRecoveryData: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getRecoveryDataHash: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getRecoveryDataLen: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getRecoveryData: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  isRecoveryDataSet: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  addRecoveryData: (NSString *)recoveryData
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )

/* Ton wallet applet ed25519 related stuff*/
RCT_EXTERN_METHOD(
                  getPublicKeyForDefaultPath: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  checkSerialNumberAndGetPublicKeyForDefaultPath:
                  (NSString *)serialNumber
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getPublicKey: (NSString *)hdIndex
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  checkSerialNumberAndGetPublicKey:
                  (NSString *)serialNumber
                  hdIndex: (NSString *)hdIndex
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  verifyPin: (NSString *)pin
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  verifyPinAndSignForDefaultHdPath: (NSString *)data
                  pin: (NSString *)pin
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  checkSerialNumberAndVerifyPinAndSignForDefaultHdPath:
                  (NSString *)serialNumber
                  data: (NSString *)data
                  pin: (NSString *)pin
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  verifyPinAndSign: (NSString *)data
                  hdIndex:(NSString *)hdIndex
                  pin: (NSString *)pin
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  checkSerialNumberAndVerifyPinAndSign:
                  (NSString *)serialNumber
                  data: (NSString *)data
                  hdIndex:(NSString *)hdIndex
                  pin: (NSString *)pin
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  signForDefaultHdPath: (NSString *)data
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  checkSerialNumberAndSignForDefaultHdPath:
                  (NSString *)serialNumber
                  data: (NSString *)data
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  sign: (NSString *)data
                  hdIndex:(NSString *)hdIndex
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  checkSerialNumberAndSign:
                  (NSString *)serialNumber
                  data: (NSString *)data
                  hdIndex:(NSString *)hdIndex
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )

/* Ton wallet applet keychain related stuff*/
RCT_EXTERN_METHOD(
                  getKeyChainDataAboutAllKeys: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getKeyChainInfo: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  finishDeleteKeyFromKeyChainAfterInterruption: (NSString *)keyMac
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  deleteKeyFromKeyChain: (NSString *)keyMac
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getKeyFromKeyChain: (NSString *)keyMac
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  addKeyIntoKeyChain: (NSString *)newKey
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  changeKeyInKeyChain: (NSString *)newKey
                  oldKeyHMac:(NSString *)oldKeyHMac
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  resetKeyChain: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getDeleteKeyRecordNumOfPackets: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getDeleteKeyChunkNumOfPackets: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getNumberOfKeys: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getOccupiedStorageSize: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getFreeStorageSize: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  checkKeyHmacConsistency: (NSString *)keyHmac
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  checkAvailableVolForNewKey: (NSString *)keySize
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getIndexAndLenOfKeyInKeyChain: (NSString *)keyHmac
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(
                  getHmac: (NSString *)index
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
@end
