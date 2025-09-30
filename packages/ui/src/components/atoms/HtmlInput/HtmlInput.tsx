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

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {InteractionManager, View, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import {OUTSIDE_INDICATOR, useClickOutside} from '../../../hooks';
import {useThemeColor} from '../../../theme';
import {Text} from '../../atoms';
import {buildQuillHtml} from './quillTemplate';

interface HtmlInputProps {
  style?: any;
  containerStyle?: any;
  editorBackgroundColor?: string;
  title?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultInput?: string;
  readonly?: boolean;
  onHeightChange?: (height: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const HtmlInput = ({
  style,
  containerStyle,
  editorBackgroundColor,
  title,
  placeholder = '',
  onChange,
  defaultInput = '',
  readonly = false,
  onHeightChange,
  onFocus,
  onBlur,
}: HtmlInputProps) => {
  const Colors = useThemeColor();
  const wrapperRef = useRef(null);
  const webviewRef = useRef<any>(null);
  const lastSelfValueRef = useRef<string | null>(null);
  const clickOutside = useClickOutside({wrapperRef});

  const [key, setKey] = useState(defaultInput);
  const [isFocused, setIsFocused] = useState(false);
  const [ready, setReady] = useState(false);
  const [initialHTML, setInitialHTML] = useState<string>(defaultInput ?? '');

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => setReady(true));
    return () => task.cancel?.();
  }, []);

  useEffect(() => {
    const incoming = defaultInput ?? '';
    if (
      lastSelfValueRef.current != null &&
      incoming === lastSelfValueRef.current
    ) {
      return;
    }
    setKey(incoming);
    setInitialHTML(incoming);
  }, [defaultInput]);

  useEffect(() => {
    if (clickOutside === OUTSIDE_INDICATOR && isFocused) {
      try {
        webviewRef.current?.injectJavaScript(
          'window.__axelorQuill?.blur?.(); true;',
        );
      } catch {}
    }
  }, [clickOutside, isFocused]);

  const webStyle = useMemo(
    () => [
      {
        backgroundColor: editorBackgroundColor || Colors.backgroundColor,
        width: '100%',
        height: 200,
        minHeight: 40,
      } as any,
    ],
    [editorBackgroundColor, Colors.backgroundColor],
  );

  const html = useMemo(
    () =>
      buildQuillHtml({
        initialHtml: initialHTML,
        placeholder,
        readOnly: readonly,
        pinToolbar: true,
        colors: {
          background: editorBackgroundColor || Colors.backgroundColor,
          text: Colors.text,
          placeholder: Colors.placeholderTextColor,
          accent: Colors.primaryColor.background,
        },
      }),
    [initialHTML, placeholder, readonly, editorBackgroundColor, Colors],
  );

  return (
    <ScrollView
      ref={wrapperRef}
      testID="htmlInputScrollView"
      contentContainerStyle={containerStyle}>
      <View testID="htmlInputInnerScroll" style={style}>
        {title != null ? <Text>{title}</Text> : null}
        {ready ? (
          <WebView
            key={key}
            originWhitelist={['*']}
            source={{html}}
            ref={webviewRef}
            onMessage={e => {
              try {
                const data = JSON.parse(e.nativeEvent.data);
                switch (data?.type) {
                  case 'onChange':
                    onChange?.(data.message);
                    break;
                  case 'onHeight':
                    const next = Number(data.message);
                    if (!Number.isNaN(next)) onHeightChange?.(next);
                    break;
                  case 'onFocus':
                    setIsFocused(true);
                    onFocus?.();
                    break;
                  case 'onBlur':
                    setIsFocused(false);
                    onBlur?.();
                    break;
                }
              } catch {}
            }}
            javaScriptEnabled
            keyboardDisplayRequiresUserAction={false}
            androidLayerType="software"
            nestedScrollEnabled
            overScrollMode="always"
            style={webStyle}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

export default HtmlInput;
