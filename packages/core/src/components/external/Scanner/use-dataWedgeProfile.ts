import {useCallback} from 'react';
import DeviceInfo from 'react-native-device-info';
import DataWedgeIntents from 'react-native-datawedge-intents';
import {DATAWEDGE_API} from './path.helpers';

type ScannerMode = 'single' | 'mass';

export const useDataWedgeProfile = () => {
  const getProfileName = useCallback((mode: ScannerMode = 'single') => {
    const baseName = DeviceInfo.getApplicationName().replaceAll(' ', '_');
    const suffix = __DEV__ ? '_demo' : '';
    return `${baseName}_${mode}_scanner${suffix}`;
  }, []);

  const sendCommand = useCallback((extraName: string, extraValue: any = '') => {
    DataWedgeIntents.sendBroadcastWithExtras({
      action: DATAWEDGE_API.ACTION,
      extras: {
        [extraName]: extraValue,
        SEND_RESULT: 'true',
      },
    });
  }, []);

  const switchToProfile = useCallback(
    (mode: ScannerMode = 'single') => {
      const profileName = getProfileName(mode);
      sendCommand(DATAWEDGE_API.SWITCH_TO_PROFILE, profileName);
    },
    [getProfileName, sendCommand],
  );

  return {
    getProfileName,
    switchToProfile,
  };
};
