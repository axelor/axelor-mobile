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
import {Chip, ChipSelect, lightTheme} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('ChipSelect Component', () => {
  const Colors = lightTheme.colors;

  const props = {
    selectionItems: [
      {isActive: true, color: Colors.primaryColor, title: 'Item 1', key: 1},
      {isActive: false, color: Colors.cautionColor, title: 'Item 2', key: 2},
      {isActive: true, color: Colors.errorColor, title: 'Item 3', key: 3},
    ],
    mode: 'multi',
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<ChipSelect {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should not render if props mode is unknown', () => {
    const wrapper = shallow(<ChipSelect {...props} mode="" />);

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should refresh when selectionItems change if isRefresh is true', () => {
    const wrapper = shallow(<ChipSelect {...props} isRefresh />);

    expect(wrapper.find(Chip).at(0).prop('selected')).toBe(true);

    wrapper.setProps({
      selectionItems: props.selectionItems.map((item, i) =>
        i === 0 ? {...item, isActive: false} : item,
      ),
    });

    expect(wrapper.find(Chip).at(0).prop('selected')).toBe(false);
  });

  it('should render the right number of Chip component', () => {
    const wrapper = shallow(<ChipSelect {...props} />);

    expect(wrapper.find(Chip).length).toBe(3);
  });

  it('should render Chip with the right props', () => {
    const wrapper = shallow(<ChipSelect {...props} />);

    expect(wrapper.find(Chip).at(0).prop('selected')).toBe(
      props.selectionItems[0].isActive,
    );
    expect(wrapper.find(Chip).at(0).prop('selectedColor')).toBe(
      props.selectionItems[0].color,
    );
    expect(wrapper.find(Chip).at(0).prop('title')).toBe(
      props.selectionItems[0].title,
    );
  });

  it('should call onChangeValue when Chip is pressed', () => {
    const onChangeValue = jest.fn();
    const wrapper = shallow(
      <ChipSelect {...props} onChangeValue={onChangeValue} />,
    );

    wrapper.find(Chip).at(0).simulate('press');

    expect(onChangeValue).toHaveBeenCalledTimes(1);
  });

  it('should apply custom style when provided', () => {
    const customStyle = {height: 200};
    const wrapper = shallow(<ChipSelect {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(customStyle);
  });

  it('should apply custom width when provided', () => {
    const customWidth = {width: 200};
    const wrapper = shallow(<ChipSelect {...props} width={customWidth} />);

    expect(wrapper.find(Chip).at(0).prop('width')).toBe(customWidth);
  });

  it('should apply custom marginHorizontal when provided', () => {
    const customMarginHorizontal = {width: 200};
    const wrapper = shallow(
      <ChipSelect {...props} marginHorizontal={customMarginHorizontal} />,
    );

    expect(wrapper.find(Chip).at(0).prop('marginHorizontal')).toBe(
      customMarginHorizontal,
    );
  });
});
