# Release Notes

All notable changes to this project will be documented in this file.

## [1.0.0] – 2021-02-18

### New

- Added all necessary functionality to communicate with TON NFC security smart cards. And also we prepared a simple example of using the library and readme.

## [2.0.0] – 2021-06-25

### New

- Migration into typescript.
- Added getHashes, turnOnWallet without PIN.
- Added NfcCardModuleWrapper to wrap all native function (card operations).
- Add CardError, CardResponse, CardStates, CardResponseMessage, CardResponseStatus.
- Work with TonNfcClientAndroid 3.2.4, so invitation dialogs to connect the card were added.
- Add enforced delay between card operations for iOS.
- Add NfcCardSigningBox implementation of sdk sining box interface.

### Fixed

- "errorCode field -> code field" in jsons representing errors.
