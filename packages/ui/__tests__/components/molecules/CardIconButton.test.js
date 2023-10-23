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
import {TouchableOpacity} from 'react-native';
import {CardIconButton, lightTheme} from '@axelor/aos-mobile-ui';

describe('CardIconButton Component', () => {
  const Colors = lightTheme.colors;

  it('should render without crashing', () => {
    const wrapper = shallow(
      <CardIconButton iconName="heart" iconColor="red" onPress={() => {}} />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('should call onPress when button is clicked', () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <CardIconButton iconName="heart" iconColor="red" onPress={onPressMock} />,
    );

    wrapper.find(TouchableOpacity).simulate('press');

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('should have correct styles based on prop Colors', () => {
    const wrapper = shallow(
      <CardIconButton iconName="heart" iconColor="red" onPress={() => {}} />,
    );

    expect(wrapper.prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.backgroundColor,
        }),
      ]),
    );
  });
});
