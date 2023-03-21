import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as DropdownCardSwitch} from './DropdownCardSwitch';
import {Text} from '../../atoms';

const dropdownItems = [
  {
    key: 1,
    title: 'Dropdown 1',
    childrenComp: <Text>Dropdown 1 Content</Text>,
  },
  {
    key: 2,
    title: 'Dropdown 2',
    childrenComp: <Text>Dropdown 2 Content</Text>,
  },
];

storiesOf('ui/organisms/DropdownCardSwitch', module).add(
  'default',
  args => (
    <View style={styles.container}>
      <DropdownCardSwitch dropdownItems={dropdownItems} {...args} />
    </View>
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
      styleTitle: {
        control: {
          type: 'object',
        },
        defaultValue: {
          marginHorizontal: 20,
        },
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
