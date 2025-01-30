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

import React, {useMemo, useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {getCommonStyles} from '../../../utils/commons-styles';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Icon, Input} from '../../atoms';

const PENCIL_ICON = Platform.OS === 'web' ? 'pencil' : 'pencil-alt';

interface EditableInputProps {
  placeholder: string;
  onValidate: (any) => void;
  defaultValue: string | undefined;
  multiline?: boolean;
  numberOfLines?: number;
}

const EditableInput = ({
  placeholder,
  onValidate,
  defaultValue,
  multiline = false,
  numberOfLines = 1,
}: EditableInputProps) => {
  const Colors = useThemeColor();
  const [isEditable, setEditable] = useState(true);
  const [value, setValue] = useState(defaultValue);

  const handleIcon = () => {
    setEditable(!isEditable);
    if (!isEditable) {
      onValidate(value == null ? '' : value);
    }
  };

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <View
      style={[
        commonStyles.filter,
        commonStyles.filterAlign,
        multiline ? styles.size : commonStyles.filterSize,
      ]}>
      <Input
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={text => setValue(text)}
        readOnly={isEditable}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleIcon}>
          <Icon name={isEditable ? PENCIL_ICON : 'check'} size={15} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  size: {
    width: '90%',
    minHeight: 40,
  },
  input: {
    width: '80%',
    fontSize: 14,
  },
  actions: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});

export default EditableInput;
