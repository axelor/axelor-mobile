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
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('DropdownCardSwitch', () => {
  const setupDropdownCardSwitch = overrideProps =>
    setup({
      Component: DropdownCardSwitch,
      baseProps: {
        dropdownItems: [
          {
            key: 1,
            title: 'Item 1',
            childrenComp: <View testID={`content-idx${0}`} />,
            isDefaultVisible: true,
          },
          {
            key: 2,
            title: 'Item 2',
            childrenComp: <View testID={`content-idx${1}`} />,
            isDefaultVisible: false,
          },
          {
            key: 3,
            title: 'Item 3',
            childrenComp: <View testID={`content-idx${2}`} />,
            isDefaultVisible: false,
          },
        ],
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupDropdownCardSwitch();

    expect(getByTestId('dropdownCardSwitchContainer')).toBeTruthy();
  });

  it('should render correctly all the DropdownCards', () => {
    const {getAllByTestId, props} = setupDropdownCardSwitch();

    const _cardElts = getAllByTestId('dropdownCardContainer');

    expect(_cardElts).toHaveLength(props.dropdownItems.length);

    props.dropdownItems.forEach((item, idx) => {
      const _elt = _cardElts.at(idx);

      expect(within(_elt).getByText(item.title)).toBeTruthy();
      if (item.isDefaultVisible) {
        expect(within(_elt).getByTestId(`content-idx${idx}`)).toBeTruthy();
      } else {
        expect(within(_elt).queryByTestId(`content-idx${idx}`)).toBeFalsy();
      }
    });
  });

  it('should open the right card when pressed and close the others', () => {
    const {getAllByTestId, props} = setupDropdownCardSwitch();

    const _cardElts = getAllByTestId('dropdownCardContainer');

    for (let i = 0; i < props.dropdownItems.length; i++) {
      const _openElt = _cardElts.at(i);

      if (!props.dropdownItems[i].isDefaultVisible) {
        fireEvent.press(within(_openElt).getByTestId('dropdownCardTouchable'));
      }

      expect(within(_openElt).getByTestId(`content-idx${i}`)).toBeTruthy();

      props.dropdownItems.forEach((item, idx, self) => {
        const _closeElt = _cardElts.at(idx);
        if (item !== self[i]) {
          expect(
            within(_closeElt).queryByTestId(`content-idx${idx}`),
          ).toBeFalsy();
        }
      });
    }
  });

  it('should be possible to open all cards if multiSelection is true', () => {
    const {getAllByTestId, props} = setupDropdownCardSwitch({
      multiSelection: true,
    });

    const _cardElts = getAllByTestId('dropdownCardContainer');

    props.dropdownItems.forEach((_i, idx) => {
      if (!_i.isDefaultVisible) {
        fireEvent.press(
          within(_cardElts.at(idx)).getByTestId('dropdownCardTouchable'),
        );
      }
    });

    for (let i = 0; i < props.dropdownItems.length; i++) {
      expect(
        within(_cardElts.at(i)).getByTestId(`content-idx${i}`),
      ).toBeTruthy();
    }
  });

  it('should apply custom style when provided', () => {
    const {getByTestId, props} = setupDropdownCardSwitch({style: {width: 200}});

    expect(getByTestId('dropdownCardSwitchContainer')).toHaveStyle(props.style);
  });

  it('should apply custom styleTitle when provided', () => {
    const {getAllByTestId, props} = setupDropdownCardSwitch({
      styleTitle: {fontWeight: 'bold'},
    });
    const _cardElts = getAllByTestId('dropdownCardContainer');

    props.dropdownItems.forEach((item, idx) => {
      expect(within(_cardElts.at(idx)).getByText(item.title)).toHaveStyle(
        props.styleTitle,
      );
    });
  });
});
