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
import {shallow} from 'enzyme';
import {
  BlockInteractionMessage,
  Button,
  Card,
  WarningCard,
} from '@axelor/aos-mobile-ui';
import * as configContext from '../../../lib/config/ConfigContext';
import {getGlobalStyles} from '../../tools';

describe('BlockInteractionMessage Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<BlockInteractionMessage />);

    expect(wrapper.exists()).toBe(true);
  });

  it('does not render if blockInteractionConfig.visible is not defined', () => {
    const wrapper = shallow(<BlockInteractionMessage />);

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('renders the informations given in context', () => {
    jest.spyOn(configContext, 'useConfig').mockImplementation(() => ({
      blockInteractionConfig: {
        visible: true,
        message: 'Test Message',
        style: {backgroundColor: 'blue'},
        actionItems: [
          {
            iconName: 'check',
            title: 'Action 1',
            onPress: jest.fn(),
            color: 'green',
          },
          {
            title: 'Action 2',
            onPress: jest.fn(),
            color: 'red',
          },
        ],
      },
    }));
    const wrapper = shallow(<BlockInteractionMessage />);

    expect(wrapper.find(WarningCard).prop('errorMessage')).toBe('Test Message');

    expect(getGlobalStyles(wrapper.find(Card))).toMatchObject({
      backgroundColor: 'blue',
    });

    const buttons = wrapper.find(Button);
    expect(buttons).toHaveLength(2);

    expect(buttons.at(0).prop('title')).toBe('Action 1');
    expect(buttons.at(0).prop('color')).toBe('green');
    expect(buttons.at(0).prop('iconName')).toBe('check');

    expect(buttons.at(1).prop('title')).toBe('Action 2');
    expect(buttons.at(1).prop('color')).toBe('red');
    expect(buttons.at(1).prop('iconName')).toBe(undefined);
  });
});
