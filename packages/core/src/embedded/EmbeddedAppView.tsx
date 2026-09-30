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
import {ActivityIndicator, Alert, BackHandler, StyleSheet} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {
  ShouldStartLoadRequest,
  WebViewNavigation,
} from 'react-native-webview/lib/WebViewTypes';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useCameraScannerSelector,
  useCameraScannerValueByKey,
} from '../features/cameraScannerSlice';
import {useScannedValueByKey} from '../features/scannerSlice';
import {useOnline} from '../features/onlineSlice';
import {useNavigation} from '../hooks/use-navigation';
import {useScanActivator} from '../hooks/use-scan-activator';
import {useSelector} from '../redux/hooks';
import {storage} from '../storage/Storage';
import {axiosApiProvider} from '../apiProviders/Standard';
import {showToastMessage} from '../utils/show-toast-message';
import type {HostTheme} from '@axelor/app-bridge';
import {EmbeddedBundle} from './bundles';
import {getAppBridgeMethods, runAppBridgeHandler} from './data-handlers';
import {
  Bootstrap,
  HostCall,
  HostError,
  HostToAppMessage,
  PROTOCOL_VERSION,
  createBootstrapScript,
  createDeliveryScript,
  parseCallMessage,
} from './protocol';

export type RecordScreenTarget = {
  screen: string;
  params: Record<string, unknown>;
};

export type RecordScreenResolver = (id: number) => RecordScreenTarget;

export interface EmbeddedAppViewProps {
  /* App code downloaded from AOS and cached on the device */
  bundle?: EmbeddedBundle;
  /* Absolute URL, or a path resolved against the AOS base URL; used when no bundle is given */
  url?: string;
  params?: Record<string, string>;
  /* Native screens to open for nav.openRecord, by model name */
  recordScreens?: Record<string, RecordScreenResolver>;
}

const SCAN_KEY = 'embedded-app_scan';

const TRANSLATIONS_KEY = 'app-bridge_translations';

/* Methods this view handles itself, because they need navigation, alerts or the scanner */
const VIEW_METHODS = [
  'ui.toast',
  'ui.confirm',
  'ui.alert',
  'ui.error',
  'nav.close',
  'nav.setTitle',
  'device.scan',
];

type PendingScan = {id: string; sawScanner: boolean};

type LoggedUser = {
  id?: number;
  code?: string;
  name?: string;
  fullName?: string;
  language?: string;
  localization?: {code?: string};
};

type HostState = {
  auth?: {baseUrl?: string | null};
  user?: {user?: LoggedUser | null};
};

const selectBaseUrl = (state: HostState): string | null =>
  state.auth?.baseUrl ?? null;

const selectLoggedUser = (state: HostState): LoggedUser | null =>
  state.user?.user ?? null;

