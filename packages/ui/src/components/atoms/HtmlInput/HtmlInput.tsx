/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useEffect, useRef} from 'react';
import {View, ScrollView} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import Text from '../Text/Text';

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
}

const HtmlInput = ({
  style,
  styleToolbar,
  containerStyle,
  editorBackgroundColor,
  title,
  placeholder = '',
  onChange = () => {},
  defaultInput = '',
  readonly = false,
  onHeightChange = () => {},
}: HtmlInputProps) => {
  const Colors = useThemeColor();
  const editor = useRef(null);

  useEffect(() => {
    if (defaultInput == null || defaultInput === '') {
      editor.current.setContentHTML('');
      if (editor.current.isKeyboardOpen) {
        editor.current.dismissKeyboard();
      }
    }
  }, [defaultInput]);

  return (
    <ScrollView contentContainerStyle={containerStyle}>
      <ScrollView style={[style]}>
        <View>
          {title != null ? <Text>{title}</Text> : null}
          <RichEditor
            ref={editor}
            placeholder={placeholder}
            androidHardwareAccelerationDisabled={true}
            initialContentHTML={defaultInput}
            onChange={onChange}
            disabled={readonly}
            editorStyle={{
              backgroundColor: editorBackgroundColor || Colors.backgroundColor,
              color: Colors.text,
              placeholderColor: Colors.placeholderTextColor,
            }}
            onHeightChange={onHeightChange}
          />
        </View>
      </ScrollView>
      {!readonly && (
        <RichToolbar
          style={styleToolbar}
          editor={editor}
          selectedIconTint={Colors.primaryColor.background}
          iconTint={Colors.primaryColor.foreground}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.setStrikethrough,
            actions.setUnderline,
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
