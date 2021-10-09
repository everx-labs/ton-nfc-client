import NfcCardModuleWrapper from '../NfcCardModuleWrapper';

/**
 * Test the validity of CardResponses created by methods of NfcCardModuleWrapper
 * (part of methods related to HMAC-SHA256 keys maintaining functionality)
 **/

jest.mock('react-native', () => {
    return {
      NativeModules: {
        NfcCardModule: {
          selectKeyForHmac: jest.fn( (_serialNumber: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
          }),
          getCurrentSerialNumber: jest.fn( () => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"504394802433901126813236\", \"status\":\"ok\"}");
              })
          }),
          createKeyForHmac: jest.fn( (_authenticationPassword: string,
              _commonSecret: string,
              _serialNumber: string) => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"done\", \"status\":\"ok\"}");
              })
          }),
          deleteKeyForHmac: jest.fn( (_serialNumber: string) => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"done\", \"status\":\"ok\"}");
              })
          }),
          isKeyForHmacExist: jest.fn( (_serialNumber: string) => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"true\", \"status\":\"ok\"}");
              })
          }),
          getAllSerialNumbers: jest.fn().mockReturnValueOnce(new Promise((resolve, _reject) => {
              resolve("{\"message\":[\"504394802433901126813236\", \"455324585319848551839771\"], \"status\":\"ok\"}");
            }))
            .mockReturnValue(new Promise((resolve, _reject) => {
              resolve("{\"message\":\"HMAC-SHA256 keys are not found.\", \"status\":\"ok\"}");
            }))
        }   
      },
      Platform: {
        OS: "android"
      }
    };
  });

  /**
   * getAllSerialNumbers
   */

   test('Positive test getAllSerialNumbers', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getAllSerialNumbers().then(cardRsponse => {
      console.log(cardRsponse.serialNumbers.length);
      expect(cardRsponse.message).toBe("");
      expect(cardRsponse.status).toBe("ok");
      expect(cardRsponse.ecsHash).toBe("");
      expect(cardRsponse.epHash).toBe("");
      expect(cardRsponse.freeSize).toBe(-1);
      expect(cardRsponse.hmac).toBe("");
      expect(cardRsponse.length).toBe(-1);
      expect(cardRsponse.numberOfKeys).toBe(-1);
      expect(cardRsponse.occupiedSize).toBe(-1);
      expect(cardRsponse.sn).toBe("");
      expect(cardRsponse.serialNumbers.length).toBe(2);
      expect(cardRsponse.serialNumbers[0]).toBe("504394802433901126813236");
      expect(cardRsponse.serialNumbers[1]).toBe("455324585319848551839771");
    })
    .catch(error => {
      console.log(error.message);
      expect(true).toBe(false);
    }); 
  });

  test('Positive test getAllSerialNumbers', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getAllSerialNumbers().then(cardRsponse => {
      console.log(cardRsponse.serialNumbers.length);
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("HMAC-SHA256 keys are not found.");
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
   * isKeyForHmacExist
   */

   test('Positive test isKeyForHmacExist', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.isKeyForHmacExist("504394802433901126813236").then(cardRsponse => {
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

  /**
   * deleteKeyForHmac
   */

   test('Positive test deleteKeyForHmac', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.deleteKeyForHmac("504394802433901126813236").then(cardRsponse => {
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
   * createKeyForHmac
   */

   test('Positive test createKeyForHmac', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    let p1 = "1A2B1ABC9E7FB7746E34F8D8CA415025257369010A082FE2F823BFAF8DF4C1ABC0C9B160358F55AF918878EB1F959EBE684F2835B868E742F10BF9D2A8DD7FA3F255A9BC1701DBBD551C6E221E06C570F3F3BE7C5A77C97F83485252FE89F91961EAF239DCBB4EF40BD87CA83815F60C7AC0A67C62484CBACE235CEB6ACCEEFE";
    let cs = "158BDE7FD53048BFF95E85947BBC08A1F4EF1A158F5975B0D7065CFB41F122C0";
    let sn = "504394802433901126813236";
    return nfcCardModuleWrapper.createKeyForHmac(p1, cs, sn).then(cardRsponse => {
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
   * selectKeyForHmac
   */

   test('Positive test selectKeyForHmac', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.selectKeyForHmac("504394802433901126813236").then(cardRsponse => {
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
   * getCurrentSerialNumber
   */

   test('Positive test getCurrentSerialNumber', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getCurrentSerialNumber().then(cardRsponse => {
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

 