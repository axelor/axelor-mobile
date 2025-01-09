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
import {DurationInput, NumberChevronInput, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('Duration Input Component', () => {
  const props = {
    defaultValue: 6000,
    onChange: jest.fn(),
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<DurationInput {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders a title when provided', () => {
    const title = 'Duration Title';
    const wrapper = shallow(<DurationInput {...props} title={title} />);

    expect(wrapper.find(Text).at(0).prop('children')).toBe(title);
  });

  it('renders the correct number of NumberChevronInputs', () => {
    const wrapper = shallow(<DurationInput {...props} />);
    expect(wrapper.find(NumberChevronInput).length).toBe(5);
  });

  it('renders with required when required is true and value is 0', () => {
    const wrapper = shallow(
      <DurationInput {...props} defaultValue={0} required={true} />,
    );

    wrapper.find(NumberChevronInput).forEach(input => {
      expect(input.prop('required')).toBe(true);
    });

    wrapper.find(NumberChevronInput).at(0).simulate('valueChange', 5);

    wrapper.find(NumberChevronInput).forEach(input => {
      expect(input.prop('required')).toBe(false);
    });
  });

  it('renders as readonly when readonly is true', () => {
    const wrapper = shallow(<DurationInput {...props} readonly={true} />);

    wrapper.find(NumberChevronInput).forEach(input => {
      expect(input.prop('readonly')).toBe(true);
    });
  });

  it('initializes with correct default values from defaultValue prop', () => {
    const wrapper = shallow(<DurationInput {...props} />);
    const inputs = wrapper.find(NumberChevronInput);

    expect(inputs.at(0).prop('defaultValue')).toBe(0);
    expect(inputs.at(1).prop('defaultValue')).toBe(0);
    expect(inputs.at(2).prop('defaultValue')).toBe(1);
    expect(inputs.at(3).prop('defaultValue')).toBe(4);
    expect(inputs.at(4).prop('defaultValue')).toBe(0);
  });

  it('calls onChange with correct value when an input value changes', () => {
    const _onChange = jest.fn();
    const wrapper = shallow(<DurationInput {...props} onChange={_onChange} />);
    const newValue = 6;
    const inputIndexToChange = 1;

    wrapper
      .find(NumberChevronInput)
      .at(inputIndexToChange)
      .simulate('valueChange', newValue);

    expect(
      wrapper
        .find(NumberChevronInput)
        .at(inputIndexToChange)
        .prop('defaultValue'),
    ).toBe(newValue);
  });

  it('applies custom style when provided', () => {
    const customStyle = {height: 200};
    const wrapper = shallow(<DurationInput {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(View).at(0))).toMatchObject(
      customStyle,
    );
  });

  it('applies custom inputStyle when provided', () => {
    const customStyle = {height: 200};
    const wrapper = shallow(
      <DurationInput {...props} inputStyle={customStyle} />,
    );

    wrapper.find(NumberChevronInput).forEach(input => {
      expect(input.prop('style')).toMatchObject(customStyle);
    });
  });
});
