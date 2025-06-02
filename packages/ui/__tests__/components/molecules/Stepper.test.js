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
import {fireEvent, render} from '@testing-library/react-native';
import {Stepper} from '@axelor/aos-mobile-ui';

describe('Stepper Component', () => {
  const props = {
    steps: [
      {titleKey: 'Step_1', state: 'completed'},
      {titleKey: 'Step_2', state: 'error'},
      {titleKey: 'Step_3', state: 'inProgress'},
      {titleKey: 'Step_4', state: 'draft'},
    ],
    activeStepIndex: 0,
    translator: jest.fn(key => key),
  };

  it('displays the active step title and next step title if not the last', () => {
    const {steps, activeStepIndex} = props;
    const {getByText} = render(<Stepper {...props} />);

    expect(getByText(steps[activeStepIndex].titleKey)).toBeTruthy();
    expect(
      getByText(`Base_Next : ${steps[activeStepIndex + 1].titleKey}`),
    ).toBeTruthy();
  });

  it('does not show the next label on the last step', () => {
    const {queryByText} = render(
      <Stepper {...props} activeStepIndex={props.steps.length - 1} />,
    );

    expect(queryByText(/Base_Next/)).toBeNull();
  });

  it('toggles StepList on dropdown press when displayDropdown is true', () => {
    const {steps, activeStepIndex} = props;
    const {getByTestId, queryByText, queryAllByText} = render(
      <Stepper {...props} displayDropdown />,
    );

    steps.forEach(({titleKey}, idx) => {
      if (idx === activeStepIndex) {
        expect(queryByText(titleKey)).toBeTruthy();
      } else {
        expect(queryByText(titleKey)).toBeNull();
      }
    });

    fireEvent.press(getByTestId('stepper-dropdown'));

    steps.forEach(({titleKey}, idx) => {
      if (idx === activeStepIndex) {
        expect(queryAllByText(titleKey).length).toBe(2);
      } else {
        expect(queryByText(titleKey)).toBeTruthy();
      }
    });
  });
});
