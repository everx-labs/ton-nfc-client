import NfcCardModuleWrapper from '../NfcCardModuleWrapper';
import CardResponse from '../CardResponse';
import CardError from '../CardError';
import NfcNativeModuleError from '../NfcNativeModuleError';
import React from 'react';
import { NativeModules} from 'react-native'

/**
 * Tests for getMaxPinTries method validating different cases when it can throw errors.
 */

jest.mock('react-native', () => {
    return {
      NativeModules: {
        NfcCardModule: {
            getMaxPinTries: jest.fn()
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"GET_PIN_TLT\", \"apdu\":\"80CB800005DFFF028103\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"80CB800005DFFF028103\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_PIN_TLT\", \"apdu1\":\"80CB800005DFFF028103\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_PIN_TLT\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_PIN_TLT\", \"apdu\":\"80CB800005DFFF028103\"}"
                ));
              }))
              .mockReturnValue(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Nfc connection establishing error.\", \"code\": \"220000\", \"status\":\"fail\", \"errorTypeId\": \"22\", \"errorType\": \"Android code fail: NFC error\"}"
                ));
              })),

            getMaxPinTriesWithoutDialog: jest.fn()
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"GET_PIN_TLT\", \"apdu\":\"80CB800005DFFF028103\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"80CB800005DFFF028103\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_PIN_TLT\", \"apdu1\":\"80CB800005DFFF028103\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_PIN_TLT\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_PIN_TLT\", \"apdu\":\"80CB800005DFFF028103\"}"
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
  getMaxPinTries
  */

 test('Test getMaxPinTries throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test getMaxPinTries throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test getMaxPinTries throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test getMaxPinTries throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test getMaxPinTries throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test getMaxPinTries throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test getMaxPinTries throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test getMaxPinTries throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test getMaxPinTries throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('\"errorTypeId\" must have value!');
    });  
  });

  test('Test getMaxPinTries throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorTypeId\" field!');
    });  
  });

  test('Test getMaxPinTries throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test getMaxPinTries throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test getMaxPinTries throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test getMaxPinTries throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test getMaxPinTries throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
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
        expect(error.cardInstruction).toBe('GET_PIN_TLT');
        expect(error.apdu).toBe('80CB800005DFFF028103');
    });  
  });

  test('Test getMaxPinTries throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().getMaxPinTries()
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
  getMaxPinTriesWithoutDialog
  */


 test('Test getMaxPinTriesWithoutDialog throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test getMaxPinTriesWithoutDialog throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test getMaxPinTriesWithoutDialog throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test getMaxPinTriesWithoutDialog throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test getMaxPinTriesWithoutDialog throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test getMaxPinTriesWithoutDialog throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test getMaxPinTriesWithoutDialog throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test getMaxPinTriesWithoutDialog throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test getMaxPinTriesWithoutDialog throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('\"errorTypeId\" must have value!');
    });  
  });

  test('Test getMaxPinTriesWithoutDialog throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorTypeId\" field!');
    });  
  });

  test('Test getMaxPinTriesWithoutDialog throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test getMaxPinTriesWithoutDialog throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test getMaxPinTriesWithoutDialog throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test getMaxPinTriesWithoutDialog throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test getMaxPinTriesWithoutDialog throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
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
        expect(error.cardInstruction).toBe('GET_PIN_TLT');
        expect(error.apdu).toBe('80CB800005DFFF028103');
    });  
  });

  test('Test getMaxPinTriesWithoutDialog throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().getMaxPinTriesWithoutDialog()
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








  
  

  
  
 
  

  
  
  

