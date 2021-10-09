import NfcCardModuleWrapper from '../NfcCardModuleWrapper';

/**
 * Test the validity of CardResponses created by methods of NfcCardModuleWrapper
 * (part of methods related to CoinManager functionality)
 **/

jest.mock('react-native', () => {
    return {
      NativeModules: {
        NfcCardModule: {
          setDeviceLabel: jest.fn( (_label: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
          }),
      
  
          getDeviceLabel: jest.fn( () => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"2222\", \"status\":\"ok\"}");
              })
            }),

          getCsn: jest.fn( () => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"222236565555777888\", \"status\":\"ok\"}");
            })
          }),

          getMaxPinTries: jest.fn( () => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"10\", \"status\":\"ok\"}");
              })
          }),

          getSeVersion: jest.fn( () => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"1008\", \"status\":\"ok\"}");
              })
          }),

          getRemainingPinTries: jest.fn( () => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"10\", \"status\":\"ok\"}");
              })
          }),

          getRootKeyStatus: jest.fn( () => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"generated\", \"status\":\"ok\"}");
              })
          }),

          getAppsList: jest.fn( () => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"313132323333343435353636\", \"status\":\"ok\"}");
              })
          }),

          generateSeed: jest.fn( (_pin: string) => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"done\", \"status\":\"ok\"}");
              })
          }),

          resetWallet: jest.fn( (_pin: string) => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"done\", \"status\":\"ok\"}");
              })
          }),

          changePin: jest.fn( (_oldPin: string, _newPin: string) => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"done\", \"status\":\"ok\"}");
              })
          }),

          getAvailableMemory: jest.fn( () => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"ffff0000\", \"status\":\"ok\"}");
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
   * changePin
   */


  test('Positive test changePin', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.changePin("5555", "6666").then(cardRsponse => {
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
   * resetWallet
   */


  test('Positive test resetWallet', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.resetWallet().then(cardRsponse => {
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
   * generateSeed
   */


  test('Positive test generateSeed', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    let pin = "5555";
    return nfcCardModuleWrapper.generateSeed(pin).then(cardRsponse => {
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
   * getAppsList
   */


  test('Positive test getAppsList', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getAppsList().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("313132323333343435353636");
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
   * getAvailableMemory
   */


  test('Positive test getAvailableMemory', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getAvailableMemory().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("ffff0000");
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
   * getRootKeyStatus
   */


  test('Positive test getRootKeyStatus', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getRootKeyStatus().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("generated");
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
   * getRemainingPinTries
   */


  test('Positive test getRemainingPinTries', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getRemainingPinTries().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("10");
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
   * setDeviceLabel
   */


  test('Positive test setDeviceLabel', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    let label = "7777";
    return nfcCardModuleWrapper.setDeviceLabel(label).then(cardRsponse => {
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
   *  getDeviceLabel
   */
  

  test('Positive test getDeviceLabel', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getDeviceLabel().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("2222");
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
   * getSeVersion
   */

  test('Positive test getSeVersion', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getSeVersion().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("1008");
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
   * getMaxPinTries
   */ 



  test('Positive test getMaxPinTries', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getMaxPinTries().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("10");
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
   * getCsn
   */


  test('Positive test getCsn', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getCsn().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("222236565555777888");
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