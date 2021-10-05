import NfcCardModuleWrapper from '../NfcCardModuleWrapper'
import {ERR_JSON_MUST_HAVE_MSG_FIELD, 
    ERR_JSON_MUST_HAVE_STATUS_FIELD, 
    ERR_JSON_MUST_HAVE_CODE_FIELD, 
    ERR_JSON_MUST_HAVE_TYPE_FIELD, 
    ERR_JSON_MUST_HAVE_TYPE_ID_FIELD,
    ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL,
    ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD,
    ERR_JSON_MUST_HAVE_APDU_FIELD,
    ERR_JSON_MUST_HAVE_ECS_EP_SN_FIELDS} from '../NfcCardModuleWrapper'

/**
 * Tests for getHashes method validating different cases when it can throw errors.
 */

jest.mock('react-native', () => {
    return {
        NativeModules: {
            NfcCardModule: {
                getHashes: jest.fn()
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
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction1":"GET_HASH_OF_ENCRYPTED_PASSWORD", "apdu":"B0 93 00 00 20"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"", "apdu":"B0 93 00 00 20"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"GET_HASH_OF_ENCRYPTED_PASSWORD", "apdu1":"B0 93 00 00 20"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"GET_HASH_OF_ENCRYPTED_PASSWORD", "apdu":""}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"GET_HASH_OF_ENCRYPTED_PASSWORD", "apdu":"B0 93 00 00 20"}',
                        ))
                    }))

                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        resolve(new Error('{"ecsHash1":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","epHash":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF", "serialNumber":"929526125066377952749605", "status":"ok"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        resolve(new Error('{"ecsHash":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","epHash2":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF", "serialNumber":"929526125066377952749605", "status":"ok"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        resolve(new Error('{"ecsHash":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","epHash":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF", "serialNumber3":"929526125066377952749605", "status":"ok"}',
                        ))
                    }))
                    .mockReturnValue(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Nfc connection establishing error.", "code": "220000", "status":"fail", "errorTypeId": "22", "errorType": "Android code fail: NFC error"}',
                        ))
                    })),

                getHashesWithoutDialog: jest.fn()
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
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction1":"GET_HASH_OF_ENCRYPTED_PASSWORD", "apdu":"B0 93 00 00 20"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"", "apdu":"B0 93 00 00 20"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"GET_HASH_OF_ENCRYPTED_PASSWORD", "apdu1":"B0 93 00 00 20"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"GET_HASH_OF_ENCRYPTED_PASSWORD", "apdu":""}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        reject(new Error('{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"GET_HASH_OF_ENCRYPTED_PASSWORD", "apdu":"B0 93 00 00 20"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        resolve(new Error('{"ecsHash1":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","epHash":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF", "serialNumber":"929526125066377952749605", "status":"ok"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        resolve(new Error('{"ecsHash":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","epHash2":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF", "serialNumber":"929526125066377952749605", "status":"ok"}',
                        ))
                    }))
                    .mockReturnValueOnce(new Promise((resolve, reject) => {
                        resolve(new Error('{"ecsHash":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","epHash":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF", "serialNumber3":"929526125066377952749605", "status":"ok"}',
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
getHashes
*/


test('Test getHashes throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD)
        })
})

test('Test getHashes throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD)
        })
})

test('Test getHashes throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test getHashes throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test getHashes throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD)
        })
})

test('Test getHashes throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD)
        })
})

test('Test getHashes throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD)
        })
})

test('Test getHashes throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD)
        })
})

test('Test getHashes throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL)
        })
})

test('Test getHashes throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_ID_FIELD)
        })
})

test('Test getHashes throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD)
        })
})

test('Test getHashes throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD)
        })
})

test('Test getHashes throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD)
        })
})

test('Test getHashes throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD)
        })
})

test('Test getHashes throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().getHashes()
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
            expect(error.cardInstruction).toBe('GET_HASH_OF_ENCRYPTED_PASSWORD')
            expect(error.apdu).toBe('B0 93 00 00 20')
        })
})

test('Test getHashes throws error if ecsHash field is absent', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_ECS_EP_SN_FIELDS)
        })
})

test('Test getHashes throws error if epHash field is absent', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_ECS_EP_SN_FIELDS)
        })
})

test('Test getHashes throws error if serialNumber field is absent', () => {
    return new NfcCardModuleWrapper().getHashes()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_ECS_EP_SN_FIELDS)
        })
})

test('Test getHashes throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().getHashes()
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
getHashesWithoutDialog
*/


test('Test getHashesWithoutDialog throws error if message field is empty', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD)
        })
})

test('Test getHashesWithoutDialog throws error if message field is absent', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD)
        })
})

test('Test getHashesWithoutDialog throws error if status field is empty', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test getHashesWithoutDialog throws error if status field is absent', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test getHashesWithoutDialog throws error if code field is empty', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD)
        })
})

test('Test getHashesWithoutDialog throws error if code field is absent', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CODE_FIELD)
        })
})

test('Test getHashesWithoutDialog throws error if errorType field is empty', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD)
        })
})

test('Test getHashesWithoutDialog throws error if errorType field is absent', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_FIELD)
        })
})

test('Test getHashesWithoutDialog throws error if errorTypeId field is empty', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL)
        })
})

test('Test getHashesWithoutDialog throws error if errorTypeId field is absent', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_TYPE_ID_FIELD)
        })
})

test('Test getHashesWithoutDialog throws error if cardInstruction field is empty', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD)
        })
})

test('Test getHashesWithoutDialog throws error if cardInstruction field is absent', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD)
        })
})

test('Test getHashesWithoutDialog throws error if apdu field is empty', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD)
        })
})

test('Test getHashesWithoutDialog throws error if apdu field is absent', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_APDU_FIELD)
        })
})

test('Test getHashesWithoutDialog throws CardError if errorTypeId =  0', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
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
            expect(error.cardInstruction).toBe('GET_HASH_OF_ENCRYPTED_PASSWORD')
            expect(error.apdu).toBe('B0 93 00 00 20')
        })
})


test('Test getHashesWithoutDialog  throws error if ecsHash field is absent', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_ECS_EP_SN_FIELDS)
        })
})

test('Test getHashesWithoutDialog  throws error if epHash field is absent', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_ECS_EP_SN_FIELDS)
        })
})

test('Test getHashesWithoutDialog  throws error if serialNumber field is absent', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
        .then(cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            console.log(error.message)
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_ECS_EP_SN_FIELDS)
        })
})

test('Test getHashesWithoutDialog throws NfcNativeModuleError if errorTypeId >  0', () => {
    return new NfcCardModuleWrapper().getHashesWithoutDialog()
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