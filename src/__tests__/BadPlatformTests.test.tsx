import NfcCardModuleWrapper from '../NfcCardModuleWrapper';
import {WRONG_PLATFORM_ERROR} from '../NfcCardModuleWrapper'
jest.mock('react-native', () => {
    return {
        NativeModules: {
            NfcCardModule: {

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
            OS: "ios"
        }
    };
});


test('Test checkIfNfcEnabled', () => {
    return new NfcCardModuleWrapper().checkIfNfcEnabled()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(WRONG_PLATFORM_ERROR);
    });  
  });

  test('Test openNfcSettings', () => {
    return new NfcCardModuleWrapper().openNfcSettings()
    .then(_cardRsponse => {
        expect(true).toBe(false);
    })
    .catch(error => {
        console.log(error.message)
        expect(error.message).toBe(WRONG_PLATFORM_ERROR);
    });  
  });
