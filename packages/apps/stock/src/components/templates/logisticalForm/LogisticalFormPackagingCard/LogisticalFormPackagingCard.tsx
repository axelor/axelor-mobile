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
import {View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {LabelText, Text, useDigitFormat} from '@axelor/aos-mobile-ui';
import {useMassIndicatorChecker} from '../../../../providers';

interface LogisticalFormPackagingCardProps {
  packageUsed: any;
  packagingNumber: string;
  totalNetMass: number;
}

const LogisticalFormPackagingCard = ({
  packageUsed,
  packagingNumber,
  totalNetMass,
}: LogisticalFormPackagingCardProps) => {
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();
  const {getMassIndicator, massUnitLabel} = useMassIndicatorChecker();

  const massIndicator = useMemo(
    () => getMassIndicator(totalNetMass),
    [getMassIndicator, totalNetMass],
  );

  return (
    <View>
      <Text writingType="title">{packageUsed?.fullName}</Text>
      <Text>{packagingNumber}</Text>
      <LabelText
        iconName={massIndicator?.icon ?? 'box-seam-fill'}
        color={massIndicator?.color?.background}
        title={`${I18n.t('Stock_TotalMass')} :`}
        value={`${formatNumber(totalNetMass ?? 0)} ${massUnitLabel ?? ''}`}
      />
    </View>
  );
};

export default LogisticalFormPackagingCard;
