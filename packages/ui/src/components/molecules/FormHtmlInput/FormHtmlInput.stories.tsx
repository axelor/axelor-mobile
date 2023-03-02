import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View} from 'react-native';
import {default as FormHtmlInput} from './FormHtmlInput';

storiesOf('ui/molecules/FormHtmlInput', module)
  .addDecorator(story => <View>{story()}</View>)
  .add('default', () => (
    <FormHtmlInput
      title="Description"
      defaultValue="<p>This is the default value</p>"
      placeholder="Enter a description"
    />
  ))
  .add('with required field', () => (
    <FormHtmlInput
      title="Required Field"
      placeholder="This field is required"
      required
    />
  ))
  .add('read-only', () => (
    <FormHtmlInput
      title="Read-Only Field"
      defaultValue="<p>This field is read-only</p>"
      readonly
    />
  ));
