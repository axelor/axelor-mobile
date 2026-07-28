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

import React, {useCallback, useEffect} from 'react';
import {
  HeaderContainer,
  Screen,
  KeyboardAvoidingScrollView,
  NotesCard,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchInternalMove} from '../../features/internalMoveSlice';
import {StockMove} from '../../types';
import {
  InternalMoveSearchLineContainer,
  InternalMoveRealizeButton,
  StockMoveHeader,
} from '../../components';

const InternalMoveDetailsGeneralScreen = ({route}: any) => {
  const {internalMoveId} = route?.params ?? {};
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingInternalMove, internalMove} = useSelector(
    state => state.internalMove,
  );

  const getInternalMove = useCallback(() => {
    dispatch((fetchInternalMove as any)({internalMoveId}));
  }, [internalMoveId, dispatch]);

  useEffect(() => {
    getInternalMove();
  }, [getInternalMove]);

  if (internalMove?.id !== internalMoveId) return null;

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={<InternalMoveRealizeButton internalMove={internalMove} />}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={internalMove.stockMoveSeq}
            status={internalMove.statusSelect}
            date={StockMove.getStockMoveDate(
              internalMove.statusSelect,
              internalMove,
            )}
            availability={internalMove.availableStatusSelect}
            showMovementIndicator
            movementIndicatorData={{
              titleTop: internalMove.fromStockLocation?.name,
              labelTop: 'Stock_Origin',
              iconTop: 'house-down',
              titleDown: internalMove.toStockLocation?.name,
              labelDown: 'Stock_Destination',
              iconDown: 'house-up',
            }}
          />
        }
      />
      <KeyboardAvoidingScrollView
        refresh={{loading: loadingInternalMove, fetcher: getInternalMove}}>
        <NotesCard
          title={I18n.t('Stock_PickingOrderComments')}
          data={internalMove.pickingOrderComments}
        />
        <NotesCard
          title={I18n.t('Stock_NotesOnStockMove')}
          data={internalMove.note}
        />
        <InternalMoveSearchLineContainer />
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

export default InternalMoveDetailsGeneralScreen;
