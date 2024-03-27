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
import {StyleSheet} from 'react-native';
import {
  useDispatch,
  useSelector,
  useTranslator,
  SearchListView,
} from '@axelor/aos-mobile-core';
import {
  ChipSelect,
  NumberBubble,
  ToggleSwitch,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {EquipmentActionCard, InterventionHeader} from '../../molecules';
import {
  searchEquipment,
  searchInterventionEquipment,
} from '../../../features/equipmentSlice';
import {Equipment} from '../../../types';

const EquipmentView = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [mode, setMode] = useState(Equipment.mode.intervention);

  const {intervention} = useSelector(
    (state: any) => state.intervention_intervention,
  );
  const {
    loadingList,
    moreLoading,
    isListEnd,
    equipmentList,
    totalNumberClientEquipment,
    loadingInterventionEquipmentList,
    moreLoadingInterventionEquipment,
    isInterventionEquipmentListEnd,
    interventionEquipmentList,
    totalNumberInterventionEquipment,
  } = useSelector((state: any) => state.intervention_equipment);

  const idsInterventionEquipement = useMemo(
    () => intervention.equipmentSet.map(equipment => equipment.id),
    [intervention],
  );

  const searchInterventionEquipmentData = useMemo(
    () => ({
      idsInterventionEquipement,
      inService: selectedStatus[0]?.key,
    }),
    [idsInterventionEquipement, selectedStatus],
  );

  const searchEquipmentData = useMemo(
    () => ({
      partnerId: intervention.deliveredPartner?.id,
      inService: selectedStatus[0]?.key,
    }),
    [intervention.deliveredPartner?.id, selectedStatus],
  );

  const ObjectToDisplay = useMemo(() => {
    if (mode === Equipment.mode.intervention) {
      return {
        list: interventionEquipmentList,
        loading: loadingInterventionEquipmentList,
        moreLoading: moreLoadingInterventionEquipment,
        isListEnd: isInterventionEquipmentListEnd,
        sliceFunction: searchInterventionEquipment,
        sliceFunctionData: searchInterventionEquipmentData,
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
    isListEnd,
    loadingInterventionEquipmentList,
    loadingList,
    mode,
    moreLoading,
    moreLoadingInterventionEquipment,
    searchEquipmentData,
    searchInterventionEquipmentData,
  ]);

  useEffect(() => {
    dispatch(
      (searchInterventionEquipment as any)(searchInterventionEquipmentData),
    );
    dispatch((searchEquipment as any)(searchEquipmentData));
  }, [dispatch, searchEquipmentData, searchInterventionEquipmentData]);

  return (
    <SearchListView
      list={ObjectToDisplay.list}
      loading={ObjectToDisplay.loading}
      moreLoading={ObjectToDisplay.moreLoading}
      isListEnd={ObjectToDisplay.isListEnd}
      sliceFunction={ObjectToDisplay.sliceFunction}
      sliceFunctionData={ObjectToDisplay.sliceFunctionData}
      searchPlaceholder={I18n.t('Base_Search')}
      headerTopChildren={<InterventionHeader intervention={intervention} />}
      fixedItems={
        <ToggleSwitch
          leftTitle={I18n.t('Intervention_Intervention')}
          rightTitle={I18n.t('Intervention_Customer')}
          leftElement={
            <NumberBubble
              style={styles.indicator}
              number={totalNumberInterventionEquipment}
              color={Colors.primaryColor}
              isNeutralBackground={true}
            />
          }
          rigthElement={
            <NumberBubble
              style={styles.indicator}
              number={totalNumberClientEquipment}
              color={Colors.primaryColor}
              isNeutralBackground={true}
            />
          }
          onSwitch={() =>
            setMode(_mode =>
              _mode === Equipment.mode.intervention
                ? Equipment.mode.client
                : Equipment.mode.intervention,
            )
          }
        />
      }
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
          isUnlinkAction={mode === Equipment.mode.intervention}
        />
      )}
      actionList={[
        {
          iconName: 'plus',
          title: I18n.t('Intervention_CreateEquipment'),
          onPress: () => console.log('Create an equipment button pressed.'),
        },
        {
          iconName: 'link-45deg',
          title: I18n.t('Intervention_LinkEquipment'),
          onPress: () => console.log('Link an equipment button pressed.'),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    right: 10,
  },
});

export default EquipmentView;
