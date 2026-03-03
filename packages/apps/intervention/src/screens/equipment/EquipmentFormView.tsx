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

import React, {useCallback, useEffect, useMemo} from 'react';
import {
  FormView,
  useDispatch,
  useSelector,
  useTypes,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {
  clearEquipment,
  deleteEquipment,
  getEquipmentById,
  saveEquipment,
} from '../../features/equipmentSlice';

const EquipmentFormView = ({navigation, route}) => {
  const idEquipment = route.params.idEquipment;
  const isCreation = route.params.isCreation;

  const Colors = useThemeColor();
  const _dispatch: any = useDispatch();
  const {Equipment} = useTypes();

  const {equipment} = useSelector((state: any) => state.intervention_equipment);
  const {intervention} = useSelector(
    (state: any) => state.intervention_intervention,
  );

  useEffect(() => {
    if (idEquipment != null) {
      _dispatch((getEquipmentById as any)({equipmentId: idEquipment}));
    } else {
      _dispatch(clearEquipment());
    }
  }, [_dispatch, idEquipment]);

  const saveEquipmentAPI = useCallback(
    (_equipment, dispatch) => {
      dispatch(
        (saveEquipment as any)({
          equipment: _equipment,
          partnerId: _equipment?.partner?.id,
          isCreation: isCreation,
          interventionId: route.params.interventionId,
          interventionVersion: route.params.interventionVersion,
        }),
      ).then(() => navigation.pop());
    },
    [
      isCreation,
      navigation,
      route.params.interventionId,
      route.params.interventionVersion,
    ],
  );

  const deleteEquipmentAPI = useCallback(
    (_equipment, dispatch) => {
      dispatch(
        (deleteEquipment as any)({
          equipmentId: _equipment?.id,
        }),
      ).then(() => navigation.pop());
    },
    [navigation],
  );

  const _defaultValue = useMemo(
    () => (idEquipment != null ? equipment : null),
    [equipment, idEquipment],
  );

  const _creationDefaultValue = useMemo(
    () => ({
      partner: intervention.deliveredPartner,
      inService: true,
      typeSelect: Equipment?.typeSelect.Equipment,
      commissioningDate: new Date().toISOString().split('T')[0],
    }),
    [Equipment?.typeSelect, intervention.deliveredPartner],
  );

  return (
    <FormView
      formKey="intervention_equipment"
      defaultValue={_defaultValue}
      creationDefaultValue={_creationDefaultValue}
      defaultEditMode
      actions={[
        {
          key: 'create-equipment',
          type: 'create',
          needRequiredFields: true,
          needValidation: true,
          customAction: ({dispatch, objectState}) => {
            saveEquipmentAPI(objectState, dispatch);
          },
          hideIf: () => !isCreation,
        },
        {
          key: 'update-equipment',
          type: 'update',
          needRequiredFields: true,
          needValidation: true,
          customAction: ({dispatch, objectState}) => {
            saveEquipmentAPI(objectState, dispatch);
          },
          hideIf: () => isCreation,
        },
        {
          color: Colors.cautionColor,
          key: 'reset-equipment',
          type: 'reset',
          hideIf: () => isCreation,
        },
        {
          color: Colors.cautionColor,
          key: 'delete-equipment',
          type: 'custom',
          titleKey: 'Base_Cancel',
          customAction: ({dispatch, objectState}) => {
            deleteEquipmentAPI(objectState, dispatch);
          },
          hideIf: () => !(isCreation && idEquipment != null),
        },
      ]}
    />
  );
};

export default EquipmentFormView;
