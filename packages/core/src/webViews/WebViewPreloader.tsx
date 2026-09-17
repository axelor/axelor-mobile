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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from '../components';
import {useOnline} from '../features/onlineSlice';
import {useSelector} from '../redux/hooks';
import {createWebViewPath} from './display.helpers';
import {useWebViewConfigs, WebViewConfig} from './webView.provider';

const PRELOAD_MESSAGE_TYPE = 'aos-webview-preload';
const SERVICE_WORKER_TIMEOUT = 20000;
const NATIVE_FALLBACK_TIMEOUT = SERVICE_WORKER_TIMEOUT + 5000;

const PRELOAD_SCRIPT = `
(function () {
  var reported = false;
  var report = function (hasServiceWorker) {
    if (reported) { return; }
    reported = true;
    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: '${PRELOAD_MESSAGE_TYPE}',
      hasServiceWorker: hasServiceWorker,
    }));
  };

  if (!('serviceWorker' in navigator)) {
    report(false);
  } else {
    navigator.serviceWorker.ready.then(function () { report(true); });
    setTimeout(function () { report(false); }, ${SERVICE_WORKER_TIMEOUT});
  }
})();
true;
`;

const WebViewPreloader = () => {
  const configs = useWebViewConfigs();
  const {isConnected} = useOnline();
  const {logged} = useSelector((state: any) => state.auth);

  const [queue, setQueue] = useState<WebViewConfig[]>([]);
  const preloadedIds = useRef<number[]>([]);
  const fallbackTimeout = useRef<any>(null);

  useEffect(() => {
    if (!logged) {
      preloadedIds.current = [];
      setQueue([]);
      return;
    }

    if (!isConnected) {
      return;
    }

    setQueue(configs.filter(({id}) => !preloadedIds.current.includes(id)));
  }, [configs, isConnected, logged]);

  const current = useMemo(
    () => (logged && isConnected ? queue[0] : null),
    [isConnected, logged, queue],
  );

  const completeCurrent = useCallback(
    (isPreloaded: boolean) => {
      clearTimeout(fallbackTimeout.current);

      if (isPreloaded && current != null) {
        preloadedIds.current = [...preloadedIds.current, current.id];
      }

      setQueue(_queue => _queue.slice(1));
    },
    [current],
  );

  useEffect(() => {
    if (current == null) {
      return;
    }

    fallbackTimeout.current = setTimeout(
      () => completeCurrent(false),
      NATIVE_FALLBACK_TIMEOUT,
    );

    return () => clearTimeout(fallbackTimeout.current);
  }, [completeCurrent, current]);

  const handleMessage = useCallback(
    (event: any) => {
      try {
        const payload = JSON.parse(event?.nativeEvent?.data);

        if (payload?.type === PRELOAD_MESSAGE_TYPE) {
          completeCurrent(payload.hasServiceWorker === true);
        }
      } catch {}
    },
    [completeCurrent],
  );

  const handleError = useCallback(() => completeCurrent(false), [
    completeCurrent,
  ]);

  if (current == null) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
      <WebView
        key={current.id}
        style={styles.webView}
        baseUrl={current.url}
        path={createWebViewPath(current)}
        injectedJavaScript={PRELOAD_SCRIPT}
        onMessage={handleMessage}
        onError={handleError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    width: 1,
    height: 1,
    opacity: 0,
  },
  webView: {
    width: 1,
    height: 1,
  },
});

export default WebViewPreloader;
