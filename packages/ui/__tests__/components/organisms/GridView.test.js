/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import {within} from '@testing-library/react-native';
import {GridView} from '@axelor/aos-mobile-ui';
import {getDefaultThemeColors, setup} from '../../tools';

describe('GridView Component', () => {
  const Colors = getDefaultThemeColors();

  const setupGridView = overrideProps =>
    setup({
      Component: GridView,
      baseProps: {
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
      },
      overrideProps,
    });

  function checkBorderStyle(elt, side) {
    expect(elt).toHaveStyle({
      [`border${side}Color`]: Colors.secondaryColor.background,
      [`border${side}Width`]: 1,
    });
  }

  function checkCellBorders(elt, showRight, showBottom) {
    if (showRight) checkBorderStyle(elt, 'Right');
    if (showBottom) checkBorderStyle(elt, 'Bottom');
  }

  it('renders without crashing', () => {
    const {getByTestId} = setupGridView();

    expect(getByTestId('gridViewContainer')).toBeTruthy();
  });

  it('should correctly render header', () => {
    const {getByTestId, props} = setupGridView();

    const _headerElt = getByTestId('gridViewHeaderContainer');

    expect(_headerElt).toBeTruthy();

    const _columnElts = within(_headerElt).getAllByTestId('cellView');

    expect(_columnElts).toHaveLength(props.columns.length);

    props.columns.forEach((_c, idx, self) => {
      const cellComponent = _columnElts.at(idx);

      checkCellBorders(cellComponent, idx < self.length - 1, true);
      expect(within(cellComponent).getByText(_c.title)).toBeTruthy();
    });
  });

  it('should correctly render data rows', () => {
    const {getAllByTestId, props} = setupGridView();

    expect(getAllByTestId('cellView')).toHaveLength(
      props.columns.length + props.data.length * props.columns.length,
    );

    const _rowElts = getAllByTestId('gridViewRowContainer');

    props.data.forEach((row, rowIdx, dataArray) => {
      const rowComponent = _rowElts.at(rowIdx);

      const _cellElts = within(rowComponent).getAllByTestId('cellView');

      expect(_cellElts).toHaveLength(props.columns.length);

      props.columns.forEach((_c, idx, self) => {
        const cellComponent = _cellElts.at(idx);

        checkCellBorders(
          cellComponent,
          idx < self.length - 1,
          rowIdx < dataArray.length - 1,
        );
        expect(
          within(cellComponent).getByText(_c.getValue?.(row) ?? row?.[_c.key]),
        ).toBeTruthy();
      });
    });
  });

  it('should correctly render title when provided', () => {
    const {getByText, props} = setupGridView({title: 'Hello'});

    expect(getByText(props.title)).toBeTruthy();
  });

  it('should apply custom style when provided', () => {
    const {getByTestId, props} = setupGridView({style: {width: 200}});

    expect(getByTestId('cardContainer')).toHaveStyle(props.style);
  });
});
