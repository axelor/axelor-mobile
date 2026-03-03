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

import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {SearchLineContainer, StockMovePickingWidget} from '../../../organisms';
import {InternalMoveLineActionCard} from '../../../templates';
import {fetchInternalMoveLines} from '../../../../features/internalMoveLineSlice';
import {useInternalLinesWithRacks, useLineHandler} from '../../../../hooks';
import {LineVerification, StockMoveLine} from '../../../../types';

const scanKey = 'trackingNumber-or-product_internal-move-details';
const massScanKey = 'internal-move-line_mass-scan';

const InternalMoveSearchLineContainer = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {showLine} = useLineHandler();

  const {internalMove} = useSelector(state => state.internalMove);
  const {internalMoveLineList, totalNumberLines} =
    useInternalLinesWithRacks(internalMove);

  const handleViewAll = () => {
    navigation.navigate('InternalMoveLineListScreen', {
      internalMove: internalMove,
    });
  };

  const handleShowLine = useCallback(
    (item, skipVerification = undefined) => {
      showLine({
        move: internalMove,
        line: item,
        skipVerification,
        type: LineVerification.type.internal,
      });
    },
    [internalMove, showLine],
  );

  const handleLineSearch = useCallback(
    item => handleShowLine(item, true),
    [handleShowLine],
  );

  const fetchInternalLinesAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        fetchInternalMoveLines({
          internalMoveId: internalMove?.id,
          searchValue: searchValue,
          page: page,
        }),
      );
    },
    [dispatch, internalMove],
  );

  const handleRefresh = useCallback(
    () => fetchInternalLinesAPI({page: 0}),
    [fetchInternalLinesAPI],
  );

  const filterLine = useCallback(
    item => {
      return (
        StockMoveLine.hideLineQty(item, internalMove) ||
        parseFloat(item.realQty) == null ||
        parseFloat(item.realQty) < parseFloat(item.qty)
      );
    },
    [internalMove],
  );

  return (
    <>
      <StockMovePickingWidget
        scanKey={massScanKey}
        stockMoveId={internalMove.id}
        stockMoveStatus={internalMove.statusSelect}
        totalLines={totalNumberLines}
        onRefresh={handleRefresh}
        handleShowLine={handleLineSearch}
      />
      <SearchLineContainer
        title={I18n.t('Stock_InternalMoveLines')}
        numberOfItems={totalNumberLines}
        objectList={internalMoveLineList}
        handleSelect={handleLineSearch}
        handleSearch={fetchInternalLinesAPI}
        scanKey={scanKey}
        onViewPress={handleViewAll}
        filterLine={filterLine}
        renderItem={item => (
          <InternalMoveLineActionCard
            internalMoveLine={item}
            style={styles.item}
            onPress={() => handleShowLine(item)}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
  },
});

export default InternalMoveSearchLineContainer;
