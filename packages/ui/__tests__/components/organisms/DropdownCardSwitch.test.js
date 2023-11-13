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
import {View} from 'react-native';
import {shallow} from 'enzyme';
import {DropdownCardSwitch, DropdownCard, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('DropdownCardSwitch', () => {
  const dropdownItems = [
    {key: 1, title: 'Item 1', childrenComp: <Text>Content 1</Text>},
    {key: 2, title: 'Item 2', childrenComp: <Text>Content 2</Text>},
  ];

  it('renders without crashing', () => {
    const wrapper = shallow(
      <DropdownCardSwitch dropdownItems={dropdownItems} />,
    );

    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly with dropdown items', () => {
    const wrapper = shallow(
      <DropdownCardSwitch dropdownItems={dropdownItems} />,
    );
    expect(wrapper.find(DropdownCard)).toHaveLength(dropdownItems.length);
  });

  it('toggles dropdown card open and close on press', () => {
    const wrapper = shallow(
      <DropdownCardSwitch dropdownItems={dropdownItems} />,
    );

    wrapper.find(DropdownCard).first().simulate('press');
    expect(wrapper.find(DropdownCard).first().props().dropdownIsOpen).toBe(
      true,
    );

    wrapper.find(DropdownCard).first().simulate('press');
    expect(wrapper.find(DropdownCard).first().props().dropdownIsOpen).toBe(
      false,
    );
  });

  it('shows children component for the opened card', () => {
    const wrapper = shallow(
      <DropdownCardSwitch dropdownItems={dropdownItems} />,
    );

    expect(wrapper.find(DropdownCard).first().prop('dropdownIsOpen')).toBe(
      false,
    );

    wrapper.find(DropdownCard).first().simulate('press');

    expect(wrapper.find(DropdownCard).first().prop('dropdownIsOpen')).toBe(
      true,
    );

    wrapper.find(DropdownCard).first().simulate('press');

    expect(wrapper.find(DropdownCard).first().prop('dropdownIsOpen')).toBe(
      false,
    );
  });

  it('applies custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <DropdownCardSwitch dropdownItems={dropdownItems} style={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(customStyle);
  });

  it('applies custom styleTitle when provided', () => {
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

  it('passes the correct title DropdownCard', () => {
    const titleProps = 'Test';
    const wrapper = shallow(
      <DropdownCardSwitch dropdownItems={dropdownItems} title={titleProps} />,
    );
    dropdownItems.forEach((item, index) => {
      const dropdownCard = wrapper.find(DropdownCard).at(index);
      expect(dropdownCard.prop('title')).toEqual(item.title);
    });
  });
});
