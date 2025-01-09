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
import {TouchableOpacity, View} from 'react-native';
import {shallow} from 'enzyme';
import {
  lightTheme,
  MultiValuePicker,
  MultiValuePickerButton,
  SelectionContainer,
  Text,
} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('MultiValuePicker Component', () => {
  const Colors = lightTheme.colors;
  const props = {
    listItems: [
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
    ],
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<MultiValuePicker {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should give listItems to SelectionContainer', () => {
    const wrapper = shallow(<MultiValuePicker {...props} />);

    wrapper.find(MultiValuePickerButton).simulate('press');
    expect(wrapper.find(SelectionContainer).prop('objectList')).toBe(
      props.listItems,
    );
  });

  it('should give defaultItems to MultiValuePickerButton', () => {
    const defaultItems = [props.listItems[0]];
    const wrapper = shallow(
      <MultiValuePicker {...props} defaultItems={defaultItems} />,
    );

    expect(wrapper.find(MultiValuePickerButton).prop('listItem')).toEqual(
      defaultItems,
    );
  });

  it('should call onValueChange with the right args', () => {
    const onValueChange = jest.fn();
    const wrapper = shallow(
      <MultiValuePicker {...props} onValueChange={onValueChange} />,
    );

    expect(wrapper.find(SelectionContainer).length).toBe(0);

    wrapper.find(MultiValuePickerButton).simulate('press');

    expect(wrapper.find(SelectionContainer).length).toBe(1);

    wrapper
      .find(SelectionContainer)
      .dive()
      .find('SelectionItem')
      .at(0)
      .simulate('press');

    expect(onValueChange).toHaveBeenCalledWith([props.listItems[0]]);

    wrapper
      .find(SelectionContainer)
      .dive()
      .find('SelectionItem')
      .at(2)
      .simulate('press');

    expect(onValueChange).toHaveBeenCalledWith([
      props.listItems[0],
      props.listItems[2],
    ]);

    wrapper
      .find(MultiValuePickerButton)
      .dive()
      .find(TouchableOpacity)
      .at(2)
      .simulate('press');

    expect(onValueChange).toHaveBeenCalledWith([props.listItems[0]]);

    wrapper
      .find(MultiValuePickerButton)
      .dive()
      .find(TouchableOpacity)
      .at(1)
      .simulate('press');

    expect(onValueChange).toHaveBeenCalledWith([]);
  });

  it('should display a title if provided', () => {
    const title = 'Title';
    const wrapper = shallow(<MultiValuePicker {...props} title={title} />);

    expect(wrapper.find(Text).prop('children')).toBe(title);
  });

  it('should render readonly MultiValuePickerButton and SelectionContainer when props is true', () => {
    const wrapper = shallow(<MultiValuePicker {...props} readonly />);

    expect(wrapper.find(MultiValuePickerButton).prop('readonly')).toBe(true);

    wrapper.find(MultiValuePickerButton).simulate('press');
    expect(wrapper.find(SelectionContainer).prop('readonly')).toBe(true);
  });

  it('should apply required styling when props is true', () => {
    const wrapper = shallow(<MultiValuePicker {...props} required />);

    expect(getGlobalStyles(wrapper.find(MultiValuePickerButton))).toMatchObject(
      {
        borderColor: Colors.errorColor.background,
      },
    );
  });

  it('should apply custom style to container when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <MultiValuePicker {...props} style={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(customStyle);
  });

  it('should apply custom style to picker when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <MultiValuePicker {...props} pickerStyle={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(MultiValuePickerButton))).toMatchObject(
      customStyle,
    );
  });

  it('should apply custom style to title when provided', () => {
    const customStyle = {fontSize: 20};
    const wrapper = shallow(
      <MultiValuePicker {...props} title="Title" styleTxt={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(Text))).toMatchObject(customStyle);
  });
});
