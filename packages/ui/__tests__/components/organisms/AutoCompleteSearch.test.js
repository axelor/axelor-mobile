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
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

jest.mock('../../../lib/components/organisms/SearchBar/SearchBar', () => {
  const {View} = require('react-native');

  return props => <View testID="mocked_searchBar" {...props} />;
});

const DATA = [{name: 'Name 1'}, {name: 'Name 2'}, {name: 'Name 3'}];

describe('AutoCompleteSearch Component', () => {
  const Colors = getDefaultThemeColors();

  const setupAutoCompleteSearch = overrideProps =>
    setup({
      Component: AutoCompleteSearch,
      baseProps: {objectList: DATA, displayValue: value => value.name},
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupAutoCompleteSearch();

    expect(getByTestId('autoCompleteSearchContainer')).toBeTruthy();
  });

  it('should render a SearchBar with good props transmitted', () => {
    const {getByTestId, props} = setupAutoCompleteSearch({
      title: 'Title',
      value: DATA[0],
      required: true,
      readonly: true,
      scanIconColor: Colors.secondaryColor.background,
    });

    expect(getByTestId('mocked_searchBar')).toBeTruthy();
    expect(getByTestId('mocked_searchBar').props).toMatchObject({
      title: props.title,
      valueTxt: props.displayValue(props.value),
      required: props.required,
      readonly: props.readonly,
      scanIconColor: props.scanIconColor,
    });
  });

  it('should render placeholder on SearchBar when provided', () => {
    const {getByTestId, props} = setupAutoCompleteSearch({
      placeholder: 'Placeholder',
    });

    expect(getByTestId('mocked_searchBar').props).toMatchObject({
      placeholder: props.placeholder,
    });
  });

  it('should apply custom style when provided', () => {
    const {getByTestId, props} = setupAutoCompleteSearch({style: {width: 200}});

    expect(getByTestId('autoCompleteSearchContainer')).toHaveStyle(props.style);
  });
});
