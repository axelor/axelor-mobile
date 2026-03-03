/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {MultiValuePicker} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';
import {fireEvent, within} from '@testing-library/react-native';

describe('MultiValuePicker Component', () => {
  const Colors = getDefaultThemeColors();

  const ITEMS = [
    {color: Colors.primaryColor, title: 'Item 1', key: '1'},
    {color: Colors.cautionColor, title: 'Item 2', key: '2'},
    {color: Colors.errorColor, title: 'Item 3', key: '3'},
  ];

  const setupMultiValuePicker = overrideProps =>
    setup({
      Component: MultiValuePicker,
      baseProps: {listItems: ITEMS},
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupMultiValuePicker();

    expect(getByTestId('multiValuePickerContainer')).toBeTruthy();
  });

  it('should give listItems to SelectionContainer', () => {
    const {queryAllByTestId, getAllByTestId, getByTestId, props} =
      setupMultiValuePicker();

    expect(queryAllByTestId('selectionItemTouchable').length).toBe(0);

    fireEvent.press(getByTestId('multiValuePickerButtonTouchable'));

    expect(getAllByTestId('selectionItemTouchable').length).toBe(
      props.listItems.length,
    );
  });

  it('should display the placeholder if provided and no value is selected', () => {
    const {getByText, props} = setupMultiValuePicker({
      placeholder: 'Select items',
    });

    expect(getByText(props.placeholder)).toBeTruthy();
  });

  it('should render correctly default values', () => {
    const {getAllByTestId, props} = setupMultiValuePicker({
      defaultItems: [ITEMS[0]],
    });

    const _badgeElts = getAllByTestId('multiValuePickerBadgeTouchable');

    expect(_badgeElts.length).toBe(props.defaultItems.length);

    props.defaultItems.forEach((_i, idx) => {
      expect(within(_badgeElts.at(idx)).getByText(_i.title)).toBeTruthy();
      expect(_badgeElts.at(idx)).toHaveStyle({
        backgroundColor: _i.color.background_light,
        borderColor: _i.color.background,
      });
    });
  });

  it('should call onValueChange with the right args', () => {
    const {getAllByTestId, getByTestId, props} = setupMultiValuePicker({
      onValueChange: jest.fn(),
    });

    fireEvent.press(getByTestId('multiValuePickerButtonTouchable'));

    fireEvent.press(getAllByTestId('selectionItemTouchable').at(0));
    expect(props.onValueChange).toHaveBeenCalledWith([props.listItems[0]]);

    fireEvent.press(getAllByTestId('selectionItemTouchable').at(2));
    expect(props.onValueChange).toHaveBeenCalledWith([
      props.listItems[0],
      props.listItems[2],
    ]);

    fireEvent.press(getAllByTestId('selectionItemTouchable').at(2));
    expect(props.onValueChange).toHaveBeenCalledWith([props.listItems[0]]);

    fireEvent.press(getAllByTestId('multiValuePickerBadgeTouchable').at(0));
    expect(props.onValueChange).toHaveBeenCalledWith([]);
  });

  it('should display a title if provided', () => {
    const {getByText, props} = setupMultiValuePicker({title: 'Title'});

    expect(getByText(props.title)).toBeTruthy();
  });

  it('should render readonly MultiValuePickerButton and SelectionContainer when props is true', () => {
    const {getAllByTestId, getByTestId, props} = setupMultiValuePicker({
      defaultItems: [ITEMS[0]],
      onValueChange: jest.fn(),
      readonly: true,
    });

    fireEvent.press(getByTestId('multiValuePickerButtonTouchable'));

    fireEvent.press(getAllByTestId('selectionItemTouchable').at(2));
    expect(props.onValueChange).not.toHaveBeenCalled();

    fireEvent.press(getAllByTestId('multiValuePickerBadgeTouchable').at(0));
    expect(props.onValueChange).not.toHaveBeenCalled();
  });

  it('should apply required styling when props is true', () => {
    const {getByTestId} = setupMultiValuePicker({required: true});

    expect(
      within(getByTestId('multiValuePickerButtonTouchable')).getByTestId(
        'cardContainer',
      ),
    ).toHaveStyle({borderColor: Colors.errorColor.background});
  });

  it('should apply custom style to container when provided', () => {
    const {getByTestId, props} = setupMultiValuePicker({style: {width: 200}});

    expect(getByTestId('multiValuePickerContainer')).toHaveStyle(props.style);
  });

  it('should apply custom style to picker when provided', () => {
    const {getByTestId, props} = setupMultiValuePicker({
      pickerStyle: {width: 200},
    });

    expect(
      within(getByTestId('multiValuePickerButtonTouchable')).getByTestId(
        'cardContainer',
      ),
    ).toHaveStyle(props.pickerStyle);
  });

  it('should apply custom style to title when provided', () => {
    const {getByText, props} = setupMultiValuePicker({
      title: 'Title',
      styleTxt: {fontSize: 20},
    });

    expect(getByText(props.title)).toHaveStyle(props.styleTxt);
  });
});
