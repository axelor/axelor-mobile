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
import {DurationInput} from '@axelor/aos-mobile-ui';
import {formatDurationSecondsToArray} from '../../../src/components/organisms/DurationInput/duration.helpers';
import {setup} from '../../tools';

jest.mock(
  '../../../lib/components/molecules/NumberChevronInput/NumberChevronInput',
  () => {
    const {View} = require('react-native');

    return props => <View testID="mocked_numberChevronInput" {...props} />;
  },
);

describe('DurationInput Component', () => {
  const setupDurationInput = overrideProps =>
    setup({
      Component: DurationInput,
      baseProps: {defaultValue: 6000, onChange: jest.fn()},
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupDurationInput();

    expect(getByTestId('durationInputContainer')).toBeTruthy();
  });

  it('renders a title when provided', () => {
    const {getByText, props} = setupDurationInput({title: 'Duration Title'});

    expect(getByText(props.title)).toBeTruthy();
  });

  it('renders the correct number of NumberChevronInputs', () => {
    const {getAllByTestId} = setupDurationInput();

    expect(getAllByTestId('mocked_numberChevronInput')).toHaveLength(5);
  });

  it('renders with required when required is true and value is 0', () => {
    const {getAllByTestId, rerender} = setupDurationInput({
      defaultValue: 0,
      required: true,
    });

    getAllByTestId('mocked_numberChevronInput').forEach(_i => {
      expect(_i.props.required).toBe(true);
      expect(_i.props.defaultValue).toBe(0);
    });

    rerender({defaultValue: 6000});

    const _defaultValue = formatDurationSecondsToArray(6000);

    getAllByTestId('mocked_numberChevronInput').forEach((_i, idx) => {
      expect(_i.props.required).toBe(false);
      expect(_i.props.defaultValue).toBe(_defaultValue[idx]);
    });
  });

  it('renders as readonly when readonly is true', () => {
    const {getAllByTestId} = setupDurationInput({readonly: true});

    getAllByTestId('mocked_numberChevronInput').forEach(_i => {
      expect(_i.props.readonly).toBe(true);
    });
  });

  it('applies custom style when provided', () => {
    const {getByTestId, props} = setupDurationInput({style: {height: 200}});

    expect(getByTestId('durationInputContainer')).toHaveStyle(props.style);
  });

  it('applies custom inputStyle when provided', () => {
    const {getAllByTestId, props} = setupDurationInput({
      inputStyle: {height: 200},
    });

    getAllByTestId('mocked_numberChevronInput').forEach(_elt => {
      expect(_elt).toHaveStyle(props.inputStyle);
    });
  });
});
