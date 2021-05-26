package com.tonnfccard;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.nfc.NfcAdapter;
import android.nfc.tech.IsoDep;
import android.nfc.tech.NfcA;
import android.provider.Settings;
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
import com.tonnfccard.nfc.NfcApduRunner;


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

    public NfcCardModule(ReactApplicationContext reactContext) throws Exception {
        super(reactContext);
        try {

            this.reactContext = reactContext;
            nfcApduRunner = NfcApduRunner.getInstance(reactContext);

            getReactApplicationContext().addActivityEventListener(this);
            getReactApplicationContext().addLifecycleEventListener(this);

            if (cardCoinManagerNfcApi == null) {
                cardCoinManagerNfcApi = new CardCoinManagerApi(nfcApduRunner);
            }

            if (cardActivationNfcApi == null) {
                cardActivationNfcApi = new CardActivationApi(nfcApduRunner);
            }

            if (cardCryptoNfcApi == null) {
                cardCryptoNfcApi = new CardCryptoApi(nfcApduRunner);
            }

            if (cardKeyChainNfcApi == null) {
                cardKeyChainNfcApi = new CardKeyChainApi(nfcApduRunner);
            }

            if (recoveryDataApi == null) {
                recoveryDataApi = new RecoveryDataApi(nfcApduRunner);
            }

            this.eventEmitter = new EventEmitter(reactContext);

            IntentFilter filter = new IntentFilter(NfcAdapter.ACTION_ADAPTER_STATE_CHANGED);
            this.reactContext.registerReceiver(mReceiver, filter);
        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
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
            Toast.makeText(getCurrentActivity(), "NFC hardware touched!", Toast.LENGTH_SHORT).show();
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
    public void deleteKeyForHmac(String serialNumber, final Promise promise) {
        cardCryptoNfcApi.deleteKeyForHmac(serialNumber, createNfcCallback(promise));
    }

    @ReactMethod
    public void selectKeyForHmac(String serialNumber, final Promise promise) {
        cardCryptoNfcApi.selectKeyForHmac(serialNumber, createNfcCallback(promise));
    }

    @ReactMethod
    public void isKeyForHmacExist(String serialNumber, final Promise promise) {
        cardCryptoNfcApi.isKeyForHmacExist(serialNumber, createNfcCallback(promise));
    }

    @ReactMethod
    public void getAllSerialNumbers(final Promise promise) {
        cardCryptoNfcApi.getAllSerialNumbers(createNfcCallback(promise));
    }

    @ReactMethod
    public void createKeyForHmac(String password, String commonSecret, String serialNumber, final Promise promise) {
        cardCryptoNfcApi.createKeyForHmac(password, commonSecret, serialNumber, createNfcCallback(promise));
    }

    @ReactMethod
    public void getCurrentSerialNumber(final Promise promise) {
        cardCryptoNfcApi.getCurrentSerialNumber(createNfcCallback(promise));
    }

    @ReactMethod
    public void isNfcSupported(final Promise promise) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            boolean res = currentActivity.getPackageManager().hasSystemFeature(PackageManager.FEATURE_NFC);
            promise.resolve(Boolean.valueOf(res).toString());
        } else {
            promise.resolve("false");
        }
    }

    @ReactMethod
    public void isNfcEnabled(final Promise promise) {
        if (nfcAdapter != null) {
            promise.resolve(Boolean.valueOf(nfcAdapter.isEnabled()).toString());
        } else {
            promise.resolve("false");
        }
    }

    @ReactMethod
    public void openNfcSettings(final Promise promise) {
        Activity currentActivity = getCurrentActivity();
        currentActivity.startActivity(new Intent(Settings.ACTION_NFC_SETTINGS));
        promise.resolve(true);
    }

    @ReactMethod
    public void disconnectCard(final Promise promise) {
        cardCryptoNfcApi.disconnectCard(createNfcCallback(promise));
    }

    /** CoinManager commands **/

    @ReactMethod
    public void setDeviceLabel(String deviceLabel, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.setDeviceLabel(deviceLabel, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void setDeviceLabelWithoutDialog(String deviceLabel, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.setDeviceLabel(deviceLabel, createNfcCallback(promise));
    }

    @ReactMethod
    public void getDeviceLabel(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getDeviceLabel(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getDeviceLabelWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getDeviceLabel(createNfcCallback(promise));
    }

    @ReactMethod
    public void getSeVersion(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getSeVersion(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getSeVersionWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getSeVersion(createNfcCallback(promise));
    }

    @ReactMethod
    public void getCsn(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getCsn(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getCsnWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getCsn(createNfcCallback(promise));
    }

    @ReactMethod
    public void getMaxPinTries(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getMaxPinTries(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getMaxPinTriesWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getMaxPinTries(createNfcCallback(promise));
    }

    @ReactMethod
    public void getRemainingPinTries(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getRemainingPinTries(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getRemainingPinTriesWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getRemainingPinTries(createNfcCallback(promise));
    }

    @ReactMethod
    public void getRootKeyStatus(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getRootKeyStatus(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getRootKeyStatusWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getRootKeyStatus(createNfcCallback(promise));
    }

    @ReactMethod
    public void resetWallet(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.resetWallet(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void resetWalletWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.resetWallet(createNfcCallback(promise));
    }

    @ReactMethod
    public void getAvailableMemory(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getAvailableMemory(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getAvailableMemoryWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getAvailableMemory(createNfcCallback(promise));
    }

    @ReactMethod
    public void getAppsList(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getAppsList(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getAppsListWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getAppsList(createNfcCallback(promise));
    }

    @ReactMethod
    public void generateSeed(String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.generateSeed(pin, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void generateSeedWithoutDialog(String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.generateSeed(pin, createNfcCallback(promise));
    }

    @ReactMethod
    public void changePin(String oldPin, String newPin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.changePin(oldPin, newPin, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void changePinWithoutDialog(String oldPin, String newPin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.changePin(oldPin, newPin, createNfcCallback(promise));
    }

    /** TonWalletApplet card activation related stuff **/

    @ReactMethod
    public void turnOnWallet(String newPin, String password, String commonSecret, String initialVector, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.turnOnWallet(newPin, password, commonSecret, initialVector, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void turnOnWalletWithoutDialog(String newPin, String password, String commonSecret, String initialVector, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.turnOnWallet(newPin, password, commonSecret, initialVector, createNfcCallback(promise));
    }

    @ReactMethod
    public void turnOnWallet(String password, String commonSecret, String initialVector, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.turnOnWallet(password, commonSecret, initialVector, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void turnOnWalletWithoutDialog(String password, String commonSecret, String initialVector, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.turnOnWallet(password, commonSecret, initialVector, createNfcCallback(promise));
    }

    @ReactMethod
    public void getHashes(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.getHashes(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getHashesWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.getHashes(createNfcCallback(promise));
    }

    @ReactMethod
    public void getHashOfEncryptedCommonSecret(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.getHashOfEncryptedCommonSecret(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getHashOfEncryptedCommonSecretWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.getHashOfEncryptedCommonSecret(createNfcCallback(promise));
    }

    @ReactMethod
    public void getHashOfEncryptedPassword(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.getHashOfEncryptedPassword(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getHashOfEncryptedPasswordWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.getHashOfEncryptedPassword(createNfcCallback(promise));
    }

    /** TonWalletApplet common commands **/

    @ReactMethod
    public void getTonAppletState(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getTonAppletState(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getTonAppletStateWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getTonAppletState(createNfcCallback(promise));
    }

    @ReactMethod
    public void getSerialNumber(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.getSerialNumber(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getSerialNumberWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.getSerialNumber(createNfcCallback(promise));
    }

    @ReactMethod
    public void getSault(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getSault(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getSaultWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getSault(createNfcCallback(promise));
    }


    /** TonWalletApplet Recovery data related commands **/

    @ReactMethod
    public void getRecoveryDataHash(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.getRecoveryDataHash(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getRecoveryDataHashWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.getRecoveryDataHash(createNfcCallback(promise));
    }

    @ReactMethod
    public void getRecoveryDataLen(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.getRecoveryDataLen(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getRecoveryDataLenWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.getRecoveryDataLen(createNfcCallback(promise));
    }

    @ReactMethod
    public void getRecoveryData(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.getRecoveryData(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getRecoveryDataWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.getRecoveryData(createNfcCallback(promise));
    }

    @ReactMethod
    public void addRecoveryData(final String recoveryData, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.addRecoveryData(recoveryData, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void addRecoveryDataWithoutDialog(final String recoveryData, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.addRecoveryData(recoveryData, createNfcCallback(promise));
    }

    @ReactMethod
    public void resetRecoveryData(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.resetRecoveryData(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void resetRecoveryDataWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.resetRecoveryData(createNfcCallback(promise));
    }

    @ReactMethod
    public void isRecoveryDataSet(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.isRecoveryDataSet(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void isRecoveryDataSetWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.isRecoveryDataSet(createNfcCallback(promise));
    }

    /** TonWalletApplet Ed25519 related commands **/

    @ReactMethod
    public void verifyPin(String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.verifyPin(pin, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void verifyPinWithoutDialog(String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.verifyPin(pin, createNfcCallback(promise));
    }

    @ReactMethod
    public void getPublicKeyForDefaultPath(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getPublicKeyForDefaultPath(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getPublicKeyForDefaultPathWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getPublicKeyForDefaultPath(createNfcCallback(promise));
    }

    @ReactMethod
    public void getPublicKey(String index, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getPublicKey(index, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getPublicKeyWithoutDialog(String index, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getPublicKey(index, createNfcCallback(promise));
    }

    @ReactMethod
    public void signForDefaultHdPath(String dataForSigning, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.signForDefaultHdPath(dataForSigning, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void signForDefaultHdPathWithoutDialog(String dataForSigning, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.signForDefaultHdPath(dataForSigning, createNfcCallback(promise));
    }

    @ReactMethod
    public void sign(String dataForSigning, String index, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.sign(dataForSigning, index, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void signWithoutDialog(String dataForSigning, String index, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.sign(dataForSigning, index, createNfcCallback(promise));
    }

    @ReactMethod
    public void verifyPinAndSignForDefaultHdPath(String dataForSigning, String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.verifyPinAndSignForDefaultHdPath(dataForSigning, pin, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void verifyPinAndSignForDefaultHdPathWithoutDialog(String dataForSigning, String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.verifyPinAndSignForDefaultHdPath(dataForSigning, pin, createNfcCallback(promise));
    }

    @ReactMethod
    public void verifyPinAndSign(String dataForSigning, String index, String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.verifyPinAndSign(dataForSigning, index, pin, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void verifyPinAndSignWithoutDialog(String dataForSigning, String index, String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.verifyPinAndSign(dataForSigning, index, pin, createNfcCallback(promise));
    }

    /** TonWalletApplet card keychain related commands **/

    @ReactMethod
    public void resetKeyChain(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.resetKeyChain(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void resetKeyChainWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.resetKeyChain(createNfcCallback(promise));
    }

    @ReactMethod
    public void getKeyChainInfo(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getKeyChainInfo(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getKeyChainInfoWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getKeyChainInfo(createNfcCallback(promise));
    }

    @ReactMethod
    public void getNumberOfKeys(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getNumberOfKeys(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getNumberOfKeysWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getNumberOfKeys(createNfcCallback(promise));
    }

    @ReactMethod
    public void checkKeyHmacConsistency(String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.checkKeyHmacConsistency(keyHmac, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void checkKeyHmacConsistencyWithoutDialog(String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.checkKeyHmacConsistency(keyHmac, createNfcCallback(promise));
    }

    @ReactMethod
    public void checkAvailableVolForNewKey(Short keySize, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.checkAvailableVolForNewKey(keySize, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void checkAvailableVolForNewKeyWithoutDialog(Short keySize, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.checkAvailableVolForNewKey(keySize, createNfcCallback(promise));
    }

    @ReactMethod
    public void getIndexAndLenOfKeyInKeyChain(String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getIndexAndLenOfKeyInKeyChain(keyHmac, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getIndexAndLenOfKeyInKeyChainWithoutDialog(String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getIndexAndLenOfKeyInKeyChain(keyHmac, createNfcCallback(promise));
    }

    @ReactMethod
    public void deleteKeyFromKeyChain(String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.deleteKeyFromKeyChain(keyHmac, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void deleteKeyFromKeyChainWithoutDialog(String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.deleteKeyFromKeyChain(keyHmac, createNfcCallback(promise));
    }

    @ReactMethod
    public void getHmac(String index, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getHmac(index, createNfcCallback(promise),true);
    }


    @ReactMethod
    public void getHmacWithoutDialog(String index, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getHmac(index, createNfcCallback(promise));
    }

    @ReactMethod
    public void finishDeleteKeyFromKeyChainAfterInterruption(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.finishDeleteKeyFromKeyChainAfterInterruption(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void finishDeleteKeyFromKeyChainAfterInterruptionWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.finishDeleteKeyFromKeyChainAfterInterruption(createNfcCallback(promise));
    }

    @ReactMethod
    public void getDeleteKeyChunkNumOfPackets(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getDeleteKeyChunkNumOfPackets(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getDeleteKeyChunkNumOfPacketsWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getDeleteKeyChunkNumOfPackets(createNfcCallback(promise));
    }

    @ReactMethod
    public void getDeleteKeyRecordNumOfPackets(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getDeleteKeyRecordNumOfPackets(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getDeleteKeyRecordNumOfPacketsWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getDeleteKeyRecordNumOfPackets(createNfcCallback(promise));
    }

    @ReactMethod
    public void getOccupiedStorageSize(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getOccupiedStorageSize(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getOccupiedStorageSizeWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getOccupiedStorageSize(createNfcCallback(promise));
    }

    @ReactMethod
    public void getFreeStorageSize(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getFreeStorageSize(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getFreeStorageSizeWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getFreeStorageSize(createNfcCallback(promise));
    }

    @ReactMethod
    public void getKeyFromKeyChain(String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getKeyFromKeyChain(keyHmac, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getKeyFromKeyChainWithoutDialog(String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getKeyFromKeyChain(keyHmac, createNfcCallback(promise));
    }

    @ReactMethod
    public void addKeyIntoKeyChain(String newKey, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.addKeyIntoKeyChain(newKey, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void addKeyIntoKeyChainWithoutDialog(String newKey, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.addKeyIntoKeyChain(newKey, createNfcCallback(promise));
    }

    @ReactMethod
    public void changeKeyInKeyChain(String newKey, String oldKeyHMac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.changeKeyInKeyChain(newKey, oldKeyHMac, createNfcCallback(promise), true);
    }

    @ReactMethod
    public void changeKeyInKeyChainWithoutDialog(String newKey, String oldKeyHMac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.changeKeyInKeyChain(newKey, oldKeyHMac, createNfcCallback(promise));
    }

    @ReactMethod
    public void getKeyChainDataAboutAllKeys(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getKeyChainDataAboutAllKeys(createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getKeyChainDataAboutAllKeysWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getKeyChainDataAboutAllKeys(createNfcCallback(promise));
    }
}
