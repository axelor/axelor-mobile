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

import {fireEvent} from '@testing-library/react-native';
import {Slider} from '@axelor/aos-mobile-ui';
import {setup} from '../../tools';

describe('Slider Component', () => {
  const baseProps = {
    minValue: 0,
    maxValue: 100,
    minLimit: 0,
    maxLimit: 100,
    step: 10,
    defaultValue: 50,
    onChange: jest.fn(),
    disabled: false,
  };

  const setupSlider = (overrideProps = {}) =>
    setup({
      Component: Slider,
      baseProps,
      overrideProps,
    });

  it('renders without crashing', () => {
    const {getByTestId} = setupSlider();
    expect(getByTestId('slider')).toBeTruthy();
  });

  it('renders step numbers if displayStepNumber is true and not too many', () => {
    const {getAllByText} = setupSlider({
      displayStepNumber: true,
    });

    expect(getAllByText('0')).toHaveLength(1);
    expect(getAllByText('50')).toHaveLength(1);
    expect(getAllByText('100')).toHaveLength(1);
  });

  it('does not render step numbers when too many', () => {
    const {queryByText} = setupSlider({
      step: 5,
      displayStepNumber: true,
    });

    expect(queryByText('0')).toBeNull();
    expect(queryByText('5')).toBeNull();
  });

  it('calls onChange on sliding complete', () => {
    const onChange = jest.fn();
    const {getByTestId} = setupSlider({onChange});
    const slider = getByTestId('slider');

    fireEvent(slider, 'slidingComplete', 70);
    expect(onChange).toHaveBeenCalledWith(70);
  });

  it('displays slider value when displaySliderValue is true', () => {
    const {getByText} = setupSlider({
      displaySliderValue: true,
      defaultValue: 25,
    });

    expect(getByText('25.00')).toBeTruthy();
  });

  it('does not display slider value when displaySliderValue is false', () => {
    const {queryByText} = setupSlider({
      displaySliderValue: false,
      defaultValue: 25,
    });

    expect(queryByText('25.00')).toBeNull();
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
    const customStyle = {margin: 20};
    const {getByTestId, props} = setupSlider({style: customStyle});

    expect(getByTestId('sliderContainer')).toHaveStyle(props.style);
  });
});
