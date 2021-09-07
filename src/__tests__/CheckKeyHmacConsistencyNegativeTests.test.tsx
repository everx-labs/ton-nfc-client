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
            checkKeyHmacConsistency: jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"CHECK_KEY_HMAC_CONSISTENCY\", \"apdu\":\"B0 B0 00 00 60 CEFE3565BE8EA005A1C67A16872BB9BA81B9ACA37BBCE4C4F380FCA938967D03A9D1D0988DFB44B278907A69ECF1866087BD71233616C1C6B9EC2DEF217C6AD8781C745407B588E4CD2B8EB102C8D1B821A28ED0E09BE1F9D18749AAFF97EB11 00 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 B0 00 00 60 CEFE3565BE8EA005A1C67A16872BB9BA81B9ACA37BBCE4C4F380FCA938967D03A9D1D0988DFB44B278907A69ECF1866087BD71233616C1C6B9EC2DEF217C6AD8781C745407B588E4CD2B8EB102C8D1B821A28ED0E09BE1F9D18749AAFF97EB11 00 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"CHECK_KEY_HMAC_CONSISTENCY\", \"apdu1\":\"B0 B0 00 00 60 CEFE3565BE8EA005A1C67A16872BB9BA81B9ACA37BBCE4C4F380FCA938967D03A9D1D0988DFB44B278907A69ECF1866087BD71233616C1C6B9EC2DEF217C6AD8781C745407B588E4CD2B8EB102C8D1B821A28ED0E09BE1F9D18749AAFF97EB11 00 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"CHECK_KEY_HMAC_CONSISTENCY\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"CHECK_KEY_HMAC_CONSISTENCY\", \"apdu\":\"B0 B0 00 00 60 CEFE3565BE8EA005A1C67A16872BB9BA81B9ACA37BBCE4C4F380FCA938967D03A9D1D0988DFB44B278907A69ECF1866087BD71233616C1C6B9EC2DEF217C6AD8781C745407B588E4CD2B8EB102C8D1B821A28ED0E09BE1F9D18749AAFF97EB11 00 \"}"
                ));
              }))
              .mockReturnValue(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Nfc connection establishing error.\", \"code\": \"220000\", \"status\":\"fail\", \"errorTypeId\": \"22\", \"errorType\": \"Android code fail: NFC error\"}"
                ));
              })),

            checkKeyHmacConsistencyWithoutDialog: jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"CHECK_KEY_HMAC_CONSISTENCY\", \"apdu\":\"B0 B0 00 00 60 CEFE3565BE8EA005A1C67A16872BB9BA81B9ACA37BBCE4C4F380FCA938967D03A9D1D0988DFB44B278907A69ECF1866087BD71233616C1C6B9EC2DEF217C6AD8781C745407B588E4CD2B8EB102C8D1B821A28ED0E09BE1F9D18749AAFF97EB11 00 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 B0 00 00 60 CEFE3565BE8EA005A1C67A16872BB9BA81B9ACA37BBCE4C4F380FCA938967D03A9D1D0988DFB44B278907A69ECF1866087BD71233616C1C6B9EC2DEF217C6AD8781C745407B588E4CD2B8EB102C8D1B821A28ED0E09BE1F9D18749AAFF97EB11 00 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"CHECK_KEY_HMAC_CONSISTENCY\", \"apdu1\":\"B0 B0 00 00 60 CEFE3565BE8EA005A1C67A16872BB9BA81B9ACA37BBCE4C4F380FCA938967D03A9D1D0988DFB44B278907A69ECF1866087BD71233616C1C6B9EC2DEF217C6AD8781C745407B588E4CD2B8EB102C8D1B821A28ED0E09BE1F9D18749AAFF97EB11 00 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"CHECK_KEY_HMAC_CONSISTENCY\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"CHECK_KEY_HMAC_CONSISTENCY\", \"apdu\":\"B0 B0 00 00 60 CEFE3565BE8EA005A1C67A16872BB9BA81B9ACA37BBCE4C4F380FCA938967D03A9D1D0988DFB44B278907A69ECF1866087BD71233616C1C6B9EC2DEF217C6AD8781C745407B588E4CD2B8EB102C8D1B821A28ED0E09BE1F9D18749AAFF97EB11 00 \"}"
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
  checkKeyHmacConsistency
  */

  test('Test checkKeyHmacConsistency throws error if input arg is not json', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toContain("Unexpected token");
    });  
  });

 test('Test checkKeyHmacConsistency throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test checkKeyHmacConsistency throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test checkKeyHmacConsistency throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test checkKeyHmacConsistency throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test checkKeyHmacConsistency throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test checkKeyHmacConsistency throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test checkKeyHmacConsistency throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test checkKeyHmacConsistency throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test checkKeyHmacConsistency throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('\"errorTypeId\" must have value!');
    });  
  });

  test('Test checkKeyHmacConsistency throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorTypeId\" field!');
    });  
  });

  test('Test checkKeyHmacConsistency throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test checkKeyHmacConsistency throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test checkKeyHmacConsistency throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test checkKeyHmacConsistency throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test checkKeyHmacConsistency throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
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
        expect(error.cardInstruction).toBe('CHECK_KEY_HMAC_CONSISTENCY');
        expect(error.apdu).toBe('B0 B0 00 00 60 CEFE3565BE8EA005A1C67A16872BB9BA81B9ACA37BBCE4C4F380FCA938967D03A9D1D0988DFB44B278907A69ECF1866087BD71233616C1C6B9EC2DEF217C6AD8781C745407B588E4CD2B8EB102C8D1B821A28ED0E09BE1F9D18749AAFF97EB11 00 ');
    });  
  });

  test('Test checkKeyHmacConsistency throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistency("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
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
  checkKeyHmacConsistencyWithoutDialog
  */

  test('Test checkKeyHmacConsistencyWithoutDialog: throws error if input arg is not json', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toContain("Unexpected token");
    });  
  });

 test('Test checkKeyHmacConsistencyWithoutDialog throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test checkKeyHmacConsistencyWithoutDialog throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test checkKeyHmacConsistencyWithoutDialog throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test checkKeyHmacConsistencyWithoutDialog throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test checkKeyHmacConsistencyWithoutDialog throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test checkKeyHmacConsistencyWithoutDialog throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test checkKeyHmacConsistencyWithoutDialog throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test checkKeyHmacConsistencyWithoutDialog throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test checkKeyHmacConsistencyWithoutDialog throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('\"errorTypeId\" must have value!');
    });  
  });

  test('Test checkKeyHmacConsistencyWithoutDialog throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorTypeId\" field!');
    });  
  });

  test('Test checkKeyHmacConsistencyWithoutDialog throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test checkKeyHmacConsistencyWithoutDialog throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test checkKeyHmacConsistencyWithoutDialog throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test checkKeyHmacConsistencyWithoutDialog throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test checkKeyHmacConsistencyWithoutDialog throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
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
        expect(error.cardInstruction).toBe('CHECK_KEY_HMAC_CONSISTENCY');
        expect(error.apdu).toBe('B0 B0 00 00 60 CEFE3565BE8EA005A1C67A16872BB9BA81B9ACA37BBCE4C4F380FCA938967D03A9D1D0988DFB44B278907A69ECF1866087BD71233616C1C6B9EC2DEF217C6AD8781C745407B588E4CD2B8EB102C8D1B821A28ED0E09BE1F9D18749AAFF97EB11 00 ');
    });  
  });

  test('Test checkKeyHmacConsistencyWithoutDialog throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().checkKeyHmacConsistencyWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
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








  
  

  
  
 
  

  
  
  

