/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import {updateInternalMove} from '../../../../features/internalMoveSlice';

const InternalMoveLineButtons = ({
  saveStatus,
  internalMove,
  unit,
  movedQty,
  notes,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSave = () => {
    dispatch(
      updateInternalMove({
        internalMoveId: internalMove.id,
        version: internalMove.version,
        movedQty: movedQty,
        unitId: unit.id,
        notes: notes,
      }),
    );

    navigation.navigate('InternalMoveLineListScreen', {
      internalMove: internalMove,
    });
  };

  if (saveStatus) {
    return null;
  }

  return <Button title={I18n.t('Base_Save')} onPress={handleSave} />;
};

export default InternalMoveLineButtons;
