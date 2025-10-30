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

import {fireEvent, within} from '@testing-library/react-native';
import {Breadcrumb} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('Breadcrumb Component', () => {
  const setupBreadcrumb = overrideProps =>
    setup({
      Component: Breadcrumb,
      baseProps: {
        items: [
          {title: 'Home', onPress: jest.fn()},
          {title: 'Products'},
          {title: 'Electronics'},
        ],
        onHomePress: jest.fn(),
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupBreadcrumb();

    expect(getByTestId('breadcrumbContainer')).toBeTruthy();
  });

  it('should render the home icon with correct props', () => {
    const {getAllByTestId, props} = setupBreadcrumb({onHomePress: jest.fn()});

    const _homeIcon = getAllByTestId('iconTouchable').at(0);

    expect(_homeIcon).toBeTruthy();
    expect(within(_homeIcon).getByTestId('icon-house-door-fill'));

    fireEvent.press(_homeIcon);
    expect(props.onHomePress).toHaveBeenCalled();
  });

  it('should render the correct number of breadcrumb items', () => {
    const {getAllByTestId, props} = setupBreadcrumb();

    const _elts = getAllByTestId(/^breadcrumbItemContainer-idx.*/);
    expect(_elts).toHaveLength(props.items.length);

    props.items.forEach((_i, idx) => {
      const _elt = _elts.at(idx);
      expect(within(_elt).getByTestId('icon-chevron-right')).toBeTruthy();
      expect(within(_elt).getByTestId(`breadcrumbItem-idx${idx}`)).toBeTruthy();
      expect(within(_elt).getByText(_i.title)).toBeTruthy();
    });
  });

  it('should render chevron icons between breadcrumb items', () => {
    const {getAllByTestId, props} = setupBreadcrumb();

    expect(getAllByTestId('icon-chevron-right')).toHaveLength(
      props.items.length,
    );
  });

  it('should call onPress when a breadcrumb item has a handler', () => {
    const {getByTestId, props} = setupBreadcrumb();

    props.items.forEach((_i, idx) => {
      if (_i.onPress != null) {
        fireEvent.press(getByTestId(`breadcrumbItem-idx${idx}`));
        expect(_i.onPress).toHaveBeenCalled();
      }
    });
  });

  it('should disable all items when breadcrumb is disabled', () => {
    const {getByTestId, props} = setupBreadcrumb({disabled: true});

    props.items.forEach((_i, idx) => {
      if (_i.onPress != null) {
        fireEvent.press(getByTestId(`breadcrumbItem-idx${idx}`));
        expect(_i.onPress).not.toHaveBeenCalled();
      }
    });
  });

  it('should apply custom styles to the container', () => {
    const {getByTestId, props} = setupBreadcrumb({
      style: {
        fontSize: 25,
        width: '90%',
        height: 25,
        flexDirection: 'row',
        alignSelf: 'center',
      },
    });

    expect(getByTestId('breadcrumbContainer')).toHaveStyle(props.style);
  });
});
