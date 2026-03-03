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

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {useOutsideClickHandler} from '../../../hooks';
import {useThemeColor} from '../../../theme';
import {Text} from '../../atoms';

// NOTE: documentation https://www.npmjs.com/package/react-native-pell-rich-editor

interface HtmlInputProps {
  style?: any;
  styleToolbar?: any;
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
  styleToolbar,
  containerStyle,
  editorBackgroundColor,
  title,
  placeholder,
  onChange,
  defaultInput,
  readonly = false,
  onHeightChange,
  onFocus,
  onBlur,
}: HtmlInputProps) => {
  const Colors = useThemeColor();
  const editor = useRef(null);
  const wrapperRef = useRef(null);

  const [editorAttached, setEditorAttached] = useState(false);
  const [key, setKey] = useState(defaultInput);
  const [isFocused, setIsFocused] = useState(false);

  useOutsideClickHandler({
    wrapperRef,
    handleOutsideClick: () => editor.current?.blurContentEditor?.(),
    activationCondition: isFocused,
  });

  const editorInitializedCallback = () => {
    setEditorAttached(true);
  };

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  useEffect(() => {
    if (editor.current && (defaultInput == null || defaultInput === '')) {
      editor.current.setContentHTML('');
      if (editor.current.isKeyboardOpen) {
        editor.current.dismissKeyboard();
      }
    }
  }, [defaultInput]);

  useEffect(() => {
    if (!isFocused) {
      setKey(defaultInput);
    }
  }, [defaultInput, isFocused]);

  return (
    <ScrollView
      ref={wrapperRef}
      testID="htmlInputScrollView"
      contentContainerStyle={containerStyle}>
      <ScrollView testID="htmlInputInnerScroll" style={style}>
        <View>
          {title != null ? <Text>{title}</Text> : null}
          <RichEditor
            key={key}
            ref={editor}
            placeholder={placeholder}
            androidLayerType="software"
            initialContentHTML={defaultInput}
            onChange={onChange}
            disabled={readonly}
            // eslint-disable-next-line react-native/no-inline-styles
            editorStyle={{
              backgroundColor: editorBackgroundColor || Colors.backgroundColor,
              color: Colors.text,
              placeholderColor: Colors.placeholderTextColor,
              contentCSSText: 'word-wrap: break-word',
            }}
            onHeightChange={onHeightChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editorInitializedCallback={editorInitializedCallback}
          />
        </View>
      </ScrollView>
      {!readonly && editorAttached && (
        <RichToolbar
          style={styleToolbar}
          editor={editor}
          selectedIconTint={Colors.primaryColor.background}
          iconTint={Colors.text}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.setStrikethrough,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.checkboxList,
            actions.undo,
            actions.redo,
          ]}
        />
      )}
    </ScrollView>
  );
};

export default HtmlInput;
