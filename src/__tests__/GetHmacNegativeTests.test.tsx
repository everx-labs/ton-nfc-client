import NfcCardModuleWrapper from '../NfcCardModuleWrapper';
import {ERR_JSON_MUST_HAVE_MSG_FIELD, 
  ERR_JSON_MUST_HAVE_STATUS_FIELD, 
  ERR_JSON_MUST_HAVE_CODE_FIELD, 
  ERR_JSON_MUST_HAVE_TYPE_FIELD, 
  ERR_JSON_MUST_HAVE_TYPE_ID_FIELD,
  ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL,
  ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD,
  ERR_JSON_MUST_HAVE_APDU_FIELD,
  ERR_JSON_MUST_HAVE_KEY_HMAC_AND_LEN_FIELD } from '../NfcCardModuleWrapper'
/**
 * Test getHmac  method behaviour if the function with the same title in NativeModule throwed a error or produced response of bad format. 
 * We mock different incorrect error messages from NativeModule and also a correct error message, and check the behaviour.
 */  

jest.mock('react-native', () => {
    return {
      NativeModules: {
        NfcCardModule: {
            getHmac: jest.fn()
            .mockReturnValueOnce(new Promise((_resolve, reject) => {
              reject(new Error("aaa"));
            }))            
              .mockReturnValueOnce(new Promise((_resolve, reject) => {
                reject(new Error("{\"message\":\"\", \"status\":\"fail\", \"code\": \"30006\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              }))
             .mockReturnValueOnce(new Promise((_resolve, reject) => {
                reject(new Error("{\"message1\":\"22223\", \"status\":\"fail\", \"code\": \"30006\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"GET_HMAC\", \"apdu\":\"B0 BB 00 00 42 0000CA1C8DB795C9AEA440CE37DFC6B967671760D3B1ABD983050314FC3E82A1A5FF629E68014D5F780D9E9316A350FCDD75BA9468C12EDA09DFF1D9BF3249CD2EED 22 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((_resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 BB 00 00 42 0000CA1C8DB795C9AEA440CE37DFC6B967671760D3B1ABD983050314FC3E82A1A5FF629E68014D5F780D9E9316A350FCDD75BA9468C12EDA09DFF1D9BF3249CD2EED 22 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((_resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_HMAC\", \"apdu1\":\"B0 BB 00 00 42 0000CA1C8DB795C9AEA440CE37DFC6B967671760D3B1ABD983050314FC3E82A1A5FF629E68014D5F780D9E9316A350FCDD75BA9468C12EDA09DFF1D9BF3249CD2EED 22 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((_resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_HMAC\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((_resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_HMAC\", \"apdu\":\"B0 BB 00 00 42 0000CA1C8DB795C9AEA440CE37DFC6B967671760D3B1ABD983050314FC3E82A1A5FF629E68014D5F780D9E9316A350FCDD75BA9468C12EDA09DFF1D9BF3249CD2EED 22 \"}"
                ));
              }))

              .mockReturnValueOnce(new Promise((resolve, _reject) => {
                resolve("{\"hmac\":\"\", \"length\":5,\"status\":\"ok\"}"
                )
              }))
              .mockReturnValueOnce(new Promise((resolve, _reject) => {
                resolve("{\"hmac1\":\"22222222222222222222222222222222\", \"length\":5,\"status\":\"ok\"}"
                )
              }))
              .mockReturnValueOnce(new Promise((resolve, _reject) => {
                resolve("{\"hmac\":\"22222222222222222222222222222222\", \"length\":0,\"status\":\"ok\"}"
                )
              }))
              .mockReturnValueOnce(new Promise((resolve, _reject) => {
                resolve("{\"hmac\":\"22222222222222222222222222222222\", \"length1\":5,\"status\":\"ok\"}"
                )
              }))
              .mockReturnValueOnce(new Promise((resolve, _reject) => {
                resolve("{\"hmac\":\"22222222222222222222222222222222\", \"length\":5,\"status\":\"\"}"
                )
              }))
              .mockReturnValueOnce(new Promise((resolve, _reject) => {
                resolve("{\"hmac\":\"22222222222222222222222222222222\", \"length\":5,\"status1\":\"ok\"}"
                )
              }))

              .mockReturnValue(new Promise((_resolve, reject) => {
                reject(new Error("{\"message\":\"Nfc connection establishing error.\", \"code\": \"220000\", \"status\":\"fail\", \"errorTypeId\": \"22\", \"errorType\": \"Android code fail: NFC error\"}"
                ))
                
              })),

        }   
      },
      Platform: {
        OS: "android"
      }
    };
  });

  /*
  getHmac
  */

  test('Test getHmac throws error if input arg is not json', () => {
    return new NfcCardModuleWrapper().getHmac("2")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe("aaa");
    });  
  });


 test('Test getHmac throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().getHmac("2")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test getHmac throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().getHmac("2")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test getHmac throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().getHmac("2")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test getHmac throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().getHmac("2")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test getHmac throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().getHmac("2")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test getHmac throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().getHmac("2")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test getHmac throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().getHmac("2")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test getHmac throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().getHmac("2")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test getHmac throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().getHmac("2")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL);
    });  
  });

  test('Test getHmac throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().getHmac("2")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_ID_FIELD);
    });  
  });

  test('Test getHmac throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().getHmac("2")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD);
    });  
  });

  test('Test getHmac throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().getHmac("2")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD);
    });  
  });

  test('Test getHmac throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().getHmac("2")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD);
    });  
  });

  test('Test getHmac throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().getHmac("2")
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD);
    });  
  });

  test('Test getHmac throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().getHmac("2")
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
        expect(error.cardInstruction).toBe('GET_HMAC');
        expect(error.apdu).toBe('B0 BB 00 00 42 0000CA1C8DB795C9AEA440CE37DFC6B967671760D3B1ABD983050314FC3E82A1A5FF629E68014D5F780D9E9316A350FCDD75BA9468C12EDA09DFF1D9BF3249CD2EED 22 ');
    });  
  });

  test('Test getHmac throws error if hmac field is empty', () => {
    return new NfcCardModuleWrapper().getHmac("2")
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_KEY_HMAC_AND_LEN_FIELD)
        })
})

