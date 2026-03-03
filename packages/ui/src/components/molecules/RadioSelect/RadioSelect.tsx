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

import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RadioButton, Text} from '../../atoms';
import {checkNullString} from '../../../utils';

interface RadioItem {
  id: string;
  title: string;
}

interface RadioSelectProps {
  style?: any;
  itemStyle?: any;
  radioButtonStyle?: any;
  questionStyle?: any;
  items: RadioItem[];
  question?: string;
  radioSize?: number;
  direction?: 'row' | 'column';
  readonly?: boolean;
  onChange: (value: string) => void;
  defaultValue?: string;
}

const RadioSelect = ({
  style,
  itemStyle,
  radioButtonStyle,
  questionStyle,
  items,
  question,
  radioSize,
  direction = 'row',
  readonly = false,
  onChange,
  defaultValue,
}: RadioSelectProps) => {
  const [selectedItem, setSelecteditem] = useState(
    items.find(_i => _i.id === defaultValue),
  );

  useEffect(() => {
    setSelecteditem(items.find(_i => _i.id === defaultValue));
  }, [defaultValue, items]);

  const onRadioBtnClick = item => {
    setSelecteditem(item);
    onChange(item.id);
  };

  return (
    <View testID="radioSelectContainer" style={[styles.container, style]}>
      {!checkNullString(question) && (
        <Text writingType="important" style={[styles.question, questionStyle]}>
          {question}
        </Text>
      )}
      <View
        testID="radioSelectButtonContainer"
        style={[{flexDirection: direction}, styles.itemsContainer, itemStyle]}>
        {items.map(item => (
          <RadioButton
            key={item.id}
            style={radioButtonStyle}
            onPress={() => onRadioBtnClick(item)}
            selected={selectedItem?.id === item.id}
            title={item.title}
            size={radioSize}
            readonly={readonly}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    minHeight: 40,
    height: null,
  },
  question: {
    marginVertical: 5,
  },
  itemsContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
});

export default RadioSelect;
