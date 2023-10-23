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
import {AttachmentCard, Text} from '@axelor/aos-mobile-ui';
import {TouchableOpacity} from 'react-native';

describe('Attachement Card Component', () => {
  const props = {
    fileName: 'test-file.pdf',
    creationDate: '2023-06-30',
    onPress: jest.fn(),
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<AttachmentCard />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct file name', () => {
    const wrapper = shallow(<AttachmentCard {...props} />);
    expect(wrapper.find(Text).at(0).props().children).toBe('test-file.pdf');
  });

  it('renders the correct creation date', () => {
    const wrapper = shallow(<AttachmentCard {...props} />);
    expect(wrapper.find(Text).at(1).props().children).toContain('Added on');
    expect(wrapper.find(Text).at(1).props().children).toContain('06/30/2023');
  });

  it('calls onPress function on TouchableOpacity press', () => {
    const wrapper = shallow(<AttachmentCard {...props} />);
    wrapper.find(TouchableOpacity).simulate('press');
    expect(props.onPress).toHaveBeenCalled();
  });
});
