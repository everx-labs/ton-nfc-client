package com.tonnfccard;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.nfc.NfcAdapter;
import android.nfc.tech.IsoDep;
import android.nfc.tech.NfcA;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;

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


//TODO: update version of TonNfcClientAndroid
public class NfcCardModule extends ReactContextBaseJavaModule implements ActivityEventListener, LifecycleEventListener {
    private static final boolean NOT_SHOW_INVITATION_DIALOG = false;
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
        this.reactContext = reactContext;
        nfcApduRunner = NfcApduRunner.getInstance(reactContext);


        getReactApplicationContext().addActivityEventListener(this);
        getReactApplicationContext().addLifecycleEventListener(this);

        if (cardCoinManagerNfcApi == null) {
            cardCoinManagerNfcApi = new CardCoinManagerApi(getCurrentActivity(),  nfcApduRunner);
        }

        if (cardActivationNfcApi == null) {
            cardActivationNfcApi = new CardActivationApi(getCurrentActivity(),  nfcApduRunner);
        }

        if (cardCryptoNfcApi == null) {
            cardCryptoNfcApi = new CardCryptoApi(getCurrentActivity(), nfcApduRunner);
        }

        if (cardKeyChainNfcApi == null) {
            cardKeyChainNfcApi = new CardKeyChainApi(getCurrentActivity(),  nfcApduRunner);
        }

        if (recoveryDataApi == null) {
            recoveryDataApi = new RecoveryDataApi(getCurrentActivity(), nfcApduRunner);
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
        cardCoinManagerNfcApi.setDeviceLabel(deviceLabel, createNfcCallback(promise));
    }

