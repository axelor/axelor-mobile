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

import React, {useEffect, useState} from 'react';
import {FormIncrementInput} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {fetchMissingDuration} from '../../../api/leave-api';

interface DurationIncrementProps {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange?: (value: number) => void;
  readonly?: boolean;
  required?: boolean;
  objectState?: any;
}

const DurationIncrementAux = ({
  style,
  title,
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
  objectState: leaveRequest,
}: DurationIncrementProps) => {
  const I18n = useTranslator();

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (
      leaveRequest?.fromDateT &&
      leaveRequest?.toDateT &&
      leaveRequest?.startOnSelect &&
      leaveRequest?.endOnSelect
    ) {
      fetchMissingDuration({
        fromDate: leaveRequest.fromDateT,
        toDate: leaveRequest.toDateT,
        startOnSelect: leaveRequest.startOnSelect,
        endOnSelect: leaveRequest.endOnSelect,
      })
        .then(setValue)
        .catch(() => setValue(0));
    } else {
      setValue(0);
    }
  }, [
    leaveRequest?.endOnSelect,
    leaveRequest?.fromDateT,
    leaveRequest?.startOnSelect,
    leaveRequest?.toDateT,
  ]);

  return (
    <FormIncrementInput
      style={style}
      defaultValue={value}
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
