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
            deleteKeyFromKeyChain: jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"DELETE_KEY_CHUNK\", \"apdu\":\"B0 BE 00 00 40 B2FD7D33E02AF3E4108682CDEE1AA1639EAC18D6FDE7ED7625A5EA16988D98C1835354C9CCB6CAAD88B99D5C03455F7C7317496545508A0BCA71999BDC1D5895 01 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 BE 00 00 40 B2FD7D33E02AF3E4108682CDEE1AA1639EAC18D6FDE7ED7625A5EA16988D98C1835354C9CCB6CAAD88B99D5C03455F7C7317496545508A0BCA71999BDC1D5895 01 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"DELETE_KEY_CHUNK\", \"apdu1\":\"B0 BE 00 00 40 B2FD7D33E02AF3E4108682CDEE1AA1639EAC18D6FDE7ED7625A5EA16988D98C1835354C9CCB6CAAD88B99D5C03455F7C7317496545508A0BCA71999BDC1D5895 01 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"DELETE_KEY_CHUNK\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"DELETE_KEY_CHUNK\", \"apdu\":\"B0 BE 00 00 40 B2FD7D33E02AF3E4108682CDEE1AA1639EAC18D6FDE7ED7625A5EA16988D98C1835354C9CCB6CAAD88B99D5C03455F7C7317496545508A0BCA71999BDC1D5895 01 \"}"
                ));
              }))
              .mockReturnValue(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Nfc connection establishing error.\", \"code\": \"220000\", \"status\":\"fail\", \"errorTypeId\": \"22\", \"errorType\": \"Android code fail: NFC error\"}"
                ));
              })),

            deleteKeyFromKeyChainWithoutDialog: jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"DELETE_KEY_CHUNK\", \"apdu\":\"B0 BE 00 00 40 B2FD7D33E02AF3E4108682CDEE1AA1639EAC18D6FDE7ED7625A5EA16988D98C1835354C9CCB6CAAD88B99D5C03455F7C7317496545508A0BCA71999BDC1D5895 01 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 BE 00 00 40 B2FD7D33E02AF3E4108682CDEE1AA1639EAC18D6FDE7ED7625A5EA16988D98C1835354C9CCB6CAAD88B99D5C03455F7C7317496545508A0BCA71999BDC1D5895 01 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"DELETE_KEY_CHUNK\", \"apdu1\":\"B0 BE 00 00 40 B2FD7D33E02AF3E4108682CDEE1AA1639EAC18D6FDE7ED7625A5EA16988D98C1835354C9CCB6CAAD88B99D5C03455F7C7317496545508A0BCA71999BDC1D5895 01 \"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"DELETE_KEY_CHUNK\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"DELETE_KEY_CHUNK\", \"apdu\":\"B0 BE 00 00 40 B2FD7D33E02AF3E4108682CDEE1AA1639EAC18D6FDE7ED7625A5EA16988D98C1835354C9CCB6CAAD88B99D5C03455F7C7317496545508A0BCA71999BDC1D5895 01 \"}"
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
  deleteKeyFromKeyChain
  */

  test('Test deleteKeyFromKeyChain throws error if input arg is not json', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toContain("Unexpected token");
    });  
  });

 test('Test deleteKeyFromKeyChain throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChain throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChain throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChain throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChain throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChain throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChain throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChain throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChain throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('\"errorTypeId\" must have value!');
    });  
  });

  test('Test deleteKeyFromKeyChain throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorTypeId\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChain throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChain throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChain throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChain throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChain throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
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
        expect(error.cardInstruction).toBe('DELETE_KEY_CHUNK');
        expect(error.apdu).toBe('B0 BE 00 00 40 B2FD7D33E02AF3E4108682CDEE1AA1639EAC18D6FDE7ED7625A5EA16988D98C1835354C9CCB6CAAD88B99D5C03455F7C7317496545508A0BCA71999BDC1D5895 01 ');
    });  
  });

  test('Test deleteKeyFromKeyChain throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChain("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
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
  deleteKeyFromKeyChainWithoutDialog
  */

  test('Test deleteKeyFromKeyChainWithoutDialog: throws error if input arg is not json', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toContain("Unexpected token");
    });  
  });

 test('Test deleteKeyFromKeyChainWithoutDialog throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChainWithoutDialog throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChainWithoutDialog throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChainWithoutDialog throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChainWithoutDialog throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChainWithoutDialog throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChainWithoutDialog throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChainWithoutDialog throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChainWithoutDialog throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('\"errorTypeId\" must have value!');
    });  
  });

  test('Test deleteKeyFromKeyChainWithoutDialog throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorTypeId\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChainWithoutDialog throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChainWithoutDialog throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChainWithoutDialog throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChainWithoutDialog throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test deleteKeyFromKeyChainWithoutDialog throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
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
        expect(error.cardInstruction).toBe('DELETE_KEY_CHUNK');
        expect(error.apdu).toBe('B0 BE 00 00 40 B2FD7D33E02AF3E4108682CDEE1AA1639EAC18D6FDE7ED7625A5EA16988D98C1835354C9CCB6CAAD88B99D5C03455F7C7317496545508A0BCA71999BDC1D5895 01 ');
    });  
  });

  test('Test deleteKeyFromKeyChainWithoutDialog throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().deleteKeyFromKeyChainWithoutDialog("AABBCC1122334455AABBCC1122334455AABBCC1122334455AABBCC1122334455")
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








  
  

  
  
 
  

  
  
  

