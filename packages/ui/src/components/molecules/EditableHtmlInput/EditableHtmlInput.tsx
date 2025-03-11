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
import {HtmlInput, Icon} from '../../atoms';

interface EditableHtmlInputProps {
  placeholder: string;
  defaultValue: string;
  readonly?: boolean;
  onValidate: (value: string) => void;
}

const EditableHtmlInput = ({
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
    <View style={[commonStyles.filter, commonStyles.filterAlign]}>
      <HtmlInput
        style={styles.htmlInput}
        styleToolbar={styles.htmlToolBar}
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
  );
};

const styles = StyleSheet.create({
  htmlInput: {
    fontSize: 14,
    flex: 1,
  },
  htmlToolBar: {
    backgroundColor: null,
    marginLeft: -5,
  },
});

export default EditableHtmlInput;
