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

import {Breadcrumb} from '@axelor/aos-mobile-ui';
import {fireEvent} from '@testing-library/react-native';
import {getComputedStyles, setup} from '../../tools';

const getIconName = icon => {
  const child = Array.isArray(icon?.props?.children)
    ? icon.props.children[0]
    : icon?.props?.children;

  return child?.props?.name;
};

describe('Breadcrumb Component', () => {
  const mockOnHomePress = jest.fn();
  const mockOnPress = jest.fn();
  const items = [
    {title: 'Home', onPress: mockOnPress},
    {title: 'Products'},
    {title: 'Electronics'},
  ];
  const setupBreadcrumb = overrideProps =>
    setup({
      Component: Breadcrumb,
      baseProps: {
        items,
        onHomePress: mockOnHomePress,
      },
      overrideProps,
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    expect(() => setupBreadcrumb()).not.toThrow();
  });

  it('should render the home icon with correct props', () => {
    const {getAllByTestId} = setupBreadcrumb();
    const iconTouchables = getAllByTestId('iconTouchable');
    const homeIconTouchable = iconTouchables.find(
      icon => getIconName(icon) === 'house-door-fill',
    );

    expect(homeIconTouchable).toBeTruthy();
    expect(homeIconTouchable?.props.disabled ?? false).toBe(false);

    fireEvent.press(homeIconTouchable);

    expect(mockOnHomePress).toHaveBeenCalled();
  });

  it('should render the correct number of breadcrumb items', () => {
    const {getByText} = setupBreadcrumb();

    items.forEach(item => {
      expect(getByText(item.title)).toBeTruthy();
    });
  });

  it('should render chevron icons between breadcrumb items', () => {
    const {getAllByTestId} = setupBreadcrumb();
    const iconTouchables = getAllByTestId('iconTouchable');
    const chevrons = iconTouchables.filter(
      icon => getIconName(icon) === 'chevron-right',
    );

    expect(chevrons).toHaveLength(items.length);
  });

  it('should call onPress when a breadcrumb item has a handler', () => {
    const {getByTestId} = setupBreadcrumb();

    fireEvent.press(getByTestId('breadcrumbItem-0'));

    expect(mockOnPress).toHaveBeenCalled();
  });

  it('should disable items without handlers', () => {
    const {getByTestId} = setupBreadcrumb();
    const nonClickableItem = getByTestId('breadcrumbItem-1');

    expect(nonClickableItem.props.accessibilityState?.disabled).toBe(true);
  });

  it('should disable all items when breadcrumb is disabled', () => {
    const {getByTestId} = setupBreadcrumb({disabled: true});
    items.forEach((_, index) => {
      const touchable = getByTestId(`breadcrumbItem-${index}`);
      expect(touchable.props.accessibilityState?.disabled).toBe(true);
    });
  });

  it('should apply custom styles to the container', () => {
    const customStyle = {
      fontSize: 25,
      width: '90%',
      height: 25,
      flexDirection: 'row',
      alignSelf: 'center',
    };
    const {getByTestId} = setupBreadcrumb({style: customStyle});
    const containerStyles = getComputedStyles(
      getByTestId('breadcrumbContainer').props.style,
    );

    expect(containerStyles).toMatchObject(customStyle);
  });
});
