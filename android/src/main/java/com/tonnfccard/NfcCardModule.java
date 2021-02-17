package com.tonnfccard;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.nfc.NfcAdapter;
import android.nfc.tech.IsoDep;
import android.nfc.tech.NfcA;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.WritableMap;
import com.tonnfccard.api.CardActivationApi;
import com.tonnfccard.api.CardCoinManagerApi;
import com.tonnfccard.api.CardCryptoApi;
import com.tonnfccard.api.CardKeyChainApi;
import com.tonnfccard.api.RecoveryDataApi;
import com.tonnfccard.api.nfc.NfcApduRunner;

import static com.tonnfccard.CallbackHelper.createNfcCallback;

public class NfcCardModule extends ReactContextBaseJavaModule implements ActivityEventListener, LifecycleEventListener {

    private static final String TAG = "NfcCardModule";
    private ReactApplicationContext reactContext;
    private NfcApduRunner nfcApduRunner;
    private NfcAdapter nfcAdapter;
    private EventEmitter eventEmitter;

    private CardCoinManagerApi cardCoinManagerNfcApi;
    private CardActivationApi cardActivationNfcApi;
    private CardCryptoApi cardCryptoNfcApi;
    private CardKeyChainApi cardKeyChainNfcApi;
    private RecoveryDataApi recoveryDataApi;

    private static String[][] TECHLISTS;
    private static IntentFilter[] TAGFILTERS;

    static {
        try {
            TECHLISTS = new String[][]{{IsoDep.class.getName()},
                    {NfcA.class.getName()},};

            TAGFILTERS = new IntentFilter[]{new IntentFilter(
                    NfcAdapter.ACTION_TECH_DISCOVERED, "*/*")};
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public NfcCardModule(ReactApplicationContext reactContext) throws Exception {
        super(reactContext);
        this.reactContext = reactContext;
        nfcApduRunner = NfcApduRunner.getInstance(reactContext);

        getReactApplicationContext().addActivityEventListener(this);
        getReactApplicationContext().addLifecycleEventListener(this);

        if (cardCoinManagerNfcApi == null) {
            cardCoinManagerNfcApi = new CardCoinManagerApi(reactContext,  nfcApduRunner);
        }

        if (cardActivationNfcApi == null) {
            cardActivationNfcApi = new CardActivationApi(reactContext,  nfcApduRunner);
        }

        if (cardCryptoNfcApi == null) {
            cardCryptoNfcApi = new CardCryptoApi(reactContext, nfcApduRunner);
        }

        if (cardKeyChainNfcApi == null) {
            cardKeyChainNfcApi = new CardKeyChainApi(reactContext,  nfcApduRunner);
        }

        if (recoveryDataApi == null) {
            recoveryDataApi = new RecoveryDataApi(reactContext, nfcApduRunner);
        }

        this.eventEmitter = new EventEmitter(reactContext);

        IntentFilter filter = new IntentFilter(NfcAdapter.ACTION_ADAPTER_STATE_CHANGED);
        this.reactContext.registerReceiver(mReceiver, filter);
    }

    private final BroadcastReceiver mReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            final String action = intent.getAction();

            if (action.equals(NfcAdapter.ACTION_ADAPTER_STATE_CHANGED)) {
                final int state = intent.getIntExtra(NfcAdapter.EXTRA_ADAPTER_STATE,
                        NfcAdapter.STATE_OFF);
                String stateStr = "unknown";
                switch (state) {
                    case NfcAdapter.STATE_OFF:
                        stateStr = "off";
                        break;
                    case NfcAdapter.STATE_TURNING_OFF:
                        stateStr = "turning_off";
                        break;
                    case NfcAdapter.STATE_ON:
                        stateStr = "on";
                        break;
                    case NfcAdapter.STATE_TURNING_ON:
                        stateStr = "turning_on";
                        break;
                }

                try {
                    WritableMap writableMap = Arguments.createMap();
                    writableMap.putString("state", stateStr);
                    Toast.makeText(getCurrentActivity(), "NFC Adapter state: " + stateStr, Toast.LENGTH_SHORT).show();
                    eventEmitter.emit("nfcAdapterStateChanged", writableMap);
                } catch (Exception ex) {
                    Log.d("", "Nfc state change event fail: " + ex);
                }
            }
        }
    };

    @Override
    public void onHostResume() {
        if (nfcAdapter != null) {
            setupForegroundDispatch(getCurrentActivity(), nfcAdapter);
        } else {
            nfcAdapter = NfcAdapter.getDefaultAdapter(this.reactContext);
            setupForegroundDispatch(getCurrentActivity(), nfcAdapter);
        }
        nfcApduRunner.setNfcAdapter(nfcAdapter);
    }

    @Override
    public void onHostPause() {
        if (nfcAdapter != null)
            stopForegroundDispatch(getCurrentActivity(), nfcAdapter);
    }

    @Override
    public void onNewIntent(Intent intent) {
        try {
            handleIntent(intent);
        }
        catch (Exception e) {
            Log.e(TAG, e.getMessage());
        }
    }


    private void handleIntent(Intent intent) throws Exception{
        if (nfcApduRunner.setCardTag(intent)) {
            eventEmitter.emit("nfcTagIsConnected", null);
        }
    }

    public static void setupForegroundDispatch(final Activity activity, NfcAdapter adapter) {
        final Intent intent = new Intent(activity.getApplicationContext(), activity.getClass());
        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);


        final PendingIntent pendingIntent = PendingIntent.getActivity(activity.getApplicationContext(), 0, intent, 0);
        if (adapter != null && adapter.isEnabled()) {
            adapter.enableForegroundDispatch(activity, pendingIntent, null, null);
        }
    }

    public static void stopForegroundDispatch(final Activity activity, NfcAdapter adapter) {
        adapter.disableForegroundDispatch(activity);
    }


    @Override
    public void onHostDestroy() {
        this.reactContext.unregisterReceiver(mReceiver);
    }

    @Override
    public void onActivityResult(
            final Activity activity,
            final int requestCode,
            final int resultCode,
            final Intent intent) {
    }

    @Override
    public String getName() {
        return "NfcCardModule";
    }

    @ReactMethod
    public void getRemainingPinTries(final Promise promise){
        cardCoinManagerNfcApi.getRemainingPinTries(createNfcCallback(promise));
    }


}
