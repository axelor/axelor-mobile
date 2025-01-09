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
import {Modal, TouchableOpacity} from 'react-native';
import {shallow} from 'enzyme';
import {
  Alert,
  NumberBubble,
  Text,
  ViewAllContainer,
  ViewAllEditList,
} from '@axelor/aos-mobile-ui';

const DATA = [
  {
    id: 0,
    name: 'Line 1',
    nameDetails: 'Details of line 1',
    qty: 3,
    unitName: 'unit',
  },
  {
    id: 1,
    name: 'Line 2',
    qty: 500,
    unitName: 'g',
  },
  {
    id: 2,
    name: 'Line 3',
    nameDetails: 'Details of line 3',
    qty: 5,
    unitName: 'm',
  },
  {
    id: 3,
    name: 'Line 4',
    nameDetails: 'Details of line 4',
    qty: 3,
    unitName: 'km',
  },
  {
    id: 4,
    name: 'Line 5',
    qty: 10,
    unitName: 'L',
  },
];

describe('ViewAllEditList Component', () => {
  const props = {
    title: 'Title',
    lines: DATA,
    currentLineId: 1,
    setLines: jest.fn(),
    handleEditLine: jest.fn(),
    translator: jest.fn(key => key),
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<ViewAllEditList {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render a ViewAllContainer', () => {
    const wrapper = shallow(<ViewAllEditList {...props} />);

    expect(wrapper.find(ViewAllContainer).exists()).toBe(true);
  });

  it('should render title and number of lines', () => {
    const wrapper = shallow(<ViewAllEditList {...props} />);

    expect(wrapper.find(Text).prop('children')).toBe(props.title);
    expect(wrapper.find(NumberBubble).prop('number')).toBe(DATA.length);
  });

  it('should open modal with right title when click on view all button', () => {
    const wrapper = shallow(<ViewAllEditList {...props} />);

    expect(
      wrapper.find('AllLinesAlert').dive().find(Alert).prop('visible'),
    ).toBe(false);

    wrapper
      .find(ViewAllContainer)
      .dive()
      .find(TouchableOpacity)
      .simulate('press');

    expect(
      wrapper.find('AllLinesAlert').dive().find(Alert).prop('visible'),
    ).toBe(true);
    expect(wrapper.find('AllLinesAlert').dive().find(Alert).prop('title')).toBe(
      props.title,
    );
  });
});
