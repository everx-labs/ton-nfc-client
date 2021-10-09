import NfcCardModuleWrapper from '../NfcCardModuleWrapper';

/**
 * Test the validity of CardResponses created by methods of NfcCardModuleWrapper
 * (part of methods related to recovery service functionality)
 **/

jest.mock('react-native', () => {
    return {
      NativeModules: {
        NfcCardModule: {
          isRecoveryDataSet: jest.fn( (_recoveryData: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"true\", \"status\":\"ok\"}");
            })
          }),
          resetRecoveryData: jest.fn( (_recoveryData: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
          }),
          getRecoveryDataHash: jest.fn( (_recoveryData: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
            })
          }),
          getRecoveryDataLen: jest.fn( (_recoveryData: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"7\", \"status\":\"ok\"}");
            })
          }),
          addRecoveryData: jest.fn( (_recoveryData: string) => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"done\", \"status\":\"ok\"}");
              })
            }),
          getRecoveryData: jest.fn( () => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"00112233445566\", \"status\":\"ok\"}");
              })
            }),
        }       
      },
      Platform: {
        OS: "android"
      }
    };
  });


  /**
   * getRecoveryData
   */

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