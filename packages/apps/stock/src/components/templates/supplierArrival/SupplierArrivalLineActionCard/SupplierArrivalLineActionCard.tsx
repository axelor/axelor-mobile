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
import {ActionCard} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {StockMoveLine} from '../../../../types';
import {splitSupplierArrivalLine} from '../../../../features/supplierArrivalLineSlice';
import {SupplierArrivalLineCard} from '../../supplierArrival';

interface SupplierArrivalLineActionCardProps {
  style?: any;
  styleCard?: any;
  supplierArrivalLine: any;
  handleShowLine: (item: any) => void;
}

const SupplierArrivalLineActionCard = ({
  style,
  styleCard,
  supplierArrivalLine,
  handleShowLine,
}: SupplierArrivalLineActionCardProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {StockMove} = useTypes();

  const {supplierArrival} = useSelector(state => state.supplierArrival);

  const splitLine = useCallback(() => {
    dispatch(
      (splitSupplierArrivalLine as any)({
        id: supplierArrivalLine.id,
        version: supplierArrivalLine.version,
        supplierArrivalId: supplierArrival?.id,
      }),
    );
  }, [dispatch, supplierArrivalLine, supplierArrival?.id]);

  const deliveredQty = useMemo(
    () =>
      StockMoveLine.hideLineQty(supplierArrivalLine, supplierArrival)
        ? 0
        : Number(supplierArrivalLine.realQty),
    [supplierArrival, supplierArrivalLine],
  );

  return (
    <ActionCard
      style={style}
      translator={I18n.t}
      actionList={[
        {
          iconName: 'diagram-2-fill',
          helper: I18n.t('Stock_Split'),
          onPress: splitLine,
          hidden:
            supplierArrival.statusSelect > StockMove?.statusSelect.Planned ||
            deliveredQty >= supplierArrivalLine.qty ||
            deliveredQty === 0,
        },
      ]}>
      <SupplierArrivalLineCard
        style={styleCard}
        productName={supplierArrivalLine.product?.fullName}
        stockLocationName={supplierArrivalLine.toStockLocation?.name}
        deliveredQty={deliveredQty}
        askedQty={supplierArrivalLine.qty}
        trackingNumber={supplierArrivalLine.trackingNumber}
        locker={supplierArrivalLine.locker}
        totalNetMass={supplierArrivalLine.totalNetMass}
        onPress={() => handleShowLine(supplierArrivalLine)}
      />
    </ActionCard>
  );
};

export default SupplierArrivalLineActionCard;
