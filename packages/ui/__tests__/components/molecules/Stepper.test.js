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
import {fireEvent, render, screen} from '@testing-library/react-native';
import {Stepper} from '@axelor/aos-mobile-ui';

describe('Stepper Component', () => {
  const steps = [
    {titleKey: 'Step_1', state: 'draft'},
    {titleKey: 'Step_2', state: 'inProgress'},
    {titleKey: 'Step_3', state: 'completed'},
    {titleKey: 'Step_4', state: 'completed'},
  ];

  const mockTranslator = key => key;

  it('renders Stepper correctly', () => {
    render(
      <Stepper steps={steps} activeStepIndex={0} translator={mockTranslator} />,
    );

    expect(screen.getByText('Step_1')).toBeTruthy();
    expect(screen.getByText('Base_Next : Step_2')).toBeTruthy();
  });

  it('renders current step title and next step label', () => {
    render(
      <Stepper steps={steps} activeStepIndex={1} translator={mockTranslator} />,
    );

    expect(screen.getByText('Step_2')).toBeTruthy();
    expect(screen.getByText('Base_Next : Step_3')).toBeTruthy();
  });

  it('does not show dropdown icon if displayDropdown is false', () => {
    render(
      <Stepper steps={steps} activeStepIndex={0} translator={mockTranslator} />,
    );

    expect(screen.queryByTestId('chevron-down')).toBeNull();
  });

  it('shows and toggles step list when dropdown is enabled', () => {
    render(
      <Stepper
        steps={steps}
        activeStepIndex={0}
        translator={mockTranslator}
        displayDropdown
      />,
    );

    const dropdown = screen.getByTestId('stepper-dropdown');
    fireEvent.press(dropdown);

    expect(screen.getByText('Step_2')).toBeTruthy();
    expect(screen.getByText('Step_3')).toBeTruthy();
    expect(screen.getByText('Step_4')).toBeTruthy();

    fireEvent.press(dropdown);

    expect(screen.queryByText('Step_4')).toBeNull();
  });
});
