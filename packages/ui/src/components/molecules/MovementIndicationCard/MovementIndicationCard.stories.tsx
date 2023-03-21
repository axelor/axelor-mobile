import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as MovementIndicationCard} from './MovementIndicationCard';
import {Icon} from '../../atoms';
import {lightTheme} from '../../../theme/themes';
import {action} from '@storybook/addon-actions';

storiesOf('ui/molecules/MovementIndicationCard', module).add(
  'custom',
  args => (
    <MovementIndicationCard
      titleTop={'titleTop'}
      iconTop={
        <Icon
          name="warehouse"
          color={lightTheme.colors.primaryColor.background}
        />
      }
      titleDown={'titleDown'}
      iconDown={<Icon name="map-marker-alt" />}
      disabledDown={false}
      onPressTitleTop={() => action('onPressTitleTop')}
      onPressTitleDown={() => action('onPressTitleDown')}
      {...args}
    />
  ),
  {
    argTypes: {
      style: {
        control: {
          type: 'object',
        },
        defaultValue: {
          marginHorizontal: 20,
        },
      },
      titleTop: {
        control: 'text',
        defaultValue: 'titleTop',
      },
      titleDown: {
        control: 'text',
        defaultValue: 'titleDown',
      },
      disabledTop: {control: 'boolean', defaultValue: false},
      disabledDown: {control: 'boolean', defaultValue: false},
    },
  },
);
