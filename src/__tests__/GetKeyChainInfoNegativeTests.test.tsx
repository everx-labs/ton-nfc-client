import NfcCardModuleWrapper from '../NfcCardModuleWrapper'
import {ERR_JSON_MUST_HAVE_MSG_FIELD, 
    ERR_JSON_MUST_HAVE_STATUS_FIELD, 
    ERR_JSON_MUST_HAVE_CODE_FIELD, 
    ERR_JSON_MUST_HAVE_TYPE_FIELD, 
    ERR_JSON_MUST_HAVE_TYPE_ID_FIELD,
    ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL,
    ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD,
    ERR_JSON_MUST_HAVE_APDU_FIELD,
    ERR_JSON_MUST_HAVE_OCCUPIED_FREE_SIZES_NUMBER_OF_KEYS_FIELDS} from '../NfcCardModuleWrapper'

/**
 * Tests for getKeyChainInfo method validating different cases when it can throw errors.
 */

jest.mock('react-native', () => {
    return {
        NativeModules: {
            NfcCardModule: {
                getKeyChainInfo: jest.fn()
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"", "status":"fail", "code": "30006", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message1":"22223", "status":"fail", "code": "30006", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "status":"", "code": "30006", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "status1":"fail", "code": "30006", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "code": "", "status":"fail", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "code1": "30006", "status":"fail", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "code": "30006", "status":"fail", "errorTypeId": "3", "errorType": ""}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "code": "30006", "status":"fail", "errorTypeId": "3", "errorType1": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "code": "30006", "status":"fail", "errorTypeId": "", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "code": "30006", "status":"fail", "errorTypeId1": "3", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction1":"GET_NUMBER_OF_KEYS", "apdu":"B0 B8 00 00 40 9D7D35526332B85A16C99F21A2111B2CF25BAA1882615EAC07F4B575268C852C3CF637B20E1FAA47BF8E282ADE3E1D30D33112863DFFF2304CB4351F05BCB9E1 02"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"", "apdu":"B0 B8 00 00 40 9D7D35526332B85A16C99F21A2111B2CF25BAA1882615EAC07F4B575268C852C3CF637B20E1FAA47BF8E282ADE3E1D30D33112863DFFF2304CB4351F05BCB9E1 02"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"GET_NUMBER_OF_KEYS", "apdu1":"B0 B8 00 00 40 9D7D35526332B85A16C99F21A2111B2CF25BAA1882615EAC07F4B575268C852C3CF637B20E1FAA47BF8E282ADE3E1D30D33112863DFFF2304CB4351F05BCB9E1 02"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"GET_NUMBER_OF_KEYS", "apdu":""}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"GET_NUMBER_OF_KEYS", "apdu":"B0 B8 00 00 40 9D7D35526332B85A16C99F21A2111B2CF25BAA1882615EAC07F4B575268C852C3CF637B20E1FAA47BF8E282ADE3E1D30D33112863DFFF2304CB4351F05BCB9E1 02"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        resolve(new Error('{"numberOfKeys1":1,"occupiedSize":1,"freeSize":32767,"status":"ok"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        resolve(new Error('{"numberOfKeys":1,"occupiedSize2":1,"freeSize":32767,"status":"ok"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        resolve(new Error('{"numberOfKeys":1,"occupiedSize":1,"freeSize3":32767,"status":"ok"}',
                        ))
                    }))
                    .mockReturnValue(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Nfc connection establishing error.", "code": "220000", "status":"fail", "errorTypeId": "22", "errorType": "Android code fail: NFC error"}',
                        ))
                    })),

                //

                getKeyChainInfoWithoutDialog: jest.fn()
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"", "status":"fail", "code": "30006", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message1":"22223", "status":"fail", "code": "30006", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "status":"", "code": "30006", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "status1":"fail", "code": "30006", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "code": "", "status":"fail", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "code1": "30006", "status":"fail", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "code": "30006", "status":"fail", "errorTypeId": "3", "errorType": ""}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "code": "30006", "status":"fail", "errorTypeId": "3", "errorType1": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "code": "30006", "status":"fail", "errorTypeId": "", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"22223", "code": "30006", "status":"fail", "errorTypeId1": "3", "errorType": "Native code fail: incorrect format of input data"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction1":"GET_NUMBER_OF_KEYS", "apdu":"B0 B8 00 00 40 9D7D35526332B85A16C99F21A2111B2CF25BAA1882615EAC07F4B575268C852C3CF637B20E1FAA47BF8E282ADE3E1D30D33112863DFFF2304CB4351F05BCB9E1 02"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"", "apdu":"B0 B8 00 00 40 9D7D35526332B85A16C99F21A2111B2CF25BAA1882615EAC07F4B575268C852C3CF637B20E1FAA47BF8E282ADE3E1D30D33112863DFFF2304CB4351F05BCB9E1 02"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"GET_NUMBER_OF_KEYS", "apdu1":"B0 B8 00 00 40 9D7D35526332B85A16C99F21A2111B2CF25BAA1882615EAC07F4B575268C852C3CF637B20E1FAA47BF8E282ADE3E1D30D33112863DFFF2304CB4351F05BCB9E1 02"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"GET_NUMBER_OF_KEYS", "apdu":""}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"GET_NUMBER_OF_KEYS", "apdu":"B0 B8 00 00 40 9D7D35526332B85A16C99F21A2111B2CF25BAA1882615EAC07F4B575268C852C3CF637B20E1FAA47BF8E282ADE3E1D30D33112863DFFF2304CB4351F05BCB9E1 02"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        resolve(new Error('{"numberOfKeys1":1,"occupiedSize":1,"freeSize":32767,"status":"ok"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        resolve(new Error('{"numberOfKeys":1,"occupiedSize2":1,"freeSize":32767,"status":"ok"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        resolve(new Error('{"numberOfKeys":1,"occupiedSize":1,"freeSize3":32767,"status":"ok"}',
                        ))
                    }))
                    .mockReturnValue(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Nfc connection establishing error.", "code": "220000", "status":"fail", "errorTypeId": "22", "errorType": "Android code fail: NFC error"}',
                        ))
                    })),

            },
        },
        Platform: {
            OS: 'android',
        },
    }
})

