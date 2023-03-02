import React from 'react';
import {storiesOf} from '@storybook/react-native';
import DropdownCard from './DropdownCard';
import {View, StyleSheet} from 'react-native';
import {Text} from '../../atoms';

const children = <Text>Some content in the dropdown</Text>;

storiesOf('ui/molecules/DropdownCard', module)
  .addDecorator(getStory => <View style={styles.container}>{getStory()}</View>)
  .add('closed', () => (
    <DropdownCard
      title="Closed Dropdown Card"
      DropdownIsOpen={false}
      onPress={() => console.log('Pressed')}>
      {children}
    </DropdownCard>
  ))
  .add('open', () => (
    <DropdownCard title="Open Dropdown Card" DropdownIsOpen={true}>
      {children}
    </DropdownCard>
  ));

const styles = StyleSheet.create({
  container: {padding: 20},
});
