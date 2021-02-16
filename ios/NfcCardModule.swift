//
//  NfcCardModule.swift
//  ton-nfc-client
//
//  Created by Alina Alinovna on 16.02.2021.
//

import Foundation
import CoreNFC
import PromiseKit
import CryptoKit
import  TonNfcClientSwift

@available(iOS 13.0, *)
@objc(NfcCardModule)
class NfcCardModule: NSObject {
   
    var cardCoinManagerNfcApi: CardCoinManagerNfcApi = CardCoinManagerNfcApi()
    var cardCryptoNfcApi: CardCryptoNfcApi = CardCryptoNfcApi()
    var cardActivationNfcApi: CardActivationNfcApi = CardActivationNfcApi()
    var cardKeyChainNfcApi: CardKeyChainNfcApi = CardKeyChainNfcApi()
    var recoveryDataApi: RecoveryDataApi = RecoveryDataApi()
    
    /* Coinmanager stuff*/
       @objc
        func getRemainingPinTries(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
            cardCoinManagerNfcApi.getRemainingPinTries(resolve: { msg in resolve(msg as! String) }, reject: { (errMsg : String, err : NSError) in reject(String(err.code), err.localizedDescription, err) })
        }
}
