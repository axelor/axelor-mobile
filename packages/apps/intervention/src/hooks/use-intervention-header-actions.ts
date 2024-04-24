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

import {useEffect} from 'react';
import {
  headerActionsProvider,
  useDispatch,
  useSelector,
  useTranslator,
  useNavigation,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchInterventionById} from '../features/interventionSlice';

export const useInterventionHeaders = () => {
  useEquipmentFormActions();
  useInterventionDetailsActions();
};

const useEquipmentFormActions = () => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {equipment} = useSelector((state: any) => state.intervention_equipment);

  useEffect(() => {
    headerActionsProvider.registerModel('intervention_equipment_form', {
      model: 'com.axelor.apps.intervention.db.Equipment',
      modelId: equipment?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: equipment?.name,
      actions: [
        {
          key: 'openEquipmentLine',
          title: I18n.t('Intervention_OpenEquipmentLine'),
          order: 10,
          iconName: 'card-list',
          hideIf: equipment.id == null,
          onPress: () => navigation.navigate('EquipmentLineListScreen'),
        },
        {
          key: 'openEquipmentPictures',
          title: I18n.t('Intervention_OpenEquipmentPictures'),
          order: 20,
          iconName: 'images',
          hideIf: equipment.id == null,
          onPress: () => navigation.navigate('EquipmentPictureScreen'),
        },
        {
          key: 'openEquipmentIntervention',
          title: I18n.t('Intervention_OpenEquipmentIntervention'),
          order: 30,
          iconName: 'car-front-fill',
          hideIf: equipment.id == null,
          onPress: () => navigation.navigate('EquipmentInterventionListScreen'),
        },
      ],
    });
  }, [mobileSettings, equipment, I18n, navigation]);
};

const useInterventionDetailsActions = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {intervention} = useSelector(
    (state: any) => state.intervention_intervention,
  );

  useEffect(() => {
    headerActionsProvider.registerModel('intervention_intervention_details', {
      model: 'com.axelor.apps.intervention.db.Intervention',
      modelId: intervention?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: intervention?.sequence,
      actions: [
        {
          key: 'refreshIntervention',
          order: 0,
          iconName: 'arrow-repeat',
          title: I18n.t('Intervention_RefreshIntervention'),
          iconColor: Colors.primaryColor.background,
          onPress: () => {
            dispatch(
              (fetchInterventionById as any)({interventionId: intervention.id}),
            );
          },
          showInHeader: true,
        },
      ],
    });
  }, [
    I18n,
    Colors,
    dispatch,
    intervention,
    mobileSettings?.isTrackerMessageEnabled,
  ]);
};
