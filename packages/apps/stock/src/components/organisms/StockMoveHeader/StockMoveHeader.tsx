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
import {StyleSheet, View} from 'react-native';
import {
  Badge,
  HorizontalRule,
  MovementIndicationCard,
  Text,
  useDigitFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  formatDate,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {useStockLinesCheckQty} from '../../../hooks';
import {StockMovePickingWidget} from '../../organisms';

interface StockMoveHeaderProps {
  reference: string;
  lineRef?: string;
  status: number;
  date: string;
  availability?: number;
  stockMoveLineId?: number;
  showMassScanner?: boolean;
  massScanData?: {
    scanKey: string;
    stockMoveId: number;
    totalLines: number;
    onRefresh?: () => void;
    handleShowLine?: (line: any) => void;
  };
  showMovementIndicator?: boolean;
  movementIndicatorData?: {
    iconTop: string;
    labelTop?: string;
    titleTop: string;
    iconDown: string;
    labelDown?: string;
    titleDown: string;
  };
}

const StockMoveHeader = ({
  reference,
  lineRef,
  status,
  date,
  availability,
  stockMoveLineId,
  showMassScanner = false,
  massScanData,
  showMovementIndicator = false,
  movementIndicatorData,
}: StockMoveHeaderProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {StockMove} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();
  const formatNumber = useDigitFormat();

  const checkQtyObject: any = useStockLinesCheckQty(stockMoveLineId);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.columnWrapper}>
          {lineRef != null && <Text writingType="important">{lineRef}</Text>}
          {reference != null && (
            <Text writingType={lineRef != null ? 'details' : 'important'}>
              {reference}
            </Text>
          )}
          {date != null && (
            <Text>{formatDate(date, I18n.t('Base_DateFormat'))}</Text>
          )}
        </View>
        <View style={styles.badgesContainer}>
          <Badge
            color={getItemColor(StockMove?.statusSelect, status)}
            title={getItemTitle(StockMove?.statusSelect, status)}
          />
          {Number(checkQtyObject?.missingQty ?? 0) !== 0 && (
            <Badge
              color={Colors.errorColor}
              title={formatNumber(checkQtyObject?.missingQty)}
            />
          )}
          {availability != null && availability > 0 && (
            <Badge
              color={getItemColor(
                StockMove?.availableStatusSelect,
                availability,
              )}
              title={
                checkQtyObject?.availability ??
                getItemTitle(StockMove?.availableStatusSelect, availability)
              }
            />
          )}
        </View>
      </View>
      {showMovementIndicator && movementIndicatorData != null && (
        <>
          <HorizontalRule
            style={styles.line}
            color={Colors.secondaryColor.background_light}
          />
          <MovementIndicationCard
            {...movementIndicatorData}
            labelTop={I18n.t(movementIndicatorData.labelTop)}
            labelDown={I18n.t(movementIndicatorData.labelDown)}
            displayCard={false}
          />
        </>
      )}
      {showMassScanner && massScanData != null && (
        <StockMovePickingWidget {...massScanData} stockMoveStatus={status} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginBottom: 5,
  },
  columnWrapper: {
    flex: 1,
  },
  badgesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  line: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 4,
  },
});

export default StockMoveHeader;
