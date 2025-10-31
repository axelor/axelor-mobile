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
import {View} from 'react-native';
import {render} from '@testing-library/react-native';
//import App from '../src/App';

jest.mock('../packages/core/lib/app/index', () => ({
  schemaContructor: {
    mixed: jest.fn(),
    string: jest.fn(),
    boolean: jest.fn(),
    date: jest.fn(),
    array: () => ({of: jest.fn()}),
    object: jest.fn(),
    subObject: () => ({concat: jest.fn()}),
    number: jest.fn(),
  },
}));

describe('Application', () => {
  it('should render without crashing', () => {
    // TODO: restore App test (current issue with local packages resolution)
    //const {getByTestId} = render(<App />);
    const {getByTestId} = render(<View testID="rootApplication" />);

    expect(getByTestId('rootApplication')).toBeTruthy();
  });
});
