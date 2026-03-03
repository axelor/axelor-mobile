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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  SearchListView,
  useDispatch,
  useNavigation,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {ChipSelect} from '@axelor/aos-mobile-ui';
import {EquipmentActionCard, InterventionHeader} from '../../molecules';
import {EquipmentModeSwitch} from '../../organisms';
import {LinkEquipmentPopup} from '../../templates';
import {
  fetchNumberClientEquipment,
  searchEquipment,
  searchInterventionEquipment,
} from '../../../features/equipmentSlice';
import {unlinkEquipment} from '../../../features/interventionSlice';
import {Equipment as EquipmentType} from '../../../types';

const EquipmentView = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {readonly: interventionReadonly} = usePermitted({
    modelName: 'com.axelor.apps.intervention.db.Intervention',
  });
  const {canCreate, canDelete, readonly} = usePermitted({
    modelName: 'com.axelor.apps.intervention.db.Equipment',
  });
  const {Equipment} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

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
  const [mode, setMode] = useState(EquipmentType.mode.intervention);
  const [alertVisible, setAlertVisible] = useState(false);

  const isInterventionMode = useMemo(
    () => mode === EquipmentType.mode.intervention,
    [mode],
  );

  const serviceStatusList = useMemo(
    () => getSelectionItems(Equipment?.serviceSelect, selectedStatus),
    [Equipment?.serviceSelect, getSelectionItems, selectedStatus],
  );

  const actionList = useMemo(() => {
    const _actionList = [];

    if (interventionReadonly && isInterventionMode) {
      return _actionList;
    }

    if (canCreate) {
      _actionList.push({
        iconName: 'plus',
        title: I18n.t('Intervention_CreateEquipment'),
        onPress: () =>
          navigation.navigate('EquipmentFormView', {
            isCreation: true,
            interventionId: isInterventionMode && intervention.id,
            interventionVersion: isInterventionMode && intervention.version,
          }),
      });
    }

    if (isInterventionMode) {
      _actionList.push({
        iconName: 'link-45deg',
        title: I18n.t('Intervention_LinkEquipment'),
        onPress: () => setAlertVisible(true),
      });
    }

    return _actionList;
  }, [
    I18n,
    canCreate,
    intervention.id,
    intervention.version,
    isInterventionMode,
    navigation,
    interventionReadonly,
  ]);

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

  const handleUnlinkEquipment = useCallback(
    equipmentId => {
      dispatch(
        (unlinkEquipment as any)({
          interventionId: intervention.id,
          interventionVersion: intervention.version,
          equipmentId,
        }),
      );
    },
    [dispatch, intervention.id, intervention.version],
  );

  return (
    <>
      <SearchListView
        {...ObjectToDisplay}
        searchPlaceholder={I18n.t('Base_Search')}
        headerTopChildren={<InterventionHeader intervention={intervention} />}
        headerChildren={<EquipmentModeSwitch setMode={setMode} />}
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={setSelectedStatus}
            selectionItems={serviceStatusList}
          />
        }
        renderListItem={({item}) => (
          <EquipmentActionCard
            idEquipment={item.id}
            equipmentVersion={item.version}
            sequence={item.sequence}
            name={item.name}
            code={item.code}
            equipmentFamily={item.equipmentFamily?.name}
            inService={item.inService}
            isUnlinkAction={isInterventionMode && !interventionReadonly}
            handleUnlink={() => handleUnlinkEquipment(item.id)}
            handleArchive={() => {
              if (isInterventionMode) {
                handleUnlinkEquipment(item.id);
              } else {
                setSelectedStatus(_current => [..._current]);
                dispatch(
                  (fetchNumberClientEquipment as any)({
                    partnerId: intervention.deliveredPartner?.id,
                  }),
                );
              }
            }}
            handleDuplicate={
              isInterventionMode
                ? equipmentId =>
                    navigation.navigate('EquipmentFormView', {
                      idEquipment: equipmentId,
                      isCreation: true,
                      interventionId: intervention.id,
                      interventionVersion: intervention.version,
                    })
                : null
            }
            canArchive={canDelete}
            canCopy={canCreate}
            canEdit={!readonly}
          />
        )}
        actionList={actionList}
      />
      <LinkEquipmentPopup
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
    </>
  );
};

export default EquipmentView;
