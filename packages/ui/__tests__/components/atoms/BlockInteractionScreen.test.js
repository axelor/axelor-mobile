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

import React from 'react';
import {View} from 'react-native';
import {BlockInteractionScreen} from '@axelor/aos-mobile-ui';
import * as configContext from '../../../lib/config/ConfigContext';
import {setup} from '../../tools';

describe('BlockInteractionScreen Component', () => {
  const defaultHeaderHeight = 70;

  const setupBlockInteractionScreen = overrideProps =>
    setup({
      Component: BlockInteractionScreen,
      baseProps: {
        children: <View testID="children" />,
      },
      overrideProps,
    });

  beforeEach(() => {
    jest.spyOn(configContext, 'useConfig').mockImplementation(() => ({
      headerHeight: defaultHeaderHeight,
    }));
  });

  it('renders without crashing', () => {
    const {getByTestId} = setupBlockInteractionScreen();

    expect(getByTestId('children')).toBeTruthy();
  });

  it('applies header offset correctly when not hidden', () => {
    const {getByTestId} = setupBlockInteractionScreen();

    expect(getByTestId('blockInteractionContainer')).toHaveStyle({
      top: defaultHeaderHeight,
    });
  });

  it('applies no offset when header is hidden', () => {
    const {getByTestId} = setupBlockInteractionScreen({hideHeader: true});

    expect(getByTestId('blockInteractionContainer')).toHaveStyle({top: 0});
  });
});
