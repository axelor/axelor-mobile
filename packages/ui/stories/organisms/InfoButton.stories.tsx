import React from 'react';
import {storiesOf} from '@storybook/react-native';
import InfoButton from '../../src/components/organisms/InfoButton/InfoButton';
import {StyleSheet} from 'react-native';
import {lightTheme} from '../../src/theme';

storiesOf('ui/organisms/InfoButton', module).add(
  'Default',
  args => (
    <InfoButton
      iconName="info"
      indication="this is an indication"
      onPress={() => console.log('Button pressed')}
      size={50}
      style={styles.container}
      iconColor={lightTheme.colors[args.color]}
      {...args}
    />
  ),
  {
    argTypes: {
      iconName: {
        control: {
          type: 'select',
          options: ['info', 'info-circle', 'info-square-fill'],
        },
        defaultValue: 'info',
      },
      iconColor: {
        options: Object.entries(lightTheme.colors)
          .filter(([, _color]) => typeof _color !== 'string')
          .map(([key]) => key),
        defaultValue: 'primaryColor',
        control: {
          type: 'select',
        },
      },
      indication: {
        control: {
          type: 'text',
        },
        defaultValue: 'this is an indication',
      },
      size: {
        control: {
          type: 'number',
        },
        defaultValue: 50,
      },
    },
  },
);

const styles = StyleSheet.create({
  container: {marginTop: '20%'},
});
