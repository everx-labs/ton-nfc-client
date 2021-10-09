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
 * Test getKeyChainDataAboutAllKeys method behaviour if the function with the same title in NativeModule throwed a error or produced response of bad format. 
 * We mock different incorrect error messages from NativeModule and also a correct error message, and check the behaviour.
 */  


jest.mock('react-native', () => {
    return {
      NativeModules: {
        NfcCardModule: {
            getKeyChainDataAboutAllKeys: jest.fn()
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"GET_NUMBER_OF_KEYS\", \"apdu\":\"B0 B8 00 00 40 9D7D35526332B85A16C99F21A2111B2CF25BAA1882615EAC07F4B575268C852C3CF637B20E1FAA47BF8E282ADE3E1D30D33112863DFFF2304CB4351F05BCB9E1 02\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((_resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 B8 00 00 40 9D7D35526332B85A16C99F21A2111B2CF25BAA1882615EAC07F4B575268C852C3CF637B20E1FAA47BF8E282ADE3E1D30D33112863DFFF2304CB4351F05BCB9E1 02\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((_resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_NUMBER_OF_KEYS\", \"apdu1\":\"B0 B8 00 00 40 9D7D35526332B85A16C99F21A2111B2CF25BAA1882615EAC07F4B575268C852C3CF637B20E1FAA47BF8E282ADE3E1D30D33112863DFFF2304CB4351F05BCB9E1 02\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((_resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_NUMBER_OF_KEYS\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((_resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_NUMBER_OF_KEYS\", \"apdu\":\"B0 B8 00 00 40 9D7D35526332B85A16C99F21A2111B2CF25BAA1882615EAC07F4B575268C852C3CF637B20E1FAA47BF8E282ADE3E1D30D33112863DFFF2304CB4351F05BCB9E1 02\"}"
                ));
              }))
              .mockReturnValue(new Promise((_resolve, reject) => {
                reject(new Error("{\"message\":\"Nfc connection establishing error.\", \"code\": \"220000\", \"status\":\"fail\", \"errorTypeId\": \"22\", \"errorType\": \"Android code fail: NFC error\"}"
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
  getKeyChainDataAboutAllKeys
  */

  test('Test getKeyChainDataAboutAllKeys throws error if input arg is not json', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe("aaa");
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if message field (in response) is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if message field (in response) is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

 test('Test getKeyChainDataAboutAllKeys throws error if message field (in error msg) is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if message field (in error msg) is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if status field (in response) is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if status field (in response) is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if status field (in error msg) is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if status field (in error msg) is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_ID_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD);
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
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
        expect(error.cardInstruction).toBe('GET_NUMBER_OF_KEYS');
        expect(error.apdu).toBe('B0 B8 00 00 40 9D7D35526332B85A16C99F21A2111B2CF25BAA1882615EAC07F4B575268C852C3CF637B20E1FAA47BF8E282ADE3E1D30D33112863DFFF2304CB4351F05BCB9E1 02');
    });  
  });

  test('Test getKeyChainDataAboutAllKeys throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().getKeyChainDataAboutAllKeys()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Nfc connection establishing error.');
        expect(error.status).toBe('fail');
        expect(error.errorCode).toBe('220000');
        expect(error.errorTypeId).toBe('22');
        expect(error.errorType).toBe('Android code fail: NFC error');
    });  
  });
