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
import {StyleSheet} from 'react-native';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {FormIncrementInput} from '@axelor/aos-mobile-ui';

interface QuestionMeasureProps {
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const QuestionMeasureAux = ({
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: QuestionMeasureProps) => {
  const I18n = useTranslator();

  const {question} = useSelector((state: any) => state.intervention_question);

  return (
    <FormIncrementInput
      style={styles.container}
      title={I18n.t('Intervention_DesiredUnit', {
        unit: question?.desiredUnit?.name,
      })}
      defaultValue={defaultValue?.toString()}
      decimalSpacer={I18n.t('Base_DecimalSpacer')}
      thousandSpacer={I18n.t('Base_ThousandSpacer')}
      readOnly={readonly}
      required={required}
      onChange={onChange}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
});

const QuestionMeasure = ({
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: QuestionMeasureProps) => {
  return (
    <QuestionMeasureAux
      defaultValue={defaultValue}
      readonly={readonly}
      required={required}
      onChange={onChange}
    />
  );
};

export default QuestionMeasure;
