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

import {fireEvent, within} from '@testing-library/react-native';
import {ChipSelect} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('ChipSelect Component', () => {
  const Colors = getDefaultThemeColors();

  const setupChipSelect = overrideProps =>
    setup({
      Component: ChipSelect,
      baseProps: {
        selectionItems: [
          {
            isActive: true,
            color: Colors.primaryColor,
            title: 'Item 1',
            key: 1,
          },
          {
            isActive: false,
            color: Colors.cautionColor,
            title: 'Item 2',
            key: 2,
          },
          {
            isActive: false,
            color: Colors.errorColor,
            title: 'Item 3',
            key: 3,
          },
        ],
        mode: 'multi',
      },
      overrideProps,
    });

  function checkChipStyle(viewElt, textElt, color) {
    expect(viewElt).toHaveStyle({
      borderColor: color.background,
      backgroundColor: color.background_light,
    });
    expect(textElt).toHaveStyle({color: color.foreground});
  }

  function checkChipSelected(elt, item, isSelected) {
    const _viewElt = within(elt).getByTestId('chipContainer');
    const _textElt = within(_viewElt).getByText(item.title);

    expect(_viewElt).toBeTruthy();
    expect(_textElt).toBeTruthy();
    checkChipStyle(_viewElt, _textElt, {
      ...(item.color ?? Colors.primaryColor),
      ...(isSelected
        ? {}
        : {background_light: Colors.backgroundColor, foreground: Colors.text}),
    });
  }

  it('renders without crashing', () => {
    const {getByTestId} = setupChipSelect();

    expect(getByTestId('chipSelectContainer')).toBeTruthy();
  });

  it('should not render if props mode is unknown', () => {
    const {queryByTestId} = setupChipSelect({mode: ''});

    expect(queryByTestId('chipSelectContainer')).toBeFalsy();
  });

  it('should render the right number of Chip component', () => {
    const {getAllByTestId} = setupChipSelect();

    expect(getAllByTestId('chipTouchable')).toHaveLength(3);
  });

  it('should render Chip with the right props', () => {
    const {getAllByTestId, props} = setupChipSelect();

    const _chipElts = getAllByTestId('chipTouchable');

    props.selectionItems.forEach((_i, idx) => {
      checkChipSelected(_chipElts.at(idx), _i, _i.isActive);
    });
  });

  it('should call onChangeValue when Chip is pressed', () => {
    const {getAllByTestId, props} = setupChipSelect({onChangeValue: jest.fn()});

    const _chipElts = getAllByTestId('chipTouchable');

    fireEvent.press(_chipElts.at(0));
    checkChipSelected(_chipElts.at(0), props.selectionItems[0], false);
    expect(props.onChangeValue).toHaveBeenCalledTimes(1);
  });

  it('should render ChipSelect with more than one Chip activable if mode is multi', () => {
    const {getAllByTestId, props} = setupChipSelect({onChangeValue: jest.fn()});

    const _chipElts = getAllByTestId('chipTouchable');

    fireEvent.press(_chipElts.at(1));
    expect(props.onChangeValue).toHaveBeenCalledWith([
      props.selectionItems[0],
      props.selectionItems[1],
    ]);

    checkChipSelected(_chipElts.at(0), props.selectionItems[0], true);
    checkChipSelected(_chipElts.at(1), props.selectionItems[1], true);
    checkChipSelected(_chipElts.at(2), props.selectionItems[2], false);

    fireEvent.press(_chipElts.at(2));
    expect(props.onChangeValue).toHaveBeenCalledWith([]);

    checkChipSelected(_chipElts.at(0), props.selectionItems[0], false);
    checkChipSelected(_chipElts.at(1), props.selectionItems[1], false);
    checkChipSelected(_chipElts.at(2), props.selectionItems[2], false);
  });

  it('should render ChipSelect with only one Chip activable if mode is switch', () => {
    const {getAllByTestId, props} = setupChipSelect({
      mode: 'switch',
      onChangeValue: jest.fn(),
    });

    const _chipElts = getAllByTestId('chipTouchable');

    fireEvent.press(_chipElts.at(1));
    expect(props.onChangeValue).toHaveBeenCalledWith([props.selectionItems[1]]);

    checkChipSelected(_chipElts.at(0), props.selectionItems[0], false);
    checkChipSelected(_chipElts.at(1), props.selectionItems[1], true);
    checkChipSelected(_chipElts.at(2), props.selectionItems[2], false);

    fireEvent.press(_chipElts.at(2));
    expect(props.onChangeValue).toHaveBeenCalledWith([props.selectionItems[2]]);

    checkChipSelected(_chipElts.at(0), props.selectionItems[0], false);
    checkChipSelected(_chipElts.at(1), props.selectionItems[1], false);
    checkChipSelected(_chipElts.at(2), props.selectionItems[2], true);

    fireEvent.press(_chipElts.at(2));
    expect(props.onChangeValue).toHaveBeenCalledWith([]);

    checkChipSelected(_chipElts.at(0), props.selectionItems[0], false);
    checkChipSelected(_chipElts.at(1), props.selectionItems[1], false);
    checkChipSelected(_chipElts.at(2), props.selectionItems[2], false);
  });

  it('should apply custom style when provided', () => {
    const {getByTestId, props} = setupChipSelect({style: {height: 200}});

    expect(getByTestId('chipSelectContainer')).toHaveStyle(props.style);
  });

  it('should apply custom width when provided', () => {
    const {getAllByTestId, props} = setupChipSelect({width: 200});

    getAllByTestId('chipTouchable').forEach(_elt => {
      expect(_elt).toHaveStyle({width: props.width});
    });
  });

  it('should apply custom marginHorizontal when provided', () => {
    const {getAllByTestId, props} = setupChipSelect({marginHorizontal: 50});

    getAllByTestId('chipTouchable').forEach(_elt => {
      expect(_elt).toHaveStyle({marginHorizontal: props.marginHorizontal});
    });
  });

  it('should not render clear all button when option is disabled', () => {
    const {queryByTestId} = setupChipSelect({showClearButton: false});

    expect(queryByTestId('chipSelectClearButton')).toBeFalsy();
  });

  it('should clear all selected chips when clear all button is pressed', () => {
    const {getByTestId, getAllByTestId, props} = setupChipSelect({
      onChangeValue: jest.fn(),
      showClearButton: true,
    });

    expect(getByTestId('chipSelectClearButton')).toBeTruthy();

    const _chipElts = getAllByTestId('chipTouchable');

    fireEvent.press(getByTestId('chipSelectClearButton'));
    expect(props.onChangeValue).toHaveBeenCalledWith([]);

    fireEvent.press(_chipElts.at(1));
    expect(props.onChangeValue).toHaveBeenCalledWith([props.selectionItems[1]]);

    fireEvent.press(_chipElts.at(2));
    expect(props.onChangeValue).toHaveBeenCalledWith([
      props.selectionItems[1],
      props.selectionItems[2],
    ]);

    fireEvent.press(getByTestId('chipSelectClearButton'));
    expect(props.onChangeValue).toHaveBeenCalledWith([]);
  });
});
