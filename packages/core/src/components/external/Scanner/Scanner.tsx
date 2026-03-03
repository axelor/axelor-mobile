/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {useCallback, useEffect, useMemo} from 'react';
import {DeviceEventEmitter, Platform} from 'react-native';
import DataWedgeIntents from 'react-native-datawedge-intents';
import DeviceInfo from 'react-native-device-info';
import {useDispatch} from '../../../redux/hooks';
import {scanValue} from '../../../features/scannerSlice';
import {DATAWEDGE_API} from './path.helpers';
import {
  castScanIntent,
  castVersionIntent,
  formatBarcode,
  isScanIntent,
  isVersionIntent,
} from './intent.helpers';

const Scanner = () => {
  const dispatch = useDispatch();

  const appConfig = useMemo(
    () => ({
      profileName: `${DeviceInfo.getApplicationName().replaceAll(' ', '_')}${__DEV__ ? '_demo' : ''}`,
      intentAction: `${DeviceInfo.getBundleId()}.zebra.ACTION`,
      packageName: `${DeviceInfo.getBundleId()}`,
    }),
    [],
  );

  const registerBroadcastReceiver = useCallback(() => {
    DataWedgeIntents.registerBroadcastReceiver({
      filterActions: [appConfig.intentAction, DATAWEDGE_API.RESULT_ACTION],
      filterCategories: ['android.intent.category.DEFAULT'],
    });
  }, [appConfig.intentAction]);

  const sendCommand = useCallback((extraName: string, extraValue: any = '') => {
    DataWedgeIntents.sendBroadcastWithExtras({
      action: DATAWEDGE_API.ACTION,
      extras: {[extraName]: extraValue, SEND_RESULT: 'true'},
    });
  }, []);

  const determineVersion = useCallback(() => {
    sendCommand(DATAWEDGE_API.GET_VERSION_INFO);
  }, [sendCommand]);

  const createProfile = useCallback(() => {
    sendCommand(DATAWEDGE_API.CREATE_PROFILE, appConfig.profileName);
    sendCommand(DATAWEDGE_API.SET_CONFIG, {
      PROFILE_NAME: appConfig.profileName,
      PROFILE_ENABLED: 'true',
      CONFIG_MODE: 'UPDATE',
      PLUGIN_CONFIG: {
        PLUGIN_NAME: 'BARCODE',
        RESET_CONFIG: 'true',
        PARAM_LIST: {},
      },
      APP_LIST: [
        {
          PACKAGE_NAME: appConfig.packageName,
          ACTIVITY_LIST: ['*'],
        },
      ],
    });

    sendCommand(DATAWEDGE_API.SET_CONFIG, {
      PROFILE_NAME: appConfig.profileName,
      PROFILE_ENABLED: 'true',
      CONFIG_MODE: 'UPDATE',
      PLUGIN_CONFIG: {
        PLUGIN_NAME: 'INTENT',
        RESET_CONFIG: 'true',
        PARAM_LIST: {
          intent_output_enabled: 'true',
          intent_action: appConfig.intentAction,
          intent_delivery: '2',
        },
      },
    });
  }, [
    appConfig.intentAction,
    appConfig.packageName,
    appConfig.profileName,
    sendCommand,
  ]);

  const broadcastReceiver = useCallback(
    (intent: any) => {
      if (isScanIntent(intent)) {
        const {labelType, value} = castScanIntent(intent);
        const formattedValue = formatBarcode(value, labelType);
        dispatch(scanValue(formattedValue));
      }

      if (isVersionIntent(intent)) {
        const {version} = castVersionIntent(intent);

        if (version >= '06.4') {
          createProfile();
        }
      }
    },
    [createProfile, dispatch],
  );

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      registerBroadcastReceiver();
      determineVersion();
    }
  }, [determineVersion, registerBroadcastReceiver]);

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      const listener = DeviceEventEmitter.addListener(
        'datawedge_broadcast_intent',
        broadcastReceiver,
      );

      return () => {
        listener.remove();
      };
    }
  }, [broadcastReceiver]);

  return null;
};

export default Scanner;
