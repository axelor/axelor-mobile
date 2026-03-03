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
import {Badge, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {useTaxModeIndicator} from '../../../hooks/use-tax-mode-indicator';

interface TaxModeBadgeProps {
  inAti: boolean;
  type?: 'base' | 'sale';
}

const TaxModeBadge = ({inAti, type = 'base'}: TaxModeBadgeProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const shouldDisplay = useTaxModeIndicator(inAti, type);

  if (!shouldDisplay) {
    return null;
  }

  return (
    <Badge
      title={I18n.t(inAti ? 'Sale_ATI' : 'Sale_WT')}
      color={Colors.infoColor}
    />
  );
};

export default TaxModeBadge;
