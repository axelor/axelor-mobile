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
import {FormSlider, Slider} from '@axelor/aos-mobile-ui';
import {setup, getComputedStyles} from '../../tools';

const findElementByType = (element, type) => {
  if (!element || !element.props) {
    return null;
  }

  if (element.type === type) {
    return element;
  }

  const children = React.Children.toArray(element.props.children);

  for (const child of children) {
    const result = findElementByType(child, type);
    if (result) {
      return result;
    }
  }

  return null;
};

describe('FormSlider Component', () => {
  const baseProps = {
    title: 'Volume',
    minValue: 0,
    maxValue: 100,
    step: 10,
    defaultValue: 50,
    onChange: jest.fn(),
    readonly: false,
  };

  const setupFormSlider = overrideProps =>
    setup({Component: FormSlider, baseProps, overrideProps});

  const getSlider = getByTestId => {
    const container = getByTestId('formSliderContainer');
    const slider = findElementByType(container, Slider);

    return {container, slider};
  };

  it('renders without crashing', () => {
    const {getByTestId, getByText} = setupFormSlider();

    expect(getByTestId('formSliderContainer')).toBeTruthy();
    expect(getByText(baseProps.title)).toBeTruthy();
  });

  it('passes slider props correctly', () => {
    const {getByTestId} = setupFormSlider();
    const {slider} = getSlider(getByTestId);

    expect(slider.props).toMatchObject({
      minValue: baseProps.minValue,
      maxValue: baseProps.maxValue,
      defaultValue: baseProps.defaultValue,
      step: baseProps.step,
      disabled: baseProps.readonly,
    });
  });

  it('triggers onChange when slider value changes', () => {
    const {getByTestId, props} = setupFormSlider({onChange: jest.fn()});
    const {slider} = getSlider(getByTestId);

    act(() => {
      slider.props.onChange?.(60);
    });

    expect(props.onChange).toHaveBeenCalledWith(60);
  });

  it('disables slider when readonly is true', () => {
    const {getByTestId} = setupFormSlider({readonly: true});
    const {slider} = getSlider(getByTestId);

    expect(slider.props.disabled).toBe(true);
  });

  it('applies custom style to container', () => {
    const customStyle = {margin: 20};
    const {getByTestId} = setupFormSlider({style: customStyle});

    const styles = getComputedStyles(
      getByTestId('formSliderContainer').props.style,
    );
    expect(styles).toMatchObject(customStyle);
  });
});
