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

import React, {useMemo, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {MultiValuePicker, Screen, ToggleSwitch} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useDispatch,
  useSelector,
  useTranslator,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {OpportunityCard} from '../../components';
import {
  fetchOpportunities,
  fetchOpportunityStatus,
} from '../../features/opportunitySlice';

const OpportunityListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {getCustomSelectionItems} = useTypeHelpers();

  const {user} = useSelector(state => state.user);
  const {
    loadingList,
    moreLoading,
    isListEnd,
    opportunityList,
    opportunityStatusList,
  } = useSelector(state => state.opportunity);

  const [assigned, setAssigned] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const opportunityStatusListItems = useMemo(
    () => getCustomSelectionItems(opportunityStatusList, 'name'),
    [getCustomSelectionItems, opportunityStatusList],
  );

  useEffect(() => {
    dispatch(fetchOpportunityStatus());
  }, [dispatch]);

  const sliceFunctionData = useMemo(
    () => ({
      userId: user.id,
      assigned: assigned,
      statusList: selectedStatus,
      companyId: user.activeCompany?.id,
    }),
    [assigned, selectedStatus, user],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        expandableFilter={false}
        list={opportunityList}
        loading={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchOpportunities}
        sliceFunctionData={sliceFunctionData}
        searchPlaceholder={I18n.t('Crm_Opportunity')}
        topFixedItems={
          <ToggleSwitch
            style={styles.headerItem}
            leftTitle={I18n.t('Crm_All')}
            rightTitle={I18n.t('Crm_AssignedToMe')}
            onSwitch={() => setAssigned(!assigned)}
          />
        }
        fixedItems={
          <MultiValuePicker
            style={styles.headerItem}
            listItems={opportunityStatusListItems}
            title={I18n.t('Base_Status')}
            onValueChange={statusList => setSelectedStatus(statusList)}
          />
        }
        renderListItem={({item}) => (
          <OpportunityCard
            amount={item.amount}
            expectedCloseDate={item.expectedCloseDate}
            name={item.name}
            opportunityScoring={item.opportunityRating}
            reference={item.opportunitySeq}
            allOpportunityStatus={opportunityStatusList}
            currencySymbol={item.currency?.symbol || item.currency?.name}
            opportunityStatus={item.opportunityStatus}
            onPress={() =>
              navigation.navigate('OpportunityDetailsScreen', {
                opportunityId: item.id,
              })
            }
            style={styles.item}
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  headerItem: {
    alignSelf: 'center',
  },
});

export default OpportunityListScreen;
