import {useEffect} from 'react';
import {registerBroadcastReceiver} from 'react-native-datawedge-intents';
import {scanValue, useScannerSelector} from '@/features/scannerSlice';
import {DeviceEventEmitter} from 'react-native';
import {useDispatch} from 'react-redux';

const Scanner = () => {
  const {isEnabled, type} = useScannerSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    registerBroadcastReceiver({
      filterActions: [
        'com.aosmobile.zebra.ACTION',
        'com.symbol.datawedge.api.RESULT_ACTION',
      ],
      filterCategories: ['android.intent.category.DEFAULT'],
    });
  }, []);

  useEffect(() => {
    if (isEnabled) {
      const listener = DeviceEventEmitter.addListener(
        'datawedge_broadcast_intent',
        intent => {
          console.log({intent});
          const {labelType, value} = castIntent(intent);
          if (labelType === ean13LabelType) {
            dispatch(scanValue(value.slice(0, -1)));
          } else {
            dispatch(scanValue(value));
          }
        },
      );

      return () => {
        listener.remove();
      };
    }
  }, [dispatch, isEnabled, type]);

  return null;
};

const ean13LabelType = 'LABEL-TYPE-EAN13';

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

export default Scanner;
