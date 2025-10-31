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

import {fireEvent, within} from '@testing-library/react-native';
import {MultiValuePickerButton} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('MultiValuePickerButton Component', () => {
  const Colors = getDefaultThemeColors();

  const setupMultiValuePickerButton = overrideProps =>
    setup({
      Component: MultiValuePickerButton,
      baseProps: {
        onPress: jest.fn(),
        listItem: [
          {color: Colors.primaryColor, title: 'Item 1', key: '1'},
          {color: Colors.cautionColor, title: 'Item 2', key: '2'},
          {color: Colors.errorColor, title: 'Item 3', key: '3'},
        ],
        onPressItem: jest.fn(),
      },
      overrideProps,
    });

  it('should render without crashing', () => {
    const {getByTestId} = setupMultiValuePickerButton();

    expect(getByTestId('multiValuePickerButtonTouchable')).toBeTruthy();
  });

  it('renders each selected item with title and color', () => {
    const {getAllByTestId, props} = setupMultiValuePickerButton();

    const _badgeElts = getAllByTestId('multiValuePickerBadgeTouchable');

    expect(_badgeElts).toHaveLength(props.listItem.length);

    props.listItem.forEach((_i, idx) => {
      const _elt = _badgeElts.at(idx);
      expect(within(_elt).getAllByText(_i.title)).toBeTruthy();
      expect(_elt).toHaveStyle({
        backgroundColor: _i.color.background_light,
        borderColor: _i.color.background,
      });
    });
  });

  it('calls onPress when the button is pressed', () => {
    const {getByTestId, props} = setupMultiValuePickerButton({
      onPress: jest.fn(),
    });

    fireEvent.press(getByTestId('multiValuePickerButtonTouchable'));

    expect(props.onPress).toHaveBeenCalled();
  });

  it('calls onPressItem when a list item is pressed', () => {
    const {getAllByTestId, props} = setupMultiValuePickerButton({
      onPressItem: jest.fn(),
    });

    fireEvent.press(getAllByTestId('multiValuePickerBadgeTouchable').at(0));

    expect(props.onPressItem).toHaveBeenCalledWith(props.listItem[0]);
  });

  it('does not call onPressItem when readonly is true', () => {
    const {getAllByTestId, props} = setupMultiValuePickerButton({
      readonly: true,
      onPressItem: jest.fn(),
    });

    fireEvent.press(getAllByTestId('multiValuePickerBadgeTouchable').at(0));

    expect(props.onPressItem).not.toHaveBeenCalled();
  });

  it('displays placeholder when no items are selected', () => {
    const {getByText, queryAllByTestId, props} = setupMultiValuePickerButton({
      listItem: [],
      placeholder: 'Select items',
    });

    expect(queryAllByTestId('multiValuePickerBadgeTouchable')).toHaveLength(0);
    expect(getByText(props.placeholder)).toBeTruthy();
    expect(getByText(props.placeholder)).toHaveStyle({
      color: Colors.placeholderTextColor,
    });
  });

  it('applies custom container style', () => {
    const {getByTestId, props} = setupMultiValuePickerButton({
      style: {backgroundColor: 'red'},
    });

    expect(getByTestId('cardContainer')).toHaveStyle(props.style);
  });
});
