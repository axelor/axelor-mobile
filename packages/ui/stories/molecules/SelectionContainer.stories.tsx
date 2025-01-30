/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {SelectionContainer} from '../../src/components/molecules';

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

storiesOf('ui/molecules/SelectionContainer', module).add(
  'Default',
  args => {
    return (
      <SelectionContainer
        style={styles.container}
        objectList={objectList}
        displayValue={displayValue}
        handleSelect={handleSelect}
        selectedItem={[objectList[0]]}
        {...args}
      />
    );
  },
  {
    argTypes: {
      emptyValue: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      isPicker: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      readonly: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
    },
  },
);

const styles = StyleSheet.create({
  container: {
    top: 0,
  },
});
