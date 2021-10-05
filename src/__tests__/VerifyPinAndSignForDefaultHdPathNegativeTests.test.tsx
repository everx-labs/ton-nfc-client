import NfcCardModuleWrapper from '../NfcCardModuleWrapper';
import {ERR_JSON_MUST_HAVE_MSG_FIELD, 
  ERR_JSON_MUST_HAVE_STATUS_FIELD, 
  ERR_JSON_MUST_HAVE_CODE_FIELD, 
  ERR_JSON_MUST_HAVE_TYPE_FIELD, 
  ERR_JSON_MUST_HAVE_TYPE_ID_FIELD,
  ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL,
  ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD,
  ERR_JSON_MUST_HAVE_APDU_FIELD} from '../NfcCardModuleWrapper'
/**
 * Tests for verifyPinAndSign method validating different cases when it can throw errors.
 */

jest.mock('react-native', () => {
    return {
      NativeModules: {
        NfcCardModule: {
            verifyPinAndSign: jest.fn()
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"\", \"status\":\"fail\", \"code\": \"30006\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
             .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message1\":\"22223\", \"status\":\"fail\", \"code\": \"30006\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
             .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"status\":\"\", \"code\": \"30006\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"status1\":\"fail\", \"code\": \"30006\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"code\": \"\", \"status\":\"fail\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"code1\": \"30006\", \"status\":\"fail\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"code\": \"30006\", \"status\":\"fail\", \"errorTypeId\": \"3\", \"errorType\": \"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"code\": \"30006\", \"status\":\"fail\", \"errorTypeId\": \"3\", \"errorType1\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"code\": \"30006\", \"status\":\"fail\", \"errorTypeId\": \"\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"code\": \"30006\", \"status\":\"fail\", \"errorTypeId1\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"SIGN_SHORT_MESSAGE\", \"apdu\":\"B0 A5 00 00 62 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A762F6431700FBA98059E42BC1A5F14F7649F00509611E0DEF312A53FAE5458039563000C1A4F75B7C72338B69EF26033A1C831E44BA1D70AF6175D3271FA719B 40\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 A5 00 00 62 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A762F6431700FBA98059E42BC1A5F14F7649F00509611E0DEF312A53FAE5458039563000C1A4F75B7C72338B69EF26033A1C831E44BA1D70AF6175D3271FA719B 40\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE\", \"apdu1\":\"B0 A5 00 00 62 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A762F6431700FBA98059E42BC1A5F14F7649F00509611E0DEF312A53FAE5458039563000C1A4F75B7C72338B69EF26033A1C831E44BA1D70AF6175D3271FA719B 40\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE\", \"apdu\":\"B0 A5 00 00 62 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A762F6431700FBA98059E42BC1A5F14F7649F00509611E0DEF312A53FAE5458039563000C1A4F75B7C72338B69EF26033A1C831E44BA1D70AF6175D3271FA719B 40\"}"
                ));
              }))
              .mockReturnValue(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Pin must be a numeric string of length 4.\", \"code\": \"30006\", \"status\":\"fail\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              })),

            verifyPinAndSignWithoutDialog: jest.fn()
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"\", \"status\":\"fail\", \"code\": \"30006\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
             .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message1\":\"22223\", \"status\":\"fail\", \"code\": \"30006\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
             .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"status\":\"\", \"code\": \"30006\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"status1\":\"fail\", \"code\": \"30006\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"code\": \"\", \"status\":\"fail\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"code1\": \"30006\", \"status\":\"fail\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"code\": \"30006\", \"status\":\"fail\", \"errorTypeId\": \"3\", \"errorType\": \"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"code\": \"30006\", \"status\":\"fail\", \"errorTypeId\": \"3\", \"errorType1\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"code\": \"30006\", \"status\":\"fail\", \"errorTypeId\": \"\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"22223\", \"code\": \"30006\", \"status\":\"fail\", \"errorTypeId1\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"SIGN_SHORT_MESSAGE\", \"apdu\":\"B0 A5 00 00 62 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A762F6431700FBA98059E42BC1A5F14F7649F00509611E0DEF312A53FAE5458039563000C1A4F75B7C72338B69EF26033A1C831E44BA1D70AF6175D3271FA719B 40\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 A5 00 00 62 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A762F6431700FBA98059E42BC1A5F14F7649F00509611E0DEF312A53FAE5458039563000C1A4F75B7C72338B69EF26033A1C831E44BA1D70AF6175D3271FA719B 40\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE\", \"apdu1\":\"B0 A5 00 00 62 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A762F6431700FBA98059E42BC1A5F14F7649F00509611E0DEF312A53FAE5458039563000C1A4F75B7C72338B69EF26033A1C831E44BA1D70AF6175D3271FA719B 40\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE\", \"apdu\":\"B0 A5 00 00 62 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A762F6431700FBA98059E42BC1A5F14F7649F00509611E0DEF312A53FAE5458039563000C1A4F75B7C72338B69EF26033A1C831E44BA1D70AF6175D3271FA719B 40\"}"
                ));
              }))
              .mockReturnValue(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Pin must be a numeric string of length 4.\", \"code\": \"30006\", \"status\":\"fail\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              })),
            
        }   
      },
      Platform: {
        OS: "android"
      }
    };
  });

  /*
  verifyPinAndSign
  */

 test('Test verifyPinAndSign throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test verifyPinAndSign throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test verifyPinAndSign throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test verifyPinAndSign throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test verifyPinAndSign throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test verifyPinAndSign throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test verifyPinAndSign throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test verifyPinAndSign throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test verifyPinAndSign throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL);
    });  
  });

  test('Test verifyPinAndSign throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_ID_FIELD)
    });  
  });

  test('Test verifyPinAndSign throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD);
    });  
  });

  test('Test verifyPinAndSign throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD);
    });  
  });

  test('Test verifyPinAndSign throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD)
    });  
  });

  test('Test verifyPinAndSign throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD)
    });  
  });

  test('Test verifyPinAndSign throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Command aborted, No precise diagnosis.');
        expect(error.status).toBe('fail');
        expect(error.errorCode).toBe('6F00');
        expect(error.errorTypeId).toBe('0');
        expect(error.errorType).toBe('Applet fail: card operation error');
        expect(error.cardInstruction).toBe('SIGN_SHORT_MESSAGE');
        expect(error.apdu).toBe('B0 A5 00 00 62 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A762F6431700FBA98059E42BC1A5F14F7649F00509611E0DEF312A53FAE5458039563000C1A4F75B7C72338B69EF26033A1C831E44BA1D70AF6175D3271FA719B 40');
    });  
  });

  test('Test verifyPinAndSign throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().verifyPinAndSign("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Pin must be a numeric string of length 4.');
        expect(error.status).toBe('fail');
        expect(error.errorCode).toBe('30006');
        expect(error.errorTypeId).toBe('3');
        expect(error.errorType).toBe('Native code fail: incorrect format of input data');
    });  
  });


  /*
  verifyPinAndSignWithoutDialog
  */


 test('Test verifyPinAndSignWithoutDialog throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test verifyPinAndSignWithoutDialog throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test verifyPinAndSignWithoutDialog throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test verifyPinAndSignWithoutDialog throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test verifyPinAndSignWithoutDialog throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test verifyPinAndSignWithoutDialog throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test verifyPinAndSignWithoutDialog throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test verifyPinAndSignWithoutDialog throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test verifyPinAndSignWithoutDialog throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL);
    });  
  });

  test('Test verifyPinAndSignWithoutDialog throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_ID_FIELD)
    });  
  });

  test('Test verifyPinAndSignWithoutDialog throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD);
    });  
  });

  test('Test verifyPinAndSignWithoutDialog throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD);
    });  
  });

  test('Test verifyPinAndSignWithoutDialog throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD)
    });  
  });

  test('Test verifyPinAndSignWithoutDialog throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD)
    });  
  });

  test('Test verifyPinAndSignWithoutDialog throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Command aborted, No precise diagnosis.');
        expect(error.status).toBe('fail');
        expect(error.errorCode).toBe('6F00');
        expect(error.errorTypeId).toBe('0');
        expect(error.errorType).toBe('Applet fail: card operation error');
        expect(error.cardInstruction).toBe('SIGN_SHORT_MESSAGE');
        expect(error.apdu).toBe('B0 A5 00 00 62 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A762F6431700FBA98059E42BC1A5F14F7649F00509611E0DEF312A53FAE5458039563000C1A4F75B7C72338B69EF26033A1C831E44BA1D70AF6175D3271FA719B 40');
    });  
  });

  test('Test verifyPinAndSignWithoutDialog throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignWithoutDialog("123456AF", "2", "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Pin must be a numeric string of length 4.');
        expect(error.status).toBe('fail');
        expect(error.errorCode).toBe('30006');
        expect(error.errorTypeId).toBe('3');
        expect(error.errorType).toBe('Native code fail: incorrect format of input data');
    });  
  });








  
  

  
  
 
  

  
  
  
