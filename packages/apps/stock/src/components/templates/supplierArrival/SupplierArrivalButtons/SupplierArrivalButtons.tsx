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

import React, {useState} from 'react';
import {Button} from '@axelor/aos-mobile-ui';
import {
  checkNullString,
  useDispatch,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  realizeSupplierArrival,
  updateAndRealizeSupplierArrival,
} from '../../../../features/supplierArrivalSlice';
import {SupplierArrivalShipmentDetailsPopup} from '../../supplierArrival';

const SupplierArrivalButtons = ({supplierArrival}: {supplierArrival: any}) => {
  const I18n = useTranslator();
  const dispatch: any = useDispatch();
  const navigation = useNavigation();
  const {StockMove} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMove',
  });

  const {stock: stockConfig} = useSelector(state => state.appConfig);

  const [isShipmentPopupVisible, setShipmentPopupVisible] = useState(false);

  const handleRealize = () => {
    if (stockConfig?.isRequiredShipmentSupplierDetails) {
      const hasMissingFields =
        checkNullString(supplierArrival.supplierShipmentRef) ||
        !supplierArrival.supplierShipmentDate;

      if (hasMissingFields) {
        setShipmentPopupVisible(true);
        return;
      }
    }

    dispatch(
      (realizeSupplierArrival as any)({
        version: supplierArrival.version,
        stockMoveId: supplierArrival.id,
      }),
    );
    navigation.popToTop();
  };

  const handleShipmentConfirm = (
    ref: string | undefined,
    date: string | undefined,
  ) => {
    setShipmentPopupVisible(false);
    dispatch(
      (updateAndRealizeSupplierArrival as any)({
        id: supplierArrival.id,
        version: supplierArrival.version,
        supplierShipmentRef: ref ?? null,
        supplierShipmentDate: date ?? null,
      }),
    ).then(() => {
      navigation.popToTop();
    });
  };

  if (
    !readonly &&
    supplierArrival.statusSelect !== StockMove?.statusSelect.Realized
  ) {
    return (
      <>
        <Button onPress={handleRealize} title={I18n.t('Base_Realize')} />
        <SupplierArrivalShipmentDetailsPopup
          visible={isShipmentPopupVisible}
          defaultRef={supplierArrival.supplierShipmentRef}
          defaultDate={supplierArrival.supplierShipmentDate}
          errorMessage={I18n.t('Stock_RequiredShipmentDetails')}
          required
          onConfirm={handleShipmentConfirm}
          onCancel={() => setShipmentPopupVisible(false)}
        />
      </>
    );
  }

  return null;
};

export default SupplierArrivalButtons;
