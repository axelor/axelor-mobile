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
import {View} from 'react-native';
import {fireEvent, within} from '@testing-library/react-native';
import {CheckboxScrollList} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('CheckboxScrollList Component', () => {
  const setupCheckboxScrollList = overrideProps =>
    setup({
      Component: CheckboxScrollList,
      baseProps: {
        loading: false,
        moreLoading: false,
        isListEnd: true,
        data: [
          {id: 1, name: 'Item 1'},
          {id: 2, name: 'Item 2'},
        ],
        onCheckedChange: jest.fn(),
        renderItem: ({index}) => <View testID={`itemRender-idx${index}`} />,
      },
      overrideProps,
    });

  function checkCheckboxState(elt, isChecked, isPartialChecked) {
    expect(within(elt).queryByTestId('icon-check-square-fill'))[
      isChecked ? 'toBeTruthy' : 'toBeFalsy'
    ]?.();
    expect(within(elt).queryByTestId('icon-dash-square-fill'))[
      isPartialChecked ? 'toBeTruthy' : 'toBeFalsy'
    ]?.();
    expect(within(elt).queryByTestId('icon-square'))[
      !isChecked && !isPartialChecked ? 'toBeTruthy' : 'toBeFalsy'
    ]?.();
  }

  it('renders without crashing', () => {
    const {getByTestId} = setupCheckboxScrollList();

    expect(getByTestId('scrollListContainer')).toBeTruthy();
  });

  it('toggles all items when main checkbox is clicked', () => {
    const {getAllByTestId, props} = setupCheckboxScrollList({
      onCheckedChange: jest.fn(),
    });

    const _checkboxElts = getAllByTestId('checkboxContainer');

    fireEvent.press(within(_checkboxElts.at(0)).getByTestId('iconTouchable'));
    expect(props.onCheckedChange).toHaveBeenNthCalledWith(1, props.data);

    fireEvent.press(within(_checkboxElts.at(0)).getByTestId('iconTouchable'));
    expect(props.onCheckedChange).toHaveBeenNthCalledWith(2, []);
  });

  it('toggles individual items', () => {
    const {getAllByTestId, props} = setupCheckboxScrollList({
      onCheckedChange: jest.fn(),
    });

    const _checkboxElts = getAllByTestId('checkboxContainer');

    fireEvent.press(within(_checkboxElts.at(1)).getByTestId('iconTouchable'));
    expect(props.onCheckedChange).toHaveBeenNthCalledWith(1, [props.data[0]]);

    fireEvent.press(within(_checkboxElts.at(2)).getByTestId('iconTouchable'));
    expect(props.onCheckedChange).toHaveBeenNthCalledWith(2, [
      props.data[0],
      props.data[1],
    ]);

    fireEvent.press(within(_checkboxElts.at(1)).getByTestId('iconTouchable'));
    expect(props.onCheckedChange).toHaveBeenNthCalledWith(3, [props.data[1]]);
  });

  it('set isDefaultPartialChecked and isDefaultChecked props of main checkbox depends of checked items', () => {
    const {getAllByTestId, props} = setupCheckboxScrollList();

    const _checkboxElts = getAllByTestId('checkboxContainer');
    expect(_checkboxElts).toHaveLength(props.data.length + 1);

    checkCheckboxState(_checkboxElts.at(0), false, false);

    fireEvent.press(within(_checkboxElts.at(1)).getByTestId('iconTouchable'));
    checkCheckboxState(_checkboxElts.at(0), false, true);

    fireEvent.press(within(_checkboxElts.at(2)).getByTestId('iconTouchable'));
    checkCheckboxState(_checkboxElts.at(0), true, false);
  });

  it('renders each item with a checkbox', () => {
    const {getAllByTestId, props} = setupCheckboxScrollList();

    const _rowElts = getAllByTestId('checkboxScrollListRowContainer');

    expect(_rowElts).toHaveLength(props.data.length);

    props.data.forEach((_i, idx) => {
      const _elt = _rowElts.at(idx);

      const _checkboxElt = within(_elt).getByTestId('checkboxContainer');
      expect(_checkboxElt).toBeTruthy();
      checkCheckboxState(_checkboxElt, false, false);
      expect(within(_elt).getByTestId(`itemRender-idx${idx}`)).toBeTruthy();
    });
  });

  it('should apply custom style checkbox width when provided', () => {
    const {getAllByTestId, props} = setupCheckboxScrollList({
      styleTopCheckbox: {width: 200},
    });

    expect(getAllByTestId('checkboxContainer').at(0)).toHaveStyle(
      props.styleTopCheckbox,
    );
  });

  it('should apply custom style to ScrollList', () => {
    const {getByTestId, props} = setupCheckboxScrollList({
      styleScrollList: {margin: 10},
    });

    expect(getByTestId('scrollListAnimatedList')).toHaveStyle(
      props.styleScrollList,
    );
  });

  it('should apply custom style to each row', () => {
    const {getAllByTestId, props} = setupCheckboxScrollList({
      styleRender: {margin: 10},
    });

    const _rowElts = getAllByTestId('checkboxScrollListRowContainer');

    props.data.forEach((_i, idx) => {
      expect(_rowElts.at(idx)).toHaveStyle(props.styleRender);
    });
  });

  it('should apply custom style to each row checkbox', () => {
    const {getAllByTestId, props} = setupCheckboxScrollList({
      styleCheckbox: {margin: 10},
    });

    const _rowElts = getAllByTestId('checkboxScrollListRowContainer');

    props.data.forEach((_i, idx) => {
      expect(
        within(_rowElts.at(idx)).getByTestId('checkboxContainer'),
      ).toHaveStyle(props.styleCheckbox);
    });
  });
});
