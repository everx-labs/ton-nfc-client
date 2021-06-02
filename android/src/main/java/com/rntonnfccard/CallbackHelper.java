package com.rntonnfccard;

import com.facebook.react.bridge.Promise;
import com.tonnfccard.callback.NfcCallback;

public class CallbackHelper {
    public static NfcCallback createNfcCallback(final Promise promise) {
        return new NfcCallback(promise::resolve, promise::reject);
    }
}
