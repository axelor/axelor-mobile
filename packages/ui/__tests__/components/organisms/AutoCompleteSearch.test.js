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
import {
  AutoCompleteSearch,
  ScrollList,
  SearchBar,
  SelectionContainer,
} from '@axelor/aos-mobile-ui';
import {getGlobalStyles, getDefaultThemeColors} from '../../tools';

describe('AutoCompleteSearch Component', () => {
  const Colors = getDefaultThemeColors();

  const props = {
    objectList: [{name: 'Name 1'}, {name: 'Name 2'}, {name: 'Name 3'}],
    displayValue: value => value.name,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<AutoCompleteSearch {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render a SearchBar with good props transmitted', () => {
    const title = 'Title';
    const value = props.objectList[0];
    const scanIconColor = Colors.secondaryColor.background;
    const wrapper = shallow(
      <AutoCompleteSearch
        {...props}
        title={title}
        value={value}
        required
        readonly
        scanIconColor={scanIconColor}
      />,
    );

    expect(wrapper.find(SearchBar).props()).toMatchObject({
      title,
      valueTxt: props.displayValue(value),
      required: true,
      readonly: true,
      scanIconColor,
    });
  });

  it('should call onChangeValue with the right args on selection', () => {
    const onChangeValue = jest.fn();
    const wrapper = shallow(
      <AutoCompleteSearch {...props} onChangeValue={onChangeValue} />,
    );

    expect(wrapper.find(SelectionContainer).length).toBe(0);

    wrapper.find(SearchBar).simulate('selection');

    expect(wrapper.find(SelectionContainer).length).toBe(1);

    wrapper
      .find(SelectionContainer)
      .dive()
      .find('SelectionItem')
      .at(1)
      .simulate('press');

    expect(onChangeValue).toHaveBeenCalledWith(props.objectList[1]);
  });

  it('should render placeholder on SearchBar and SearchDetailsPopUp when provided', () => {
    const placeholder = 'Placeholder';
    const wrapper = shallow(
      <AutoCompleteSearch {...props} placeholder={placeholder} />,
    );

    expect(wrapper.find(SearchBar).prop('placeholder')).toBe(placeholder);

    wrapper.find(SearchBar).simulate('searchPress');

    expect(wrapper.find('SearchDetailsPopUp').prop('placeholder')).toBe(
      placeholder,
    );
  });

  it('should not render SelectionContainer when oneFilter is true', () => {
    const wrapper = shallow(<AutoCompleteSearch {...props} oneFilter />);

    expect(wrapper.find(SelectionContainer).length).toBe(0);

    wrapper.find(SearchBar).simulate('selection');

    expect(wrapper.find(SelectionContainer).length).toBe(0);
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <AutoCompleteSearch {...props} style={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(customStyle);
  });

  it('should display SearchDetailsPopUp when click on search icon and showDetailsPopup is true', () => {
    const wrapper = shallow(<AutoCompleteSearch {...props} showDetailsPopup />);

    expect(wrapper.find('SearchDetailsPopUp').exists()).toBe(false);

    wrapper.find(SearchBar).simulate('searchPress');

    expect(wrapper.find('SearchDetailsPopUp').prop('isVisible')).toBe(true);
  });

  it('should not display SearchDetailsPopUp when disabled', () => {
    const wrapper = shallow(
      <AutoCompleteSearch {...props} showDetailsPopup={false} />,
    );

    expect(wrapper.find('SearchDetailsPopUp').exists()).toBe(false);
    expect(wrapper.find(SearchBar).prop('disableSearchPress')).toBe(true);
  });

  it('should render a ScrollList in SearchDetailsPopUp with objectList as data', () => {
    const wrapper = shallow(<AutoCompleteSearch {...props} showDetailsPopup />);

    wrapper.find(SearchBar).simulate('searchPress');

    expect(
      wrapper.find('SearchDetailsPopUp').dive().find(ScrollList).prop('data'),
    ).toBe(props.objectList);
  });
});
