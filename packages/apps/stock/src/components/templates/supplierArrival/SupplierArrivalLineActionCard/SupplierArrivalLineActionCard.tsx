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

import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import SupplierArrivalLineCard from '../SupplierArrivalLineCard/SupplierArrivalLineCard';
import {splitSupplierArrivalLine} from '../../../../features/supplierArrivalLineSlice';

interface SupplierArrivalLineActionCardProps {
  style?: any;
  supplierArrivalLineId: number;
  version: number;
  productName: string;
  stockLocationName: string;
  askedQty: number;
  deliveredQty: number;
  locker?: string;
  trackingNumber?: {trackingNumberSeq: string};
  onPress: () => void;
}

const SupplierArrivalLineActionCard = ({
  style,
  supplierArrivalLineId,
  version,
  productName,
  stockLocationName,
  askedQty,
  deliveredQty,
  locker,
  trackingNumber,
  onPress,
}: SupplierArrivalLineActionCardProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {StockMove} = useTypes();

  const {supplierArrival} = useSelector(state => state.supplierArrival);

  const splitLine = useCallback(() => {
    dispatch(
      (splitSupplierArrivalLine as any)({
        stockMoveLineId: supplierArrivalLineId,
        supplierArrivalId: supplierArrival?.id,
        version: version,
      }),
    );
  }, [dispatch, supplierArrivalLineId, supplierArrival?.id, version]);

  return (
    <ActionCard
      style={[styles.container, style]}
      translator={I18n.t}
      actionList={[
        {
          iconName: 'diagram-2-fill',
          helper: I18n.t('Stock_Split'),
          onPress: splitLine,
          hidden:
            (supplierArrival.statusSelect !== StockMove?.statusSelect.Planned &&
              supplierArrival.statusSelect !== StockMove?.statusSelect.Draft) ||
            deliveredQty >= askedQty ||
            Number(deliveredQty) === 0,
        },
      ]}>
      <SupplierArrivalLineCard
        style={style}
        askedQty={askedQty}
        deliveredQty={deliveredQty}
        onPress={onPress}
        productName={productName}
        stockLocationName={stockLocationName}
        locker={locker}
        trackingNumber={trackingNumber}
      />
    </ActionCard>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
});

export default SupplierArrivalLineActionCard;
