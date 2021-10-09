import NfcCardModuleWrapper from '../NfcCardModuleWrapper'
import CardError from '../CardError'
import NfcNativeModuleError from '../NfcNativeModuleError'
import {ERR_JSON_MUST_HAVE_MSG_FIELD, 
    ERR_JSON_MUST_HAVE_STATUS_FIELD, 
    ERR_JSON_MUST_HAVE_CODE_FIELD, 
    ERR_JSON_MUST_HAVE_TYPE_FIELD, 
    ERR_JSON_MUST_HAVE_TYPE_ID_FIELD,
    ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL,
    ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD,
    ERR_JSON_MUST_HAVE_APDU_FIELD} from '../NfcCardModuleWrapper'
/*jest.mock('ton-nfc-client', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  inFocusDisplaying: jest.fn()
}))*/

/**
 * Test prepareCardResponseWithoutDelay
 */


test('Positive test prepareCardResponseWithoutDelay', () => {
    let json = '{"message":"2222", "status":"ok"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    let cardRsponse = nfcCardModuleWrapper.prepareCardResponseWithoutDelay(json)
    expect(cardRsponse.message).toBe('2222')
    expect(cardRsponse.status).toBe('ok')
    expect(cardRsponse.ecsHash).toBe('')
    expect(cardRsponse.epHash).toBe('')
    expect(cardRsponse.freeSize).toBe(-1)
    expect(cardRsponse.hmac).toBe('')
    expect(cardRsponse.length).toBe(-1)
    expect(cardRsponse.numberOfKeys).toBe(-1)
    expect(cardRsponse.occupiedSize).toBe(-1)
    expect(cardRsponse.sn).toBe('')
    expect(cardRsponse.serialNumbers.length).toBe(0)
})

test('Test prepareCardResponseWithoutDelay throws error if message field is absent', () => {
    let json = '{"message1":"22223", "status":"ok"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
         nfcCardModuleWrapper.prepareCardResponseWithoutDelay(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_MSG_FIELD))
})

test('Test prepareCardResponseWithoutDelay throws error if message field is empty', () => {
    let json = '{"message":"", "status":"ok"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
         nfcCardModuleWrapper.prepareCardResponseWithoutDelay(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_MSG_FIELD))
})

test('Test prepareCardResponseWithoutDelay throws error if status field is absent', () => {
    let json = '{"message":"22223", "status1":"ok"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
         nfcCardModuleWrapper.prepareCardResponseWithoutDelay(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_STATUS_FIELD))
})

test('Test prepareCardResponseWithoutDelay throws error if status field is empty', () => {
    let json = '{"message":"22223", "status":""}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
         nfcCardModuleWrapper.prepareCardResponseWithoutDelay(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_STATUS_FIELD))
})

test('Test prepareCardResponseWithoutDelay throws error if input arg is not json', () => {
    let json = 'aaa'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
         nfcCardModuleWrapper.prepareCardResponseWithoutDelay(json)
    }).toThrow()
})

/**
 *  Test prepareCardResponse
 */

test('Positive test prepareCardResponse', () => {
    let json = '{"message":"22221", "status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponse(json)
        .then(cardRsponse => {
            console.log(json)
            expect(cardRsponse.message).toBe('22221')
            expect(cardRsponse.status).toBe('ok')
            expect(cardRsponse.ecsHash).toBe('')
            expect(cardRsponse.epHash).toBe('')
            expect(cardRsponse.freeSize).toBe(-1)
            expect(cardRsponse.hmac).toBe('')
            expect(cardRsponse.length).toBe(-1)
            expect(cardRsponse.numberOfKeys).toBe(-1)
            expect(cardRsponse.occupiedSize).toBe(-1)
            expect(cardRsponse.sn).toBe('')
            expect(cardRsponse.serialNumbers.length).toBe(0)
        })
        .catch(_error => {
            expect(true).toBe(false)
        })
})


test('Test prepareCardResponse throws error if message field is absent', () => {
    let json = '{"message1":"22221", "status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponse(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD)
        })
})

test('Test prepareCardResponse throws error if message field is empty', () => {
    let json = '{"message":"", "status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponse(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD)
        })
})

