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
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {updateStatusOfManufOrder} from '../../../features/manufacturingOrderSlice';

const ManufacturingOrderButtons = ({}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.production.db.ManufOrder',
  });
  const {ManufOrder} = useTypes();

  const {manufOrder} = useSelector(state => state.manufacturingOrder);

  const handleUpdateStatus = useCallback(
    targetStatus => {
      dispatch(
        updateStatusOfManufOrder({
          manufOrderId: manufOrder.id,
          manufOrderVersion: manufOrder.version,
          targetStatus,
        }),
      );
    },
    [dispatch, manufOrder],
  );

  if (readonly) {
    return null;
  }

  if (manufOrder.statusSelect === ManufOrder?.statusSelect.Planned) {
    return (
      <Button
        title={I18n.t('Base_Start')}
        onPress={() => handleUpdateStatus(ManufOrder?.statusSelect.InProgress)}
        iconName="play-fill"
      />
    );
  }

  if (manufOrder.statusSelect === ManufOrder?.statusSelect.InProgress) {
    return (
      <>
        <Button
          title={I18n.t('Base_Pause')}
          onPress={() => handleUpdateStatus(ManufOrder?.statusSelect.StandBy)}
          iconName="pause-fill"
          color={Colors.secondaryColor}
        />
        <Button
          title={I18n.t('Base_Finish')}
          onPress={() => handleUpdateStatus(ManufOrder?.statusSelect.Finished)}
          iconName="power"
        />
      </>
    );
  }

  if (manufOrder.statusSelect === ManufOrder?.statusSelect.StandBy) {
    return (
      <Button
        title={I18n.t('Base_Continue')}
        onPress={() => handleUpdateStatus(ManufOrder?.statusSelect.InProgress)}
        iconName="skip-end-fill"
      />
    );
  }

  return null;
};

export default ManufacturingOrderButtons;
