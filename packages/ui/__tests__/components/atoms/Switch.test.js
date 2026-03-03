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
import {Switch} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('Switch Component', () => {
  const setupSwitch = overrideProps =>
    setup({
      Component: Switch,
      baseProps: {isEnabled: false, handleToggle: jest.fn()},
      overrideProps,
    });

  it('renders correctly', () => {
    const {getByRole} = setupSwitch();

    expect(getByRole('switch')).toBeTruthy();
  });

  it('switch reflects enabled state', () => {
    const {getByRole} = setupSwitch();

    expect(getByRole('switch').props.value).toBe(false);
  });

  it('calls handleToggle with negated value when toggled', () => {
    const {getByRole, props} = setupSwitch({handleToggle: jest.fn()});

    fireEvent(getByRole('switch'), 'valueChange', true);

    expect(props.handleToggle).toHaveBeenCalledWith(true);
  });

  it('renders a disabled compoent when readonly is true', () => {
    const {getByRole} = setupSwitch({readonly: true});

    expect(getByRole('switch').props.disabled).toBe(true);
  });

  it('passes style prop to the Switch', () => {
    const {getByRole, props} = setupSwitch({style: {marginTop: 10}});

    expect(getByRole('switch')).toHaveStyle(props.style);
  });
});
