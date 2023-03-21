import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as SelectionContainer} from './SelectionContainer';

const objectList = [
  {id: 1, name: 'Option 1'},
  {id: 2, name: 'Option 2'},
  {id: 3, name: 'Option 3'},
  {id: 4, name: 'Option 4'},
  {id: 5, name: 'Option 5'},
];

const displayValue = item => item.name;

const handleSelect = item =>
  console.log(`Selected item: ${JSON.stringify(item)}`);

storiesOf('ui/molecules/SelectionContainer', module)
  .add('Default', () => (
    <SelectionContainer
      objectList={objectList}
      displayValue={displayValue}
      handleSelect={handleSelect}
    />
  ))
  .add('With Selected Item', () => (
    <SelectionContainer
      objectList={objectList}
      displayValue={displayValue}
      handleSelect={handleSelect}
      selectedItem={[objectList[2]]}
    />
  ))
  .add('With Empty Value', () => (
    <SelectionContainer
      objectList={objectList}
      displayValue={displayValue}
      handleSelect={handleSelect}
      emptyValue
    />
  ))
  .add('As Picker', () => (
    <SelectionContainer
      objectList={objectList}
      displayValue={displayValue}
      handleSelect={handleSelect}
      isPicker
    />
  ));
