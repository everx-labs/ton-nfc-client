package com.tonnfccard;

import com.tonnfccard.api.callback.NfcCallback;
import com.facebook.react.bridge.Promise;

public class CallbackHelper {
    public static NfcCallback createNfcCallback(final Promise promise) {
        return new NfcCallback(promise::resolve, promise::reject);
    }
}