test('Test prepareCardResponse throws error if status field is absent', () => {
    let json = '{"message":"22221", "status1":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponse(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test prepareCardResponse throws error if status field is empty', () => {
    let json = '{"message":"22221", "status":""}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponse(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test prepareCardResponse throws error if input arg is not json', () => {
    let json = 'bbb'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponse(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toContain('Unexpected token')
        })
})

/**
 * Test prepareCardResponseFromGetAllSerialNumbers
 */

test('Positive test prepareCardResponseFromGetAllSerialNumbers', () => {
    let json = '{"message":"HMAC-SHA256 keys are not found.", "status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetAllSerialNumbers(json)
        .then(cardRsponse => {
            console.log(json)
            expect(cardRsponse.message).toBe('HMAC-SHA256 keys are not found.')
            expect(cardRsponse.status).toBe('ok')
            expect(cardRsponse.ecsHash).toBe('')
            expect(cardRsponse.epHash).toBe('')
            expect(cardRsponse.freeSize).toBe(-1)
            expect(cardRsponse.hmac).toBe('')
            expect(cardRsponse.length).toBe(-1)
            expect(cardRsponse.numberOfKeys).toBe(-1)
            expect(cardRsponse.occupiedSize).toBe(-1)
            expect(cardRsponse.sn).toBe('')
            expect(cardRsponse.serialNumbers.length).toBe(0)
        })
        .catch(_error => {
            expect(true).toBe(false)
        })
})

test('Positive test2 prepareCardResponseFromGetAllSerialNumbers', () => {
    let json = '{"message":["504394802433901126813236", "455324585319848551839771"], "status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetAllSerialNumbers(json)
        .then(cardRsponse => {
            console.log(json)
            expect(cardRsponse.message).toBe('')
            expect(cardRsponse.status).toBe('ok')
            expect(cardRsponse.ecsHash).toBe('')
            expect(cardRsponse.epHash).toBe('')
            expect(cardRsponse.freeSize).toBe(-1)
            expect(cardRsponse.hmac).toBe('')
            expect(cardRsponse.length).toBe(-1)
            expect(cardRsponse.numberOfKeys).toBe(-1)
            expect(cardRsponse.occupiedSize).toBe(-1)
            expect(cardRsponse.sn).toBe('')
            expect(cardRsponse.serialNumbers.length).toBe(2)
            expect(cardRsponse.serialNumbers[0]).toBe('504394802433901126813236')
            expect(cardRsponse.serialNumbers[1]).toBe('455324585319848551839771')
        })
        .catch(_error => {
            expect(true).toBe(false)
        })
})

test('Test prepareCardResponseFromGetAllSerialNumbers throws error if message field is absent', () => {
    let json = '{"message1":"22221", "status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetAllSerialNumbers(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD)
        })
})

test('Test prepareCardResponseFromGetAllSerialNumbers throws error if message field is empty', () => {
    let json = '{"message":"", "status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetAllSerialNumbers(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_MSG_FIELD)
        })
})

test('Test prepareCardResponseFromGetAllSerialNumbers throws error if status field is absent', () => {
    let json = '{"message":"22221", "status1":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetAllSerialNumbers(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test prepareCardResponseFromGetAllSerialNumbers throws error if status field is empty', () => {
    let json = '{"message":"22221", "status":""}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetAllSerialNumbers(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test prepareCardResponseFromGetAllSerialNumbers throws error if input arg is not json', () => {
    let json = 'bbb'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetAllSerialNumbers(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toContain('Unexpected token')
        })
})

/**
 *  Test prepareCardResponseFromGetHashes
 */

test('Positive test prepareCardResponseFromGetHashes', () => {
    let json = '{"ecsHash":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","epHash":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF", "serialNumber":"929526125066377952749605", "status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHashes(json)
        .then(cardRsponse => {
            console.log(json)
            expect(cardRsponse.message).toBe('')
            expect(cardRsponse.status).toBe('ok')
            expect(cardRsponse.ecsHash).toBe('26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3')
            expect(cardRsponse.epHash).toBe('EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF')
            expect(cardRsponse.freeSize).toBe(-1)
            expect(cardRsponse.hmac).toBe('')
            expect(cardRsponse.length).toBe(-1)
            expect(cardRsponse.numberOfKeys).toBe(-1)
            expect(cardRsponse.occupiedSize).toBe(-1)
            expect(cardRsponse.sn).toBe('929526125066377952749605')
            expect(cardRsponse.serialNumbers.length).toBe(0)
        })
        .catch(_error => {
            expect(true).toBe(false)
        })
})

test('Test prepareCardResponseFromGetHashes throws error if ecsHash field is absent', () => {
    let json = '{"ecsHash1":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","epHash":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF", "serialNumber":"929526125066377952749605", "status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHashes(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe('Json must have \"ecsHash\", \"epHash\", \"serialNumber\" fields!')
        })
})