    @ReactMethod
    public void setDeviceLabelWithoutInvitationDialog(String deviceLabel, final Promise promise){
        cardCoinManagerNfcApi.setDeviceLabel(deviceLabel, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getDeviceLabel(final Promise promise){
        cardCoinManagerNfcApi.getDeviceLabel(createNfcCallback(promise));
    }

    @ReactMethod
    public void getDeviceLabelWithoutInvitationDialog(final Promise promise){
        cardCoinManagerNfcApi.getDeviceLabel(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getSeVersion(final Promise promise){
        cardCoinManagerNfcApi.getSeVersion(createNfcCallback(promise));
    }

    @ReactMethod
    public void getSeVersionWithoutInvitationDialog(final Promise promise){
        cardCoinManagerNfcApi.getSeVersion(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getCsn(final Promise promise){
        cardCoinManagerNfcApi.getCsn(createNfcCallback(promise));
    }

    @ReactMethod
    public void getCsnWithoutInvitationDialog(final Promise promise){
        cardCoinManagerNfcApi.getCsn(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getMaxPinTries(final Promise promise) {
        cardCoinManagerNfcApi.getMaxPinTries(createNfcCallback(promise));
    }

    @ReactMethod
    public void getMaxPinTriesWithoutInvitationDialog(final Promise promise) {
        cardCoinManagerNfcApi.getMaxPinTries(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getRemainingPinTries(final Promise promise){
        cardCoinManagerNfcApi.getRemainingPinTries(createNfcCallback(promise));
    }

    @ReactMethod
    public void getRemainingPinTriesWithoutInvitationDialog(final Promise promise){
        cardCoinManagerNfcApi.getRemainingPinTries(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getRootKeyStatus(final Promise promise){
        cardCoinManagerNfcApi.getRootKeyStatus(createNfcCallback(promise));
    }

    @ReactMethod
    public void getRootKeyStatusWithoutInvitationDialog(final Promise promise){
        cardCoinManagerNfcApi.getRootKeyStatus(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void resetWallet(final Promise promise){
        cardCoinManagerNfcApi.resetWallet(createNfcCallback(promise));
    }

    @ReactMethod
    public void resetWalletWithoutInvitationDialog(final Promise promise){
        cardCoinManagerNfcApi.resetWallet(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getAvailableMemory(final Promise promise){
        cardCoinManagerNfcApi.getAvailableMemory(createNfcCallback(promise));
    }

    @ReactMethod
    public void getAvailableMemoryWithoutInvitationDialog(final Promise promise){
        cardCoinManagerNfcApi.getAvailableMemory(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getAppsList(final Promise promise){
        cardCoinManagerNfcApi.getAppsList(createNfcCallback(promise));
    }

    @ReactMethod
    public void getAppsListWithoutInvitationDialog(final Promise promise){
        cardCoinManagerNfcApi.getAppsList(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void generateSeed(String pin, final Promise promise){
        cardCoinManagerNfcApi.generateSeed(pin, createNfcCallback(promise));
    }

    @ReactMethod
    public void generateSeedWithoutInvitationDialog(String pin, final Promise promise){
        cardCoinManagerNfcApi.generateSeed(pin, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void changePin(String oldPin, String newPin, final Promise promise){
        cardCoinManagerNfcApi.changePin(oldPin, newPin, createNfcCallback(promise));
    }

    @ReactMethod
    public void changePinWithoutInvitationDialog(String oldPin, String newPin, final Promise promise){
        cardCoinManagerNfcApi.changePin(oldPin, newPin, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    /** TonWalletApplet card activation related stuff **/

    @ReactMethod
    public void turnOnWallet(String newPin, String password, String commonSecret, String initialVector, final Promise promise){
        cardActivationNfcApi.turnOnWallet(newPin, password, commonSecret, initialVector, createNfcCallback(promise));
    }

    @ReactMethod
    public void turnOnWalletWithoutInvitationDialog(String newPin, String password, String commonSecret, String initialVector, final Promise promise){
        cardActivationNfcApi.turnOnWallet(newPin, password, commonSecret, initialVector, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void turnOnWallet(String password, String commonSecret, String initialVector, final Promise promise){
        cardActivationNfcApi.turnOnWallet(password, commonSecret, initialVector, createNfcCallback(promise));
    }

    @ReactMethod
    public void turnOnWalletWithoutInvitationDialog(String password, String commonSecret, String initialVector, final Promise promise){
        cardActivationNfcApi.turnOnWallet(password, commonSecret, initialVector, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getHashes(final Promise promise) {
        cardActivationNfcApi.getHashes(createNfcCallback(promise));
    }

    @ReactMethod
    public void getHashesWithoutInvitationDialog(final Promise promise) {
        cardActivationNfcApi.getHashes(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getHashOfEncryptedCommonSecret(final Promise promise) {
        cardActivationNfcApi.getHashOfEncryptedCommonSecret(createNfcCallback(promise));
    }

    @ReactMethod
    public void getHashOfEncryptedCommonSecretWithoutInvitationDialog(final Promise promise) {
        cardActivationNfcApi.getHashOfEncryptedCommonSecret(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getHashOfEncryptedPassword(final Promise promise) {
        cardActivationNfcApi.getHashOfEncryptedPassword(createNfcCallback(promise));
    }

    @ReactMethod
    public void getHashOfEncryptedPasswordWithoutInvitationDialog(final Promise promise) {
        cardActivationNfcApi.getHashOfEncryptedPassword(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    /** TonWalletApplet common commands **/

    @ReactMethod
    public void getTonAppletState(final Promise promise) {
        cardCryptoNfcApi.getTonAppletState(createNfcCallback(promise));
    }

    @ReactMethod
    public void getTonAppletStateWithoutInvitationDialog(final Promise promise) {
        cardCryptoNfcApi.getTonAppletState(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getSerialNumber(final Promise promise) {
        cardActivationNfcApi.getSerialNumber(createNfcCallback(promise));
    }

    @ReactMethod
    public void getSerialNumberWithoutInvitationDialog(final Promise promise) {
        cardActivationNfcApi.getSerialNumber(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getSault(final Promise promise) {
        cardCryptoNfcApi.getSault(createNfcCallback(promise));
    }

    @ReactMethod
    public void getSaultWithoutInvitationDialog(final Promise promise) {
        cardCryptoNfcApi.getSault(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }


    /** TonWalletApplet Recovery data related commands **/

    @ReactMethod
    public void getRecoveryDataHash(final Promise promise) {
        recoveryDataApi.getRecoveryDataHash(createNfcCallback(promise));
    }

    @ReactMethod
    public void getRecoveryDataHashWithoutInvitationDialog(final Promise promise) {
        recoveryDataApi.getRecoveryDataHash(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getRecoveryDataLen(final Promise promise) {
        recoveryDataApi.getRecoveryDataLen(createNfcCallback(promise));
    }

    @ReactMethod
    public void getRecoveryDataLenWithoutInvitationDialog(final Promise promise) {
        recoveryDataApi.getRecoveryDataLen(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getRecoveryData(final Promise promise) {
        recoveryDataApi.getRecoveryData(createNfcCallback(promise));
    }

    @ReactMethod
    public void getRecoveryDataWithoutInvitationDialog(final Promise promise) {
        recoveryDataApi.getRecoveryData(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void addRecoveryData(final String recoveryData, final Promise promise) {
        recoveryDataApi.addRecoveryData(recoveryData, createNfcCallback(promise));
    }

    @ReactMethod
    public void addRecoveryDataWithoutInvitationDialog(final String recoveryData, final Promise promise) {
        recoveryDataApi.addRecoveryData(recoveryData, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void resetRecoveryData(final Promise promise) {
        recoveryDataApi.resetRecoveryData(createNfcCallback(promise));
    }

    @ReactMethod
    public void resetRecoveryDataWithoutInvitationDialog(final Promise promise) {
        recoveryDataApi.resetRecoveryData(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void isRecoveryDataSet(final Promise promise) {
        recoveryDataApi.isRecoveryDataSet(createNfcCallback(promise));
    }

    @ReactMethod
    public void isRecoveryDataSetWithoutInvitationDialog(final Promise promise) {
        recoveryDataApi.isRecoveryDataSet(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }



    /** TonWalletApplet Ed25519 related commands **/

    @ReactMethod
    public void verifyPin(String pin, final Promise promise){
        cardCryptoNfcApi.verifyPin(pin, createNfcCallback(promise));
    }

    @ReactMethod
    public void verifyPinWithoutInvitationDialog(String pin, final Promise promise){
        cardCryptoNfcApi.verifyPin(pin, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getPublicKeyForDefaultPath(final Promise promise) {
        cardCryptoNfcApi.getPublicKeyForDefaultPath(createNfcCallback(promise));
    }

    @ReactMethod
    public void getPublicKeyForDefaultPathWithoutInvitationDialog(final Promise promise) {
        cardCryptoNfcApi.getPublicKeyForDefaultPath(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getPublicKey(String index, final Promise promise){
        cardCryptoNfcApi.getPublicKey(index, createNfcCallback(promise));
    }

    @ReactMethod
    public void getPublicKeyWithoutInvitationDialog(String index, final Promise promise){
        cardCryptoNfcApi.getPublicKey(index, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void signForDefaultHdPath(String dataForSigning, final Promise promise){
        cardCryptoNfcApi.signForDefaultHdPath(dataForSigning, createNfcCallback(promise));
    }

    @ReactMethod
    public void signForDefaultHdPathWithoutInvitationDialog(String dataForSigning, final Promise promise){
        cardCryptoNfcApi.signForDefaultHdPath(dataForSigning, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void sign(String dataForSigning, String index, final Promise promise){
        cardCryptoNfcApi.sign(dataForSigning, index, createNfcCallback(promise));
    }

    @ReactMethod
    public void signWithoutInvitationDialog(String dataForSigning, String index, final Promise promise){
        cardCryptoNfcApi.sign(dataForSigning, index, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void verifyPinAndSignForDefaultHdPath(String dataForSigning, String pin, final Promise promise){
        cardCryptoNfcApi.verifyPinAndSignForDefaultHdPath(dataForSigning, pin, createNfcCallback(promise));
    }

    @ReactMethod
    public void verifyPinAndSignForDefaultHdPathWithoutInvitationDialog(String dataForSigning, String pin, final Promise promise){
        cardCryptoNfcApi.verifyPinAndSignForDefaultHdPath(dataForSigning, pin, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void verifyPinAndSign(String dataForSigning, String index, String pin, final Promise promise){
        cardCryptoNfcApi.verifyPinAndSign(dataForSigning, index, pin, createNfcCallback(promise));
    }

    @ReactMethod
    public void verifyPinAndSignWithoutInvitationDialog(String dataForSigning, String index, String pin, final Promise promise){
        cardCryptoNfcApi.verifyPinAndSign(dataForSigning, index, pin, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    /** TonWalletApplet card keychain related commands **/

    @ReactMethod
    public void resetKeyChain(final Promise promise) {
        cardKeyChainNfcApi.resetKeyChain(createNfcCallback(promise));
    }

    @ReactMethod
    public void resetKeyChainWithoutInvitationDialog(final Promise promise) {
        cardKeyChainNfcApi.resetKeyChain(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getKeyChainInfo(final Promise promise) {
        cardKeyChainNfcApi.getKeyChainInfo(createNfcCallback(promise));
    }

    @ReactMethod
    public void getKeyChainInfoWithoutInvitationDialog(final Promise promise) {
        cardKeyChainNfcApi.getKeyChainInfo(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getNumberOfKeys(final Promise promise) {
        cardKeyChainNfcApi.getNumberOfKeys(createNfcCallback(promise));
    }

    @ReactMethod
    public void getNumberOfKeysWithoutInvitationDialog(final Promise promise) {
        cardKeyChainNfcApi.getNumberOfKeys(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void checkKeyHmacConsistency(String keyHmac, final Promise promise) {
        cardKeyChainNfcApi.checkKeyHmacConsistency(keyHmac, createNfcCallback(promise));
    }

    @ReactMethod
    public void checkKeyHmacConsistencysWithoutInvitationDialog(String keyHmac, final Promise promise) {
        cardKeyChainNfcApi.checkKeyHmacConsistency(keyHmac, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void checkAvailableVolForNewKey(Short keySize, final Promise promise) {
        cardKeyChainNfcApi.checkAvailableVolForNewKey(keySize, createNfcCallback(promise));
    }

    @ReactMethod
    public void checkAvailableVolForNewKeyWithoutInvitationDialog(Short keySize, final Promise promise) {
        cardKeyChainNfcApi.checkAvailableVolForNewKey(keySize, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getIndexAndLenOfKeyInKeyChain(String keyHmac, final Promise promise) {
        cardKeyChainNfcApi.getIndexAndLenOfKeyInKeyChain(keyHmac, createNfcCallback(promise));
    }

    @ReactMethod
    public void getIndexAndLenOfKeyInKeyChainWithoutInvitationDialog(String keyHmac, final Promise promise) {
        cardKeyChainNfcApi.getIndexAndLenOfKeyInKeyChain(keyHmac, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void deleteKeyFromKeyChain(String keyHmac, final Promise promise) {
        cardKeyChainNfcApi.deleteKeyFromKeyChain(keyHmac, createNfcCallback(promise));
    }

    @ReactMethod
    public void deleteKeyFromKeyChainWithoutInvitationDialog(String keyHmac, final Promise promise) {
        cardKeyChainNfcApi.deleteKeyFromKeyChain(keyHmac, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getHmac(String index, final Promise promise) {
        cardKeyChainNfcApi.getHmac(index, createNfcCallback(promise));
    }

    @ReactMethod
    public void getHmacWithoutInvitationDialog(String index, final Promise promise) {
        cardKeyChainNfcApi.getHmac(index, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void finishDeleteKeyFromKeyChainAfterInterruption(final Promise promise) {
        cardKeyChainNfcApi.finishDeleteKeyFromKeyChainAfterInterruption(createNfcCallback(promise));
    }

    @ReactMethod
    public void finishDeleteKeyFromKeyChainAfterInterruptionWithoutInvitationDialog(final Promise promise) {
        cardKeyChainNfcApi.finishDeleteKeyFromKeyChainAfterInterruption(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getDeleteKeyChunkNumOfPackets(final Promise promise) {
        cardKeyChainNfcApi.getDeleteKeyChunkNumOfPackets(createNfcCallback(promise));
    }

    @ReactMethod
    public void getDeleteKeyChunkNumOfPacketsWithoutInvitationDialog(final Promise promise) {
        cardKeyChainNfcApi.getDeleteKeyChunkNumOfPackets(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getDeleteKeyRecordNumOfPackets(final Promise promise) {
        cardKeyChainNfcApi.getDeleteKeyRecordNumOfPackets(createNfcCallback(promise));
    }

    @ReactMethod
    public void getDeleteKeyRecordNumOfPacketsWithoutInvitationDialog(final Promise promise) {
        cardKeyChainNfcApi.getDeleteKeyRecordNumOfPackets(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getOccupiedStorageSize(final Promise promise) {
        cardKeyChainNfcApi.getOccupiedStorageSize(createNfcCallback(promise));
    }

    @ReactMethod
    public void getOccupiedStorageSizeWithoutInvitationDialog(final Promise promise) {
        cardKeyChainNfcApi.getOccupiedStorageSize(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getFreeStorageSize(final Promise promise) {
        cardKeyChainNfcApi.getFreeStorageSize(createNfcCallback(promise));
    }

    @ReactMethod
    public void getFreeStorageSizeWithoutInvitationDialog(final Promise promise) {
        cardKeyChainNfcApi.getFreeStorageSize(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getKeyFromKeyChain(String keyHmac, final Promise promise) {
        cardKeyChainNfcApi.getKeyFromKeyChain(keyHmac, createNfcCallback(promise));
    }

    @ReactMethod
    public void getKeyFromKeyChainWithoutInvitationDialog(String keyHmac, final Promise promise) {
        cardKeyChainNfcApi.getKeyFromKeyChain(keyHmac, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void addKeyIntoKeyChain(String newKey, final Promise promise) {
        cardKeyChainNfcApi.addKeyIntoKeyChain(newKey, createNfcCallback(promise));
    }

    @ReactMethod
    public void addKeyIntoKeyChainWithoutInvitationDialog(String newKey, final Promise promise) {
        cardKeyChainNfcApi.addKeyIntoKeyChain(newKey, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void changeKeyInKeyChain(String newKey, String oldKeyHMac, final Promise promise) {
        cardKeyChainNfcApi.changeKeyInKeyChain(newKey, oldKeyHMac, createNfcCallback(promise));
    }

    @ReactMethod
    public void changeKeyInKeyChainWithoutInvitationDialog(String newKey, String oldKeyHMac, final Promise promise) {
        cardKeyChainNfcApi.changeKeyInKeyChain(newKey, oldKeyHMac, createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }

    @ReactMethod
    public void getKeyChainDataAboutAllKeys(final Promise promise) {
        cardKeyChainNfcApi.getKeyChainDataAboutAllKeys(createNfcCallback(promise));
    }

    @ReactMethod
    public void getKeyChainDataAboutAllKeysWithoutInvitationDialog(final Promise promise) {
        cardKeyChainNfcApi.getKeyChainDataAboutAllKeys(createNfcCallback(promise), NOT_SHOW_INVITATION_DIALOG);
    }
}
