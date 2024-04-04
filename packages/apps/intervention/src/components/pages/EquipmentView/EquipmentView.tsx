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

import React, {useEffect, useMemo, useState} from 'react';
import {
  useDispatch,
  useSelector,
  useTranslator,
  SearchListView,
} from '@axelor/aos-mobile-core';
import {ChipSelect, useThemeColor} from '@axelor/aos-mobile-ui';
import {EquipmentActionCard, InterventionHeader} from '../../molecules';
import {EquipmentModeSwitch} from '../../organisms';
import {
  searchEquipment,
  searchInterventionEquipment,
} from '../../../features/equipmentSlice';
import {Equipment} from '../../../types';

const EquipmentView = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {intervention} = useSelector(
    (state: any) => state.intervention_intervention,
  );
  const {
    loadingList,
    moreLoading,
    isListEnd,
    equipmentList,
    loadingInterventionEquipmentList,
    moreLoadingInterventionEquipment,
    isInterventionEquipmentListEnd,
    interventionEquipmentList,
  } = useSelector((state: any) => state.intervention_equipment);

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [mode, setMode] = useState(Equipment.mode.intervention);

  const isInterventionMode = useMemo(
    () => mode === Equipment.mode.intervention,
    [mode],
  );

  const actionList = useMemo(() => {
    const _actionList = [
      {
        iconName: 'plus',
        title: I18n.t('Intervention_CreateEquipment'),
        onPress: () => console.log('Create an equipment button pressed.'),
      },
    ];

    if (isInterventionMode) {
      _actionList.push({
        iconName: 'link-45deg',
        title: I18n.t('Intervention_LinkEquipment'),
        onPress: () => console.log('Link an equipment button pressed.'),
      });
    }

    return _actionList;
  }, [I18n, isInterventionMode]);

  const idsInterventionEquipement = useMemo(
    () => intervention.equipmentSet.map(equipment => equipment.id),
    [intervention],
  );

  const searchEquipmentData = useMemo(
    () => ({
      idsInterventionEquipement,
      partnerId: intervention.deliveredPartner?.id,
      inService: selectedStatus[0]?.key,
    }),
    [
      idsInterventionEquipement,
      intervention.deliveredPartner?.id,
      selectedStatus,
    ],
  );

  const ObjectToDisplay = useMemo(() => {
    if (isInterventionMode) {
      return {
        list: interventionEquipmentList,
        loading: loadingInterventionEquipmentList,
        moreLoading: moreLoadingInterventionEquipment,
        isListEnd: isInterventionEquipmentListEnd,
        sliceFunction: searchInterventionEquipment,
        sliceFunctionData: searchEquipmentData,
      };
    } else {
      return {
        list: equipmentList,
        loading: loadingList,
        moreLoading: moreLoading,
        isListEnd: isListEnd,
        sliceFunction: searchEquipment,
        sliceFunctionData: searchEquipmentData,
      };
    }
  }, [
    equipmentList,
    interventionEquipmentList,
    isInterventionEquipmentListEnd,
    isInterventionMode,
    isListEnd,
    loadingInterventionEquipmentList,
    loadingList,
    moreLoading,
    moreLoadingInterventionEquipment,
    searchEquipmentData,
  ]);

  useEffect(() => {
    dispatch((searchInterventionEquipment as any)(searchEquipmentData));
    dispatch((searchEquipment as any)(searchEquipmentData));
  }, [
    dispatch,
    idsInterventionEquipement,
    intervention.deliveredPartner.id,
    searchEquipmentData,
  ]);

  return (
    <SearchListView
      {...ObjectToDisplay}
      searchPlaceholder={I18n.t('Base_Search')}
      headerTopChildren={<InterventionHeader intervention={intervention} />}
      headerChildren={<EquipmentModeSwitch setMode={setMode} />}
      chipComponent={
        <ChipSelect
          mode="switch"
          onChangeValue={chiplist => setSelectedStatus(chiplist)}
          selectionItems={Equipment.getStatusList(Colors, I18n)}
        />
      }
      renderListItem={({item}) => (
        <EquipmentActionCard
          idEquipment={item.id}
          sequence={item.sequence}
          name={item.name}
          code={item.code}
          equipmentFamily={item.equipmentFamily?.name}
          inService={item.inService}
          isUnlinkAction={isInterventionMode}
        />
      )}
      actionList={actionList}
    />
  );
};

export default EquipmentView;