test('Test prepareCardResponseFromGetHashes throws error if ecsHash field is empty', () => {
    let json = '{"ecsHash":"","epHash":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF", "serialNumber":"929526125066377952749605", "status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHashes(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe('Json must have \"ecsHash\", \"epHash\", \"serialNumber\" fields!')
        })
})

test('Test prepareCardResponseFromGetHashes throws error if epHash field is absent', () => {
    let json = '{"ecsHash":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","epHash1":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF", "serialNumber":"929526125066377952749605", "status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHashes(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe('Json must have \"ecsHash\", \"epHash\", \"serialNumber\" fields!')
        })
})

test('Test prepareCardResponseFromGetHashes throws error if epHash field is empty', () => {
    let json = '{"ecsHash":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","epHash":"", "serialNumber":"929526125066377952749605", "status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHashes(json).catch(error => {
        expect(error.message).toBe('Json must have \"ecsHash\", \"epHash\", \"serialNumber\" fields!')
    })
})

test('Test prepareCardResponseFromGetHashes throws error if serialNumber field is absent', () => {
    let json = '{"ecsHash":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","epHash":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF", "serialNumber2":"929526125066377952749605", "status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHashes(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe('Json must have \"ecsHash\", \"epHash\", \"serialNumber\" fields!')
        })
})

test('Test prepareCardResponseFromGetHashes throws error if serialNumber field is empty', () => {
    let json = '{"ecsHash":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","epHash":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF", "serialNumber":"", "status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHashes(json).catch(error => {
        expect(error.message).toBe('Json must have \"ecsHash\", \"epHash\", \"serialNumber\" fields!')
    })
})

test('Test prepareCardResponseFromGetHashes throws error if status field is absent', () => {
    let json = '{"ecsHash":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","epHash":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF", "serialNumber":"929526125066377952749605", "status3":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHashes(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test prepareCardResponseFromGetHashes throws error if status field is absent', () => {
    let json = '{"ecsHash":"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3","epHash":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF", "serialNumber":"929526125066377952749605", "status":""}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHashes(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test prepareCardResponseFromGetHashes throws error if input arg is not json', () => {
    let json = 'bbb'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHashes(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toContain('Unexpected token')
        })
})

/**
 * Test prepareCardResponseFromGetKeyChainInfo
 */

test('Positive test prepareCardResponseFromGetKeyChainInfo', () => {
    let json = '{"numberOfKeys":1,"occupiedSize":1,"freeSize":32767,"status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetKeyChainInfo(json)
        .then(cardRsponse => {
            console.log(json)
            expect(cardRsponse.message).toBe('')
            expect(cardRsponse.status).toBe('ok')
            expect(cardRsponse.ecsHash).toBe('')
            expect(cardRsponse.epHash).toBe('')
            expect(cardRsponse.freeSize).toBe(32767)
            expect(cardRsponse.hmac).toBe('')
            expect(cardRsponse.length).toBe(-1)
            expect(cardRsponse.numberOfKeys).toBe(1)
            expect(cardRsponse.occupiedSize).toBe(1)
            expect(cardRsponse.sn).toBe('')
            expect(cardRsponse.serialNumbers.length).toBe(0)
        })
        .catch(_error => {
            expect(true).toBe(false)
        })
})

test('Test prepareCardResponseFromGetKeyChainInfo throws error if numberOfKeys field is absent', () => {
    let json = '{"numberOfKeys":0,"occupiedSize1":0,"freeSize":32767,"status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetKeyChainInfo(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe('Json must have \"occupiedSize\", \"freeSize\" and \"numberOfKeys\" fields!')
        })
})

test('Test prepareCardResponseFromGetKeyChainInfo throws error if occupiedSize field is absent', () => {
    let json = '{"numberOfKeys":0,"occupiedSize1":0,"freeSize":32767,"status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetKeyChainInfo(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe('Json must have \"occupiedSize\", \"freeSize\" and \"numberOfKeys\" fields!')
        })
})

