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

import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '@axelor/aos-mobile-ui';
import {useNavigation, useTranslator} from '@axelor/aos-mobile-core';
import {QuantityCard} from '../../../organisms';
import StockMove from '../../../../types/stock-move';

const InternalMoveLineQuantityCard = ({
  status,
  movedQty,
  plannedQty,
  stockProduct,
  setMovedQty,
  setSaveStatus = () => {},
  originalStockLocation,
  trackingNumber,
}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const handleQtyChange = value => {
    setMovedQty(value);
    setSaveStatus(false);
  };

  const handleCreateCorrection = () => {
    navigation.navigate('StockCorrectionCreationScreen', {
      stockLocation: originalStockLocation,
      product: stockProduct,
      trackingNumber: trackingNumber,
    });
  };

  return (
    <QuantityCard
      labelQty={I18n.t('Stock_MovedQty')}
      defaultValue={movedQty}
      onValueChange={handleQtyChange}
      editable={
        status === StockMove.status.Draft || status === StockMove.status.Planned
      }
      actionQty={
        status === StockMove.status.Draft || status === StockMove.status.Planned
      }
      onPressActionQty={handleCreateCorrection}
      isBigButton={true}>
      <Text style={styles.text}>
        {`${I18n.t('Stock_AvailableQty')}: ${parseFloat(plannedQty).toFixed(
          2,
        )} ${stockProduct.unit?.name}`}
      </Text>
    </QuantityCard>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

export default InternalMoveLineQuantityCard;
