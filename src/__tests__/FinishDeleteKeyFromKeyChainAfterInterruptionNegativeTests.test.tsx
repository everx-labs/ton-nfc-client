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
 * Test finishDeleteKeyFromKeyChainAfterInterruption method behaviour if the function with the same title in NativeModule throwed a error. 
 * We mock different incorrect error messages from NativeModule and also a correct error message, and check the behaviour.
 */

jest.mock('react-native', () => {
    return {
      NativeModules: {
        NfcCardModule: {
            finishDeleteKeyFromKeyChainAfterInterruption: jest.fn().mockReturnValueOnce(new Promise((_resolve, reject) => {
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"DELETE_KEY_CHUNK\", \"apdu\":\"B0 BE 00 00 40 B2FD7D33E02AF3E4108682CDEE1AA1639EAC18D6FDE7ED7625A5EA16988D98C1835354C9CCB6CAAD88B99D5C03455F7C7317496545508A0BCA71999BDC1D5895 01 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((_resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 BE 00 00 40 B2FD7D33E02AF3E4108682CDEE1AA1639EAC18D6FDE7ED7625A5EA16988D98C1835354C9CCB6CAAD88B99D5C03455F7C7317496545508A0BCA71999BDC1D5895 01 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((_resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"DELETE_KEY_CHUNK\", \"apdu1\":\"B0 BE 00 00 40 B2FD7D33E02AF3E4108682CDEE1AA1639EAC18D6FDE7ED7625A5EA16988D98C1835354C9CCB6CAAD88B99D5C03455F7C7317496545508A0BCA71999BDC1D5895 01 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((_resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"DELETE_KEY_CHUNK\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((_resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"DELETE_KEY_CHUNK\", \"apdu\":\"B0 BE 00 00 40 B2FD7D33E02AF3E4108682CDEE1AA1639EAC18D6FDE7ED7625A5EA16988D98C1835354C9CCB6CAAD88B99D5C03455F7C7317496545508A0BCA71999BDC1D5895 01 \"}"
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
  finishDeleteKeyFromKeyChainAfterInterruption
  */

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if input arg is not json', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe("aaa");
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if message field (in response) is empty', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if message field (in response) is absent', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

 test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if message field (in error msg) is empty', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if message field (in error msg) is absent', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if status field (in response) is empty', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if status field (in response) is absent', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if status field (in error msg) is empty', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if status field (in error msg) is absent', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_ID_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD);
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
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
        expect(error.cardInstruction).toBe('DELETE_KEY_CHUNK');
        expect(error.apdu).toBe('B0 BE 00 00 40 B2FD7D33E02AF3E4108682CDEE1AA1639EAC18D6FDE7ED7625A5EA16988D98C1835354C9CCB6CAAD88B99D5C03455F7C7317496545508A0BCA71999BDC1D5895 01 ');
    });  
  });

  test('Test finishDeleteKeyFromKeyChainAfterInterruption throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().finishDeleteKeyFromKeyChainAfterInterruption()
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
