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

import {fireEvent} from '@testing-library/react-native';
import {MultiValuePickerButton} from '@axelor/aos-mobile-ui';
import {setup, getDefaultThemeColors, getComputedStyles} from '../../tools';

describe('MultiValuePickerButton Component', () => {
  const Colors = getDefaultThemeColors();
  const listItem = [
    {
      color: Colors.primaryColor,
      title: 'Item 1',
      key: '1',
    },
    {
      color: Colors.cautionColor,
      title: 'Item 2',
      key: '2',
    },
    {
      color: Colors.errorColor,
      title: 'Item 3',
      key: '3',
    },
  ];
  const baseProps = {
    onPress: jest.fn(),
    listItem,
    onPressItem: jest.fn(),
  };

  const setupButton = overrideProps =>
    setup({
      Component: MultiValuePickerButton,
      baseProps,
      overrideProps,
    });

  it('renders each selected item with title and color', () => {
    const {getAllByTestId, getAllByText} = setupButton();

    listItem.forEach(item => {
      const [textNode] = getAllByText(item.title);
      expect(textNode).toBeTruthy();
      expect(
        getComputedStyles(
          getAllByTestId('multiValueItem')[listItem.indexOf(item)].props?.style,
        ),
      ).toMatchObject({
        backgroundColor: item.color.background_light,
        borderColor: item.color.background,
      });
    });
  });

  it('calls onPressItem when a list item is pressed', () => {
    const {getAllByText, props} = setupButton({
      onPressItem: jest.fn(),
    });

    fireEvent.press(getAllByText(listItem[0].title)[0]);

    expect(props.onPressItem).toHaveBeenCalledWith(listItem[0]);
  });

  it('does not call onPressItem when readonly is true', () => {
    const {getAllByText, props} = setupButton({
      readonly: true,
      onPressItem: jest.fn(),
    });

    fireEvent.press(getAllByText(listItem[0].title)[0]);

    expect(props.onPressItem).not.toHaveBeenCalled();
  });

  it('displays placeholder when no items are selected', () => {
    const placeholder = 'Select items';
    const {getByText, queryAllByText} = setupButton({
      listItem: [],
      placeholder,
    });

    expect(queryAllByText(/Item/).length).toBe(0);
    expect(getByText(placeholder)).toBeTruthy();
    expect(getByText(placeholder)).toHaveStyle({
      color: Colors.placeholderTextColor,
    });
  });
});
