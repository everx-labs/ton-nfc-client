package com.rntonnfccard;

import android.os.Handler;
import android.os.Looper;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class EventEmitter {
    private ReactContext reactContext;

    final Handler handler = new Handler(Looper.getMainLooper());

    public EventEmitter(ReactContext reactContext) {
        this.reactContext = reactContext;
    }

    public void emit(String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    public void emit(String eventName, double progress) {
        WritableMap params = Arguments.createMap();
        params.putDouble("progress", progress);
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    public void removeCallbacksAndMessages() {
        handler.removeCallbacksAndMessages(null);
    }
}