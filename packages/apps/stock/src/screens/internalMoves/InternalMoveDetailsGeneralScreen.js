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

import React, {useEffect} from 'react';
import {
  HeaderContainer,
  Screen,
  ScrollView,
  NotesCard,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  InternalMoveMovementIndicationCard,
  InternalMoveSearchLineContainer,
  InternalMoveRealizeButton,
  StockMoveHeader,
} from '../../components';
import {fetchInternalMove} from '../../features/internalMoveSlice';
import StockMove from '../../types/stock-move';

const InternalMoveDetailsGeneralScreen = ({route}) => {
  const internalMoveId = route.params.internalMoveId;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {internalMove} = useSelector(state => state.internalMove);

  useEffect(() => {
    dispatch(fetchInternalMove({internalMoveId: internalMoveId}));
  }, [internalMoveId, dispatch]);

  if (internalMove?.id !== internalMoveId) {
    return null;
  }

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
            date={
              internalMove
                ? StockMove.getStockMoveDate(
                    internalMove.statusSelect,
                    internalMove,
                  )
                : null
            }
            availability={internalMove.availableStatusSelect}
          />
        }
      />
      <ScrollView>
        <InternalMoveMovementIndicationCard internalMove={internalMove} />
        <InternalMoveSearchLineContainer />
        <NotesCard
          title={I18n.t('Stock_NotesOnPreparation')}
          data={internalMove.pickingOrderComments}
        />
        <NotesCard
          title={I18n.t('Stock_NotesOnStockMove')}
          data={internalMove.note}
        />
      </ScrollView>
    </Screen>
  );
};

export default InternalMoveDetailsGeneralScreen;
