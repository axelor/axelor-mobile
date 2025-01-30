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
import {AttachmentCard, Text} from '@axelor/aos-mobile-ui';

const DAY = '30';
const MONTH = '06';
const YEAR = '2023';
const TEST_DATE = `${YEAR}-${MONTH}-${DAY}`;
const DEFAULT_FORMAT = `${MONTH}/${DAY}/${YEAR}`;

describe('Attachement Card Component', () => {
  const props = {
    fileName: 'test-file.pdf',
    creationDate: TEST_DATE,
    onPress: jest.fn(),
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<AttachmentCard />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct file name', () => {
    const wrapper = shallow(<AttachmentCard {...props} />);

    expect(wrapper.find(Text).at(0).prop('children')).toBe(props.fileName);
  });

  it('renders the correct creation date', () => {
    const wrapper = shallow(<AttachmentCard {...props} />);

    expect(wrapper.find(Text).at(1).prop('children')).toContain('Added on');
    expect(wrapper.find(Text).at(1).prop('children')).toContain(DEFAULT_FORMAT);
  });
});
