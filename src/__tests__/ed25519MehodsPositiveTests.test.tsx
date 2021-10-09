import NfcCardModuleWrapper from '../NfcCardModuleWrapper';

 /* Test the validity of CardResponses created by methods of NfcCardModuleWrapper
 * (part of methods related to ed25519 functionality)
 **/


  jest.mock('react-native', () => {
    return {
      NativeModules: {

        NfcCardModule: {
          verifyPin: jest.fn( (_pin: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
          }),

        getPublicKeyForDefaultPath: jest.fn( () => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
            })
          }), 

        getPublicKey: jest.fn( (_hdIndex: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
            })
          }), 

        checkSerialNumberAndGetPublicKey: jest.fn( (_serialNumber: string, _hdIndex: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
            })
        }),

        checkSerialNumberAndGetPublicKeyForDefaultPath: jest.fn( (_serialNumber: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
            })
        }),

        signForDefaultHdPath: jest.fn( (_dataForSigning: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
          }), 

        sign: jest.fn( (_dataForSigning: string, _hdIndex: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
          }), 
        
        verifyPinAndSignForDefaultHdPath: jest.fn( ( _dataForSigning: string, _pin: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),

        verifyPinAndSign: jest.fn( ( _dataForSigning: string,
            _hdIndex: string,
            _pin: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),

        checkSerialNumberAndSignForDefaultHdPath: jest.fn( (_serialNumber: string, _dataForSigning: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),

        checkSerialNumberAndSign: jest.fn( (_serialNumber: string, _dataForSigning: string, _hdIndex: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),

        checkSerialNumberAndVerifyPinAndSignForDefaultHdPath: jest.fn( (_serialNumber: string,
            _dataForSigning: string,
            _pin: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),

        checkSerialNumberAndVerifyPinAndSign: jest.fn( (_serialNumber: string,
            _dataForSigning: string,
            _hdIndex: string,
            _pin: string) => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
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
   * checkSerialNumberAndVerifyPinAndSign
   */



test('Positive test checkSerialNumberAndVerifyPinAndSign', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.checkSerialNumberAndVerifyPinAndSign("50439480243390112681323", "1111","1", "5555").then(cardRsponse => {
    console.log(cardRsponse.message);
    expect(cardRsponse.message).toBe("2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605");
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
 * checkSerialNumberAndVerifyPinAndSignForDefaultHdPath
 */



test('Positive test checkSerialNumberAndVerifyPinAndSignForDefaultHdPath', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.checkSerialNumberAndVerifyPinAndSignForDefaultHdPath("50439480243390112681323", "1111", "5555").then(cardRsponse => {
    console.log(cardRsponse.message);
    expect(cardRsponse.message).toBe("2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605");
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
 * checkSerialNumberAndSign
 */

test('Positive test checkSerialNumberAndSign', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.checkSerialNumberAndSign("50439480243390112681323", "1111", "1").then(cardRsponse => {
    console.log(cardRsponse.message);
    expect(cardRsponse.message).toBe("2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605");
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
 * checkSerialNumberAndSignForDefaultHdPath
 */


test('Positive test checkSerialNumberAndSignForDefaultHdPath', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.checkSerialNumberAndSignForDefaultHdPath("50439480243390112681323", "1111").then(cardRsponse => {
    console.log(cardRsponse.message);
    expect(cardRsponse.message).toBe("2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605");
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
 * verifyPinAndSignForDefaultHdPath
 */

test('Positive test verifyPinAndSignForDefaultHdPath', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.verifyPinAndSignForDefaultHdPath("1111", "5555").then(cardRsponse => {
    console.log(cardRsponse.message);
    expect(cardRsponse.message).toBe("2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605");
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
 * sign
 */

test('Positive test sign', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.sign("1111", "1").then(cardRsponse => {
    console.log(cardRsponse.message);
    expect(cardRsponse.message).toBe("2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605");
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
 * signForDefaultHdPath
 */

test('Positive test signForDefaultHdPath', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.signForDefaultHdPath("1111").then(cardRsponse => {
    console.log(cardRsponse.message);
    expect(cardRsponse.message).toBe("2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605");
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
 * checkSerialNumberAndGetPublicKeyForDefaultPath
 */

test('Positive test checkSerialNumberAndGetPublicKey', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.checkSerialNumberAndGetPublicKey("50439480243390112681323", "2").then(cardRsponse => {
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
 * checkSerialNumberAndGetPublicKey
 */

test('Positive test checkSerialNumberAndGetPublicKey', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.checkSerialNumberAndGetPublicKey("50439480243390112681323", "2").then(cardRsponse => {
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
 * getPublicKey
 */

test('Positive test getPublicKey', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.getPublicKey("2").then(cardRsponse => {
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
 * getPublicKeyForDefaultPath
 */

test('Positive test getPublicKeyForDefaultPath', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.getPublicKeyForDefaultPath().then(cardRsponse => {
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
 * verifyPin
 */

test('Positive test verifyPin', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.verifyPin("5555").then(cardRsponse => {
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
  