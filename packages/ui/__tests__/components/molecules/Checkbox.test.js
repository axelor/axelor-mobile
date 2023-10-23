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
import {shallow} from 'enzyme';
import {Checkbox, lightTheme, Icon} from '@axelor/aos-mobile-ui';

describe('Checkbox Component', () => {
  const Colors = lightTheme.colors;
  const onChangeMock = jest.fn();

  it('should render without crashing', () => {
    const wrapper = shallow(
      <Checkbox
        title="Checkbox Label"
        isDefaultChecked={false}
        onChange={onChangeMock}
      />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('should call onChange when checkbox is clicked', () => {
    const wrapper = shallow(
      <Checkbox
        title="Checkbox Label"
        isDefaultChecked={false}
        onChange={onChangeMock}
      />,
    );

    wrapper.find(Icon).simulate('press');

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('should not call onChange when checkbox is disabled', () => {
    const wrapper = shallow(
      <Checkbox
        title="Checkbox Label"
        isDefaultChecked={false}
        onChange={onChangeMock}
        disabled={true}
      />,
    );

    wrapper.find(Icon).simulate('press');

    expect(onChangeMock).toHaveBeenCalledTimes(0);
  });

  it('should have correct icon name based on isChecked prop', () => {
    const wrapper = shallow(
      <Checkbox
        title="Checkbox Label"
        isDefaultChecked={false}
        onChange={onChangeMock}
      />,
    );

    expect(wrapper.find(Icon).prop('name')).toBe('square-o');

    wrapper.find(Icon).simulate('press');

    expect(wrapper.find(Icon).prop('name')).toBe('check-square');
  });

  it('should render with correct title', () => {
    const title = 'Check me';
    const wrapper = shallow(
      <Checkbox
        title={title}
        isDefaultChecked={false}
        onChange={onChangeMock}
      />,
    );

    expect(wrapper.find('Text').prop('children')).toBe(title);
  });

  it('should render with correct icon color based on disabled prop', () => {
    const wrapper = shallow(
      <Checkbox
        title="Checkbox Label"
        disabled={false}
        onChange={onChangeMock}
      />,
    );

    expect(wrapper.find(Icon).prop('color')).toEqual(
      Colors.primaryColor.background,
    );

    wrapper.setProps({disabled: true});

    expect(wrapper.find(Icon).prop('color')).toEqual(
      Colors.secondaryColor.background,
    );
  });
});
