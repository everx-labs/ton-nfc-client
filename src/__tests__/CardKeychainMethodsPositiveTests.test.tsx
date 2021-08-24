import NfcCardModuleWrapper from '../NfcCardModuleWrapper';
import CardResponse from '../CardResponse';
import CardError from '../CardError';
import NfcNativeModuleError from '../NfcNativeModuleError';
import React from 'react';
import { NativeModules} from 'react-native'

jest.mock('react-native', () => {
    return {
      NativeModules: {
        resetKeyChain: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
          }),
        resetKeyChainWithoutDialog: jest.fn( () => {
              return new Promise((resolve, reject) => {
                resolve("{\"message\":\"done\", \"status\":\"ok\"}");
              })
        }), 
        
        getKeyChainInfo: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"numberOfKeys\":1,\"occupiedSize\":1,\"freeSize\":32767,\"status\":\"ok\"}");
            })
          }),
        getKeyChainInfoWithoutDialog: jest.fn( () => {
              return new Promise((resolve, reject) => {
                resolve("{\"numberOfKeys\":1,\"occupiedSize\":1,\"freeSize\":32767,\"status\":\"ok\"}");
              })
        }), 
      },
      Platform: {
        OS: "android"
      }
    };
  });

  /**
   * getKeyChainInfo
   */

   test('Positive test getKeyChainInfoWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getKeyChainInfoWithoutDialog().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("");
      expect(cardRsponse.status).toBe("ok");
      expect(cardRsponse.ecsHash).toBe("");
      expect(cardRsponse.epHash).toBe("");
      expect(cardRsponse.freeSize).toBe(32767);
      expect(cardRsponse.hmac).toBe("");
      expect(cardRsponse.length).toBe(-1);
      expect(cardRsponse.numberOfKeys).toBe(1);
      expect(cardRsponse.occupiedSize).toBe(1);
      expect(cardRsponse.sn).toBe("");
      expect(cardRsponse.serialNumbers.length).toBe(0);
    })
    .catch(error => {
      console.log(error.message);
      expect(true).toBe(false);
    }); 
  });

  test('Positive test getKeyChainInfo', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getKeyChainInfo().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("");
      expect(cardRsponse.status).toBe("ok");
      expect(cardRsponse.ecsHash).toBe("");
      expect(cardRsponse.epHash).toBe("");
      expect(cardRsponse.freeSize).toBe(32767);
      expect(cardRsponse.hmac).toBe("");
      expect(cardRsponse.length).toBe(-1);
      expect(cardRsponse.numberOfKeys).toBe(1);
      expect(cardRsponse.occupiedSize).toBe(1);
      expect(cardRsponse.sn).toBe("");
      expect(cardRsponse.serialNumbers.length).toBe(0);
    })
    .catch(error => {
      console.log(error.message);
      expect(true).toBe(false);
    }); 
  });

  


  /**
   * resetKeyChain
   */

   test('Positive test resetKeyChainWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.resetKeyChainWithoutDialog().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("done");
      expect(cardRsponse.status).toBe("ok");
      expect(cardRsponse.ecsHash).toBe("");
      expect(cardRsponse.epHash).toBe("");
      expect(cardRsponse.freeSize).toBe(-1);
      expect(cardRsponse.hmac).toBe("");
      expect(cardRsponse.length).toBe(-1);
      expect(cardRsponse.numberOfKeys).toBe(-1);
      expect(cardRsponse.occupiedSize).toBe(-1);
      expect(cardRsponse.sn).toBe("");
      expect(cardRsponse.serialNumbers.length).toBe(0);
    })
    .catch(error => {
      console.log(error.message);
      expect(true).toBe(false);
    }); 
  });

  test('Positive test resetKeyChain', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.resetKeyChain().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("done");
      expect(cardRsponse.status).toBe("ok");
      expect(cardRsponse.ecsHash).toBe("");
      expect(cardRsponse.epHash).toBe("");
      expect(cardRsponse.freeSize).toBe(-1);
      expect(cardRsponse.hmac).toBe("");
      expect(cardRsponse.length).toBe(-1);
      expect(cardRsponse.numberOfKeys).toBe(-1);
      expect(cardRsponse.occupiedSize).toBe(-1);
      expect(cardRsponse.sn).toBe("");
      expect(cardRsponse.serialNumbers.length).toBe(0);
    })
    .catch(error => {
      console.log(error.message);
      expect(true).toBe(false);
    }); 
  });