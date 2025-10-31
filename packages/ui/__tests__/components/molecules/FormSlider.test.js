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
import {act} from '@testing-library/react-native';
import {FormSlider} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

jest.mock('../../../lib/components/atoms/Slider/Slider', () => {
  const {View} = require('react-native');

  return props => <View testID="mocked_slider" {...props} />;
});

describe('FormSlider Component', () => {
  const setupFormSlider = overrideProps =>
    setup({
      Component: FormSlider,
      baseProps: {
        title: 'Volume',
        minValue: 0,
        maxValue: 100,
        step: 10,
        defaultValue: 50,
        onChange: jest.fn(),
        readonly: false,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupFormSlider();

    expect(getByTestId('formSliderContainer')).toBeTruthy();
  });

  it('passes slider props correctly', () => {
    const {getByTestId, props} = setupFormSlider();

    expect(getByTestId('mocked_slider').props).toMatchObject({
      minValue: props.minValue,
      maxValue: props.maxValue,
      defaultValue: props.defaultValue,
      step: props.step,
      disabled: props.readonly,
    });
  });

  it('triggers onChange when slider value changes', () => {
    const {getByTestId, props} = setupFormSlider({onChange: jest.fn()});

    act(() => getByTestId('mocked_slider').props.onChange(60));

    expect(props.onChange).toHaveBeenCalledWith(60);
  });

  it('disables slider when readonly is true', () => {
    const {getByTestId} = setupFormSlider({readonly: true});

    expect(getByTestId('mocked_slider').props.disabled).toBe(true);
  });

  it('applies custom style to container', () => {
    const {getByTestId, props} = setupFormSlider({style: {margin: 20}});

    expect(getByTestId('formSliderContainer')).toHaveStyle(props.style);
  });
});
