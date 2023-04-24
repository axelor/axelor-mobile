/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {StockMove} from '../types';

export const showLine = ({
  item,
  itemLine,
  lineDetailsScreen,
  selectTrackingScreen,
  selectProductScreen,
  detailStatus = StockMove.status.Realized,
  skipTrackingNumberVerification = false,
  navigation,
}: {
  item: {name: string; data: any};
  itemLine: {name: string; data: any};
  lineDetailsScreen: string;
  selectTrackingScreen: string;
  selectProductScreen: string;
  detailStatus?: any;
  skipTrackingNumberVerification?: boolean;
  navigation: any;
}) => {
  const updatedItemLine = {
    ...itemLine.data,
    product: {
      ...itemLine.data.product,
      name: itemLine.data['product.name'],
      trackingNumberConfiguration:
        itemLine.data['product.trackingNumberConfiguration'],
    },
  };

  const {product, trackingNumber} = updatedItemLine;

  const {trackingNumberConfiguration} = product;

  if (
    item?.data?.statusSelect === detailStatus ||
    (!skipTrackingNumberVerification &&
      trackingNumberConfiguration &&
      trackingNumber == null)
  ) {
    navigation.navigate(lineDetailsScreen, {
      [itemLine.name]: updatedItemLine,
      [item.name]: item.data,
      [`${itemLine.name}Id`]: updatedItemLine.id,
      productId: product.id,
    });
  } else if (trackingNumberConfiguration && trackingNumber != null) {
    navigation.navigate(selectTrackingScreen, {
      [itemLine.name]: updatedItemLine,
      [item.name]: item.data,
      product: product,
    });
  } else {
    navigation.navigate(selectProductScreen, {
      [itemLine.name]: itemLine.data,
      [item.name]: item.data,
    });
  }
};
