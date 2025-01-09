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

import React, {useCallback, useMemo} from 'react';
import {FormIncrementInput} from '@axelor/aos-mobile-ui';

interface ProgressFormInputProps {
  style?: any;
  title: string;
  readOnly?: boolean;
  defaultValue?: number;
  onChange: (value: any) => void;
}

const ProgressFormInput = ({
  style,
  title,
  readOnly = false,
  defaultValue = null,
  onChange,
}: ProgressFormInputProps) => {
  const round = useCallback(value => {
    return Math.round(value / 10) * 10;
  }, []);

  const _defaultValue = useMemo(
    () => round(defaultValue).toString(),
    [defaultValue, round],
  );

  const onChangeValue = value => {
    onChange(round(value));
  };

  return (
    <FormIncrementInput
      style={style}
      title={title}
      defaultFormatting={false}
      defaultValue={_defaultValue}
      onChange={onChangeValue}
      readOnly={readOnly}
      stepSize={10}
      maxValue={100}
    />
  );
};

export default ProgressFormInput;
