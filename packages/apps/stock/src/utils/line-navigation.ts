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

  console.log('trackingNumberConfiguration', trackingNumberConfiguration);

  if (true) {
    navigation.navigate(selectTrackingScreen, {
      [itemLine.name]: line,
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
