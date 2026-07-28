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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {getCommonStyles} from '../../../utils';
import {useThemeColor} from '../../../theme';
import {Icon, Input} from '../../atoms';

interface EditableInputProps {
  placeholder: string;
  onValidate: (value: string) => void;
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

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

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
        multiline && {height: undefined},
      ]}>
      <Input
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={text => setValue(text)}
        readOnly={isEditable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        testID="editableInput"
      />
      <Icon
        name={isEditable ? 'pencil-fill' : 'check-lg'}
        touchable
        onPress={handleIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
});

export default EditableInput;
