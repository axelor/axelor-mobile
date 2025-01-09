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

import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {HtmlInput, Icon} from '../../atoms';
import {getCommonStyles} from '../../../utils/commons-styles';
import {useThemeColor} from '../../../theme';

interface MessageBoxProps {
  placeholder: string;
  disabled?: boolean;
  value?: string;
  onChange?: (any) => void;
  onSend?: (any) => void;
}

const BOX_HEIGHT = 90;

const MessageBox = ({
  placeholder,
  disabled,
  value,
  onChange,
  onSend,
}: MessageBoxProps) => {
  const Colors = useThemeColor();

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <View style={styles.container}>
      <HtmlInput
        defaultInput={value}
        onChange={onChange}
        placeholder={placeholder}
        containerStyle={[commonStyles.filter, styles.htlmInput]}
        style={styles.input}
        styleToolbar={styles.htmlToolBar}
      />
      <TouchableOpacity
        style={[commonStyles.filter, styles.action]}
        disabled={disabled}
        onPress={onSend}
        activeOpacity={0.9}>
        <Icon name="send-fill" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    fontSize: 16,
    marginRight: 5,
    borderRadius: 7,
  },
  htlmInput: {
    borderRadius: 7,
    paddingHorizontal: 0,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingTop: 10,
  },
  htmlToolBar: {
    backgroundColor: null,
    marginLeft: -5,
  },
  action: {
    width: '10%',
    height: BOX_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    paddingHorizontal: 0,
  },
});

export default MessageBox;