test('Test prepareCardResponseFromGetKeyChainInfo throws error if freeSize field is absent', () => {
    let json = '{"occupiedSize":0,"numberOfKeys":0,"freeSize1":32767,"status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetKeyChainInfo(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe('Json must have \"occupiedSize\", \"freeSize\" and \"numberOfKeys\" fields!')
        })
})


test('Test prepareCardResponseFromGetKeyChainInfo throws error if status field is absent', () => {
    let json = '{"numberOfKeys":0,"occupiedSize":0,"freeSize":32767,"status8":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetKeyChainInfo(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test prepareCardResponseFromGetKeyChainInfo throws error if input arg is not json', () => {
    let json = 'bbb'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetKeyChainInfo(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toContain('Unexpected token')
        })
})

/**
 * Test prepareCardResponseFromGetHmac
 */

test('Positive test prepareCardResponseFromGetHmac', () => {
    let json = '{"hmac":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF","length":32,"status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHmac(json)
        .then(cardRsponse => {
            console.log(json)
            expect(cardRsponse.message).toBe('')
            expect(cardRsponse.status).toBe('ok')
            expect(cardRsponse.ecsHash).toBe('')
            expect(cardRsponse.epHash).toBe('')
            expect(cardRsponse.freeSize).toBe(-1)
            expect(cardRsponse.hmac).toBe('EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF')
            expect(cardRsponse.length).toBe(32)
            expect(cardRsponse.numberOfKeys).toBe(-1)
            expect(cardRsponse.occupiedSize).toBe(-1)
            expect(cardRsponse.sn).toBe('')
            expect(cardRsponse.serialNumbers.length).toBe(0)
        })
        .catch(_error => {
            expect(true).toBe(false)
        })
})

test('Test prepareCardResponseFromGetHmac throws error if hmac field is absent', () => {
    let json = '{"hmac1":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF","length":32,"status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHmac(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe('Json must have \"hmac\" and \"length\" fields!')
        })
})

test('Test prepareCardResponseFromGetHmac throws error if hmac field is empty', () => {
    let json = '{"hmac":"","length":32,"status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHmac(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe('Json must have \"hmac\" and \"length\" fields!')
        })
})

test('Test prepareCardResponseFromGetHmac throws error if length field is absent', () => {
    let json = '{"hmac":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF","length1":32,"status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHmac(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe('Json must have \"hmac\" and \"length\" fields!')
        })
})

test('Test prepareCardResponseFromGetHmac throws error if length field is empty', () => {
    let json = '{"hmac":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF","length":0,"status":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHmac(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe('Json must have \"hmac\" and \"length\" fields!')
        })
})

test('Test prepareCardResponseFromGetHmac throws error if status field is absent', () => {
    let json = '{"hmac":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF","length":32,"status8":"ok"}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHmac(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})

test('Test prepareCardResponseFromGetHmac throws error if status field is empty', () => {
    let json = '{"hmac":"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF","length":32,"status":""}'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHmac(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toBe(ERR_JSON_MUST_HAVE_STATUS_FIELD)
        })
})


test('Test prepareCardResponseFromGetHmac throws error if input arg is not json', () => {
    let json = 'bbb'
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    return nfcCardModuleWrapper.prepareCardResponseFromGetHmac(json)
        .then(_cardRsponse => {
            expect(true).toBe(false)
        })
        .catch(error => {
            expect(error.message).toContain('Unexpected token')
        })
})

/**
 * Test throwError
 */

test('Test throwError throws error if input arg is not json', () => {
    let json = 'aaa'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
         nfcCardModuleWrapper.throwError(json)
    }).toThrow()
})

test('Test throwError throws error if message field is empty', () => {
    let json = '{"message":"", "status":"fail", "code": "30006", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
         nfcCardModuleWrapper.throwError(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_MSG_FIELD))
})

test('Test throwError throws error if message field is absent', () => {
    let json = '{"message1":"22223", "status":"fail", "code": "30006", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
         nfcCardModuleWrapper.throwError(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_MSG_FIELD))
})

test('Test throwError throws error if status field is empty', () => {
    let json = '{"message":"22223", "status":"", "code": "30006", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
         nfcCardModuleWrapper.throwError(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_STATUS_FIELD))
})

