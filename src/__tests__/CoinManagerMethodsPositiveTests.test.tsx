import NfcCardModuleWrapper from '../NfcCardModuleWrapper';
import CardResponse from '../CardResponse';
import CardError from '../CardError';
import NfcNativeModuleError from '../NfcNativeModuleError';
import React from 'react';
import { NativeModules} from 'react-native'

jest.mock('react-native', () => {
    return {
      NativeModules: {
        setDeviceLabel: jest.fn( (label: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
          }),
        setDeviceLabelWithoutDialog: jest.fn( (label: string) => {
              return new Promise((resolve, reject) => {
                resolve("{\"message\":\"done\", \"status\":\"ok\"}");
              })
        }), 
        getDeviceLabel: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2222\", \"status\":\"ok\"}");
            })
          }),
        getDeviceLabelWithoutDialog: jest.fn( () => {
              return new Promise((resolve, reject) => {
                resolve("{\"message\":\"2222\", \"status\":\"ok\"}");
              })
        }),  
        getCsn: jest.fn( () => {
          return new Promise((resolve, reject) => {
            resolve("{\"message\":\"222236565555777888\", \"status\":\"ok\"}");
          })
        }),
        getCsnWithoutDialog: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"222236565555777888\", \"status\":\"ok\"}");
            })
        }),
        getMaxPinTries: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"10\", \"status\":\"ok\"}");
            })
        }),
        getMaxPinTriesWithoutDialog: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"10\", \"status\":\"ok\"}");
            })
        }),
        getSeVersion: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"1008\", \"status\":\"ok\"}");
            })
        }),
        getSeVersionWithoutDialog: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"1008\", \"status\":\"ok\"}");
            })
        }),
        getRemainingPinTries: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"10\", \"status\":\"ok\"}");
            })
        }),
        getRemainingPinTriesWithoutDialog: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"10\", \"status\":\"ok\"}");
            })
        }),
        getRootKeyStatus: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"generated\", \"status\":\"ok\"}");
            })
        }),
        getRootKeyStatusWithoutDialog: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"generated\", \"status\":\"ok\"}");
            })
        }),
        getAppsList: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"313132323333343435353636\", \"status\":\"ok\"}");
            })
        }),
        getAppsListWithoutDialog: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"313132323333343435353636\", \"status\":\"ok\"}");
            })
        }),
        generateSeed: jest.fn( (pin: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
        }),
        generateSeedWithoutDialog: jest.fn( (pin: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
        }),
        resetWallet: jest.fn( (pin: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
        }),
        resetWalletWithoutDialog: jest.fn( (pin: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
        }),
        changePin: jest.fn( (oldPin: string, newPin: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
        }),
        changePinWithoutDialog: jest.fn( (oldPin: string, newPin: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
        }),
        getAvailableMemory: jest.fn( () => {
          return new Promise((resolve, reject) => {
            resolve("{\"message\":\"ffff0000\", \"status\":\"ok\"}");
          })
        }),
        getAvailableMemoryWithoutDialog: jest.fn( () => {
          return new Promise((resolve, reject) => {
            resolve("{\"message\":\"ffff0000\", \"status\":\"ok\"}");
          })
        }),
      },
      Platform: {
        OS: "android"
      }
    };
  });

  /**
   * changePin
   */

   test('Positive test changePinWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.changePinWithoutDialog("5555", "6666").then(cardRsponse => {
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

   test('Positive test resetWalletWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.resetWalletWithoutDialog().then(cardRsponse => {
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

   test('Positive test generateSeedWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    let pin = "5555";
    return nfcCardModuleWrapper.generateSeedWithoutDialog(pin).then(cardRsponse => {
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

   test('Positive test getAppsListWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getAppsListWithoutDialog().then(cardRsponse => {
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

   test('Positive test getAvailableMemoryWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getAvailableMemoryWithoutDialog().then(cardRsponse => {
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

   test('Positive test getRootKeyStatusWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getRootKeyStatusWithoutDialog().then(cardRsponse => {
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

   test('Positive test getRemainingPinTriesWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getRemainingPinTriesWithoutDialog().then(cardRsponse => {
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

   test('Positive test setDeviceLabelDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    let label = "7777";
    return nfcCardModuleWrapper.setDeviceLabelWithoutDialog(label).then(cardRsponse => {
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
  
   test('Positive test getDeviceLabelDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getDeviceLabelWithoutDialog().then(cardRsponse => {
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
  test('Positive test getSeVersionWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getSeVersionWithoutDialog().then(cardRsponse => {
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

  test('Positive test getMaxPinTriesWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getMaxPinTriesWithoutDialog().then(cardRsponse => {
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
  test('Positive test getCsnWithoutDialog', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getCsnWithoutDialog().then(cardRsponse => {
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