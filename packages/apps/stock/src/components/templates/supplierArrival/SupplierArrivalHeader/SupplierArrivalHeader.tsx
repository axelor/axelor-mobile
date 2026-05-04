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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, LabelText, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  formatDate,
  useDispatch,
  usePermitted,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {StockMove} from '../../../../types';
import {StockMoveHeader} from '../../../organisms';
import {updateSupplierArrivalShipmentDetails} from '../../../../features/supplierArrivalSlice';
import {SupplierArrivalShipmentDetailsPopup} from '../../supplierArrival';

const SupplierArrivalHeader = ({supplierArrival}: {supplierArrival: any}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {StockMove: StockMoveTypes} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMove',
  });

  const [isEditPopupVisible, setEditPopupVisible] = useState(false);

  const showEditButton = useMemo(
    () =>
      supplierArrival.statusSelect !== StockMoveTypes?.statusSelect.Realized &&
      !readonly,
    [
      StockMoveTypes?.statusSelect.Realized,
      readonly,
      supplierArrival.statusSelect,
    ],
  );

  const handleEditConfirm = useCallback(
    (ref: string | undefined, date: string | undefined) => {
      setEditPopupVisible(false);
      dispatch(
        updateSupplierArrivalShipmentDetails({
          id: supplierArrival.id,
          version: supplierArrival.version,
          supplierShipmentRef: ref ?? null,
          supplierShipmentDate: date ?? null,
        }),
      );
    },
    [dispatch, supplierArrival.id, supplierArrival.version],
  );

  return (
    <View>
      <StockMoveHeader
        reference={supplierArrival.stockMoveSeq}
        status={supplierArrival.statusSelect}
        date={
          supplierArrival
            ? StockMove.getStockMoveDate(
                supplierArrival.statusSelect,
                supplierArrival,
              )
            : null
        }
      />
      <View style={styles.clientContainer}>
        <LabelText
          iconName="person-fill"
          title={supplierArrival.partner?.fullName}
        />
        {supplierArrival.origin == null ? null : (
          <LabelText iconName="tag-fill" title={supplierArrival.origin} />
        )}
        <LabelText
          title={I18n.t('Stock_SupplierShipmentRef')}
          value={supplierArrival.supplierShipmentRef ?? '-'}
        />
        <LabelText
          title={I18n.t('Stock_SupplierShipmentDate')}
          value={
            supplierArrival.supplierShipmentDate
              ? formatDate(
                  supplierArrival.supplierShipmentDate,
                  I18n.t('Base_DateFormat'),
                )
              : '-'
          }
        />
        {showEditButton && (
          <Button
            title={I18n.t('Stock_FillShipmentDetails')}
            width="100%"
            iconName="pencil-fill"
            iconSize={16}
            color={Colors.infoColor}
            onPress={() => setEditPopupVisible(true)}
          />
        )}
      </View>
      <SupplierArrivalShipmentDetailsPopup
        visible={isEditPopupVisible}
        defaultRef={supplierArrival.supplierShipmentRef}
        defaultDate={supplierArrival.supplierShipmentDate}
        onConfirm={handleEditConfirm}
        onCancel={() => setEditPopupVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  clientContainer: {
    marginHorizontal: 24,
    marginVertical: 6,
    flexDirection: 'column',
  },
});

export default SupplierArrivalHeader;
