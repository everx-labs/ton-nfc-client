import NfcCardModuleWrapper from '../NfcCardModuleWrapper';

/**
 * Test the validity of CardResponses created by methods of NfcCardModuleWrapper
 * (part of methods related to NFC device functionality)
 **/

jest.mock('react-native', () => {
    return {
        NativeModules: {
            NfcCardModule: {
                checkIfNfcSupported: jest.fn( () => {
                    return new Promise((resolve, _reject) => {
                        resolve("{\"message\":\"true\", \"status\":\"ok\"}");
                    })
                }),
                checkIfNfcEnabled: jest.fn( () => {
                    return new Promise((resolve, _reject) => {
                        resolve("{\"message\":\"true\", \"status\":\"ok\"}");
                    })
                }),
                openNfcSettings: jest.fn( () => {
                    return new Promise((resolve, _reject) => {
                        resolve("{\"message\":\"done\", \"status\":\"ok\"}");
                    })
                })
            }
        },
        Platform: {
            OS: "android"
        }
    };
});

/**
 * checkIfNfcSupported
 */

test('Positive test checkIfNfcSupported', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.checkIfNfcSupported().then(cardRsponse => {
        console.log(cardRsponse.message);
        expect(cardRsponse.message).toBe("true");
        expect(cardRsponse.status).toBe("ok");
        expect(cardRsponse.ecsHash).toBe("");
        expect(cardRsponse.epHash).toBe("");
        expect(cardRsponse.freeSize).toBe(-1);
        expect(cardRsponse.hmac).toBe("");
        expect(cardRsponse.length).toBe(-1);
        expect(cardRsponse.numberOfKeys).toBe(-1);
        expect(cardRsponse.occupiedSize).toBe(-1);
        expect(cardRsponse.sn).toBe("");
        expect(cardRsponse.serialNumbers.length).toBe(0);
    })
        .catch(error => {
            console.log(error.message);
            expect(true).toBe(false);
        });
});

/**
 * checkIfNfcEnabled
 */

test('Positive test checkIfNfcEnabled', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.checkIfNfcEnabled().then(cardRsponse => {
        console.log(cardRsponse.message);
        expect(cardRsponse.message).toBe("true");
        expect(cardRsponse.status).toBe("ok");
        expect(cardRsponse.ecsHash).toBe("");
        expect(cardRsponse.epHash).toBe("");
        expect(cardRsponse.freeSize).toBe(-1);
        expect(cardRsponse.hmac).toBe("");
        expect(cardRsponse.length).toBe(-1);
        expect(cardRsponse.numberOfKeys).toBe(-1);
        expect(cardRsponse.occupiedSize).toBe(-1);
        expect(cardRsponse.sn).toBe("");
        expect(cardRsponse.serialNumbers.length).toBe(0);
    })
        .catch(error => {
            console.log(error.message);
            expect(true).toBe(false);
        });
});

/**
 * openNfcSettings
 */

test('Positive test openNfcSettings', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.openNfcSettings().then(cardRsponse => {
        console.log(cardRsponse.message);
        expect(cardRsponse.message).toBe("done");
        expect(cardRsponse.status).toBe("ok");
        expect(cardRsponse.ecsHash).toBe("");
        expect(cardRsponse.epHash).toBe("");
        expect(cardRsponse.freeSize).toBe(-1);
        expect(cardRsponse.hmac).toBe("");
        expect(cardRsponse.length).toBe(-1);
        expect(cardRsponse.numberOfKeys).toBe(-1);
        expect(cardRsponse.occupiedSize).toBe(-1);
        expect(cardRsponse.sn).toBe("");
        expect(cardRsponse.serialNumbers.length).toBe(0);
    })
        .catch(error => {
            console.log(error.message);
            expect(true).toBe(false);
        });
});