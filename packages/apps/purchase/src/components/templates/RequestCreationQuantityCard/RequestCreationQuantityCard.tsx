/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {
  checkNullString,
  QuantityCard,
  Text,
  useDigitFormat,
} from '@axelor/aos-mobile-ui';

interface RequestCreationQuantityCardProps {
  movedQty: number;
  setMovedQty: (state: any) => void;
  cancelMove: () => void;
  productName: string;
  trackingNumber: string;
  availableQty: number;
  productUnit: string;
}

const RequestCreationQuantityCard = ({
  movedQty,
  setMovedQty,
  cancelMove,
  productName,
  trackingNumber,
  availableQty,
  productUnit,
}: RequestCreationQuantityCardProps) => {
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();

  return (
    <QuantityCard
      labelQty={I18n.t('Resquest_Quantity')}
      defaultValue={movedQty}
      onValueChange={setMovedQty}
      editable={true}
      actionQty={true}
      iconName="x-lg"
      onPressActionQty={cancelMove}
      isBigButton={true}
      translator={I18n.t}>
      <Text fontSize={16}>
        {productName}
        {!checkNullString(trackingNumber) && ' - ' + trackingNumber}
      </Text>
    </QuantityCard>
  );
};

export default RequestCreationQuantityCard;
