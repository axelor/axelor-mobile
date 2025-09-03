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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {checkNullString, getCommonStyles} from '../../../utils';
import {useThemeColor} from '../../../theme';
import {HtmlInput, Icon, Text} from '../../atoms';

interface EditableHtmlInputProps {
  style?: any;
  title?: string;
  placeholder?: string;
  defaultValue: string;
  readonly?: boolean;
  onValidate: (value: string) => void;
}

const EditableHtmlInput = ({
  style,
  title,
  placeholder,
  defaultValue,
  readonly = false,
  onValidate,
}: EditableHtmlInputProps) => {
  const Colors = useThemeColor();

  const [isEditable, setEditable] = useState(true);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleIconPress = () => {
    setEditable(!isEditable);
    if (!isEditable) {
      onValidate(value == null ? '' : value);
    }
  };

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  if (readonly && checkNullString(value)) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      <View
        style={[commonStyles.filter, commonStyles.filterAlign, styles.content]}>
        <HtmlInput
          style={styles.htmlInput}
          placeholder={placeholder}
          defaultInput={value}
          readonly={readonly || isEditable}
          onChange={setValue}
        />
        {!readonly && (
          <Icon
            name={isEditable ? 'pencil-fill' : 'check-lg'}
            size={15}
            touchable
            onPress={handleIconPress}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    marginLeft: 10,
  },
  content: {
    width: '100%',
    marginHorizontal: 0,
    minHeight: 40,
  },
  htmlInput: {
    fontSize: 14,
    flex: 1,
  },
});

export default EditableHtmlInput;