test('Test throwError throws error if status field is absent', () => {
    let json = '{"message":"22223", "status1":"fail", "code": "30006", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
         nfcCardModuleWrapper.throwError(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_STATUS_FIELD))
})

test('Test throwError throws error if code field is empty', () => {
    let json = '{"message":"22223", "code": "", "status":"fail", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
         nfcCardModuleWrapper.throwError(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_CODE_FIELD))
})

test('Test throwError throws error if code field is absent', () => {
    let json = '{"message":"22223", "code1": "30006", "status":"fail", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
         nfcCardModuleWrapper.throwError(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_CODE_FIELD))
})

test('Test throwError throws error if errorType field is empty', () => {
    let json = '{"message":"22223", "code": "30006", "status":"fail", "errorTypeId": "3", "errorType": ""}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
        nfcCardModuleWrapper.throwError(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_TYPE_FIELD))
})


test('Test throwError throws error if errorType field is absent', () => {
    let json = '{"message":"22223", "code": "30006", "status":"fail", "errorTypeId": "3", "errorType1": "Native code fail: incorrect format of input data"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
         nfcCardModuleWrapper.throwError(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_TYPE_FIELD))
})

test('Test throwError throws error if errorTypeId field is absent', () => {
    let json = '{"message":"22223", "code": "30006", "status":"fail", "errorTypeId1": "3", "errorType": "Native code fail: incorrect format of input data"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
        nfcCardModuleWrapper.throwError(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_TYPE_ID_FIELD))
})

test('Test throwError throws error if errorTypeId field is empty', () => {
    let json = '{"message":"22223", "code": "30006", "status":"fail", "errorTypeId": "", "errorType": "Native code fail: incorrect format of input data"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
         nfcCardModuleWrapper.throwError(json)
    }).toThrow(new Error(ERR_JSON_TYPE_ID_FIELD_MUST_HAVE_VAL))
})


test('Test throwError throws error if errorTypeId =  0 and cardInstruction field is absent', () => {
    let json = '{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction1":"VERIFY_PIN", "apdu":"B0 A2 00 00 44"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
        nfcCardModuleWrapper.throwError(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD))
})

test('Test throwError throws error if errorTypeId =  0 and cardInstruction field is empty', () => {
    let json = '{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"", "apdu":"B0 A2 00 00 44"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
        nfcCardModuleWrapper.throwError(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_CARD_INSTRUCTION_FIELD))
})

test('Test throwError throws error if errorTypeId =  0 and apdu field is absent', () => {
    let json = '{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"VERIFY_PIN", "apdu1":"B0 A2 00 00 44"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
        nfcCardModuleWrapper.throwError(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_APDU_FIELD))
})

test('Test throwError throws error if errorTypeId =  0 and apdu field is empty', () => {
    let json = '{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"VERIFY_PIN", "apdu":""}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
        nfcCardModuleWrapper.throwError(json)
    }).toThrow(new Error(ERR_JSON_MUST_HAVE_APDU_FIELD))
})

test('Positive Test throwError throws error if errorTypeId =  0', () => {
    let json = '{"message":"Command aborted, No precise diagnosis.", "code": "6F00", "status":"fail", "errorTypeId": "0", "errorType": "Applet fail: card operation error", "cardInstruction":"VERIFY_PIN", "apdu":"B0 A2 00 00 44"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
        nfcCardModuleWrapper.throwError(json)
    }).toThrow(new CardError('Command aborted, No precise diagnosis.', 'fail', '6F00', '0', 'Applet fail: card operation error', 'VERIFY_PIN', 'B0 A2 00 00 44'))
})

test('Positive Test throwError throws error if errorTypeId > 0', () => {
    let json = '{"message":"Pin must be a numeric string of length 4.", "code": "30006", "status":"fail", "errorTypeId": "3", "errorType": "Native code fail: incorrect format of input data"}'
    console.log(json)
    let nfcCardModuleWrapper = new NfcCardModuleWrapper()
    expect(() => {
         nfcCardModuleWrapper.throwError(json)
    }).toThrow(new NfcNativeModuleError('Pin must be a numeric string of length 4.', 'fail', '30006', '3', 'Native code fail: incorrect format of input data'))
})
