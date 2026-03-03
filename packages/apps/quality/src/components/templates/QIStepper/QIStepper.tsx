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

import React, {useMemo} from 'react';
import {Stepper, StepState} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {QualityImprovement as QI_Type} from '../../../types';

interface QIStepperProps {
  defaultValue?: number;
  objectState?: any;
}

const QIStepper = ({defaultValue, objectState}: QIStepperProps) => {
  const I18n = useTranslator();

  const stepsState: StepState[] = useMemo(
    () =>
      Object.values(QI_Type.Steps).map(value => {
        if (
          value === QI_Type.Steps.detection &&
          defaultValue > QI_Type.Steps.detection &&
          !objectState?.qiDetection
        ) {
          return StepState.error;
        }
        if (value < defaultValue) return StepState.completed;
        if (value === defaultValue) return StepState.inProgress;
        return StepState.draft;
      }),
    [defaultValue, objectState],
  );

  return (
    <Stepper
      steps={QI_Type.getStepValues().map(item => ({
        ...item,
        state: stepsState[item.value],
      }))}
      activeStepIndex={defaultValue}
      translator={I18n.t}
      displayDropdown
    />
  );
};

export default QIStepper;
