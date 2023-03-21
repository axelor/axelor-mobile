import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as PanelTabs} from './PanelTabs';
import {Text} from '../../atoms';

storiesOf('ui/molecules/PanelTabs', module).add('custom', () => {
  const I18n = value => value;
  return (
    <PanelTabs
      tabs={[
        {
          key: 1,
          title: 'Page1',
          isActive: true,
          translator: I18n,
          component: <Text>Page1</Text>,
        },
        {
          key: 2,
          title: 'Page2',
          isActive: false,
          translator: I18n,
          component: <Text>Page2</Text>,
        },
      ]}
    />
  );
});
