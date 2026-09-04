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

import React, {useEffect, useMemo} from 'react';
import {FormIncrementInput} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {fetchMissingDuration} from '../../../api/leave-api';

interface DurationIncrementProps {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange: (value: number) => void;
  readonly?: boolean;
  required?: boolean;
  objectState?: any;
}

const DurationIncrementAux = ({
  style,
  title = 'Hr_Duration',
  defaultValue,
  onChange,
  readonly = false,
  required = false,
  objectState,
}: DurationIncrementProps) => {
  const I18n = useTranslator();

  const {fromDate, toDate, startOnSelect, endOnSelect} = useMemo(
    () => ({
      fromDate: objectState?.perdiodDate?.fromDateT?.toISOString(),
      toDate: objectState?.perdiodDate?.toDateT?.toISOString(),
      startOnSelect: objectState?.perdiodDate?.startOnSelect,
      endOnSelect: objectState?.perdiodDate?.endOnSelect,
    }),
    [objectState?.perdiodDate],
  );

  useEffect(() => {
    if (fromDate && toDate && startOnSelect && endOnSelect) {
      fetchMissingDuration({fromDate, toDate, startOnSelect, endOnSelect})
        .then(onChange)
        .catch(() => onChange(0));
    } else {
      onChange(0);
    }
  }, [endOnSelect, fromDate, startOnSelect, toDate, onChange]);

  return (
    <FormIncrementInput
      style={style}
      defaultValue={defaultValue}
      onChange={onChange}
      title={title}
      readOnly={readonly}
      required={required}
      decimalSpacer={I18n.t('Base_DecimalSpacer')}
      thousandSpacer={I18n.t('Base_ThousandSpacer')}
    />
  );
};

const DurationIncrement = (props: DurationIncrementProps) => {
  return <DurationIncrementAux {...props} />;
};

export default DurationIncrement;
