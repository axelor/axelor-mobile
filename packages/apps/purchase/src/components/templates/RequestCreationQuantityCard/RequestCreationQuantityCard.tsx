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
import {checkNullString, QuantityCard, Text} from '@axelor/aos-mobile-ui';

interface RequestCreationQuantityCardProps {
  quantity: number;
  setQuantity: (state: any) => void;
  cancelLine: () => void;
  productName: string;
  productUnit: string;
}

const RequestCreationQuantityCard = ({
  quantity,
  setQuantity,
  cancelLine,
  productName,
}: RequestCreationQuantityCardProps) => {
  const I18n = useTranslator();

  const isProductName = useMemo(
    () => !checkNullString(productName),
    [productName],
  );

  return (
    <QuantityCard
      labelQty={I18n.t('Purchase_Quantity')}
      defaultValue={quantity}
      onValueChange={setQuantity}
      editable={true}
      actionQty={isProductName}
      iconName="x-lg"
      onPressActionQty={cancelLine}
      isBigButton={true}
      translator={I18n.t}>
      {isProductName && <Text fontSize={16}>{productName}</Text>}
    </QuantityCard>
  );
};

export default RequestCreationQuantityCard;
