import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as AutoCompleteSearch} from './AutoCompleteSearch';

const objectList = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Jane'},
  {id: 3, name: 'Mark'},
  {id: 4, name: 'Lucy'},
  {id: 5, name: 'Mike'},
];
const displayValue = item => item.name;

storiesOf('ui/organisms/AutoCompleteSearch', module).add('default', () => (
  <View style={styles.container}>
    <AutoCompleteSearch
      objectList={objectList}
      displayValue={displayValue}
      placeholder="Search"
    />
  </View>
));
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
