package com.tonnfccard;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.tonnfccard.api.CardActivationApi;
import com.tonnfccard.api.CardCoinManagerApi;
import com.tonnfccard.api.CardCryptoApi;
import com.tonnfccard.api.CardKeyChainApi;
import com.tonnfccard.api.RecoveryDataApi;

public class NfcCardModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    private CardCoinManagerApi cardCoinManagerNfcApi;
    private CardActivationApi cardActivationNfcApi;
    private CardCryptoApi cardCryptoNfcApi;
    private CardKeyChainApi cardKeyChainNfcApi;
    private RecoveryDataApi recoveryDataApi;

    public NfcCardModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "NfcCardModule";
    }

    @ReactMethod
    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
        // TODO: Implement some actually useful functionality
        callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
    }
}