/*
getKeyChainInfo
*/


test('Test getKeyChainInfo throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD)
        })
})

test('Test getKeyChainInfo throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD)
        })
})

test('Test getKeyChainInfo throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test getKeyChainInfo throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test getKeyChainInfo throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD)
        })
})

test('Test getKeyChainInfo throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD)
        })
})

test('Test getKeyChainInfo throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD)
        })
})

test('Test getKeyChainInfo throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD)
        })
})

test('Test getKeyChainInfo throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL)
        })
})

test('Test getKeyChainInfo throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_ID_FIELD)
        })
})

test('Test getKeyChainInfo throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD)
        })
})

test('Test getKeyChainInfo throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD)
        })
})

test('Test getKeyChainInfo throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD)
        })
})

test('Test getKeyChainInfo throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD)
        })
})

test('Test getKeyChainInfo throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe('Command aborted, No precise diagnosis.')
            expect(error.status).toBe('fail')
            expect(error.errorCode).toBe('6F00')
            expect(error.errorTypeId).toBe('0')
            expect(error.errorType).toBe('Applet fail: card operation error')
            expect(error.cardInstruction).toBe('GET_NUMBER_OF_KEYS')
            expect(error.apdu).toBe('B0 B8 00 00 40 9D7D35526332B85A16C99F21A2111B2CF25BAA1882615EAC07F4B575268C852C3CF637B20E1FAA47BF8E282ADE3E1D30D33112863DFFF2304CB4351F05BCB9E1 02')
        })
})

test('Test getKeyChainInfo throws error if numberOfKeys field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_OCCUPIED_FREE_SIZES_NUMBER_OF_KEYS_FIELDS)
        })
})

test('Test getKeyChainInfo throws error if occupiedSize field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_OCCUPIED_FREE_SIZES_NUMBER_OF_KEYS_FIELDS)
        })
})

test('Test getKeyChainInfo throws error if freeSize field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_OCCUPIED_FREE_SIZES_NUMBER_OF_KEYS_FIELDS)
        })
})

test('Test getKeyChainInfo throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().getKeyChainInfo()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe('Nfc connection establishing error.')
            expect(error.status).toBe('fail')
            expect(error.errorCode).toBe('220000')
            expect(error.errorTypeId).toBe('22')
            expect(error.errorType).toBe('Android code fail: NFC error')
        })
})


/*
getKeyChainInfoWithoutDialog
*/

test('Test getKeyChainInfoWithoutDialog throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD)
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD)
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD)
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD)
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD)
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD)
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL)
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_ID_FIELD)
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD)
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD)
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD)
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD)
        })
})

test('Test getKeyChainInfoWithoutDialog throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe('Command aborted, No precise diagnosis.')
            expect(error.status).toBe('fail')
            expect(error.errorCode).toBe('6F00')
            expect(error.errorTypeId).toBe('0')
            expect(error.errorType).toBe('Applet fail: card operation error')
            expect(error.cardInstruction).toBe('GET_NUMBER_OF_KEYS')
            expect(error.apdu).toBe('B0 B8 00 00 40 9D7D35526332B85A16C99F21A2111B2CF25BAA1882615EAC07F4B575268C852C3CF637B20E1FAA47BF8E282ADE3E1D30D33112863DFFF2304CB4351F05BCB9E1 02')
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if numberOfKeys field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_OCCUPIED_FREE_SIZES_NUMBER_OF_KEYS_FIELDS)
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if occupiedSize field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_OCCUPIED_FREE_SIZES_NUMBER_OF_KEYS_FIELDS)
        })
})

test('Test getKeyChainInfoWithoutDialog throws error if freeSize field is absent', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_OCCUPIED_FREE_SIZES_NUMBER_OF_KEYS_FIELDS)
        })
})

test('Test getKeyChainInfoWithoutDialog throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().getKeyChainInfoWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe('Nfc connection establishing error.')
            expect(error.status).toBe('fail')
            expect(error.errorCode).toBe('220000')
            expect(error.errorTypeId).toBe('22')
            expect(error.errorType).toBe('Android code fail: NFC error')
        })
})








  
  

  
  
 
  

  
  
  