function resolveUrl(url: string, baseUrl: string | null): string {
  if (/^https?:\/\//.test(url) || baseUrl == null) {
    return url;
  }
  const root = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${root}${url.replace(/^\//, '')}`;
}

/* Android reports file:// pages with the opaque origin "null" */
function knownUrl(url: string | null | undefined): string | null {
  return url == null || url === 'null' || url.length === 0 ? null : url;
}

function originOf(url: string | null | undefined): string | null {
  const match = url?.match(/^(https?:\/\/[^/?#]+)/);
  return match ? match[1] : null;
}

function appendParams(url: string, params?: Record<string, string>): string {
  if (params == null || Object.keys(params).length === 0) {
    return url;
  }
  const query = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');
  return `${url}${url.includes('?') ? '&' : '?'}${query}`;
}

function readQueryParams(url: string): Record<string, string> {
  const query = url.split('#')[0].split('?')[1];
  if (query == null) {
    return {};
  }
  return query.split('&').reduce<Record<string, string>>((result, pair) => {
    const [key, value = ''] = pair.split('=');
    if (key) {
      result[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    return result;
  }, {});
}

/*
 * The AOP translation catalog (js/messages.js), cached so an app opened offline is
 * still translated. Apps read translations synchronously, so the WebView waits for it.
 */
function useTranslations(online: boolean): Record<string, string> | null {
  const [translations, setTranslations] = useState<Record<
    string,
    string
  > | null>(null);

  useEffect(() => {
    let active = true;
    const cached = storage.getItem(TRANSLATIONS_KEY);
    const cachedTranslations =
      cached != null && typeof cached === 'object'
        ? (cached as Record<string, string>)
        : null;

    if (!online) {
      setTranslations(cachedTranslations ?? {});
      return;
    }
    axiosApiProvider
      .get({url: 'js/messages.js'})
      .then(response => {
        const catalog = response?.data;
        if (catalog == null || typeof catalog !== 'object') {
          throw new Error('Unexpected translation catalog');
        }
        storage.setItem(TRANSLATIONS_KEY, catalog);
        if (active) {
          setTranslations(catalog as Record<string, string>);
        }
      })
      .catch(() => active && setTranslations(cachedTranslations ?? {}));
    return () => {
      active = false;
    };
  }, [online]);

  return translations;
}

type ThemeColors = ReturnType<typeof useThemeColor>;

/* AOM themes are RN color sets; apps using @axelor/ui get the matching palette */
function toHostTheme(colors: ThemeColors): HostTheme {
  return {
    mode: 'light',
    name: null,
    options: {
      palette: {
        mode: 'light',
        primary: colors.primaryColor.background,
        secondary: colors.secondaryColor.background,
        success: colors.successColor.background,
        warning: colors.cautionColor.background,
        danger: colors.errorColor.background,
        info: colors.infoColor.background,
        body_bg: colors.backgroundColor,
        body_color: colors.text,
      },
    },
  };
}

const EmbeddedAppView = ({
  bundle,
  url,
  params,
  recordScreens,
}: EmbeddedAppViewProps) => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const webViewRef = useRef<WebView>(null);
  const pendingScanRef = useRef<PendingScan | null>(null);

  const baseUrl: string | null = useSelector(selectBaseUrl);
  const user: LoggedUser | null = useSelector(selectLoggedUser);
  const {isEnabled: onlineModeEnabled} = useOnline();

  const {enable: enableScan, disable: disableScan} = useScanActivator(SCAN_KEY);
  const cameraBarcode = useCameraScannerValueByKey(SCAN_KEY);
  const deviceScanValue = useScannedValueByKey(SCAN_KEY);
  const {isEnabled: isCameraEnabled} = useCameraScannerSelector();

  const bundleDir = bundle?.dir ?? null;

  const uri = useMemo(() => {
    if (bundleDir != null) {
      return `${bundleDir}index.html`;
    }
    return appendParams(resolveUrl(url ?? '', baseUrl), params);
  }, [baseUrl, bundleDir, params, url]);

  const currentUrlRef = useRef<string>(uri);

  /*
   * Android reports a null url on messages from file:// pages, so a bundled app is
   * trusted through navigation instead: the WebView can never leave the bundle directory.
   */
  const isInsideBundle = useCallback(
    (targetUrl: string | undefined) =>
      bundleDir != null && targetUrl?.startsWith(bundleDir) === true,
    [bundleDir],
  );

  const isAllowedSource = useCallback(
    (sourceUrl: string | null | undefined) => {
      if (bundleDir != null) {
        return isInsideBundle(knownUrl(sourceUrl) ?? currentUrlRef.current);
      }
      const origin = originOf(sourceUrl);
      return (
        origin != null && [originOf(uri), originOf(baseUrl)].includes(origin)
      );
    },
    [baseUrl, bundleDir, isInsideBundle, uri],
  );

  const handleShouldStartLoad = useCallback(
    (request: ShouldStartLoadRequest) =>
      bundleDir == null ||
      knownUrl(request.url) == null ||
      isInsideBundle(request.url),
    [bundleDir, isInsideBundle],
  );

  const handleNavigationStateChange = useCallback(
    (navigationState: WebViewNavigation) => {
      const navigatedUrl = knownUrl(navigationState.url);
      if (navigatedUrl != null) {
        currentUrlRef.current = navigatedUrl;
      }
    },
    [],
  );

  const online = onlineModeEnabled !== false;
  const translations = useTranslations(online);
  const theme = useMemo(() => toHostTheme(Colors), [Colors]);

  const recordModels = useMemo(
    () => Object.keys(recordScreens ?? {}),
    [recordScreens],
  );

  /* Later changes to the session are sent as events */
  const bootstrap = useMemo<Bootstrap | null>(
    () =>
      translations == null
        ? null
        : {
            protocol: PROTOCOL_VERSION,
            kind: 'aom-native',
            app: {
              id: bundle?.id ?? null,
              version: bundle?.version ?? null,
              source: bundle != null ? 'downloaded' : 'server',
            },
            session: {
              user: {
                id: user?.id ?? null,
                login: user?.code ?? null,
                name: user?.name ?? user?.fullName ?? null,
              },
              lang: user?.localization?.code ?? user?.language ?? 'en',
              theme,
              online,
            },
            params: bundleDir != null ? (params ?? {}) : readQueryParams(uri),
            capabilities: [
              ...getAppBridgeMethods(),
              ...VIEW_METHODS,
              ...(recordModels.length > 0 ? ['nav.openRecord'] : []),
            ],
            recordModels,
            translations,
          },
    [
      bundle,
      bundleDir,
      online,
      params,
      recordModels,
      theme,
      translations,
      uri,
      user,
    ],
  );

  const bootstrapScript = useMemo(
    () => (bootstrap == null ? null : createBootstrapScript(bootstrap)),
    [bootstrap],
  );

  const reloadTokensRef = useRef<string[]>([]);

  const deliver = useCallback((message: HostToAppMessage) => {
    webViewRef.current?.injectJavaScript(createDeliveryScript(message));
  }, []);

  const resolveCall = useCallback(
    (id: string, result: unknown) => deliver({type: 'result', id, result}),
    [deliver],
  );

  const rejectCall = useCallback(
    (id: string, error: unknown) => {
      const bridgeError =
        error instanceof HostError
          ? error
          : new HostError(
              'server',
              error instanceof Error ? error.message : String(error),
            );
      deliver({
        type: 'error',
        id,
        error: {
          code: bridgeError.code,
          message: bridgeError.message,
          fields: bridgeError.fields,
        },
      });
    },
    [deliver],
  );

  useEffect(() => {
    const pending = pendingScanRef.current;
    const value = cameraBarcode?.value ?? deviceScanValue;
    if (pending != null && value != null) {
      pendingScanRef.current = null;
      disableScan();
      resolveCall(pending.id, value);
    }
  }, [cameraBarcode, deviceScanValue, disableScan, resolveCall]);

  /* A ref, so the cleanup only runs on unmount and not when disableScan changes */
  const disableScanRef = useRef(disableScan);
  disableScanRef.current = disableScan;

  useEffect(
    () => () => {
      if (pendingScanRef.current != null) {
        pendingScanRef.current = null;
        disableScanRef.current();
      }
    },
    [],
  );

  useEffect(() => {
    const pending = pendingScanRef.current;
    if (pending == null) {
      return;
    }
    if (isCameraEnabled) {
      pending.sawScanner = true;
    } else if (pending.sawScanner) {
      pendingScanRef.current = null;
      resolveCall(pending.id, null);
    }
  }, [isCameraEnabled, resolveCall]);

  useEffect(() => {
    deliver({type: 'event', name: 'network', payload: {online}});
  }, [deliver, online]);

  useEffect(() => {
    deliver({type: 'event', name: 'themeChanged', payload: theme});
  }, [deliver, theme]);

  /* Back from a record opened with nav.openRecord: let the app reload its data */
  useEffect(
    () =>
      navigation.addListener('focus', () => {
        const tokens = reloadTokensRef.current;
        reloadTokensRef.current = [];
        tokens.forEach(token =>
          deliver({type: 'event', name: 'nav.reload', payload: {token}}),
        );
      }),
    [deliver, navigation],
  );

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        deliver({type: 'event', name: 'back', payload: null});
        return false;
      },
    );
    return () => subscription.remove();
  }, [deliver]);

  const alert = useCallback(
    (title: unknown, message: unknown) =>
      new Promise<null>(resolve =>
        Alert.alert(String(title ?? ''), String(message ?? ''), [
          {text: 'OK', onPress: () => resolve(null)},
        ]),
      ),
    [],
  );

  const runHostCall = useCallback(
    async (message: HostCall): Promise<unknown> => {
      const {method, params: callParams} = message;

      switch (method) {
        case 'host.bootstrap':
          return bootstrap;
        case 'ui.toast': {
          const toastType =
            callParams.type === 'warning' ? 'info' : callParams.type;
          showToastMessage({
            type: (toastType as 'info' | 'success' | 'error') ?? 'info',
            position: 'bottom',
            bottomOffset: 20,
            text1: String(callParams.title ?? callParams.message ?? ''),
            text2:
              callParams.title != null ? String(callParams.message ?? '') : '',
          });
          return null;
        }
        case 'ui.confirm':
          return new Promise<boolean>(resolve =>
            Alert.alert(
              String(callParams.title ?? ''),
              String(callParams.message ?? ''),
              [
                {
                  text: String(callParams.noTitle ?? 'Cancel'),
                  style: 'cancel',
                  onPress: () => resolve(false),
                },
                {
                  text: String(callParams.yesTitle ?? 'OK'),
                  onPress: () => resolve(true),
                },
              ],
              {cancelable: true, onDismiss: () => resolve(false)},
            ),
          );
        case 'ui.alert':
        case 'ui.error':
          return alert(callParams.title, callParams.message);
        case 'nav.openRecord': {
          const model = String(callParams.model ?? '');
          const resolver = recordScreens?.[model];
          if (resolver == null) {
            throw new HostError(
              'unsupported',
              `No mobile screen is available for ${model}`,
            );
          }
          if (typeof callParams.reloadToken === 'string') {
            reloadTokensRef.current.push(callParams.reloadToken);
          }
          const target = resolver(Number(callParams.id));
          navigation.navigate(target.screen, target.params);
          return null;
        }
        case 'nav.close':
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
          return null;
        case 'nav.setTitle':
          navigation.setOptions({title: String(callParams.title ?? '')});
          return null;
        default:
          return runAppBridgeHandler(method, callParams, {online});
      }
    },
    [alert, bootstrap, navigation, online, recordScreens],
  );

  const handleMessage = useCallback(
    (event: WebViewMessageEvent) => {
      const message = parseCallMessage(event.nativeEvent.data);
      if (message == null) {
        return;
      }
      if (!isAllowedSource(event.nativeEvent.url)) {
        rejectCall(
          message.id,
          new HostError(
            'forbidden',
            `Origin of ${
              knownUrl(event.nativeEvent.url) ?? currentUrlRef.current
            } is not allowed`,
          ),
        );
        return;
      }
      if (message.protocol !== PROTOCOL_VERSION) {
        rejectCall(
          message.id,
          new HostError(
            'unsupported',
            `Bridge protocol ${message.protocol} is not supported, the mobile app speaks ${PROTOCOL_VERSION}`,
          ),
        );
        return;
      }

      if (message.method === 'device.scan') {
        /* Only one scan at a time: an earlier one that is still open resolves as cancelled */
        const earlier = pendingScanRef.current;
        if (earlier != null) {
          resolveCall(earlier.id, null);
        }
        pendingScanRef.current = {
          id: message.id,
          sawScanner: isCameraEnabled,
        };
        enableScan();
        return;
      }

      runHostCall(message)
        .then(result => resolveCall(message.id, result))
        .catch(error => rejectCall(message.id, error));
    },
    [
      enableScan,
      isAllowedSource,
      isCameraEnabled,
      rejectCall,
      resolveCall,
      runHostCall,
    ],
  );

  if (bootstrapScript == null) {
    return (
      <ActivityIndicator
        style={styles.loading}
        size="large"
        color={Colors.primaryColor.background}
      />
    );
  }

  return (
    <WebView
      ref={webViewRef}
      source={{uri}}
      style={styles.webView}
      originWhitelist={['*']}
      allowFileAccess={bundleDir != null}
      allowingReadAccessToURL={bundleDir ?? undefined}
      sharedCookiesEnabled={true}
      injectedJavaScriptBeforeContentLoaded={bootstrapScript}
      onMessage={handleMessage}
      onShouldStartLoadWithRequest={handleShouldStartLoad}
      onNavigationStateChange={handleNavigationStateChange}
      startInLoadingState
      renderLoading={() => (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={Colors.primaryColor.background}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
  loading: {
    width: '100%',
    height: '100%',
  },
});

export default EmbeddedAppView;
