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
import {render} from '@testing-library/react-native';

interface SetupProps {
  Component: React.ComponentType<any>;
  baseProps?: any;
  overrideProps?: any;
}

export function setup({Component, baseProps, overrideProps}: SetupProps) {
  const props = {...baseProps, ...overrideProps};
  const utils = render(React.createElement(Component, props));

  const rerender = (rerenderProps?: any) =>
    utils.rerender(
      React.createElement(Component, {...props, ...rerenderProps}),
    );

  return {...utils, rerender, props};
}
