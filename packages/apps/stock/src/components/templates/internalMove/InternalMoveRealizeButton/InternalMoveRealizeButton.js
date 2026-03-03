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
import {
  useTranslator,
  useDispatch,
  useNavigation,
  usePermitted,
  useTypes,
} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import {realizeInternalMove} from '../../../../features/internalMoveSlice';

const InternalMoveRealizeButton = ({internalMove}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {StockMove} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMove',
  });

  const handleRealizeStockMove = useCallback(() => {
    dispatch(
      realizeInternalMove({
        stockMoveId: internalMove.id,
        version: internalMove.version,
      }),
    );

    navigation.popToTop();
  }, [dispatch, internalMove, navigation]);

  if (
    !readonly &&
    internalMove.statusSelect === StockMove?.statusSelect.Planned
  ) {
    return (
      <Button title={I18n.t('Base_Realize')} onPress={handleRealizeStockMove} />
    );
  }

  return null;
};

export default InternalMoveRealizeButton;
