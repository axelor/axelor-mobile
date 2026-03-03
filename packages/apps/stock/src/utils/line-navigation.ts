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

import {getTypes} from '@axelor/aos-mobile-core';

export const showLine = ({
  item,
  itemLine,
  lineDetailsScreen,
  selectTrackingScreen,
  selectProductScreen,
  detailStatus: _detailStatus,
  skipTrackingNumberVerification = false,
  skipVerification = false,
  navigation,
}: {
  item: {name: string; data: any};
  itemLine: {name: string; data: any};
  lineDetailsScreen: string;
  selectTrackingScreen: string;
  selectProductScreen: string;
  detailStatus?: any;
  skipTrackingNumberVerification?: boolean;
  skipVerification?: boolean;
  navigation: any;
}) => {
  const StockMove = getTypes().StockMove;
  const detailStatus = _detailStatus ?? StockMove?.statusSelect.Realized;

  if (itemLine?.data == null) {
    return;
  }

  const line = {...itemLine.data};

  const {product, trackingNumber} = line;

  const {trackingNumberConfiguration} = product;

  if (
    item?.data?.statusSelect === detailStatus ||
    skipVerification ||
    (!skipTrackingNumberVerification &&
      trackingNumberConfiguration &&
      trackingNumber == null)
  ) {
    navigation.navigate(lineDetailsScreen, {
      [itemLine.name]: line,
      [item.name]: item.data,
      [`${itemLine.name}Id`]: line.id,
      productId: product.id,
    });
  } else if (trackingNumberConfiguration && trackingNumber != null) {
    navigation.navigate(selectTrackingScreen, {
      [itemLine.name]: line,
      [item.name]: item.data,
      product,
    });
  } else {
    navigation.navigate(selectProductScreen, {
      [itemLine.name]: itemLine.data,
      [item.name]: item.data,
      product,
    });
  }
};
