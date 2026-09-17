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

import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {WebView as RNWebView} from 'react-native-webview';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {useOnline} from '../../../features/onlineSlice';
import {useSelector} from '../../../redux/hooks';
import {checkNullString} from '../../../utils';

interface WebViewProps {
  style?: any;
  baseUrl?: string;
  path?: string;
  queryParams?: Object;
  injectedJavaScript?: string;
  onMessage?: (event: any) => void;
  onLoadEnd?: () => void;
  onError?: () => void;
}

const WebView = ({
  style,
  baseUrl,
  path,
  queryParams,
  injectedJavaScript,
  onMessage,
  onLoadEnd,
  onError,
}: WebViewProps) => {
  const Colors = useThemeColor();
  const {isConnected} = useOnline();

  const {baseUrl: AOSBaseUrl} = useSelector(state => state.auth);

  const formattedQueryParams = useMemo(() => {
    let _formattedQueryParams = '';

    if (queryParams != null) {
      Object.entries(queryParams).map(([key, value]) => {
        if (value == null) return;

        const separator = checkNullString(_formattedQueryParams) ? '?' : '&';
        const queryParam = key + '=' + value;
        _formattedQueryParams += separator + queryParam;
      });
    }

    return _formattedQueryParams;
  }, [queryParams]);

  const uri = useMemo(
    () => (baseUrl ?? AOSBaseUrl) + path + formattedQueryParams,
    [AOSBaseUrl, baseUrl, formattedQueryParams, path],
  );

  return (
    <RNWebView
      containerStyle={style}
      source={{uri}}
      cacheEnabled
      cacheMode={isConnected ? 'LOAD_DEFAULT' : 'LOAD_CACHE_ELSE_NETWORK'}
      domStorageEnabled
      geolocationEnabled
      injectedJavaScript={injectedJavaScript}
      onMessage={onMessage}
      onLoadEnd={onLoadEnd}
      onError={onError}
      startInLoadingState
      renderLoading={() => (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color={Colors.inverseColor.background}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
});

export default WebView;
