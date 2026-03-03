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
import {Icon} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('Icon Component', () => {
  const setupIcon = overrideProps =>
    setup({Component: Icon, baseProps: {name: 'check'}, overrideProps});

  it('renders without crashing', () => {
    const {getByTestId, props} = setupIcon();

    expect(getByTestId('iconTouchable')).toBeTruthy();
    expect(getByTestId(`icon-${props.name}`)).toBeTruthy();
  });

  it('renders nothing when visible prop is false', () => {
    const {queryByTestId, props} = setupIcon({visible: false});

    expect(queryByTestId('iconTouchable')).toBeFalsy();
    expect(queryByTestId(`icon-${props.name}`)).toBeFalsy();
  });

  it('renders a disabled icon', () => {
    const {getByTestId, props} = setupIcon({
      touchable: false,
      onPress: jest.fn(),
    });

    fireEvent.press(getByTestId('iconTouchable'));
    expect(props.onPress).not.toHaveBeenCalled();
  });

  it('renders a touchable icon', () => {
    const {getByTestId, props} = setupIcon({
      touchable: true,
      onPress: jest.fn(),
    });

    fireEvent.press(getByTestId('iconTouchable'));
    expect(props.onPress).toHaveBeenCalled();
  });

  it('applies custom style to the component', () => {
    const {getByTestId, props} = setupIcon({style: {backgroundColor: 'red'}});

    expect(getByTestId('iconTouchable')).toHaveStyle(props.style);
  });
});
