/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@axelor/aos-mobile-ui';
import {isEmpty, useNavigation, useTranslator} from '@axelor/aos-mobile-core';
import {OpportunityCard} from '../../molecules';
import {getLastItem} from '../../../utils/list';

interface Opportunity {
  id: number;
  amount: string;
  expectedCloseDate: string;
  name: string;
  opportunityRating: number;
  opportunitySeq: string;
  allOpportunityStatus?: any;
  currencySymbol?: string;
  opportunityStatus?: any;
}

interface DropdownOpportunityViewProps {
  opportunityList: Opportunity[];
  opportunityStatusList?: any;
}

const DropdownOpportunityView = ({
  opportunityList,
  opportunityStatusList,
}: DropdownOpportunityViewProps) => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const lastOpportunity = useMemo(() => {
    return getLastItem(opportunityList);
  }, [opportunityList]);

  if (lastOpportunity == null || isEmpty(lastOpportunity)) {
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
        currencySymbol={lastOpportunity.currencySymbol}
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
