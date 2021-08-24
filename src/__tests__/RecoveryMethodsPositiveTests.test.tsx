import NfcCardModuleWrapper from '../NfcCardModuleWrapper';
import CardResponse from '../CardResponse';
import CardError from '../CardError';
import NfcNativeModuleError from '../NfcNativeModuleError';
import React from 'react';
import { NativeModules} from 'react-native'

jest.mock('react-native', () => {
    return {
      NativeModules: {
        isRecoveryDataSet: jest.fn( (recoveryData: string) => {
          return new Promise((resolve, reject) => {
            resolve("{\"message\":\"true\", \"status\":\"ok\"}");
          })
        }),
        isRecoveryDataSetWithoutDialog: jest.fn( (recoveryData: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"true\", \"status\":\"ok\"}");
            })
        }), 
        resetRecoveryData: jest.fn( (recoveryData: string) => {
          return new Promise((resolve, reject) => {
            resolve("{\"message\":\"done\", \"status\":\"ok\"}");
          })
        }),
        resetRecoveryDataWithoutDialog: jest.fn( (recoveryData: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
        }), 
        getRecoveryDataHash: jest.fn( (recoveryData: string) => {
          return new Promise((resolve, reject) => {
            resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
          })
        }),
        getRecoveryDataHashWithoutDialog: jest.fn( (recoveryData: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
            })
        }), 
        getRecoveryDataLen: jest.fn( (recoveryData: string) => {
          return new Promise((resolve, reject) => {
            resolve("{\"message\":\"7\", \"status\":\"ok\"}");
          })
        }),
        getRecoveryDataLenWithoutDialog: jest.fn( (recoveryData: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"7\", \"status\":\"ok\"}");
            })
        }), 
        addRecoveryData: jest.fn( (recoveryData: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
          }),
        addRecoveryDataWithoutDialog: jest.fn( (recoveryData: string) => {
              return new Promise((resolve, reject) => {
                resolve("{\"message\":\"done\", \"status\":\"ok\"}");
              })
        }), 
        getRecoveryData: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"00112233445566\", \"status\":\"ok\"}");
            })
          }),
        getRecoveryDataWithoutDialog: jest.fn( () => {
              return new Promise((resolve, reject) => {
                resolve("{\"message\":\"00112233445566\", \"status\":\"ok\"}");
              })
        }),  
      },
      Platform: {
        OS: "android"
      }
    };
  });


  /**
   * getRecoveryData
   */

   test('Positive test getRecoveryDataWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getRecoveryDataWithoutDialog().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("00112233445566");
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

  test('Positive test getRecoveryData', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getRecoveryData().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("00112233445566");
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
   * addRecoveryData
   */

   test('Positive test addRecoveryDataWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.addRecoveryDataWithoutDialog("55556666").then(cardRsponse => {
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

  test('Positive test addRecoveryData', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.addRecoveryData("55556666").then(cardRsponse => {
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

  /**
   * getRecoveryDataLen
   */

   test('Positive test getRecoveryDataLenWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getRecoveryDataLenWithoutDialog().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("7");
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

  test('Positive test getRecoveryDataLen', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getRecoveryDataLen().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("7");
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
   * getRecoveryDataHash
   */

   test('Positive test getRecoveryDataHashWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getRecoveryDataHashWithoutDialog().then(cardRsponse => {
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

  test('Positive test getRecoveryDataHash', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getRecoveryDataHash().then(cardRsponse => {
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
   * resetRecoveryData
   */

   test('Positive test resetRecoveryDataWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.resetRecoveryDataWithoutDialog().then(cardRsponse => {
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

  test('Positive test resetRecoveryData', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.resetRecoveryData().then(cardRsponse => {
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


  /**
   * isRecoveryDataSet
   */

   test('Positive test isRecoveryDataSetWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.isRecoveryDataSetWithoutDialog().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("true");
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

  test('Positive test isRecoveryDataSet', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.isRecoveryDataSet().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("true");
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