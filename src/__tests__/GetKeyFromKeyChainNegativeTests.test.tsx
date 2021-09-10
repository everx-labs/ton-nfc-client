import NfcCardModuleWrapper from '../NfcCardModuleWrapper';
import CardResponse from '../CardResponse';
import CardError from '../CardError';
import NfcNativeModuleError from '../NfcNativeModuleError';
import React from 'react';
import { NativeModules} from 'react-native'

/**
 * Tests for getKeyFromKeyChain method validating different cases when it can throw errors.
 */


jest.mock('react-native', () => {
    return {
      NativeModules: {
        NfcCardModule: {
            getKeyFromKeyChain: jest.fn()
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"GET_KEY_CHUNK\", \"apdu\":\"B0 B2 00 00 44 00000000BEEC21D0C3330CE8E6B73FA37ADC8FE201835E57DE2496E18CF264D9E7102158F29F66279D5A6B8EA87BC988CDFFE8A5D03BC7AD14C36003E771B0CE4FAFF473 14\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 B2 00 00 44 00000000BEEC21D0C3330CE8E6B73FA37ADC8FE201835E57DE2496E18CF264D9E7102158F29F66279D5A6B8EA87BC988CDFFE8A5D03BC7AD14C36003E771B0CE4FAFF473 14\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_KEY_CHUNK\", \"apdu1\":\"B0 B2 00 00 44 00000000BEEC21D0C3330CE8E6B73FA37ADC8FE201835E57DE2496E18CF264D9E7102158F29F66279D5A6B8EA87BC988CDFFE8A5D03BC7AD14C36003E771B0CE4FAFF473 14\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_KEY_CHUNK\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_KEY_CHUNK\", \"apdu\":\"B0 B2 00 00 44 00000000BEEC21D0C3330CE8E6B73FA37ADC8FE201835E57DE2496E18CF264D9E7102158F29F66279D5A6B8EA87BC988CDFFE8A5D03BC7AD14C36003E771B0CE4FAFF473 14\"}"
                ));
              }))
              .mockReturnValue(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Nfc connection establishing error.\", \"code\": \"220000\", \"status\":\"fail\", \"errorTypeId\": \"22\", \"errorType\": \"Android code fail: NFC error\"}"
                ));
              })),

            getKeyFromKeyChainWithoutDialog: jest.fn()
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"GET_KEY_CHUNK\", \"apdu\":\"B0 B2 00 00 44 00000000BEEC21D0C3330CE8E6B73FA37ADC8FE201835E57DE2496E18CF264D9E7102158F29F66279D5A6B8EA87BC988CDFFE8A5D03BC7AD14C36003E771B0CE4FAFF473 14\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 B2 00 00 44 00000000BEEC21D0C3330CE8E6B73FA37ADC8FE201835E57DE2496E18CF264D9E7102158F29F66279D5A6B8EA87BC988CDFFE8A5D03BC7AD14C36003E771B0CE4FAFF473 14\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_KEY_CHUNK\", \"apdu1\":\"B0 B2 00 00 44 00000000BEEC21D0C3330CE8E6B73FA37ADC8FE201835E57DE2496E18CF264D9E7102158F29F66279D5A6B8EA87BC988CDFFE8A5D03BC7AD14C36003E771B0CE4FAFF473 14\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_KEY_CHUNK\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"GET_KEY_CHUNK\", \"apdu\":\"B0 B2 00 00 44 00000000BEEC21D0C3330CE8E6B73FA37ADC8FE201835E57DE2496E18CF264D9E7102158F29F66279D5A6B8EA87BC988CDFFE8A5D03BC7AD14C36003E771B0CE4FAFF473 14\"}"
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
  getKeyFromKeyChain
  */
  test('Test getKeyFromKeyChain throws error if input arg is not json', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toContain("Unexpected token");
    });  
  });

 test('Test getKeyFromKeyChain throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test getKeyFromKeyChain throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test getKeyFromKeyChain throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test getKeyFromKeyChain throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test getKeyFromKeyChain throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test getKeyFromKeyChain throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test getKeyFromKeyChain throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test getKeyFromKeyChain throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test getKeyFromKeyChain throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('\"errorTypeId\" must have value!');
    });  
  });

  test('Test getKeyFromKeyChain throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorTypeId\" field!');
    });  
  });

  test('Test getKeyFromKeyChain throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test getKeyFromKeyChain throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test getKeyFromKeyChain throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test getKeyFromKeyChain throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test getKeyFromKeyChain throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
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
        expect(error.cardInstruction).toBe('GET_KEY_CHUNK');
        expect(error.apdu).toBe('B0 B2 00 00 44 00000000BEEC21D0C3330CE8E6B73FA37ADC8FE201835E57DE2496E18CF264D9E7102158F29F66279D5A6B8EA87BC988CDFFE8A5D03BC7AD14C36003E771B0CE4FAFF473 14');
    });  
  });

  test('Test getKeyFromKeyChain throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
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
  getKeyFromKeyChainWithoutDialog
  */


 test('Test getKeyFromKeyChainWithoutDialog throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test getKeyFromKeyChainWithoutDialog throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test getKeyFromKeyChainWithoutDialog throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test getKeyFromKeyChainWithoutDialog throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test getKeyFromKeyChainWithoutDialog throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test getKeyFromKeyChainWithoutDialog throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test getKeyFromKeyChainWithoutDialog throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test getKeyFromKeyChainWithoutDialog throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test getKeyFromKeyChainWithoutDialog throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('\"errorTypeId\" must have value!');
    });  
  });

  test('Test getKeyFromKeyChainWithoutDialog throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorTypeId\" field!');
    });  
  });

  test('Test getKeyFromKeyChainWithoutDialog throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test getKeyFromKeyChainWithoutDialog throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test getKeyFromKeyChainWithoutDialog throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test getKeyFromKeyChainWithoutDialog throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test getKeyFromKeyChainWithoutDialog throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
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
        expect(error.cardInstruction).toBe('GET_KEY_CHUNK');
        expect(error.apdu).toBe('B0 B2 00 00 44 00000000BEEC21D0C3330CE8E6B73FA37ADC8FE201835E57DE2496E18CF264D9E7102158F29F66279D5A6B8EA87BC988CDFFE8A5D03BC7AD14C36003E771B0CE4FAFF473 14');
    });  
  });

  test('Test getKeyFromKeyChainWithoutDialog throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().getKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
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








  
  

  
  
 
  

  
  
  

