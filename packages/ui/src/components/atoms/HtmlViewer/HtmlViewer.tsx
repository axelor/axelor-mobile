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

import React, {useCallback, useMemo, useState} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useThemeColor} from '../../../theme';

const INITIAL_HEIGHT = 60;

const HEIGHT_REPORTER = `
  (function() {
    function post() {
      window.ReactNativeWebView.postMessage(String(document.body.scrollHeight));
    }
    post();
    window.addEventListener('load', post);
    if (window.ResizeObserver) {
      new ResizeObserver(post).observe(document.body);
    }
  })();
  true;
`;

interface HtmlViewerProps {
  style?: any;
  html: string;
  maxHeight?: number;
  fontSize?: number;
  backgroundColor?: string;
}

const HtmlViewer = ({
  style,
  html,
  maxHeight,
  fontSize = 12,
  backgroundColor,
}: HtmlViewerProps) => {
  const Colors = useThemeColor();

  const [contentHeight, setContentHeight] = useState(INITIAL_HEIGHT);

  const _backgroundColor = useMemo(
    () => backgroundColor ?? Colors.backgroundColor,
    [backgroundColor, Colors.backgroundColor],
  );

  const source = useMemo(
    () => ({
      html: `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background-color: ${_backgroundColor};
        color: ${Colors.text};
        font-family: -apple-system, Roboto, Helvetica, Arial, sans-serif;
        font-size: ${fontSize}px;
        line-height: 1.4;
        overflow-wrap: break-word;
      }
      p { margin: 0 0 8px; }
      p:last-child { margin-bottom: 0; }
      ul, ol { margin: 0 0 8px; padding-left: 20px; }
      a { color: ${Colors.primaryColor.background}; }
      img { max-width: 100%; height: auto; }
      table { max-width: 100%; }
    </style>
  </head>
  <body>${html}</body>
</html>`,
    }),
    [Colors, _backgroundColor, fontSize, html],
  );

  const isScrollable = useMemo(
    () => maxHeight != null && contentHeight > maxHeight,
    [contentHeight, maxHeight],
  );

  const height = useMemo(
    () =>
      maxHeight != null ? Math.min(contentHeight, maxHeight) : contentHeight,
    [contentHeight, maxHeight],
  );

  const handleMessage = useCallback(({nativeEvent}: any) => {
    const _height = Number(nativeEvent?.data);
    if (!Number.isNaN(_height) && _height > 0) {
      setContentHeight(_height);
    }
  }, []);

  // The content comes from the server: never navigate inside the WebView, open
  // the target in the system browser instead.
  const handleShouldStartLoad = useCallback(({url}: any) => {
    if (url === 'about:blank') return true;

    Linking.openURL(url);
    return false;
  }, []);

  return (
    <View style={[{height}, style]} testID="htmlViewerContainer">
      <WebView
        originWhitelist={['*']}
        source={source}
        style={[styles.webview, {backgroundColor: _backgroundColor}]}
        javaScriptEnabled
        domStorageEnabled={false}
        injectedJavaScript={HEIGHT_REPORTER}
        onMessage={handleMessage}
        scrollEnabled={isScrollable}
        nestedScrollEnabled={isScrollable}
        showsVerticalScrollIndicator={isScrollable}
        onShouldStartLoadWithRequest={handleShouldStartLoad}
        testID="htmlViewerWebView"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});

export default HtmlViewer;
