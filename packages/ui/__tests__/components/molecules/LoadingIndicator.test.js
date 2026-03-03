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

import {LoadingIndicator} from '@axelor/aos-mobile-ui';
import * as configContext from '../../../lib/config/ConfigContext';
import {setup, getDefaultThemeColors} from '../../tools';

describe('LoadingIndicator Component', () => {
  const Colors = getDefaultThemeColors();

  const setupLoadingIndicator = () => setup({Component: LoadingIndicator});

  it('does not render the indicator when showActivityIndicator is false', () => {
    jest.spyOn(configContext, 'useConfig').mockImplementation(() => ({
      showActivityIndicator: false,
    }));

    const {queryByTestId} = setupLoadingIndicator();

    expect(queryByTestId('activityIndicator')).toBeNull();
  });

  it('renders the indicator with the theme color when showActivityIndicator is true', () => {
    jest.spyOn(configContext, 'useConfig').mockImplementation(() => ({
      showActivityIndicator: true,
    }));

    const {getByTestId} = setupLoadingIndicator();
    const indicator = getByTestId('activityIndicator');

    expect(indicator).toBeTruthy();
    expect(indicator.props.color).toBe(Colors.primaryColor.background);
  });
});
