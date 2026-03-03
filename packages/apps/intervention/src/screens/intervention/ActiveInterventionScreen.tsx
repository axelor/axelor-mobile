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

import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {
  isEmpty,
  useDispatch,
  useIsFocused,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Label, Screen, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  fetchActiveIntervention,
  fetchInterventionById,
} from '../../features/interventionSlice';
import InterventionDetailsScreen from './InterventionDetailsScreen';

const LoadingComponent = () => {
  const Colors = useThemeColor();

  return (
    <ActivityIndicator
      style={styles.activityIndicator}
      size="large"
      color={Colors.inverseColor.background}
    />
  );
};

const ActiveInterventionScreen = ({}) => {
  const I18n = useTranslator();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);
  const {loadingActiveIntervention, activeIntervention, intervention} =
    useSelector((state: any) => state.intervention_intervention);

  useEffect(() => {
    isFocused &&
      dispatch(
        (fetchActiveIntervention as any)({
          userId: user.id,
          companyId: user.activeCompany?.id,
        }),
      );
  }, [dispatch, isFocused, user]);

  useEffect(() => {
    if (activeIntervention?.id != null) {
      dispatch(
        (fetchInterventionById as any)({interventionId: activeIntervention.id}),
      );
    }
  }, [activeIntervention?.id, dispatch]);

  if (!isEmpty(activeIntervention)) {
    if (activeIntervention.id !== intervention?.id) {
      return <LoadingComponent />;
    } else {
      return (
        <InterventionDetailsScreen interventionId={activeIntervention?.id} />
      );
    }
  } else if (loadingActiveIntervention) {
    return <LoadingComponent />;
  } else {
    return (
      <Screen removeSpaceOnTop={true}>
        <Label
          style={styles.label}
          message={I18n.t('Intervention_NoActiveIntervention')}
          type="success"
        />
      </Screen>
    );
  }
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

export default ActiveInterventionScreen;
