/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useMemo} from 'react';
import {FormView, useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {getEquipmentById, updateEquipment} from '../../features/equipmentSlice';

const EquipmentFormView = ({navigation, route}) => {
  const idEquipment = route.params.idEquipment;

  const Colors = useThemeColor();
  const _dispatch = useDispatch();

  const {equipment} = useSelector((state: any) => state.intervention_equipment);

  useEffect(() => {
    _dispatch((getEquipmentById as any)({equipmentId: idEquipment}));
  }, [_dispatch, idEquipment]);

  const updateEquipmentAPI = useCallback(
    (_equipment, dispatch) => {
      dispatch(
        updateEquipment({
          equipment: _equipment,
        }),
      );

      navigation.pop();
    },
    [navigation],
  );

  const _defaultValue = useMemo(() => {
    return {...equipment};
  }, [equipment]);

  return (
    <FormView
      formKey="intervention_equipment"
      defaultValue={_defaultValue}
      actions={[
        {
          key: 'update-equipment',
          type: 'update',
          needRequiredFields: true,
          needValidation: true,
          customAction: ({dispatch, objectState}) => {
            updateEquipmentAPI(objectState, dispatch);
          },
        },
        {
          color: Colors.cautionColor,
          key: 'reset-equipment',
          type: 'reset',
        },
      ]}
    />
  );
};

export default EquipmentFormView;
