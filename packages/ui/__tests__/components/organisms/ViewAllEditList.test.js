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

import {fireEvent} from '@testing-library/react-native';
import {ViewAllEditList} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('ViewAllEditList Component', () => {
  const setupViewAllEditList = overrideProps =>
    setup({
      Component: ViewAllEditList,
      baseProps: {
        title: 'Title',
        lines: [
          {
            id: 0,
            name: 'Line 1',
            nameDetails: 'Details of line 1',
            qty: 3,
            unitName: 'unit',
          },
          {id: 1, name: 'Line 2', qty: 500, unitName: 'g'},
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
          {id: 4, name: 'Line 5', qty: 10, unitName: 'L'},
        ],
        currentLineId: 1,
        setLines: jest.fn(),
        handleEditLine: jest.fn(),
        translator: jest.fn(key => key),
      },
      overrideProps,
    });

  it('should render without crashing', () => {
    const {getByTestId} = setupViewAllEditList();

    expect(getByTestId('cardContainer')).toBeTruthy();
  });

  it('should render title and number of lines', () => {
    const {getByTestId, getByText, props} = setupViewAllEditList();

    expect(getByText(props.title)).toBeTruthy();
    expect(getByTestId('numberBubbleContainer')).toBeTruthy();
    expect(getByText(props.lines.length.toString())).toBeTruthy();
  });

  it('should open modal with right title when click on view all button', () => {
    const {queryByTestId, getByTestId, getAllByText, props} =
      setupViewAllEditList();

    expect(queryByTestId('modalContainer')).toBeFalsy();

    fireEvent.press(getByTestId('viewAllContainerButton'));

    expect(getByTestId('modalContainer')).toBeTruthy();
    expect(getAllByText(props.title).length).toBe(2);
  });
});
