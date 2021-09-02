import NfcCardModuleWrapper from '../NfcCardModuleWrapper';
import CardResponse from '../CardResponse';
import CardError from '../CardError';
import NfcNativeModuleError from '../NfcNativeModuleError';
import React from 'react';
import { NativeModules} from 'react-native'

jest.mock('react-native', () => {
    return {
      NativeModules: {
        getTonAppletState: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"TonWalletApplet waits two-factor authentication.\", \"status\":\"ok\"}");
            })
          }), 
        getTonAppletStateWithoutDialog: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"TonWalletApplet waits two-factor authentication.\", \"status\":\"ok\"}");
            })
          }),    
        getSerialNumber: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"504394802433901126813236\", \"status\":\"ok\"}");
            })
          }), 
        getSerialNumberWithoutDialog: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"504394802433901126813236\", \"status\":\"ok\"}");
            })
          }),    
        getSault: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
            })
          }),
        getSaultWithoutDialog: jest.fn( () => {
              return new Promise((resolve, reject) => {
                resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
           })

           
        }),  
      },
      Platform: {
        OS: "android"
      }
    };
  });

  /**
   * getTonAppletState
   */

   test('Positive test getTonAppletStateWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getTonAppletStateWithoutDialog().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("TonWalletApplet waits two-factor authentication.");
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

  test('Positive test getTonAppletState', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getTonAppletState().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("TonWalletApplet waits two-factor authentication.");
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

  /**
   * getSault
   */

   test('Positive test getSault', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getSault().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A");
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

  test('Positive test getSaultWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getSaultWithoutDialog().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A");
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


  /**
   * getSerialNumber
   */

   test('Positive test getSerialNumberWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getSerialNumberWithoutDialog().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("504394802433901126813236");
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

  test('Positive test getSerialNumber', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getSerialNumber().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("504394802433901126813236");
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