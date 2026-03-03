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
import {Slider} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('Slider Component', () => {
  const setupSlider = overrideProps =>
    setup({
      Component: Slider,
      baseProps: {
        minValue: 0,
        maxValue: 100,
        minLimit: 0,
        maxLimit: 100,
        step: 10,
        defaultValue: 50,
        onChange: jest.fn(),
        disabled: false,
      },
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupSlider();

    expect(getByTestId('slider')).toBeTruthy();
  });

  it('renders steps only if displayStepNumber is true', () => {
    const {getAllByText, getByTestId, props} = setupSlider({
      displayStepNumber: true,
    });

    const {maxValue, minValue, step} = props;

    expect(getByTestId('sliderStepsContainer')).toBeTruthy();

    Array.from(
      {length: Math.floor((maxValue - minValue) / step) + 1},
      (_, k) => minValue + k * step,
    ).forEach(_value => {
      expect(getAllByText(`${_value}`)).toHaveLength(1);
    });
  });

  it('does not render steps when there are too many', () => {
    const {queryByText, props} = setupSlider({
      step: 5,
      displayStepNumber: true,
    });

    const {maxValue, minValue, step} = props;

    Array.from(
      {length: Math.floor((maxValue - minValue) / step) + 1},
      (_, k) => minValue + k * step,
    ).forEach(_value => {
      expect(queryByText(`${_value}`)).toBeFalsy();
    });
  });

  it('calls onChange on sliding complete', () => {
    const {getByTestId, props} = setupSlider({onChange: jest.fn()});
    const _newValue = 70;

    fireEvent(getByTestId('slider'), 'slidingComplete', _newValue);
    expect(props.onChange).toHaveBeenCalledWith(_newValue);
  });

  it('displays slider value when displaySliderValue is true', () => {
    const {getByText, getByTestId, queryByText, props} = setupSlider({
      displaySliderValue: true,
      defaultValue: 25,
    });

    expect(getByText(`${props.defaultValue}.00`)).toBeTruthy();

    const _newValue = 70;
    fireEvent(getByTestId('slider'), 'slidingComplete', _newValue);

    expect(queryByText(`${props.defaultValue}.00`)).toBeFalsy();
    expect(getByText(`${_newValue}.00`)).toBeTruthy();
  });

  it('does not display slider value when displaySliderValue is false', () => {
    const {queryByText, props} = setupSlider({
      displaySliderValue: false,
      defaultValue: 25,
    });

    expect(queryByText(`${props.defaultValue}.00`)).toBeFalsy();
  });

  it('should disable the slider when needed', () => {
    const {getByTestId: getByTestIdDisabled} = setupSlider({disabled: true});
    const {getByTestId: getByTestIdEnabled} = setupSlider({disabled: false});

    expect(getByTestIdDisabled('sliderWrapper').props.pointerEvents).toBe(
      'none',
    );
    expect(getByTestIdEnabled('sliderWrapper').props.pointerEvents).toBe(
      'auto',
    );
  });

  it('should render with custom style', () => {
    const {getByTestId, props} = setupSlider({style: {margin: 20}});

    expect(getByTestId('sliderContainer')).toHaveStyle(props.style);
  });
});
