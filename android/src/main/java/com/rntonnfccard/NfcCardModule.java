package com.rntonnfccard;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.nfc.NfcAdapter;
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

import com.facebook.react.bridge.WritableMap;
import com.tonnfccard.CardActivationApi;
import com.tonnfccard.CardCoinManagerApi;
import com.tonnfccard.CardCryptoApi;
import com.tonnfccard.CardKeyChainApi;
import com.tonnfccard.NfcApi;
import com.tonnfccard.RecoveryDataApi;
import com.tonnfccard.TonWalletApi;
import com.tonnfccard.nfc.NfcApduRunner;

import static com.tonnfccard.TonWalletConstants.FALSE_MSG;
import static com.tonnfccard.TonWalletConstants.TRUE_MSG;

public class NfcCardModule extends ReactContextBaseJavaModule implements ActivityEventListener, LifecycleEventListener {
    public static final String NFC_CONNECTED_EVENT = "nfcTagConnected";
    public static final String NFC_ADAPTER_STATE_CHANGED_EVENT = "nfcAdapterStateChanged";
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
    private NfcApi nfcApi;

    public NfcCardModule(ReactApplicationContext reactContext)  {
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

            if (nfcApi == null) {
                nfcApi = new NfcApi(getReactApplicationContext());
            }

            eventEmitter = new EventEmitter(reactContext);

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
                   // Toast.makeText(getCurrentActivity(), "NFC Adapter state: " + stateStr, Toast.LENGTH_SHORT).show();
                    eventEmitter.emit(NFC_ADAPTER_STATE_CHANGED_EVENT, writableMap);
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
            eventEmitter.emit(NFC_CONNECTED_EVENT, null);
            //Toast.makeText(getCurrentActivity(), "NFC hardware touched!", Toast.LENGTH_SHORT).show();
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
    public void deleteKeyForHmac(final String serialNumber, final Promise promise) {
        cardCryptoNfcApi.deleteKeyForHmac(serialNumber, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void selectKeyForHmac(final String serialNumber, final Promise promise) {
        cardCryptoNfcApi.selectKeyForHmac(serialNumber, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void isKeyForHmacExist(final String serialNumber, final Promise promise) {
        cardCryptoNfcApi.isKeyForHmacExist(serialNumber, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getAllSerialNumbers(final Promise promise) {
        cardCryptoNfcApi.getAllSerialNumbers(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void createKeyForHmac(final String password, final String commonSecret, final String serialNumber, final Promise promise) {
        cardCryptoNfcApi.createKeyForHmac(password, commonSecret, serialNumber, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getCurrentSerialNumber(final Promise promise) {
        cardCryptoNfcApi.getCurrentSerialNumber(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void checkIfNfcSupported(final Promise promise) {
        nfcApi.setActivity(getCurrentActivity());
        nfcApi.checkIfNfcSupported(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void checkIfNfcEnabled(final Promise promise) {
        nfcApi.setActivity(getCurrentActivity());
        nfcApi.checkIfNfcEnabled(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void openNfcSettings(final Promise promise) {
        nfcApi.setActivity(getCurrentActivity());
        nfcApi.openNfcSettings(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void disconnectCard(final Promise promise) {
        cardCryptoNfcApi.disconnectCard(CallbackHelper.createNfcCallback(promise));
    }

    /** CoinManager commands **/

    @ReactMethod
    public void setDeviceLabel(final String deviceLabel, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.setDeviceLabel(deviceLabel, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void setDeviceLabelWithoutDialog(final String deviceLabel, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.setDeviceLabel(deviceLabel, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getDeviceLabel(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getDeviceLabel(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getDeviceLabelWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getDeviceLabel(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getSeVersion(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getSeVersion(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getSeVersionWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getSeVersion(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getCsn(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getCsn(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getCsnWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getCsn(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getMaxPinTries(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getMaxPinTries(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getMaxPinTriesWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getMaxPinTries(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getRemainingPinTries(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getRemainingPinTries(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getRemainingPinTriesWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getRemainingPinTries(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getRootKeyStatus(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getRootKeyStatus(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getRootKeyStatusWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getRootKeyStatus(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void resetWallet(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.resetWallet(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void resetWalletWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.resetWallet(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getAvailableMemory(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getAvailableMemory(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getAvailableMemoryWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getAvailableMemory(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getAppsList(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getAppsList(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getAppsListWithoutDialog(final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.getAppsList(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void generateSeed(final String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.generateSeed(pin, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void generateSeedWithoutDialog(final String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.generateSeed(pin, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void changePin(final String oldPin, final String newPin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.changePin(oldPin, newPin, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void changePinWithoutDialog(final String oldPin, final String newPin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCoinManagerNfcApi.changePin(oldPin, newPin, CallbackHelper.createNfcCallback(promise));
    }

    /** TonWalletApplet card activation related stuff **/

    @ReactMethod
    public void turnOnWalletWithPin(final String newPin, final String password, final String commonSecret, final String initialVector, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.turnOnWallet(newPin, password, commonSecret, initialVector, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void turnOnWalletWithPinWithoutDialog(final String newPin, final String password, final String commonSecret, final String initialVector, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.turnOnWallet(newPin, password, commonSecret, initialVector, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void turnOnWallet(final String password, final String commonSecret, final String initialVector, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.turnOnWallet(password, commonSecret, initialVector, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void turnOnWalletWithoutDialog(final String password, final String commonSecret, final String initialVector, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.turnOnWallet(password, commonSecret, initialVector, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getHashes(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.generateSeedAndGetHashes(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getHashesWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.generateSeedAndGetHashes(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getHashOfEncryptedCommonSecret(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.getHashOfEncryptedCommonSecret(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getHashOfEncryptedCommonSecretWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.getHashOfEncryptedCommonSecret(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getHashOfEncryptedPassword(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.getHashOfEncryptedPassword(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getHashOfEncryptedPasswordWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.getHashOfEncryptedPassword(CallbackHelper.createNfcCallback(promise));
    }


    /** TonWalletApplet common commands **/

    @ReactMethod
    public void getTonAppletState(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getTonAppletState(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getTonAppletStateWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getTonAppletState(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getSerialNumber(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.getSerialNumber(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getSerialNumberWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardActivationNfcApi.getSerialNumber(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getSault(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getSault(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getSaultWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getSault(CallbackHelper.createNfcCallback(promise));
    }


    /** TonWalletApplet Recovery data related commands **/

    @ReactMethod
    public void getRecoveryDataHash(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.getRecoveryDataHash(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getRecoveryDataHashWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.getRecoveryDataHash(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getRecoveryDataLen(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.getRecoveryDataLen(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getRecoveryDataLenWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.getRecoveryDataLen(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getRecoveryData(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.getRecoveryData(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getRecoveryDataWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.getRecoveryData(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void addRecoveryData(final String recoveryData, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.addRecoveryData(recoveryData, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void addRecoveryDataWithoutDialog(final String recoveryData, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.addRecoveryData(recoveryData, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void resetRecoveryData(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.resetRecoveryData(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void resetRecoveryDataWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.resetRecoveryData(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void isRecoveryDataSet(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.isRecoveryDataSet(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void isRecoveryDataSetWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        recoveryDataApi.isRecoveryDataSet(CallbackHelper.createNfcCallback(promise));
    }

    /** TonWalletApplet Ed25519 related commands **/

    @ReactMethod
    public void verifyPin(final String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.verifyPin(pin, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void verifyPinWithoutDialog(final String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.verifyPin(pin, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getPublicKeyForDefaultPath(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getPublicKeyForDefaultPath(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getPublicKeyForDefaultPathWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getPublicKeyForDefaultPath(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void checkSerialNumberAndGetPublicKeyForDefaultPath(final String serialNumber, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.checkSerialNumberAndGetPublicKeyForDefaultPath(serialNumber, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void checkSerialNumberAndGetPublicKeyForDefaultPathWithoutDialog(final String serialNumber, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.checkSerialNumberAndGetPublicKeyForDefaultPath(serialNumber, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getPublicKey(final String hdIndex, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getPublicKey(hdIndex, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getPublicKeyWithoutDialog(final String hdIndex, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.getPublicKey(hdIndex, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void checkSerialNumberAndGetPublicKey(final String serialNumber, final String hdIndex, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.checkSerialNumberAndGetPublicKey(serialNumber, hdIndex, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void checkSerialNumberAndGetPublicKeyWithoutDialog(final String serialNumber, final String hdIndex, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.checkSerialNumberAndGetPublicKey(serialNumber, hdIndex, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void signForDefaultHdPath(final String dataForSigning, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.signForDefaultHdPath(dataForSigning, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void signForDefaultHdPathWithoutDialog(final String dataForSigning, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.signForDefaultHdPath(dataForSigning, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void checkSerialNumberAndSignForDefaultHdPath(final String serialNumber, final String dataForSigning, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.checkSerialNumberAndSignForDefaultHdPath(serialNumber, dataForSigning, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void checkSerialNumberAndSignForDefaultHdPathWithoutDialog(final String serialNumber, final String dataForSigning, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.checkSerialNumberAndSignForDefaultHdPath(serialNumber, dataForSigning, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void sign(final String dataForSigning, final String hdIndex, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.sign(dataForSigning, hdIndex, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void signWithoutDialog(final String dataForSigning, final String hdIndex, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.sign(dataForSigning, hdIndex, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void checkSerialNumberAndSign(final String serialNumber, final String dataForSigning, final String hdIndex, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.checkSerialNumberAndSign(serialNumber, dataForSigning, hdIndex, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void checkSerialNumberAndSignWithoutDialog(final String serialNumber, final String dataForSigning, final String hdIndex, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.checkSerialNumberAndSign(serialNumber, dataForSigning, hdIndex, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void verifyPinAndSignForDefaultHdPath(final String dataForSigning, final String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.verifyPinAndSignForDefaultHdPath(dataForSigning, pin, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void verifyPinAndSignForDefaultHdPathWithoutDialog(final String dataForSigning, final String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.verifyPinAndSignForDefaultHdPath(dataForSigning, pin, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void checkSerialNumberAndVerifyPinAndSignForDefaultHdPath(final String serialNumber, final String dataForSigning, final String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.checkSerialNumberAndVerifyPinAndSignForDefaultHdPath(serialNumber, dataForSigning, pin, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void checkSerialNumberAndVerifyPinAndSignForDefaultHdPathWithoutDialog(final String serialNumber, final String dataForSigning, final String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.checkSerialNumberAndVerifyPinAndSignForDefaultHdPath(serialNumber, dataForSigning, pin, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void verifyPinAndSign(final String dataForSigning, final String hdIndex, final String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.verifyPinAndSign(dataForSigning, hdIndex, pin, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void verifyPinAndSignWithoutDialog(final String dataForSigning, final String hdIndex, final String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.verifyPinAndSign(dataForSigning, hdIndex, pin, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void checkSerialNumberAndVerifyPinAndSign(final String serialNumber, final String dataForSigning, final String hdIndex, final String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.checkSerialNumberAndVerifyPinAndSign(serialNumber, dataForSigning, hdIndex, pin, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void checkSerialNumberAndVerifyPinAndSignWithoutDialog(final String serialNumber, final String dataForSigning, final String hdIndex, final String pin, final Promise promise){
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardCryptoNfcApi.checkSerialNumberAndVerifyPinAndSign(serialNumber, dataForSigning, hdIndex, pin, CallbackHelper.createNfcCallback(promise));
    }

    /** TonWalletApplet card keychain related commands **/

    @ReactMethod
    public void resetKeyChain(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.resetKeyChain(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void resetKeyChainWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.resetKeyChain(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getKeyChainInfo(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getKeyChainInfo(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getKeyChainInfoWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getKeyChainInfo(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getNumberOfKeys(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getNumberOfKeys(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getNumberOfKeysWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getNumberOfKeys(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void checkKeyHmacConsistency(final String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.checkKeyHmacConsistency(keyHmac, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void checkKeyHmacConsistencyWithoutDialog(final String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.checkKeyHmacConsistency(keyHmac, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void checkAvailableVolForNewKey(final Short keySize, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.checkAvailableVolForNewKey(keySize, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void checkAvailableVolForNewKeyWithoutDialog(final Short keySize, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.checkAvailableVolForNewKey(keySize, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getIndexAndLenOfKeyInKeyChain(final String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getIndexAndLenOfKeyInKeyChain(keyHmac, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getIndexAndLenOfKeyInKeyChainWithoutDialog(final String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getIndexAndLenOfKeyInKeyChain(keyHmac, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void deleteKeyFromKeyChain(final String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.deleteKeyFromKeyChain(keyHmac, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void deleteKeyFromKeyChainWithoutDialog(String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.deleteKeyFromKeyChain(keyHmac, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getHmac(final String index, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getHmac(index, CallbackHelper.createNfcCallback(promise),true);
    }


    @ReactMethod
    public void getHmacWithoutDialog(final String index, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getHmac(index, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void finishDeleteKeyFromKeyChainAfterInterruption(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.finishDeleteKeyFromKeyChainAfterInterruption(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void finishDeleteKeyFromKeyChainAfterInterruptionWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.finishDeleteKeyFromKeyChainAfterInterruption(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getDeleteKeyChunkNumOfPackets(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getDeleteKeyChunkNumOfPackets(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getDeleteKeyChunkNumOfPacketsWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getDeleteKeyChunkNumOfPackets(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getDeleteKeyRecordNumOfPackets(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getDeleteKeyRecordNumOfPackets(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getDeleteKeyRecordNumOfPacketsWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getDeleteKeyRecordNumOfPackets(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getOccupiedStorageSize(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getOccupiedStorageSize(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getOccupiedStorageSizeWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getOccupiedStorageSize(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getFreeStorageSize(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getFreeStorageSize(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getFreeStorageSizeWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getFreeStorageSize(CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getKeyFromKeyChain(final String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getKeyFromKeyChain(keyHmac, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getKeyFromKeyChainWithoutDialog(final String keyHmac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getKeyFromKeyChain(keyHmac, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void addKeyIntoKeyChain(final String newKey, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.addKeyIntoKeyChain(newKey, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void addKeyIntoKeyChainWithoutDialog(final String newKey, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.addKeyIntoKeyChain(newKey, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void changeKeyInKeyChain(final String newKey, final String oldKeyHMac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.changeKeyInKeyChain(newKey, oldKeyHMac, CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void changeKeyInKeyChainWithoutDialog(final String newKey, final String oldKeyHMac, final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.changeKeyInKeyChain(newKey, oldKeyHMac, CallbackHelper.createNfcCallback(promise));
    }

    @ReactMethod
    public void getKeyChainDataAboutAllKeys(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getKeyChainDataAboutAllKeys(CallbackHelper.createNfcCallback(promise), true);
    }

    @ReactMethod
    public void getKeyChainDataAboutAllKeysWithoutDialog(final Promise promise) {
        if (TonWalletApi.getActivity() == null) TonWalletApi.setActivity(getCurrentActivity());
        cardKeyChainNfcApi.getKeyChainDataAboutAllKeys(CallbackHelper.createNfcCallback(promise));
    }
}