test('Test getHmac throws error if hmac field is absent', () => {
    return new NfcCardModuleWrapper().getHmac("2")
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_KEY_HMAC_AND_LEN_FIELD)
        })
})


test('Test getHmac throws error if length field is zero', () => {
  return new NfcCardModuleWrapper().getHmac("2")
      .then(_cardRsponse => {
          expect(true).toBe(false)
      })
      .catch(error => {
          console.log(error.message)
          expect(error.message).toBe(ERR_JSON_MUST_HAVE_KEY_HMAC_AND_LEN_FIELD)
      })
})

test('Test getHmac throws error if length field is absent', () => {
  return new NfcCardModuleWrapper().getHmac("2")
      .then(_cardRsponse => {
          expect(true).toBe(false)
      })
      .catch(error => {
          console.log(error.message)
          expect(error.message).toBe(ERR_JSON_MUST_HAVE_KEY_HMAC_AND_LEN_FIELD)
      })
})

test('Test getHmac throws error if status field is empty', () => {
  return new NfcCardModuleWrapper().getHmac("2")
      .then(_cardRsponse => {
          expect(true).toBe(false)
      })
      .catch(error => {
          console.log(error.message)
          expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
      })
})

test('Test getHmac throws error if status field is absent', () => {
  return new NfcCardModuleWrapper().getHmac("2")
      .then(_cardRsponse => {
          expect(true).toBe(false)
      })
      .catch(error => {
          console.log(error.message)
          expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
      })
})

  test('Test getHmac throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().getHmac("2")
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


 