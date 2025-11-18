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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  DoubleSearchLineContainer,
  StockMovePickingWidget,
} from '../../../organisms';
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
  const {loadingIMLinesList, moreLoading, isListEnd} = useSelector(
    state => state.internalMoveLine,
  );
  const {internalMoveLineList, totalNumberLines} =
    useInternalLinesWithRacks(internalMove);

  const handleViewAll = useCallback(() => {
    navigation.navigate('InternalMoveLineListScreen', {internalMove});
  }, [navigation, internalMove]);

  const handleShowLine = useCallback(
    (item: any, skipVerification = undefined) => {
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
    (item: any) => handleShowLine(item, true),
    [handleShowLine],
  );

  const handleRefresh = useCallback(() => {
    dispatch(
      (fetchInternalMoveLines as any)({
        internalMoveId: internalMove.id,
        page: 0,
      }),
    );
  }, [dispatch, internalMove.id]);

  const filterLine = useCallback(
    (item: any) => {
      return (
        StockMoveLine.hideLineQty(item, internalMove) ||
        parseFloat(item.realQty) == null ||
        parseFloat(item.realQty) < parseFloat(item.qty)
      );
    },
    [internalMove],
  );

  const sliceFunctionData = useMemo(
    () => ({internalMoveId: internalMove.id}),
    [internalMove.id],
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
      <DoubleSearchLineContainer
        title={I18n.t('Stock_InternalMoveLines')}
        numberOfItems={totalNumberLines}
        objectList={internalMoveLineList}
        loadingList={loadingIMLinesList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchInternalMoveLines}
        sliceFunctionData={sliceFunctionData}
        handleSelect={handleLineSearch}
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
