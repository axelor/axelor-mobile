import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as HtmlInput} from './HtmlInput';

storiesOf('ui/atoms/HtmlInput', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <HtmlInput
          title="Description"
          defaultInput="<p>Hello World!<b>This text is bold.</b></p>"
          onChange={console.log}
          {...args}
        />
      </View>
    );
  },
  {
    argTypes: {
      style: {control: 'object'},
      styleToolbar: {control: 'object'},
      containerStyle: {control: 'object'},
      editorBackgroundColor: {control: 'color'},
      title: {control: 'text'},
      placeholder: {control: 'text'},
      defaultInput: {control: 'text'},
      readonly: {control: 'boolean'},
      onHeightChange: {action: 'onHeightChange'},
    },
  },
);

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
