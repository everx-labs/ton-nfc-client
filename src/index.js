/*import { NativeModules } from 'react-native';

const { NfcCardModule } = NativeModules;

export default NfcCardModule;*/

import NfcCardModuleWrapper from "./modules/NfcCardModuleWrapper";
import NfcEventsEmitterWrapper from "./modules/NfcEventsEmitterWrapper";

export default {
  NfcCardModule: NfcCardModuleWrapper,
  NfcEvents: NfcEventsEmitterWrapper 
};


