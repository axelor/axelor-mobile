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
import {getFromList, Picker} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import StockMove from '../../../../types/stock-move';
import {fetchUnit} from '../../../../features/unitSlice';

const InternalMoveLinePicker = ({
  unit,
  status,
  setUnit,
  setSaveStatus = () => {},
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {unitList} = useSelector(state => state.unit);

  const handleUnitChange = unitId => {
    if (unitId === null) {
      setUnit({name: '', id: null});
    } else {
      setUnit(getFromList(unitList, 'id', unitId));
    }
    setSaveStatus(false);
  };

  useEffect(() => {
    dispatch(fetchUnit());
  }, [dispatch]);

  return (
    <Picker
      title={I18n.t('Stock_Unit')}
      onValueChange={handleUnitChange}
      defaultValue={unit?.id}
      listItems={unitList}
      labelField="name"
      valueField="id"
      disabled={
        status === StockMove.status.Realized ||
        status === StockMove.status.Canceled
      }
      disabledValue={unit?.name}
      required={true}
    />
  );
};

export default InternalMoveLinePicker;
