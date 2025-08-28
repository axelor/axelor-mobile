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
import {
  useDispatch,
  useNavigation,
  useStackChecker,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import {updateInternalMoveLine} from '../../../../features/internalMoveLineSlice';

const InternalMoveLineButtons = ({
  internalMove,
  internalMoveLine,
  unit,
  movedQty,
  fromStockLocation,
  toStockLocation,
  visible = true,
  description,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isScreenMounted = useStackChecker();

  const handleSave = () => {
    dispatch(
      updateInternalMoveLine({
        stockMoveLineId: internalMoveLine.id,
        version: internalMoveLine.version,
        description: description,
        realQty: movedQty,
        unitId: unit.id,
        fromStockLocationId:
          fromStockLocation?.id ?? internalMove.fromStockLocation?.id,
        toStockLocationId:
          toStockLocation?.id ?? internalMove.toStockLocation?.id,
      }),
    );

    if (isScreenMounted('InternalMoveLineListScreen')) {
      navigation.popTo('InternalMoveLineListScreen', {internalMove});
    } else {
      navigation.popTo('InternalMoveDetailsGeneralScreen', {
        internalMoveId: internalMove.id,
      });
    }
  };

  if (!visible) {
    return null;
  }

  return <Button title={I18n.t('Base_Save')} onPress={handleSave} />;
};

export default InternalMoveLineButtons;
