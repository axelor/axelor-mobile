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

import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Input} from '../../atoms';
import {getCommonStyles} from '../../../utils/commons-styles';
import {useThemeColor} from '../../../theme/ThemeContext';

interface MessageBoxProps {
  placeholder: string;
  disabled?: boolean;
  value?: string;
  onChange?: (any) => void;
  onSend?: (any) => void;
}

const BOX_HEIGHT = 45;
const BOX_MAX_HEIGHT = 85;

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
      <Input
        style={[commonStyles.filter, styles.input]}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        multiline={true}
      />
      <TouchableOpacity
        style={[commonStyles.filter, styles.action]}
        disabled={disabled}
        onPress={onSend}
        activeOpacity={0.9}>
        <Icon name="paper-plane" size={24} />
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
    width: '78%',
    minHeight: BOX_HEIGHT,
    maxHeight: BOX_MAX_HEIGHT,
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  action: {
    width: '15%',
    height: BOX_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessageBox;
