/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DateInput} from '../../../components';
import {Input, Picker, Text} from '@axelor/aos-mobile-ui';

const DynamicFormField = ({field, value, onChange}) => {
  const handleChange = newValue => {
    onChange(field.name, newValue);
  };

  const _field = {
    ...field,
  };

  if (field.selectionList && field.selectionList.length > 0) {
    _field.type = 'string';
  }

  console.log('field', _field);
  console.log('fieldType', _field.type);
  console.log('value', value);

  switch (_field.type) {
    case 'date':
      return (
        <View>
          <Text>{_field.title}</Text>
          <DateInput
            onDateChange={handleChange}
            mode="date"
            defaultDate={value && new Date(value)}
          />
        </View>
      );
    case 'datetime':
      return (
        <View>
          <Text>{_field.title}</Text>
          <DateInput
            onDateChange={handleChange}
            mode="datetime"
            defaultDate={value && new Date(value)}
          />
        </View>
      );
    case 'string':
      if (_field.selectionList && _field.selectionList.length > 0) {
        return (
          <View>
            <Text>{_field.title}</Text>
            <Picker
              listItems={_field.selectionList}
              valueField="value"
              labelField="title"
              onValueChange={handleChange}
              defaultValue={value?.toString()}
            />
          </View>
        );
      }
      return (
        <View>
          <Text>{_field.title}</Text>
          <Input
            value={value}
            onChange={handleChange}
            placeholder={_field.title}
          />
        </View>
      );
    case 'text':
    default:
      return (
        <View>
          <Text>{_field.title}</Text>
          <Input
            value={value}
            onChange={handleChange}
            placeholder={_field.title}
          />
        </View>
      );
  }
};

const DynamicSearchForm = ({fields, values, onChange}) => {
  return (
    <View style={styles.form}>
      {fields.map(field => (
        <DynamicFormField
          key={field.name}
          field={field}
          value={values[field.name] || ''}
          onChange={onChange}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  form: {marginHorizontal: 10},
});

export default DynamicSearchForm;
