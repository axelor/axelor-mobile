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

import React, {useEffect} from 'react';

import {Stepper, StepState} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';

interface QIStepperProps {
  onChange?: (any: any) => void;
  objectState?: any;
}

const getStepsState = (stepIndex: number, objectState?: any): StepState[] => {
  return [0, 1, 2].map(index => {
    if (index === 0 && stepIndex >= 1 && !objectState?.qiDetection) {
      return StepState.error;
    }
    if (index < stepIndex) return StepState.completed;
    if (index === stepIndex) return StepState.inProgress;
    return StepState.draft;
  });
};

const QIStepper = ({onChange = () => {}, objectState}: QIStepperProps) => {
  const I18n = useTranslator();
  const {actualStep} = useSelector(
    (state: any) => state.quality_qualityImprovement,
  );

  useEffect(() => {
    onChange(actualStep);
  }, [onChange, actualStep]);

  const stepStates = getStepsState(actualStep, objectState);

  return (
    <Stepper
      steps={[
        {titleKey: 'Quality_Detection', state: stepStates[0]},
        {titleKey: 'Quality_Identification', state: stepStates[1]},
        {titleKey: 'Quality_Defaults', state: stepStates[2]},
      ]}
      activeStepIndex={actualStep}
      translator={I18n.t}
      displayDropdown
    />
  );
};

export default QIStepper;
