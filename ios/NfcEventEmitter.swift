//
//  NfcCardModule.swift
//  ton-nfc-client
//
//  Created by Alina Alinovna on 16.02.2021.
//

import Foundation
import TonNfcClientSwift

@available(iOS 13.0, *)
@objc(NfcEventEmitter)
 class NfcEventEmitter: RCTEventEmitter {
    // static let NFC_TAG_CONNECTED_EVENT:String = "nfcTagConnected"

     public static var emitter:RCTEventEmitter!

     override init() {
         super.init()
         NfcEventEmitter.emitter = self
     }

     override func supportedEvents() -> [String]! {
        return [ApduRunner.NFC_TAG_CONNECTED_EVENT]
     }
 }
