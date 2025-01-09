/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import {useEffect} from 'react';
import {DeviceEventEmitter, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {registerBroadcastReceiver} from 'react-native-datawedge-intents';
import {scanValue, useScannerSelector} from '../../../features/scannerSlice';

const ean13LabelType = 'LABEL-TYPE-EAN13';

function formatScan(barcodeValue, barcodeType) {
  if (barcodeType === ean13LabelType) {
    return barcodeValue.slice(0, -1);
  } else {
    return barcodeValue;
  }
}

const KEYS = {
  LABEL_TYPE: 'com.symbol.datawedge.label_type',
  DATA_DISPATCH_TIME: 'com.symbol.datawedge.data_dispatch_time',
  DATA_STRING: 'com.symbol.datawedge.data_string',
};

function castIntent(intent) {
  return {
    labelType: intent[KEYS.LABEL_TYPE],
    time: new Date(intent[KEYS.DATA_DISPATCH_TIME]),
    value: intent[KEYS.DATA_STRING],
  };
}

const Scanner = () => {
  const {isEnabled} = useScannerSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      registerBroadcastReceiver({
        filterActions: [
          'com.aosmobile.zebra.ACTION',
          'com.symbol.datawedge.api.RESULT_ACTION',
        ],
        filterCategories: ['android.intent.category.DEFAULT'],
      });
    }
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      if (isEnabled) {
        const listener = DeviceEventEmitter.addListener(
          'datawedge_broadcast_intent',
          intent => {
            const {labelType, value} = castIntent(intent);
            const formattedValue = formatScan(value, labelType);

            dispatch(scanValue(formattedValue));
          },
        );

        return () => {
          listener.remove();
        };
      }
    }
  }, [dispatch, isEnabled]);

  return null;
};

export default Scanner;
