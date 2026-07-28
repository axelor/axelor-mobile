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

import React, {useCallback, useMemo} from 'react';
import {LabelText, QuantityCard, useDigitFormat} from '@axelor/aos-mobile-ui';
import {
  useNavigation,
  usePermitted,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useMassIndicatorChecker} from '../../../../providers';

const InternalMoveLineQuantityCard = ({
  movedQty,
  plannedQty,
  stockProduct,
  setMovedQty,
  originalStockLocation,
  trackingNumber,
  totalNetMass,
  readonly = false,
}: {
  movedQty: number;
  plannedQty: number;
  stockProduct: any;
  setMovedQty: (value: number) => void;
  originalStockLocation: any;
  trackingNumber?: any;
  totalNetMass?: string;
  readonly?: boolean;
}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const formatNumber = useDigitFormat();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockCorrection',
  });
  const {getMassIndicator, massUnitLabel} = useMassIndicatorChecker();

  const handleCreateCorrection = useCallback(() => {
    navigation.navigate('StockCorrectionCreationScreen', {
      stockLocation: originalStockLocation,
      product: stockProduct,
      trackingNumber,
    });
  }, [navigation, originalStockLocation, stockProduct, trackingNumber]);

  const massIndicator = useMemo(
    () => getMassIndicator(totalNetMass),
    [getMassIndicator, totalNetMass],
  );

  return (
    <QuantityCard
      labelQty={I18n.t('Stock_MovedQty')}
      defaultValue={movedQty}
      onValueChange={setMovedQty}
      editable={!readonly}
      actionQty={canCreate && !readonly}
      onPressActionQty={handleCreateCorrection}
      isBigButton
      isFormWrapper
      translator={I18n.t}>
      <LabelText
        title={`${I18n.t('Stock_AvailableQty')} :`}
        value={`${formatNumber(plannedQty)} ${stockProduct.unit?.name}`}
      />
      {totalNetMass != null && (
        <LabelText
          iconName={massIndicator?.icon ?? 'box-seam-fill'}
          title={`${I18n.t('Stock_TotalMass')} :`}
          value={`${totalNetMass} ${massUnitLabel ?? ''}`}
          color={massIndicator?.color?.background}
        />
      )}
    </QuantityCard>
  );
};

export default InternalMoveLineQuantityCard;
