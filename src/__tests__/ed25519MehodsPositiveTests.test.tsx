import NfcCardModuleWrapper from '../NfcCardModuleWrapper';
import {ERR_JSON_MUST_HAVE_MSG_FIELD, 
  ERR_JSON_MUST_HAVE_STATUS_FIELD, 
  ERR_JSON_MUST_HAVE_CODE_FIELD, 
  ERR_JSON_MUST_HAVE_TYPE_FIELD, 
  ERR_JSON_MUST_HAVE_TYPE_ID_FIELD,
  ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL} from '../NfcCardModuleWrapper'
/**
 * Test the validity of CardResponses created by methods of NfcCardModuleWrapper
 * (part of methods related to ed25519 functionality)
 **/


  jest.mock('react-native', () => {
    return {
      NativeModules: {

        NfcCardModule: {
          verifyPin: jest.fn( (pin: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
          }),

          verifyPinWithoutDialog: jest.fn( (pin: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"done\", \"status\":\"ok\"}");
            })
          }),

        getPublicKeyForDefaultPath: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
            })
          }), 
        getPublicKeyForDefaultPathWithoutDialog: jest.fn( () => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
            })
        }), 
        
        getPublicKey: jest.fn( (hdIndex: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
            })
          }), 
        getPublicKeyWithoutDialog: jest.fn( (hdIndex: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
            })
        }), 
        
        checkSerialNumberAndGetPublicKey: jest.fn( (serialNumber: string, hdIndex: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
            })
        }),

        checkSerialNumberAndGetPublicKeyWithoutDialog: jest.fn( (serialNumber: string, hdIndex: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
            })
        }),

        checkSerialNumberAndGetPublicKeyForDefaultPath: jest.fn( (serialNumber: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
            })
        }),

        checkSerialNumberAndGetPublicKeyForDefaultPathWithoutDialog: jest.fn( (serialNumber: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"B81F0E0E07316DAB6C320ECC6BF3DBA48A70101C5251CC31B1D8F831B36E9F2A\", \"status\":\"ok\"}");
            })
        }),

        signForDefaultHdPath: jest.fn( (dataForSigning: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
          }), 
        signForDefaultHdPathWithoutDialog: jest.fn( (dataForSigning: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }), 

        sign: jest.fn( (dataForSigning: string, hdIndex: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
          }), 
        signWithoutDialog: jest.fn( (dataForSigning: string, hdIndex: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),
        
        verifyPinAndSignForDefaultHdPath: jest.fn( ( dataForSigning: string, pin: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),
        verifyPinAndSignForDefaultHdPathWithoutDialog: jest.fn( (dataForSigning: string, pin: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),

        verifyPinAndSign: jest.fn( ( dataForSigning: string,
            hdIndex: string,
            pin: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),
        verifyPinAndSignWithoutDialog: jest.fn( (dataForSigning: string,
            hdIndex: string,
            pin: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),

        checkSerialNumberAndSignForDefaultHdPath: jest.fn( (serialNumber: string, dataForSigning: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),
        checkSerialNumberAndSignForDefaultHdPathWithoutDialog: jest.fn( (serialNumber: string, dataForSigning: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),

        checkSerialNumberAndSign: jest.fn( (serialNumber: string, dataForSigning: string, hdIndex: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),
        checkSerialNumberAndSignWithoutDialog: jest.fn( (serialNumber: string, dataForSigning: string, hdIndex: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),

        checkSerialNumberAndVerifyPinAndSignForDefaultHdPath: jest.fn( (serialNumber: string,
            dataForSigning: string,
            pin: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),
        checkSerialNumberAndVerifyPinAndSignForDefaultHdPathWithoutDialog: jest.fn( (serialNumber: string,
            dataForSigning: string,
            pin: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),


        checkSerialNumberAndVerifyPinAndSign: jest.fn( (serialNumber: string,
            dataForSigning: string,
            hdIndex: string,
            pin: string) => {
            return new Promise((resolve, reject) => {
              resolve("{\"message\":\"2D6A2749DD5AF5BB356220BFA06A0C624D5814438F37983322BBAD762EFB4759CFA927E6735B7CD556196894F3CE077ADDD6B49447B8B325ADC494B82DC8B605\", \"status\":\"ok\"}");
            })
        }),
        checkSerialNumberAndVerifyPinAndSignWithoutDialog: jest.fn( (serialNumber: string,
            dataForSigning: string,
            hdIndex: string,
            pin: string) => {
            return new Promise((resolve, reject) => {
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

 test('Positive test checkSerialNumberAndVerifyPinAndSignWithoutDialog', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.checkSerialNumberAndVerifyPinAndSignWithoutDialog("50439480243390112681323", "1111", "1", "5555").then(cardRsponse => {
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

test('Positive test checkSerialNumberAndVerifyPinAndSignForDefaultHdPathWithoutDialog', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.checkSerialNumberAndVerifyPinAndSignForDefaultHdPathWithoutDialog("50439480243390112681323", "1111", "5555").then(cardRsponse => {
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

 test('Positive test checkSerialNumberAndSignWithoutDialog', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.checkSerialNumberAndSignWithoutDialog("50439480243390112681323", "1111", "1").then(cardRsponse => {
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

 test('Positive test checkSerialNumberAndSignForDefaultHdPathWithoutDialog', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.checkSerialNumberAndSignForDefaultHdPathWithoutDialog("50439480243390112681323", "1111").then(cardRsponse => {
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

 test('Positive test verifyPinAndSignForDefaultHdPathWithoutDialog', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.verifyPinAndSignForDefaultHdPathWithoutDialog("1111", "5555").then(cardRsponse => {
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

 test('Positive test signWithoutDialog', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.signWithoutDialog("1111", "1").then(cardRsponse => {
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

 test('Positive test signForDefaultHdPathWithoutDialog', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.signForDefaultHdPathWithoutDialog("1111").then(cardRsponse => {
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

 test('Positive test checkSerialNumberAndGetPublicKeyWithoutDialog', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.checkSerialNumberAndGetPublicKeyWithoutDialog("50439480243390112681323", "2").then(cardRsponse => {
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

 test('Positive test checkSerialNumberAndGetPublicKeyWithoutDialog', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.checkSerialNumberAndGetPublicKeyWithoutDialog("50439480243390112681323", "2").then(cardRsponse => {
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

 test('Positive test getPublicKeyWithoutDialog', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.getPublicKeyWithoutDialog("2").then(cardRsponse => {
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

 test('Positive test getPublicKeyForDefaultPathWithoutDialog', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.getPublicKeyForDefaultPathWithoutDialog().then(cardRsponse => {
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

 test('Positive test verifyPinWithoutDialog', () => {
  let nfcCardModuleWrapper = new NfcCardModuleWrapper();
  return nfcCardModuleWrapper.verifyPinWithoutDialog("5555").then(cardRsponse => {
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
  