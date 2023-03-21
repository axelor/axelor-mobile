import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as RightIconButton} from './RightIconButton';
import {Icon} from '../../atoms';

storiesOf('ui/molecules/RightIconButton', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <RightIconButton
          icon={<Icon name="heart" />}
          onPress={console.log}
          title={'Press me'}
          {...args}
        />
      </View>
    );
  },
  {
    argTypes: {
      title: {
        type: 'string',
        defaultValue: 'Press me',
        control: {type: 'text'},
      },
      onPress: {
        action: 'clicked',
        table: {disable: true},
      },
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
