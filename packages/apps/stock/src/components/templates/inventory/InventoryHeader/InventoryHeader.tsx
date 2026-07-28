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
  LabelText,
  MovementIndicationCard,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  formatDate,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';

interface InventoryHeaderProps {
  reference: string;
  status: number;
  date?: string;
  stockLocation?: string;
  showMovementIndicator?: boolean;
  movementIndicatorData?: {
    iconTop: string;
    labelTop?: string;
    titleTop: string;
    iconDown: string;
    labelDown?: string;
    titleDown: string;
  };
  children?: any;
}

const InventoryHeader = ({
  reference,
  status,
  date,
  stockLocation,
  showMovementIndicator = false,
  movementIndicatorData,
  children,
}: InventoryHeaderProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {Inventory} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.columnWrapper}>
          {reference != null && (
            <Text writingType="important">{reference}</Text>
          )}
          {date != null && (
            <Text>{formatDate(date, I18n.t('Base_DateFormat'))}</Text>
          )}
          {stockLocation && (
            <LabelText iconName="house" title={stockLocation} />
          )}
        </View>
        <View style={styles.badgesContainer}>
          <Badge
            color={getItemColor(Inventory?.statusSelect, status)}
            title={getItemTitle(Inventory?.statusSelect, status)}
          />
        </View>
      </View>
      {children}
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

export default InventoryHeader;
