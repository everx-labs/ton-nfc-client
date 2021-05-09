package com.tonnfccard;

import android.view.View;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

public class NfcCardModulePackage implements ReactPackage {

    private View mRootView = null;

   // public NfcCardModulePackage(View rootView) {
      //  mRootView = rootView;
    //}

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        try {
            modules.add(new NfcCardModule(reactContext));
        }
        catch (Exception e) {
        }
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
