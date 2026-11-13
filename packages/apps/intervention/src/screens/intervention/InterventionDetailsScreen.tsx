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

import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {BottomBar, Label, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  EquipmentView,
  GeneralInformationView,
  HistoryView,
  NoteView,
  SurveyView,
} from '../../components';
import {fetchInterventionById} from '../../features/interventionSlice';
import {fetchRange} from '../../features/questionSlice';
import {fetchNumberInterventionEquipment} from '../../features/equipmentSlice';

export interface InterventionDetailsScreenProps {
  route?: any;
  interventionId?: number;
}

const InterventionDetailsScreen = ({
  route,
  interventionId,
}: InterventionDetailsScreenProps) => {
  const _interventionId = route?.params?.interventionId ?? interventionId;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {Intervention} = useTypes();

  const {intervention, loadingIntervention} = useSelector(
    state => state.intervention_intervention,
  );
  const {totalNumberInterventionEquipment} = useSelector(
    state => state.intervention_equipment,
  );

  const idsInterventionEquipement = useMemo(
    () => intervention?.equipmentSet?.map((_e: any) => _e.id),
    [intervention],
  );

  useEffect(() => {
    dispatch((fetchInterventionById as any)({interventionId: _interventionId}));
  }, [_interventionId, dispatch]);

  useEffect(() => {
    if (intervention?.id) {
      dispatch((fetchRange as any)({interventionId: intervention.id}));
    }
  }, [dispatch, intervention?.id]);

  useEffect(() => {
    dispatch(
      (fetchNumberInterventionEquipment as any)({idsInterventionEquipement}),
    );
  }, [dispatch, idsInterventionEquipement]);

  const bottomBarItems = useMemo(
    () => [
      {
        iconName: 'house',
        viewComponent: <GeneralInformationView />,
        color: Colors.secondaryColor_dark,
      },
      {
        iconName: 'card-checklist',
        viewComponent: <SurveyView />,
        color: Colors.progressColor,
        disabled:
          intervention?.statusSelect < Intervention?.statusSelect.Started,
      },
      {
        iconName: 'cart3',
        viewComponent: <EquipmentView />,
        color: Colors.infoColor,
        indicator: totalNumberInterventionEquipment,
      },
      {
        iconName: 'chat-text',
        viewComponent: <NoteView />,
        color: Colors.plannedColor,
      },
      {
        iconName: 'clock-history',
        viewComponent: <HistoryView />,
        color: Colors.successColor,
      },
    ],
    [
      Colors,
      Intervention?.statusSelect.Started,
      intervention?.statusSelect,
      totalNumberInterventionEquipment,
    ],
  );

  if (intervention?.id !== _interventionId) {
    /*
     * Read from the store, so that a reload started elsewhere (refresh, status
     * change) that brings nothing back also shows the message.
     */
    const isNotLoaded = !loadingIntervention && intervention?.id == null;

    if (!isNotLoaded) {
      return (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color={Colors.inverseColor.background}
        />
      );
    }

    return (
      <Screen>
        <Label
          style={styles.label}
          message={I18n.t('Intervention_InterventionNotLoaded')}
          type="info"
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <BottomBar items={bottomBarItems} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  label: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default InterventionDetailsScreen;
