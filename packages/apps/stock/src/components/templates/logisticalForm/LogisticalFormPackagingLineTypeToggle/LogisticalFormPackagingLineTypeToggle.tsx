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

import React, {useMemo, useState} from 'react';
import {RadioSelect} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

type LineType = 'packaging' | 'product';

interface LogisticalFormPackagingLineTypeToggleProps {
  defaultValue?: LineType;
  onChange?: (value: LineType) => void;
  readonly?: boolean;
  style?: any;
}

const LogisticalFormPackagingLineTypeToggle = ({
  defaultValue = 'packaging',
  onChange = () => {},
  readonly = false,
  style,
}: LogisticalFormPackagingLineTypeToggleProps) => {
  const I18n = useTranslator();
  const [value, setValue] = useState<LineType>(defaultValue);

  const items = useMemo(
    () => [
      {id: 'packaging', title: I18n.t('Stock_LineType_Packaging')},
      {id: 'product', title: I18n.t('Stock_LineType_Product')},
    ],
    [I18n],
  );

  return (
    <RadioSelect
      style={style}
      defaultValue={value}
      items={items}
      readonly={readonly}
      onChange={selected => {
        setValue(selected as LineType);
        onChange(selected as LineType);
      }}
    />
  );
};

export default LogisticalFormPackagingLineTypeToggle;
