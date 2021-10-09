import NfcCardModuleWrapper from '../NfcCardModuleWrapper';

/**
 * Test the validity of CardResponses created by methods of NfcCardModuleWrapper
 * (part of methods related to card activation functionality)
 **/

jest.mock('react-native', () => {
    return {
      NativeModules: {
        NfcCardModule: {
          turnOnWalletWithPin: jest.fn( (_newPin: string,
            _authenticationPassword: string,
            _commonSecret: string,
            _initialVector: string) => {
          return new Promise((resolve, _reject) => {
            resolve("{\"message\":\"done\", \"status\":\"ok\"}");
          })
        }),
        turnOnWallet: jest.fn( (
            _authenticationPassword: string,
            _commonSecret: string,
            _initialVector: string) => {
          return new Promise((resolve, _reject) => {
            resolve("{\"message\":\"done\", \"status\":\"ok\"}");
          })
        }),
        getHashOfEncryptedCommonSecret: jest.fn( () => {
          return new Promise((resolve, _reject) => {
            resolve("{\"message\":\"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF\", \"status\":\"ok\"}");
          })
        }),
        getHashOfEncryptedPassword: jest.fn( () => {
            return new Promise((resolve, _reject) => {
              resolve("{\"message\":\"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF\", \"status\":\"ok\"}");
            })
          }),
        getHashes: jest.fn( () => {
            return new Promise((resolve, _reject) => {
              resolve("{\"ecsHash\":\"26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3\",\"epHash\":\"EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF\", \"serialNumber\":\"929526125066377952749605\", \"status\":\"ok\"}");
            })
          }),    
        }
      },
      Platform: {
        OS: "android"
      }
    };
  });

  /**
   * getHashes
   */

   test('Positive test getHashes', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getHashes().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("");
      expect(cardRsponse.status).toBe("ok");
      expect(cardRsponse.ecsHash).toBe("26D4B03C0C0E168DC33E48BBCEB457C21364658C9D487341827BBFFB4D8B38F3");
      expect(cardRsponse.epHash).toBe("EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF");
      expect(cardRsponse.freeSize).toBe(-1);
      expect(cardRsponse.hmac).toBe("");
      expect(cardRsponse.length).toBe(-1);
      expect(cardRsponse.numberOfKeys).toBe(-1);
      expect(cardRsponse.occupiedSize).toBe(-1);
      expect(cardRsponse.sn).toBe("929526125066377952749605");
      expect(cardRsponse.serialNumbers.length).toBe(0);
    })
    .catch(error => {
      console.log(error.message);
      expect(true).toBe(false);
    }); 
  });


  /**
   * getHashOfEncryptedPassword
   */

   test('Positive test getHashOfEncryptedPassword', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getHashOfEncryptedPassword().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF");
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
   * getHashOfEncryptedCommonSecret
   */

   test('Positive test getHashOfEncryptedCommonSecret', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    return nfcCardModuleWrapper.getHashOfEncryptedCommonSecret().then(cardRsponse => {
      console.log(cardRsponse.message);
      expect(cardRsponse.message).toBe("EFBF24AC1563B34ADB0FFE0B0A53659E72E26765704C109C95346EEAA1D4BEAF");
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
   * turnOnWalletWithPin
  */

   test('Positive test turnOnWalletWithPin', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    let pin = "5555";
    let p1 = "1A2B1ABC9E7FB7746E34F8D8CA415025257369010A082FE2F823BFAF8DF4C1ABC0C9B160358F55AF918878EB1F959EBE684F2835B868E742F10BF9D2A8DD7FA3F255A9BC1701DBBD551C6E221E06C570F3F3BE7C5A77C97F83485252FE89F91961EAF239DCBB4EF40BD87CA83815F60C7AC0A67C62484CBACE235CEB6ACCEEFE";
    let cs = "158BDE7FD53048BFF95E85947BBC08A1F4EF1A158F5975B0D7065CFB41F122C0";
    let sn = "504394802433901126813236";
    return nfcCardModuleWrapper.turnOnWalletWithPin(pin, p1, cs, sn).then(cardRsponse => {
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
   

  /** 
   * turnOnWallet
  */

   test('Positive test turnOnWallet', () => {
    let nfcCardModuleWrapper = new NfcCardModuleWrapper();
    let p1 = "1A2B1ABC9E7FB7746E34F8D8CA415025257369010A082FE2F823BFAF8DF4C1ABC0C9B160358F55AF918878EB1F959EBE684F2835B868E742F10BF9D2A8DD7FA3F255A9BC1701DBBD551C6E221E06C570F3F3BE7C5A77C97F83485252FE89F91961EAF239DCBB4EF40BD87CA83815F60C7AC0A67C62484CBACE235CEB6ACCEEFE";
    let cs = "158BDE7FD53048BFF95E85947BBC08A1F4EF1A158F5975B0D7065CFB41F122C0";
    let sn = "504394802433901126813236";
    return nfcCardModuleWrapper.turnOnWallet(p1, cs, sn).then(cardRsponse => {
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