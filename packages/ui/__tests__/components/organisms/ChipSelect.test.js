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

// TODO: check modes management (switch/multi)
// check value when calling onValueChange

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

  it('should refresh when selectionItems change and isRefresh is true', () => {
    const wrapper = shallow(<ChipSelect {...props} isRefresh={true} />);

    for (let i = 0; i < props.selectionItems.length; i++) {
      expect(wrapper.find(Chip).at(i).prop('selected')).toBe(
        props.selectionItems[i].isActive,
      );
    }

    const selectedItems = [...props.selectionItems].map((item, i) =>
      i === 0 ? {...item, isActive: false} : item,
    );

    wrapper.setProps({
      selectionItems: selectedItems,
    });

    for (let i = 0; i < selectedItems.length; i++) {
      expect(wrapper.find(Chip).at(i).prop('selected')).toBe(
        selectedItems[i].isActive,
      );
    }
  });

  it('should not refresh when selectionItems change and isRefresh is false', () => {
    const wrapper = shallow(<ChipSelect {...props} isRefresh={false} />);

    for (let i = 0; i < props.selectionItems.length; i++) {
      expect(wrapper.find(Chip).at(i).prop('selected')).toBe(
        props.selectionItems[i].isActive,
      );
    }

    const selectedItems = [...props.selectionItems].map((item, i) =>
      i === 0 ? {...item, isActive: false} : item,
    );

    wrapper.setProps({
      selectionItems: selectedItems,
    });

    for (let i = 0; i < selectedItems.length; i++) {
      const oldValue = props.selectionItems[i].isActive;
      const newValue = selectedItems[i].isActive;

      expect(wrapper.find(Chip).at(i).prop('selected')).toBe(oldValue);

      if (oldValue !== newValue) {
        expect(wrapper.find(Chip).at(i).prop('selected')).not.toBe(newValue);
      }
    }
  });

  it('should render the right number of Chip component', () => {
    const wrapper = shallow(<ChipSelect {...props} />);

    expect(wrapper.find(Chip)).toHaveLength(3);
  });

  it('should render Chip with the right props', () => {
    const wrapper = shallow(<ChipSelect {...props} />);

    for (let i = 0; i < props.selectionItems.length; i++) {
      expect(wrapper.find(Chip).at(i).props()).toMatchObject({
        selected: props.selectionItems[i].isActive,
        selectedColor: props.selectionItems[i].color,
        title: props.selectionItems[i].title,
      });
    }
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
    const customWidth = 200;
    const wrapper = shallow(<ChipSelect {...props} width={customWidth} />);

    for (let i = 0; i < props.selectionItems.length; i++) {
      expect(wrapper.find(Chip).at(i).prop('width')).toBe(customWidth);
    }
  });

  it('should apply custom marginHorizontal when provided', () => {
    const customMarginHorizontal = 50;
    const wrapper = shallow(
      <ChipSelect {...props} marginHorizontal={customMarginHorizontal} />,
    );

    for (let i = 0; i < props.selectionItems.length; i++) {
      expect(wrapper.find(Chip).at(i).prop('marginHorizontal')).toBe(
        customMarginHorizontal,
      );
    }
  });
});
