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

  console.log('field', field);
  console.log('fieldType', field.type);
  console.log('value', value);

  switch (field.type) {
    case 'date':
      return (
        <View>
          <Text>{field.title}</Text>
          <DateInput
            onDateChange={handleChange}
            mode="date"
            defaultDate={value && new Date(value)}
          />
        </View>
      );
    case 'string':
      if (field.selectionList && field.selectionList.length > 0) {
        return (
          <View>
            <Text>{field.title}</Text>
            <Picker
              listItems={field.selectionList}
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
          <Text>{field.title}</Text>
          <Input
            value={value}
            onChange={handleChange}
            placeholder={field.title}
          />
        </View>
      );
    case 'text':
    default:
      return (
        <View>
          <Text>{field.title}</Text>
          <Input
            value={value}
            onChange={handleChange}
            placeholder={field.title}
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
