import NfcCardModuleWrapper from '../NfcCardModuleWrapper';


/**
 * Test the validity of CardResponses created by methods of NfcCardModuleWrapper
 * (part of methods related to card keychain functionality)
 **/

jest.mock('react-native', () => {
    return {
      NativeModules: {
        NfcCardModule: {
          resetKeyChain: jest.fn( () => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
          }),


          getOccupiedStorageSize: jest.fn( () => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"20\", \"status\":\"ok\"}");
              })
          }),

          getFreeStorageSize: jest.fn( () => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"20\", \"status\":\"ok\"}");
              })
          }),

          getKeyFromKeyChain: jest.fn( (_keyHmac: string) => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"1111\", \"status\":\"ok\"}");
              })
          }),

          getKeyChainInfo: jest.fn( () => {
              return new Promise((resolve, _reject) => {
                resolve("{\"numberOfKeys\":1,\"occupiedSize\":1,\"freeSize\":32767,\"status\":\"ok\"}");
              })
          }),

          getNumberOfKeys: jest.fn( () => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"20\", \"status\":\"ok\"}");
              })
          }),


          addKeyIntoKeyChain: jest.fn( (_newKey: string) => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"D31D1D600F8E5B5951275B9C6DED079011FD852ABB62C14A2EECA2E6924452C\", \"status\":\"ok\"}");
              })
          }),
          
          deleteKeyFromKeyChain: jest.fn( (_keyHmac: string) => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"done\", \"status\":\"ok\"}");
              })
          }),

          finishDeleteKeyFromKeyChainAfterInterruption: jest.fn( () => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"done\", \"status\":\"ok\"}");
              })
          }), 

          changeKeyInKeyChain: jest.fn( (_newKey: string,
              _oldKeyHmac: string) => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"A31D1D600F8E5B5951275B9C6DED079011FD852ABB62C14A2EECA2E6924452C\", \"status\":\"ok\"}");
              })
          }),

          checkAvailableVolForNewKey: jest.fn( (_keySize: number) => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"done\", \"status\":\"ok\"}");
              })
          }),

          checkKeyHmacConsistency: jest.fn( (_keyHmac: string) => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"done\", \"status\":\"ok\"}");
              })
          }),

          getHmac: jest.fn( (_index: string) => {
              return new Promise((resolve, _reject) => {
                resolve("{\"hmac\":\"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF\",\"length\":32,\"status\":\"ok\"}");
              })
          }),

          getDeleteKeyRecordNumOfPackets: jest.fn( () => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"2\", \"status\":\"ok\"}");
              })
          }),

          getDeleteKeyChunkNumOfPackets: jest.fn( () => {
              return new Promise((resolve, _reject) => {
                resolve("{\"message\":\"2\", \"status\":\"ok\"}");
              })
          }),
        } 
      },
      Platform: {
        OS: "android"
      }
    };
  });

  //Todo: skipped getIndexAndLenOfKeyInKeyChain and getKeyChainDataAboutAllKeys for now

  /**
   * getDeleteKeyChunkNumOfPackets
   */

  test('Positive test getDeleteKeyChunkNumOfPackets', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getDeleteKeyChunkNumOfPackets().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("2");
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
   * getDeleteKeyRecordNumOfPackets
   */



  test('Positive test getDeleteKeyRecordNumOfPackets', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getDeleteKeyRecordNumOfPackets().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("2");
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
   * getHmac
   */

  test('Positive test getHmac', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getHmac("1").then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("");
      expect(cardRsponse.status).toBe("ok");
      expect(cardRsponse.ecsHash).toBe("");
      expect(cardRsponse.epHash).toBe("");
      expect(cardRsponse.freeSize).toBe(-1);
      expect(cardRsponse.hmac).toBe("EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF");
      expect(cardRsponse.length).toBe(32);
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
   * checkKeyHmacConsistency
   */


  test('Positive test checkKeyHmacConsistency', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.checkKeyHmacConsistency("A31D1D600F8E5B5951275B9C6DED079011FD852ABB62C14A2EECA2E6924452C").then(cardRsponse => {
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
   * checkAvailableVolForNewKey
   */
    
      test('Positive test checkAvailableVolForNewKey', () => {
        let nfcCardModuleWrapper = new NfcCardModuleWrapper();
        return nfcCardModuleWrapper.checkAvailableVolForNewKey(100).then(cardRsponse => {
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
   * changeKeyInKeyChain
   */

  test('Positive test changeKeyInKeyChain', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.changeKeyInKeyChain("1111", "D7E0DFB66A2F72AAD7D66D897C805D307EE1F1CB8077D3B8CF1A942D6A5AC2FF").then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("A31D1D600F8E5B5951275B9C6DED079011FD852ABB62C14A2EECA2E6924452C");
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
   * finishDeleteKeyFromKeyChainAfterInterruption
   */

  test('Positive test finishDeleteKeyFromKeyChainAfterInterruption', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.finishDeleteKeyFromKeyChainAfterInterruption().then(cardRsponse => {
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
   * deleteKeyFromKeyChain
   */

  test('Positive test deleteKeyFromKeyChain', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.deleteKeyFromKeyChain("D7E0DFB66A2F72AAD7D66D897C805D307EE1F1CB8077D3B8CF1A942D6A5AC2FF").then(cardRsponse => {
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
   * addKeyIntoKeyChain
   */

  test('Positive test addKeyIntoKeyChain', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.addKeyIntoKeyChain("3333").then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("D31D1D600F8E5B5951275B9C6DED079011FD852ABB62C14A2EECA2E6924452C");
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
   * getKeyFromKeyChain
   */

  test('Positive test getKeyFromKeyChain', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getKeyFromKeyChain("D7E0DFB66A2F72AAD7D66D897C805D307EE1F1CB8077D3B8CF1A942D6A5AC2FF").then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("1111");
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
   * getFreeStorageSize
   */

  test('Positive test getFreeStorageSize', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getFreeStorageSize().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("20");
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
   * getOccupiedStorageSize
   */

  test('Positive test getOccupiedStorageSize', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getOccupiedStorageSize().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("20");
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
   * getNumberOfKeys
   */

  test('Positive test getNumberOfKeys', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getNumberOfKeys().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("20");
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
   * getKeyChainInfo
   */

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