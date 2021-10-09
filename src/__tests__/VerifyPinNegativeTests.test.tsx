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
 * Test verifyPin method behaviour if the function with the same title in NativeModule throwed a error or produced response of bad format. 
 * We mock different incorrect error messages from NativeModule and also a correct error message, and check the behaviour.
 */
jest.mock('react-native', () => {
    return {
      NativeModules: {
        NfcCardModule: {
            verifyPin: jest.fn()
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("aaa"));
                }))
                .mockReturnValueOnce(new Promise((resolve, _reject) => {
                    resolve("{\"message\":\"\", \"status\":\"ok\"}"
                    )
                }))
                .mockReturnValueOnce(new Promise((resolve, _reject) => {
                    resolve("{\"message1\":\"111\", \"status\":\"ok\"}"
                    )
                }))
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("{\"message\":\"\", \"status\":\"fail\", \"code\": \"30006\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                    ));
                }))
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("{\"message1\":\"22223\", \"status\":\"fail\", \"code\": \"30006\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                    ));
                }))
                .mockReturnValueOnce(new Promise((resolve, _reject) => {
                    resolve("{\"message\":\"111\", \"status\":\"\"}"
                    )
                  }))
                .mockReturnValueOnce(new Promise((resolve, _reject) => {
                    resolve("{\"message\":\"111\", \"status1\":\"ok\"}"
                    )
                  }))
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("{\"message\":\"22223\", \"status\":\"\", \"code\": \"30006\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                    ));
                }))
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("{\"message\":\"22223\", \"status1\":\"fail\", \"code\": \"30006\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                    ));
                }))
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("{\"message\":\"22223\", \"code\": \"\", \"status\":\"fail\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                    ));
                }))
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("{\"message\":\"22223\", \"code1\": \"30006\", \"status\":\"fail\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                    ));
                }))
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("{\"message\":\"22223\", \"code\": \"30006\", \"status\":\"fail\", \"errorTypeId\": \"3\", \"errorType\": \"\"}"
                    ));
                }))
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("{\"message\":\"22223\", \"code\": \"30006\", \"status\":\"fail\", \"errorTypeId\": \"3\", \"errorType1\": \"Native code fail: incorrect format of input data\"}"
                    ));
                }))
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("{\"message\":\"22223\", \"code\": \"30006\", \"status\":\"fail\", \"errorTypeId\": \"\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                    ));
                }))
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("{\"message\":\"22223\", \"code\": \"30006\", \"status\":\"fail\", \"errorTypeId1\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                    ));
                }))
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"VERIFY_PIN\", \"apdu\":\"B0 A2 00 00 44 35353535F8397292745708231253136AF625D3AAF4C2E5193B60E736928BA94542FC51C2E058722A0FAE325511EAFE04CDD2473B6994462E228083BEA6F02282E707623F 00\"}"
                    ));
                }))
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 A2 00 00 44 35353535F8397292745708231253136AF625D3AAF4C2E5193B60E736928BA94542FC51C2E058722A0FAE325511EAFE04CDD2473B6994462E228083BEA6F02282E707623F 00\"}"
                    ));
                }))
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"VERIFY_PIN\", \"apdu1\":\"B0 A2 00 00 44 35353535F8397292745708231253136AF625D3AAF4C2E5193B60E736928BA94542FC51C2E058722A0FAE325511EAFE04CDD2473B6994462E228083BEA6F02282E707623F 00\"}"
                    ));
                }))
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"VERIFY_PIN\", \"apdu\":\"\"}"
                    ));
                }))
                .mockReturnValueOnce(new Promise((_resolve, reject) => {
                    reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"VERIFY_PIN\", \"apdu\":\"B0 A2 00 00 44 35353535F8397292745708231253136AF625D3AAF4C2E5193B60E736928BA94542FC51C2E058722A0FAE325511EAFE04CDD2473B6994462E228083BEA6F02282E707623F 00\"}"
                    ));
                }))
                .mockReturnValue(new Promise((_resolve, reject) => {
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
  verifyPin
  */

  test('Test verifyPin throws error if input arg is not json', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe("aaa");
    });  
  });

  test('Test verifyPin throws error if message field (in response) is empty', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test verifyPin throws error if message field (in response) is absent', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

 test('Test verifyPin throws error if message field (in error msg) is empty', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test verifyPin throws error if message field (in error msg) is absent', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test verifyPin throws error if status field (in response) is empty', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test verifyPin throws error if status field (in response) is absent', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test verifyPin throws error if status field (in error msg) is empty', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test verifyPin throws error if status field (in error msg) is absent', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test verifyPin throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test verifyPin throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test verifyPin throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test verifyPin throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test verifyPin throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL);
    });  
  });

  test('Test verifyPin throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_ID_FIELD);
    });  
  });

  test('Test verifyPin throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD);
    });  
  });

  test('Test verifyPin throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD);
    });  
  });

  test('Test verifyPin throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD);
    });  
  });

  test('Test verifyPin throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD);
    });  
  });

  test('Test verifyPin throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Command aborted, No precise diagnosis.');
        expect(error.status).toBe('fail');
        expect(error.errorCode).toBe('6F00');
        expect(error.errorTypeId).toBe('0');
        expect(error.errorType).toBe('Applet fail: card operation error');
        expect(error.cardInstruction).toBe('VERIFY_PIN');
        expect(error.apdu).toBe('B0 A2 00 00 44 35353535F8397292745708231253136AF625D3AAF4C2E5193B60E736928BA94542FC51C2E058722A0FAE325511EAFE04CDD2473B6994462E228083BEA6F02282E707623F 00');
    });  
  });

  test('Test verifyPin throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().verifyPin("5555")
    .then(_cardRsponse => {
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
