/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {useSelector} from '../../../redux/hooks';

interface WebViewProps {
  style?: any;
  queryParams?: string;
}

const WebView = ({style, queryParams = ''}: WebViewProps) => {
  const Colors = useThemeColor();

  const {baseUrl} = useSelector((state: any) => state.auth);

  const uri = useMemo(
    () => baseUrl + '#/ds/' + queryParams,
    [baseUrl, queryParams],
  );

  return (
    <RNWebView
      containerStyle={style}
      source={{uri}}
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
