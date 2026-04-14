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
import {StyleSheet} from 'react-native';
import {useNavigation, useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';
import {ObjectCard} from '@axelor/aos-mobile-ui';

interface PlanningStockMoveCardProps {
  style?: any;
  id: number;
  statusSelect: number;
  typeSelect?: number;
  stockMoveSeq: string;
  partner?: string;
  fromStockLocation?: string;
  toStockLocation?: string;
}

const PlanningStockMoveCard = ({
  style,
  id,
  statusSelect,
  typeSelect,
  stockMoveSeq,
  partner,
  fromStockLocation,
  toStockLocation,
}: PlanningStockMoveCardProps) => {
  const navigation = useNavigation();
  const {StockMove} = useTypes();
  const {getItemColor} = useTypeHelpers();

  const borderStyle = useMemo(
    () =>
      getStyles(getItemColor(StockMove?.statusSelect, statusSelect)?.background)
        ?.border,
    [StockMove?.statusSelect, getItemColor, statusSelect],
  );

  const isInternal = useMemo(
    () => typeSelect === StockMove?.typeSelect.internal,
    [StockMove?.typeSelect.internal, typeSelect],
  );

  const isOutgoing = useMemo(
    () => typeSelect === StockMove?.typeSelect.outgoing,
    [StockMove?.typeSelect.outgoing, typeSelect],
  );

  const isIncoming = useMemo(
    () => typeSelect === StockMove?.typeSelect.incoming,
    [StockMove?.typeSelect.incoming, typeSelect],
  );

  const handlePress = useCallback(() => {
    if (isInternal) {
      navigation.navigate('InternalMoveDetailsGeneralScreen', {
        internalMoveId: id,
      });
    } else if (isOutgoing) {
      navigation.navigate('CustomerDeliveryDetailScreen', {
        customerDeliveryId: id,
      });
    } else if (isIncoming) {
      navigation.navigate('SupplierArrivalDetailsScreen', {
        supplierArrivalId: id,
      });
    }
  }, [id, isIncoming, isInternal, isOutgoing, navigation]);

  return (
    <ObjectCard
      style={[styles.container, borderStyle, style]}
      touchable={true}
      onPress={handlePress}
      upperTexts={{
        items: [
          {displayText: stockMoveSeq, isTitle: true},
          {
            indicatorText: partner,
            iconName: 'person-fill',
            hideIfNull: true,
            hideIf: isInternal,
            numberOfLines: 2,
          },
        ],
      }}
      lowerTexts={{
        items: [
          {
            indicatorText: fromStockLocation,
            iconName: isInternal ? 'house-down' : 'geo-fill',
            hideIfNull: true,
            hideIf: isIncoming,
          },
          {
            indicatorText: toStockLocation,
            iconName: isInternal ? 'house-up' : 'geo-fill',
            hideIfNull: true,
            hideIf: isOutgoing,
          },
        ],
      }}
    />
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 1,
    marginVertical: 2,
  },
  noBold: {
    fontWeight: 'normal',
  },
});

export default PlanningStockMoveCard;
