import React from 'react';
import {TextInput, View} from 'react-native';
import {DateInput} from '../../../components';
import {Text} from '@axelor/aos-mobile-ui';

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
          <DateInput onDateChange={handleChange} />
        </View>
      );
    case 'text':
    default:
      return (
        <View>
          <Text>{field.title}</Text>
          <TextInput
            value={value}
            onChangeText={handleChange}
            placeholder={field.title}
          />
        </View>
      );
  }
};

const DynamicSearchForm = ({fields, values, onChange}) => {
  return (
    <View>
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

export default DynamicSearchForm;
