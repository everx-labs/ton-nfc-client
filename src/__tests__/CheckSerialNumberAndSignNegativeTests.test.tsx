import NfcCardModuleWrapper from '../NfcCardModuleWrapper';
import {ERR_JSON_MUST_HAVE_MSG_FIELD, 
  ERR_JSON_MUST_HAVE_STATUS_FIELD, 
  ERR_JSON_MUST_HAVE_CODE_FIELD, 
  ERR_JSON_MUST_HAVE_TYPE_FIELD, 
  ERR_JSON_MUST_HAVE_TYPE_ID_FIELD,
  ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL,
  ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD,
  ERR_JSON_MUST_HAVE_APDU_FIELD} from '../NfcCardModuleWrapper'
jest.mock('react-native', () => {
    return {
      NativeModules: {
        NfcCardModule: {
            checkSerialNumberAndSign: jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("aaa"));
              }))
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"SIGN_SHORT_MESSAGE\", \"apdu\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE\", \"apdu1\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE\", \"apdu\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40 \"}"
                ));
              }))
              .mockReturnValue(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Nfc connection establishing error.\", \"code\": \"220000\", \"status\":\"fail\", \"errorTypeId\": \"22\", \"errorType\": \"Android code fail: NFC error\"}"
                ));
              })),

            checkSerialNumberAndSignWithoutDialog: jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("aaa"));
              }))
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"SIGN_SHORT_MESSAGE\", \"apdu\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE\", \"apdu1\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE\", \"apdu\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40 \"}"
                ));
              }))
              .mockReturnValue(new Promise((resolve, reject) => {
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
  checkSerialNumberAndSign
  */

  test('Test checkSerialNumberAndSign throws error if input arg is not json', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toContain("Unexpected token");
    });  
  });

 test('Test checkSerialNumberAndSign throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSign throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSign throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSign throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSign throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSign throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSign throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSign throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSign throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL);
    });  
  });

  test('Test checkSerialNumberAndSign throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_ID_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSign throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSign throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSign throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSign throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSign throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
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
        expect(error.apdu).toBe('B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40 ');
    });  
  });

  test('Test checkSerialNumberAndSign throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSign("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
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


  /*
  checkSerialNumberAndSignWithoutDialog
  */

  test('Test checkSerialNumberAndSignWithoutDialog: throws error if input arg is not json', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toContain("Unexpected token");
    });  
  });

 test('Test checkSerialNumberAndSignWithoutDialog throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSignWithoutDialog throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSignWithoutDialog throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSignWithoutDialog throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSignWithoutDialog throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSignWithoutDialog throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSignWithoutDialog throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSignWithoutDialog throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSignWithoutDialog throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL);
    });  
  });

  test('Test checkSerialNumberAndSignWithoutDialog throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_ID_FIELD);
    });  
  });

  test('Test checkSerialNumberAndSignWithoutDialog throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD
    });  
  });

  test('Test checkSerialNumberAndSignWithoutDialog throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD
    });  
  });

  test('Test checkSerialNumberAndSignWithoutDialog throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD
    });  
  });

  test('Test checkSerialNumberAndSignWithoutDialog throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD
    });  
  });

  test('Test checkSerialNumberAndSignWithoutDialog throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
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
        expect(error.apdu).toBe('B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40 ');
    });  
  });

  test('Test checkSerialNumberAndSignWithoutDialog throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().checkSerialNumberAndSignWithoutDialog("504394802433901126813236", "123456AF", "2")
    .then(cardRsponse => {
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








  
  

  
  
 
  

  
  
  

