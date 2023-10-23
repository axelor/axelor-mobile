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
import {Card, ClearableCard, Icon, lightTheme} from '@axelor/aos-mobile-ui';

describe('ClearableCard Component', () => {
  const Colors = lightTheme.colors;
  const onPressMock = jest.fn();
  const onClearPressMock = jest.fn();

  it('should render without crashing', () => {
    const wrapper = shallow(
      <ClearableCard selected={true} onPress={onPressMock} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly when clearable is true', () => {
    const wrapper = shallow(
      <ClearableCard
        valueTxt="Test Value"
        onClearPress={onClearPressMock}
        clearable
      />,
    );

    expect(wrapper.find(Icon)).toHaveLength(1);

    const iconProps = wrapper.find(Icon).props();
    expect(iconProps.name).toBe('times');
    expect(iconProps.touchable).toBe(true);
    expect(iconProps.onPress).toBe(onClearPressMock);
    expect(iconProps.size).toBeGreaterThan(0);

    const cardStyles = wrapper.find(Card).props().style;
    expect(cardStyles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.backgroundColor,
        }),
      ]),
    );
  });

  it('renders correctly when clearable is false', () => {
    const wrapper = shallow(
      <ClearableCard
        valueTxt="Test Value"
        onClearPress={onClearPressMock}
        clearable={false}
      />,
    );

    expect(wrapper.find(Icon)).toHaveLength(0);

    const cardStyles = wrapper.find(Card).props().style;
    expect(cardStyles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.backgroundColor,
        }),
      ]),
    );
  });

  it('calls onClearPress function when the clear icon is pressed', () => {
    const wrapper = shallow(
      <ClearableCard
        valueTxt="Test Value"
        onClearPress={onClearPressMock}
        clearable
      />,
    );

    const clearIcon = wrapper.find(Icon);
    clearIcon.props().onPress();

    expect(onClearPressMock).toHaveBeenCalled();
  });

  it('does not render clear icon when clearable is false', () => {
    const wrapper = shallow(
      <ClearableCard
        valueTxt="Test Value"
        onClearPress={onClearPressMock}
        clearable={false}
      />,
    );

    expect(wrapper.find(Icon)).toHaveLength(0);
  });

  it('should not call onClearPress function when clearable is false', () => {
    const wrapper = shallow(
      <ClearableCard
        valueTxt="Test Value"
        onClearPress={onClearPressMock}
        clearable={false}
      />,
    );

    wrapper.simulate('press');

    expect(onClearPressMock).not.toHaveBeenCalled();
  });
});
