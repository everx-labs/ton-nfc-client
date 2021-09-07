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
            verifyPinAndSignForDefaultHdPath: jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"SIGN_SHORT_MESSAGE_WITH_DEFAULT_HD_PATH\", \"apdu\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE_WITH_DEFAULT_HD_PATH\", \"apdu1\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE_WITH_DEFAULT_HD_PATH\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE_WITH_DEFAULT_HD_PATH\", \"apdu\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40\"}"
                ));
              }))
              .mockReturnValue(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Pin must be a numeric string of length 4.\", \"code\": \"30006\", \"status\":\"fail\", \"errorTypeId\": \"3\", \"errorType\": \"Native code fail: incorrect format of input data\"}"
                ));
              })),

            verifyPinAndSignForDefaultHdPathWithoutDialog: jest.fn().mockReturnValueOnce(new Promise((resolve, reject) => {
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
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction1\":\"SIGN_SHORT_MESSAGE_WITH_DEFAULT_HD_PATH\", \"apdu\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"\", \"apdu\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE_WITH_DEFAULT_HD_PATH\", \"apdu1\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE_WITH_DEFAULT_HD_PATH\", \"apdu\":\"\"}"
                ));
              }))
              .mockReturnValueOnce(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Command aborted, No precise diagnosis.\", \"code\": \"6F00\", \"status\":\"fail\", \"errorTypeId\": \"0\", \"errorType\": \"Applet fail: card operation error\", \"cardInstruction\":\"SIGN_SHORT_MESSAGE_WITH_DEFAULT_HD_PATH\", \"apdu\":\"B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40\"}"
                ));
              }))
              .mockReturnValue(new Promise((resolve, reject) => {
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
  verifyPinAndSignForDefaultHdPath
  */

  test('Test verifyPinAndSignForDefaultHdPath throws error if input arg is not json', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toContain("Unexpected token");
    });  
  });

 test('Test verifyPinAndSignForDefaultHdPath throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPath throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPath throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPath throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPath throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPath throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPath throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPath throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPath throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('\"errorTypeId\" must have value!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPath throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorTypeId\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPath throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPath throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPath throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPath throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPath throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
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
        expect(error.cardInstruction).toBe('SIGN_SHORT_MESSAGE_WITH_DEFAULT_HD_PATH');
        expect(error.apdu).toBe('B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPath throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPath("123456AF",  "5555")
    .then(cardRsponse => {
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


  /*
  verifyPinAndSignForDefaultHdPathWithoutDialog
  */

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog: throws error if input arg is not json', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toContain("Unexpected token");
    });  
  });

 test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"message\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"status\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"code\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorType\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('\"errorTypeId\" must have value!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"errorTypeId\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"cardInstruction\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Json must have \"apdu\" field!');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
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
        expect(error.cardInstruction).toBe('SIGN_SHORT_MESSAGE_WITH_DEFAULT_HD_PATH');
        expect(error.apdu).toBe('B0 A3 00 00 64 0020C66E9ACB1F645B4DDC330957353213207B084DF62127ABC9278B9FED6598BA8A0130E89F6713652A275A667DC0E27CEA32908649C0B5C422C6BB6FF61F12DB37FF401495A0328684BCF817C438782EB1C80B56C7A77C8FEA97D44677EA36E8EF99A5 40');
    });  
  });

  test('Test verifyPinAndSignForDefaultHdPathWithoutDialog throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().verifyPinAndSignForDefaultHdPathWithoutDialog("123456AF",  "5555")
    .then(cardRsponse => {
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








  
  

  
  
 
  

  
  
  

