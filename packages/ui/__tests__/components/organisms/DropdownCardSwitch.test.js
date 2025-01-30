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
import {shallow} from 'enzyme';
import {DropdownCardSwitch, DropdownCard, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('DropdownCardSwitch', () => {
  const dropdownItems = [
    {key: 1, title: 'Item 1', childrenComp: <Text>Content 1</Text>},
    {key: 2, title: 'Item 2', childrenComp: <Text>Content 2</Text>},
    {key: 3, title: 'Item 3', childrenComp: <Text>Content 3</Text>},
  ];

  it('should render without crashing', () => {
    const wrapper = shallow(
      <DropdownCardSwitch dropdownItems={dropdownItems} />,
    );

    expect(wrapper.exists()).toBe(true);
  });

  it('should render correctly all the DropdownCards', () => {
    const wrapper = shallow(
      <DropdownCardSwitch dropdownItems={dropdownItems} />,
    );

    expect(wrapper.find(DropdownCard)).toHaveLength(dropdownItems.length);
    dropdownItems.forEach((item, idx) => {
      expect(wrapper.find(DropdownCard).at(idx).prop('title')).toBe(item.title);
      expect(
        wrapper
          .find(DropdownCard)
          .at(idx)
          .children()
          .containsMatchingElement(item.childrenComp),
      ).toBe(true);
    });
  });

  it('should open the right card when pressed and close the others', () => {
    const wrapper = shallow(
      <DropdownCardSwitch dropdownItems={dropdownItems} />,
    );

    for (let i = 0; i < dropdownItems.length; i++) {
      wrapper.find(DropdownCard).at(i).simulate('press');

      expect(wrapper.find(DropdownCard).at(i).prop('dropdownIsOpen')).toBe(
        true,
      );
      dropdownItems.forEach(
        (item, idx) =>
          item !== dropdownItems[i] &&
          expect(
            wrapper.find(DropdownCard).at(idx).prop('dropdownIsOpen'),
          ).toBe(false),
      );
    }
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <DropdownCardSwitch dropdownItems={dropdownItems} style={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(customStyle);
  });

  it('should apply custom styleTitle when provided', () => {
    const customStyleTitle = {fontWeight: 'bold'};
    const wrapper = shallow(
      <DropdownCardSwitch
        dropdownItems={dropdownItems}
        styleTitle={customStyleTitle}
      />,
    );

    wrapper.find(DropdownCard).forEach(dropdownCard => {
      expect(dropdownCard.prop('styleText')).toEqual(customStyleTitle);
    });
  });
});
