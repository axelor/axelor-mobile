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

import React from 'react';
import {Button} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useNavigation,
  usePermitted,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {realizeSupplierArrival} from '../../../../features/supplierArrivalSlice';

const SupplierArrivalButtons = ({supplierArrival}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {StockMove} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMove',
  });

  const handleRealize = () => {
    dispatch(
      realizeSupplierArrival({
        version: supplierArrival.version,
        stockMoveId: supplierArrival.id,
      }),
    );
    navigation.popToTop();
  };

  if (
    !readonly &&
    supplierArrival.statusSelect !== StockMove?.statusSelect.Realized
  ) {
    return <Button onPress={handleRealize} title={I18n.t('Base_Realize')} />;
  }

  return null;
};

export default SupplierArrivalButtons;
