/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {CircleButton, FloatingButton, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles, getDefaultThemeColors} from '../../tools';

describe('FloatingButton Component', () => {
  const Colors = getDefaultThemeColors();
  const props = {
    actions: [
      {
        key: 1,
        title: 'Title 1',
        iconName: 'car',
        color: Colors.errorColor,
        disabled: false,
        onPress: jest.fn(),
      },
      {
        key: 2,
        iconName: 'motorcycle',
        disabled: true,
        onPress: jest.fn(),
      },
      {
        key: 3,
        title: 'Title 3',
        iconName: 'truck',
        disabled: false,
        onPress: jest.fn(),
      },
    ],
    translator: key => key,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<FloatingButton {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render an empty View if actions props is null or empty', () => {
    const actionsNull = null;
    const actionsEmpty = [];

    const wrapperNull = shallow(
      <FloatingButton {...props} actions={actionsNull} />,
    );
    const wrapperEmpty = shallow(
      <FloatingButton {...props} actions={actionsEmpty} />,
    );

    expect(wrapperNull.find(View).children().exists()).toBe(false);
    expect(wrapperEmpty.find(View).children().exists()).toBe(false);
  });

  it('should give the right iconName and size props to the main button', () => {
    const iconName = 'check';
    const closeIconName = 'x-lg';
    const size = 50;
    const wrapper = shallow(
      <FloatingButton {...props} iconName={iconName} size={size} />,
    );

    expect(wrapper.find(CircleButton).prop('iconName')).toBe(iconName);
    expect(wrapper.find(CircleButton).prop('size')).toBe(size);

    wrapper.find(CircleButton).simulate('press');

    expect(wrapper.find(CircleButton).prop('iconName')).toBe(closeIconName);
    expect(wrapper.find(CircleButton).prop('size')).toBe(size);
  });

  it('should render the rights FloatingActionButton when click on the main button', () => {
    const wrapper = shallow(<FloatingButton {...props} />);

    wrapper.find(CircleButton).simulate('press');

    expect(wrapper.find('FloatingActionButton').length).toBe(
      props.actions.length,
    );
    for (let i = 0; i < props.actions.length; i++) {
      expect(
        wrapper
          .find('FloatingActionButton')
          .at(i)
          .dive()
          .find(CircleButton)
          .props(),
      ).toMatchObject({
        iconName: props.actions[i].iconName,
        disabled: props.actions[i].disabled,
        color: props.actions[i].color,
        square: true,
      });

      if (props.actions[i].title != null) {
        expect(
          wrapper
            .find('FloatingActionButton')
            .at(i)
            .dive()
            .find(Text)
            .prop('children'),
        ).toBe(props.actions[i].title);
      } else {
        expect(
          wrapper.find('FloatingActionButton').at(i).dive().find(Text).length,
        ).toBe(0);
      }
    }
  });

  it('should render circle style when defined', () => {
    const wrapper = shallow(
      <FloatingButton {...props} useCircleStyle={true} />,
    );

    expect(wrapper.find(CircleButton).prop('square')).toBe(false);
    wrapper.find(CircleButton).simulate('press');

    for (let i = 0; i < props.actions.length; i++) {
      expect(
        wrapper
          .find('FloatingActionButton')
          .at(i)
          .dive()
          .find(CircleButton)
          .prop('square'),
      ).toBe(false);
    }
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<FloatingButton {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(customStyle);
  });
});
