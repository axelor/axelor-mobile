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
import {FormIncrementInput} from '@axelor/aos-mobile-ui';
import {
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';

interface DurationTimeSheetLineProps {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange?: (value: number) => void;
  readonly?: boolean;
  required?: boolean;
}

const DurationTimeSheetLineAux = ({
  style,
  title,
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: DurationTimeSheetLineProps) => {
  const I18n = useTranslator();
  const {Timesheet} = useTypes();
  const {getItemTitle} = useTypeHelpers();

  const {timesheet} = useSelector(state => state.timesheet);

  const composedTitle = useMemo(
    () =>
      timesheet?.timeLoggingPreferenceSelect
        ? `${title} (${getItemTitle(Timesheet?.timeLoggingPreferenceSelect, timesheet.timeLoggingPreferenceSelect)})`
        : title,
    [
      Timesheet?.timeLoggingPreferenceSelect,
      getItemTitle,
      timesheet?.timeLoggingPreferenceSelect,
      title,
    ],
  );

  return (
    <FormIncrementInput
      style={style}
      defaultValue={defaultValue}
      onChange={onChange}
      title={composedTitle}
      readOnly={readonly}
      required={required}
      decimalSpacer={I18n.t('Base_DecimalSpacer')}
      thousandSpacer={I18n.t('Base_ThousandSpacer')}
    />
  );
};

const DurationTimeSheetLine = (props: DurationTimeSheetLineProps) => {
  return <DurationTimeSheetLineAux {...props} />;
};

export default DurationTimeSheetLine;
