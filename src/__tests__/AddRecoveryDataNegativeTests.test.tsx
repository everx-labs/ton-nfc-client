import NfcCardModuleWrapper from '../NfcCardModuleWrapper';
import CardResponse from '../CardResponse';
import CardError from '../CardError';
import NfcNativeModuleError from '../NfcNativeModuleError';
import React from 'react';
import { NativeModules} from 'react-native'

jest.mock('react-native', () => {
    return {
      NativeModules: {
        NfcCardModule: {
            addRecoveryData: jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"ADD_RECOVERY_DATA_PART\", \"apdu\":\"B0 D1 00 00 23 9CB805B88D013A947AEA8ED0E0F1DB688ACD30BE9094DE813541C5C6B085D508071171 00\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 D1 00 00 23 9CB805B88D013A947AEA8ED0E0F1DB688ACD30BE9094DE813541C5C6B085D508071171 00\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"ADD_RECOVERY_DATA_PART\", \"apdu1\":\"B0 D1 00 00 23 9CB805B88D013A947AEA8ED0E0F1DB688ACD30BE9094DE813541C5C6B085D508071171 00\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"ADD_RECOVERY_DATA_PART\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"ADD_RECOVERY_DATA_PART\", \"apdu\":\"B0 D1 00 00 23 9CB805B88D013A947AEA8ED0E0F1DB688ACD30BE9094DE813541C5C6B085D508071171 00\"}"
                ));
              }))
              .mockReturnValue(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Nfc connection establishing error.\", \"code\": \"220000\", \"status\":\"fail\", \"errorTypeId\": \"22\", \"errorType\": \"Android code fail: NFC error\"}"
                ));
              })),

            addRecoveryDataWithoutDialog: jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"ADD_RECOVERY_DATA_PART\", \"apdu\":\"B0 D1 00 00 23 9CB805B88D013A947AEA8ED0E0F1DB688ACD30BE9094DE813541C5C6B085D508071171 00\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 D1 00 00 23 9CB805B88D013A947AEA8ED0E0F1DB688ACD30BE9094DE813541C5C6B085D508071171 00\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SET_DEVICE_LABEL\", \"apdu1\":\"B0 D1 00 00 23 9CB805B88D013A947AEA8ED0E0F1DB688ACD30BE9094DE813541C5C6B085D508071171 00\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"ADD_RECOVERY_DATA_PART\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"ADD_RECOVERY_DATA_PART\", \"apdu\":\"B0 D1 00 00 23 9CB805B88D013A947AEA8ED0E0F1DB688ACD30BE9094DE813541C5C6B085D508071171 00\"}"
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
  addRecoveryData
  */

  test('Test addRecoveryData throws error if input arg is not json', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toContain("Unexpected token");
    });  
  });

 test('Test addRecoveryData throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test addRecoveryData throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test addRecoveryData throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test addRecoveryData throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test addRecoveryData throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test addRecoveryData throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test addRecoveryData throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test addRecoveryData throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test addRecoveryData throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('\"errorTypeId\" must have value!');
    });  
  });

  test('Test addRecoveryData throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorTypeId\" field!');
    });  
  });

  test('Test addRecoveryData throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test addRecoveryData throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test addRecoveryData throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test addRecoveryData throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test addRecoveryData throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
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
        expect(error.cardInstruction).toBe('ADD_RECOVERY_DATA_PART');
        expect(error.apdu).toBe('B0 D1 00 00 23 9CB805B88D013A947AEA8ED0E0F1DB688ACD30BE9094DE813541C5C6B085D508071171 00');
    });  
  });

  test('Test addRecoveryData throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().addRecoveryData("0011003300110033001100330011003300110033001100330011003300110033")
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
  addRecoveryDataWithoutDialog
  */

  test('Test addRecoveryDataWithoutDialog: throws error if input arg is not json', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toContain("Unexpected token");
    });  
  });

 test('Test addRecoveryDataWithoutDialog throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test addRecoveryDataWithoutDialog throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test addRecoveryDataWithoutDialog throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test addRecoveryDataWithoutDialog throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test addRecoveryDataWithoutDialog throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test addRecoveryDataWithoutDialog throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test addRecoveryDataWithoutDialog throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test addRecoveryDataWithoutDialog throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test addRecoveryDataWithoutDialog throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('\"errorTypeId\" must have value!');
    });  
  });

  test('Test addRecoveryDataWithoutDialog throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorTypeId\" field!');
    });  
  });

  test('Test addRecoveryDataWithoutDialog throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test addRecoveryDataWithoutDialog throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test addRecoveryDataWithoutDialog throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test addRecoveryDataWithoutDialog throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test addRecoveryDataWithoutDialog throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
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
        expect(error.cardInstruction).toBe('ADD_RECOVERY_DATA_PART');
        expect(error.apdu).toBe('B0 D1 00 00 23 9CB805B88D013A947AEA8ED0E0F1DB688ACD30BE9094DE813541C5C6B085D508071171 00');
    });  
  });

  test('Test addRecoveryDataWithoutDialog throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().addRecoveryDataWithoutDialog("0011003300110033001100330011003300110033001100330011003300110033")
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








  
  

  
  
 
  

  
  
  

