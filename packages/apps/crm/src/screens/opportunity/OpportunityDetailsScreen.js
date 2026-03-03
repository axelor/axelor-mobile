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

import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Screen,
  HeaderContainer,
  NotesCard,
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {
  OpportunityBottom,
  OpportunityDropdownInfo,
  OpportunityHeader,
  OpportunityPartnerCard,
  OpportunityUpdateStatusPicker,
} from '../../components';
import {getOpportunity} from '../../features/opportunitySlice';

const OpportunityDetailsScreen = ({route}) => {
  const {opportunityId} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingOpportunity, opportunity} = useSelector(
    state => state.opportunity,
  );

  const getOpportunityAPI = useCallback(() => {
    dispatch(
      getOpportunity({
        opportunityId: opportunityId,
      }),
    );
  }, [dispatch, opportunityId]);

  useEffect(() => {
    getOpportunityAPI();
  }, [getOpportunityAPI]);

  if (opportunity?.id !== opportunityId) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<OpportunityHeader />}
      />
      <ScrollView
        refresh={{loading: loadingOpportunity, fetcher: getOpportunityAPI}}
        style={styles.scrollView}>
        <OpportunityPartnerCard />
        <OpportunityDropdownInfo />
        <NotesCard
          title={I18n.t('Base_Description')}
          data={opportunity.description}
        />
        <OpportunityUpdateStatusPicker />
      </ScrollView>
      <OpportunityBottom opportunityId={opportunity.id} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    minHeight: '100%',
  },
});

export default OpportunityDetailsScreen;
