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
import {StyleSheet, View} from 'react-native';
import {Text} from '@axelor/aos-mobile-ui';
import {
  isEmpty,
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
  getLastItem,
} from '@axelor/aos-mobile-core';
import {OpportunityCard} from '../../molecules';
import {
  fetchOpportunityStatus,
  getPartnerOpportunities,
} from '../../../features/opportunitySlice';

const DropdownOpportunityView = ({partnerId}: {partnerId: number}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {partnerOpportunityList, opportunityStatusList} = useSelector(
    (state: any) => state.opportunity,
  );

  const lastOpportunity = useMemo(() => {
    return getLastItem(partnerOpportunityList, 'expectedCloseDate');
  }, [partnerOpportunityList]);

  useEffect(() => {
    dispatch((getPartnerOpportunities as any)({partnerId}));
  }, [dispatch, partnerId]);

  useEffect(() => {
    dispatch((fetchOpportunityStatus as any)());
  }, [dispatch]);

  if (isEmpty(lastOpportunity)) {
    return (
      <View>
        <Text>{I18n.t('Crm_NoOpportunityAssociated')}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{I18n.t('Crm_LastOpportunity')}</Text>
      <OpportunityCard
        amount={lastOpportunity.amount}
        expectedCloseDate={lastOpportunity.expectedCloseDate}
        name={lastOpportunity.name}
        opportunityScoring={lastOpportunity.opportunityRating}
        reference={lastOpportunity.opportunitySeq}
        allOpportunityStatus={opportunityStatusList}
        currencySymbol={
          lastOpportunity.currency?.symbol || lastOpportunity.currency?.name
        }
        opportunityStatus={lastOpportunity.opportunityStatus}
        onPress={() =>
          navigation.navigate('OpportunityDetailsScreen', {
            opportunityId: lastOpportunity.id,
          })
        }
        style={styles.opportunityCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  opportunityCard: {
    width: '100%',
    marginHorizontal: 0,
  },
});

export default DropdownOpportunityView;
