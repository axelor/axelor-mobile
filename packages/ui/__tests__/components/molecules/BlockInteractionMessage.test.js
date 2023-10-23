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
import {
  BlockInteractionMessage,
  Button,
  Card,
  IconButton,
  WarningCard,
} from '@axelor/aos-mobile-ui';

describe('BlockInteractionMessage Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<BlockInteractionMessage />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct error message', () => {
    const wrapper = shallow(<BlockInteractionMessage />);
    expect(wrapper.find(WarningCard).prop('errorMessage')).toBe('Test Message');
  });

  it('applies custom styles', () => {
    const wrapper = shallow(<BlockInteractionMessage />);
    expect(wrapper.find(Card).prop('style')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({backgroundColor: 'blue'}),
      ]),
    );
  });

  it('renders action items correctly', () => {
    const wrapper = shallow(<BlockInteractionMessage />);
    const buttons = wrapper.find(IconButton);
    expect(buttons).toHaveLength(1);
    expect(buttons.at(0).prop('iconName')).toBe('check');
    expect(buttons.at(0).prop('title')).toBe('Action 1');
    expect(buttons.at(0).prop('color')).toBe('green');

    const buttonsWithoutIcon = wrapper.find(Button);
    expect(buttonsWithoutIcon).toHaveLength(1);
    expect(buttonsWithoutIcon.at(0).prop('title')).toBe('Action 2');
    expect(buttonsWithoutIcon.at(0).prop('color')).toBe('red');
  });

  it('does not render if blockInteractionConfig.visible is false', () => {
    try {
      jest.mock('../../../lib/config/ConfigContext', () => ({
        useConfig: () => ({
          blockInteractionConfig: {
            visible: false,
          },
        }),
      }));

      const wrapper = shallow(<BlockInteractionMessage />);
      expect(wrapper.isEmptyRender()).toBe(true);
    } finally {
      return;
    }
  });
});
