/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {View, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {AutoCompleteSearch} from '../../src/components/organisms';

const objectList = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Jane'},
  {id: 3, name: 'Mark'},
  {id: 4, name: 'Lucy'},
  {id: 5, name: 'Mike'},
];

const displayValue = item => item.name;

storiesOf('ui/organisms/AutoCompleteSearch', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <AutoCompleteSearch
          objectList={objectList}
          displayValue={displayValue}
          style={styles.autoCompleteSearch}
          {...args}
        />
      </View>
    );
  },
  {
    argTypes: {
      title: {
        type: 'string',
        defaultValue: 'Select an item',
        control: {type: 'text'},
      },
      value: {
        type: 'string',
        defaultValue: '',
        control: {type: 'text'},
      },
      placeholder: {
        type: 'string',
        defaultValue: 'Search',
        control: {type: 'text'},
      },
      required: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      readonly: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      oneFilter: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      selectLastItem: {
        type: 'boolean',
        defaultValue: true,
        control: {type: 'boolean'},
      },
      showDetailsPopup: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '25%',
  },
  autoCompleteSearch: {
    width: '50%',
  },
});
