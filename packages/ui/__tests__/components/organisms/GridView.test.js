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
import {Card, GridView, Text} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';
import {View} from 'react-native';

describe('GridView Component', () => {
  const props = {
    columns: [
      {title: 'Name', key: 'name'},
      {title: 'Code', key: 'test_code', getValue: jest.fn(row => row.code)},
      {title: 'Complete name', key: 'fullName', width: null},
    ],
    data: [
      {id: 1, name: 'Test 1', code: 'hehe', fullName: 'hehe - Test 1'},
      {id: 2, name: 'Test 2', code: 'lala', fullName: 'lala - Test 2'},
      {id: 3, name: 'Test 3', code: 'ui', fullName: 'ui - Test 3'},
    ],
  };

  const numberCells =
    props.columns.length + props.data.length * props.columns.length;

  it('should render without crashing', () => {
    const wrapper = shallow(<GridView {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should correctly render header', () => {
    const wrapper = shallow(<GridView {...props} />)
      .find(View)
      .at(2);

    expect(wrapper.find('CellView').length).toBe(props.columns.length);

    props.columns.forEach((_c, idx, self) => {
      const cellComponent = wrapper.find('CellView').at(idx);

      expect(cellComponent.props()).toMatchObject({
        showRight: idx < self.length - 1,
        showBottom: true,
      });
      expect(cellComponent.dive().find(Text).prop('children')).toBe(_c.title);
    });
  });

  it('should correctly render data rows', () => {
    const wrapper = shallow(<GridView {...props} />);

    expect(wrapper.find('CellView').length).toBe(numberCells);

    props.data.forEach((row, rowIdx, dataArray) => {
      const rowComponent = wrapper.find(View).at(rowIdx + 3);

      expect(rowComponent.find('CellView').length).toBe(props.columns.length);

      props.columns.forEach((_c, idx, self) => {
        const cellComponent = rowComponent.find('CellView').at(idx);

        expect(cellComponent.props()).toMatchObject({
          showRight: idx < self.length - 1,
          showBottom: rowIdx < dataArray.length - 1,
        });
        expect(cellComponent.dive().find(Text).prop('children')).toBe(
          _c.getValue?.(row) ?? row?.[_c.key],
        );
      });
    });
  });

  it('should correctly render title when provided', () => {
    const title = 'Hello';
    const noTitleWrapper = shallow(<GridView {...props} />);
    const titleWrapper = shallow(<GridView {...props} title={title} />);

    expect(noTitleWrapper.find(Text).length).toBe(numberCells);
    expect(titleWrapper.find(Text).length).toBe(numberCells + 1);
    expect(titleWrapper.find(Text).at(0).prop('children')).toBe(title);
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<GridView {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(Card))).toMatchObject(customStyle);
  });
});
