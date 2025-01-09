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
import {StyleSheet, View} from 'react-native';
import {HeaderContainer, Text} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Indicator} from '../../../organisms/SearchLineContainer/IndicatorBadge';
import InternalMoveMovementIndicationCard from '../InternalMoveMovementIndicationCard/InternalMoveMovementIndicationCard';
import InternalMoveLineNotes from '../InternalMoveLineNotes/InternalMoveLineNotes';
import {StockMove} from '../../../../types';

const InternalMoveCreationHeader = ({
  fromStockLocation,
  toStockLocation,
  linesSaved,
  notes,
  setNotes,
}) => {
  const I18n = useTranslator();

  return (
    <HeaderContainer
      forceHideByDefault={true}
      fixedItems={
        <View style={styles.header}>
          <Indicator
            indicator={linesSaved?.length ?? 0}
            style={styles.indicator}
          />
          <Text>{I18n.t('Stock_LinesAdded')}</Text>
        </View>
      }>
      <View>
        <InternalMoveMovementIndicationCard
          from={fromStockLocation?.name}
          to={toStockLocation?.name}
        />
        <InternalMoveLineNotes
          notes={notes}
          setNotes={setNotes}
          status={StockMove.status.Draft}
        />
      </View>
    </HeaderContainer>
  );
};

const styles = StyleSheet.create({
  indicator: {
    marginRight: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 2,
    width: '100%',
  },
});

export default InternalMoveCreationHeader;
