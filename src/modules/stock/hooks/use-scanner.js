import {useEffect} from 'react';
import {registerBroadcastReceiver} from 'react-native-datawedge-intents';
import {DeviceEventEmitter} from 'react-native';

const KEYS = {
  LABEL_TYPE: 'com.symbol.datawedge.label_type',
  DATA_DISPATCH_TIME: 'com.symbol.datawedge.data_dispatch_time',
  DATA_STRING: 'com.symbol.datawedge.data_string',
};

export function castIntent(intent) {
  return {
    labelType: intent[KEYS.LABEL_TYPE],
    time: new Date(intent[KEYS.DATA_DISPATCH_TIME]),
    value: intent[KEYS.DATA_STRING],
  };
}

function useScanner(handler) {
  useEffect(() => {
    registerBroadcastReceiver({
      filterActions: [
        'com.tkmfmobile.zebra.ACTION',
        'com.symbol.datawedge.api.RESULT_ACTION',
      ],
      filterCategories: ['android.intent.category.DEFAULT'],
    });
  }, []);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      'datawedge_broadcast_intent',
      handler,
    );
    return () => listener.remove();
  }, [handler]);
}

export default useScanner;
