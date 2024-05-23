/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {useTranslator} from '@axelor/aos-mobile-core';
import {Picker} from '@axelor/aos-mobile-ui';
import {Question} from '../../../types';

interface QuestionAdvancedMonitoringProps {
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const QuestionAdvancedMonitoringAux = ({
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: QuestionAdvancedMonitoringProps) => {
  const I18n = useTranslator();

  return (
    <Picker
      defaultValue={defaultValue}
      listItems={Question.getAdvancedMonitoringAnswers(I18n)}
      labelField="title"
      valueField="id"
      emptyValue={false}
      onValueChange={onChange}
      required={required}
      readonly={readonly}
      isScrollViewContainer={true}
    />
  );
};

const QuestionAdvancedMonitoring = ({
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: QuestionAdvancedMonitoringProps) => {
  return (
    <QuestionAdvancedMonitoringAux
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

export default QuestionAdvancedMonitoring;
