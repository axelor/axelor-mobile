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

import React, {useMemo} from 'react';
import {RadioSelect} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {PackagingType} from '../../../../types';

interface LogisticalFormPackagingTypeToggleProps {
  style?: any;
  defaultValue?: PackagingType;
  onChange?: (value: PackagingType) => void;
  readonly?: boolean;
}

const LogisticalFormPackagingTypeToggle = ({
  style,
  defaultValue = PackagingType.Packaging,
  onChange,
  readonly = false,
}: LogisticalFormPackagingTypeToggleProps) => {
  const I18n = useTranslator();

  const items = useMemo(
    () => [
      {
        id: PackagingType.Packaging,
        title: I18n.t('Stock_PackagingType_Packaging'),
      },
      {id: PackagingType.Product, title: I18n.t('Stock_PackagingType_Product')},
    ],
    [I18n],
  );

  return (
    <RadioSelect
      style={style}
      question={I18n.t('Stock_PackagingType')}
      items={items}
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
    />
  );
};

export default LogisticalFormPackagingTypeToggle;
