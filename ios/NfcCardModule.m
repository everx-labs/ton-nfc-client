#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "RCTEventDispatcher.h"
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(NfcCardModule, NSObject)
/* Coinmanager stuff*/
RCT_EXTERN_METHOD(
                  getRemainingPinTries: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject
                  )
@end
