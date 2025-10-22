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
import {StyleSheet} from 'react-native';
import {useLogisticalFormState} from '../../../../hooks';
import {LogisticalFormPackagingLineCard} from '../../logisticalForm';

interface LogisticalFormStockMoveLineCardProps {
  product: any;
  trackingNumber: any;
  saleOrderLine: any;
  totalNetMass: number;
  qtyRemainingToPackage: number;
  qty: number;
  unit: any;
}

const LogisticalFormStockMoveLineCard = ({
  saleOrderLine,
  qtyRemainingToPackage,
  qty,
  ...stockMoveLine
}: LogisticalFormStockMoveLineCardProps) => {
  const {getLineColor} = useLogisticalFormState();

  const statusColor = useMemo(
    () => getLineColor({qty, qtyRemainingToPackage}),
    [getLineColor, qty, qtyRemainingToPackage],
  );

  const styles = useMemo(
    () => getStyles(statusColor?.background),
    [statusColor?.background],
  );

  return (
    <LogisticalFormPackagingLineCard
      style={[styles.border]}
      stockMoveLine={stockMoveLine}
      saleOrderLine={saleOrderLine}
      qty={qtyRemainingToPackage}
    />
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    border: {
      marginHorizontal: 12,
      marginRight: 12,
      marginVertical: 4,
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

export default LogisticalFormStockMoveLineCard;
