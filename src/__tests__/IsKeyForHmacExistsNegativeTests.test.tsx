import NfcCardModuleWrapper from '../NfcCardModuleWrapper';
import {ERR_JSON_MUST_HAVE_MSG_FIELD, 
  ERR_JSON_MUST_HAVE_STATUS_FIELD, 
  ERR_JSON_MUST_HAVE_CODE_FIELD, 
  ERR_JSON_MUST_HAVE_TYPE_FIELD, 
  ERR_JSON_MUST_HAVE_TYPE_ID_FIELD,
  ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL} from '../NfcCardModuleWrapper'
/**
 * Tests for isKeyForHmacExist method validating different cases when it can throw errors.
 */

jest.mock('react-native', () => {
    return {
      NativeModules: {
        NfcCardModule: {
            isKeyForHmacExist: jest.fn()
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
              .mockReturnValue(new Promise((resolve, reject) => {
                reject(new Error("{\"message\":\"Key for hmac signing for specified serial number does not exist.\", \"code\": \"80000\", \"status\":\"fail\", \"errorTypeId\": \"8\", \"errorType\": \"Native code (Android) fail: hmac key issue\"}"
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
  isKeyForHmacExist
  */

 test('Test isKeyForHmacExist throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().isKeyForHmacExist("504394802433901126813236")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test isKeyForHmacExist throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().isKeyForHmacExist("504394802433901126813236")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD);
    });  
  });

  test('Test isKeyForHmacExist throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().isKeyForHmacExist("504394802433901126813236")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test isKeyForHmacExist throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().isKeyForHmacExist("504394802433901126813236")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD);
    });  
  });

  test('Test isKeyForHmacExist throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().isKeyForHmacExist("504394802433901126813236")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test isKeyForHmacExist throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().isKeyForHmacExist("504394802433901126813236")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD);
    });  
  });

  test('Test isKeyForHmacExist throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().isKeyForHmacExist("504394802433901126813236")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test isKeyForHmacExist throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().isKeyForHmacExist("504394802433901126813236")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD);
    });  
  });

  test('Test isKeyForHmacExist throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().isKeyForHmacExist("504394802433901126813236")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL);
    });  
  });

  test('Test isKeyForHmacExist throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().isKeyForHmacExist("504394802433901126813236")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_ID_FIELD);
    });  
  });

  test('Test isKeyForHmacExist throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().isKeyForHmacExist("504394802433901126813236")
    .then(cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe('Key for hmac signing for specified serial number does not exist.');
        expect(error.status).toBe('fail');
        expect(error.errorCode).toBe('80000');
        expect(error.errorTypeId).toBe('8');
        expect(error.errorType).toBe('Native code (Android) fail: hmac key issue');
    });  
  });









  
  

  
  
 
  

  
  
  

