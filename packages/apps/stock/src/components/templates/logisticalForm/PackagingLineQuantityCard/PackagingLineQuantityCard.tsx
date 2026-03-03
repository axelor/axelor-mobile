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
import {useTranslator} from '@axelor/aos-mobile-core';
import {
  Label,
  LabelText,
  QuantityCard,
  useDigitFormat,
} from '@axelor/aos-mobile-ui';
import {useMassIndicatorChecker} from '../../../../providers';

interface PackagingLineQuantityCardProps {
  style?: any;
  title?: string;
  defaultValue?: any;
  onChange?: (value: any) => void;
  readonly?: boolean;
  objectState?: any;
}

const PackagingLineQuantityCardAux = ({
  style,
  title,
  defaultValue,
  onChange,
  readonly,
  objectState,
}: PackagingLineQuantityCardProps) => {
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();
  const {getMassIndicator, massUnitLabel} = useMassIndicatorChecker();

  const isPackagingCreation = useMemo(
    () => objectState?.id == null,
    [objectState?.id],
  );

  const stockMoveLine = useMemo(
    () => objectState?.stockMoveLine,
    [objectState?.stockMoveLine],
  );

  const totalNetMass = useMemo(
    () => parseFloat(stockMoveLine?.netMass ?? '0') * defaultValue,
    [defaultValue, stockMoveLine?.netMass],
  );

  const massIndicator = useMemo(
    () => getMassIndicator(totalNetMass),
    [getMassIndicator, totalNetMass],
  );

  const qtyRemainingToPackage = useMemo(
    () => parseFloat(stockMoveLine?.qtyRemainingToPackage ?? '0'),
    [stockMoveLine?.qtyRemainingToPackage],
  );

  const initalValue = useMemo(
    () => parseFloat(objectState?.qty ?? '0'),
    [objectState?.qty],
  );

  if (isPackagingCreation && qtyRemainingToPackage === 0) {
    return (
      <Label
        style={style}
        type="info"
        message={I18n.t('Stock_NoQtyRemainingToPackage')}
      />
    );
  }

  return (
    <QuantityCard
      style={style}
      labelQty={I18n.t(title)}
      defaultValue={defaultValue}
      onValueChange={onChange}
      editable={!readonly}
      isBigButton
      maxValue={initalValue + qtyRemainingToPackage}
      translator={I18n.t}>
      <LabelText value={stockMoveLine?.product?.fullName} />
      {!!stockMoveLine?.trackingNumber && (
        <LabelText
          iconName="qr-code"
          value={stockMoveLine?.trackingNumber.trackingNumberSeq}
        />
      )}
      <LabelText
        iconName={massIndicator?.icon ?? 'box-seam-fill'}
        title={`${I18n.t('Stock_TotalMass')} :`}
        value={`${formatNumber(totalNetMass)} ${massUnitLabel ?? ''}`}
        color={massIndicator?.color?.background}
      />
    </QuantityCard>
  );
};

const PackagingLineQuantityCard = (props: PackagingLineQuantityCardProps) => (
  <PackagingLineQuantityCardAux {...props} />
);

export default PackagingLineQuantityCard;
