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
import {RadioButton} from '@axelor/aos-mobile-ui';

const Colors = {
  backgroundColor: 'white',
  text: 'black',
  primaryColor: {
    background_light: 'gray',
    background: 'blue',
    foreground: 'white',
  },
  secondaryColor: {
    background_light: 'gray',
    background: 'green',
    foreground: 'gray',
  },
};

jest.mock('../../../lib/theme/ThemeContext', () => ({
  useThemeColor: () => Colors,
}));

describe('RadioButton Component', () => {
  const onPressMock = jest.fn();

  it('should render without crashing', () => {
    const wrapper = shallow(
      <RadioButton onPress={onPressMock} selected={false} title="Option 1" />,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with the correct title', () => {
    const wrapper = shallow(
      <RadioButton onPress={onPressMock} selected={false} title="Option 2" />,
    );
    expect(wrapper.find('Text').prop('children')).toBe('Option 2');
  });

  it('should call onPress when TouchableOpacity is pressed', () => {
    const wrapper = shallow(
      <RadioButton onPress={onPressMock} selected={false} title="Option 3" />,
    );

    wrapper.find(TouchableOpacity).simulate('press');
    expect(onPressMock).toHaveBeenCalled();
  });

  it('should apply selected styles when selected is true', () => {
    const wrapper = shallow(
      <RadioButton onPress={onPressMock} title="Option 4" selected />,
    );

    expect(wrapper.find(TouchableOpacity).prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: Colors.backgroundColor,
          borderColor: Colors.secondaryColor.background,
        }),
      ]),
    );
  });
});
