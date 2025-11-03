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

import React from 'react';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Label} from '@axelor/aos-mobile-ui';

interface ParentPackagingLabelProps {
  style?: any;
  defaultValue?: any;
}

const ParentPackagingLabelAux = ({
  style,
  defaultValue,
}: ParentPackagingLabelProps) => {
  const I18n = useTranslator();

  return (
    <Label
      style={style}
      type="info"
      message={I18n.t('Stock_ParentPackagingLabel', {
        packagingNumber: defaultValue?.packagingNumber,
        packageUsed: defaultValue?.packageUsed?.fullName,
      })}
    />
  );
};

const ParentPackagingLabel = (props: ParentPackagingLabelProps) => (
  <ParentPackagingLabelAux {...props} />
);

export default ParentPackagingLabel;
