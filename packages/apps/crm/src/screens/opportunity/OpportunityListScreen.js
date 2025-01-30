/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useMemo, useState, useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  checkNullString,
  getCommonStyles,
  HeaderContainer,
  MultiValuePicker,
  Screen,
  ScrollList,
  ToggleSwitch,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {OpportunityCard, OpportunitySearchBar} from '../../components';
import {
  fetchOpportunities,
  fetchOpportunityStatus,
} from '../../features/opportunitySlice';
import {Opportunity} from '../../types';

const OpportunityListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {userId} = useSelector(state => state.auth);
  const {
    loading,
    moreLoading,
    isListEnd,
    opportunityList,
    opportunityStatusList,
  } = useSelector(state => state.opportunity);

  const [assigned, setAssigned] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [filter, setFilter] = useState(null);

  const handleDataSearch = useCallback(searchValue => {
    setFilter(searchValue);
  }, []);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const opportunityStatusListItems = useMemo(() => {
    return opportunityStatusList
      ? opportunityStatusList.map((status, index) => {
          return {
            title: status.name,
            color: Opportunity.getStatusColor(index, Colors),
            key: status.id,
          };
        })
      : [];
  }, [opportunityStatusList, Colors]);

  const fetchOpportunityAPI = useCallback(
    page => {
      dispatch(fetchOpportunities({page: page}));
    },
    [dispatch],
  );

  const filterOnUserAssigned = useCallback(
    list => {
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      } else {
        if (assigned) {
          return list?.filter(item => item?.user?.id === userId);
        } else {
          return list;
        }
      }
    },
    [assigned, userId],
  );

  const filterOnStatus = useCallback(
    list => {
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      } else {
        if (selectedStatus.length > 0) {
          return list?.filter(item =>
            selectedStatus.find(
              status => item?.opportunityStatus?.id === status.key,
            ),
          );
        } else {
          return list;
        }
      }
    },
    [selectedStatus],
  );

  const filteredList = useMemo(
    () => filterOnUserAssigned(filterOnStatus(opportunityList)),
    [filterOnUserAssigned, filterOnStatus, opportunityList],
  );

  useEffect(() => {
    dispatch(fetchOpportunityStatus());
  }, [dispatch]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <ToggleSwitch
              styleContainer={[commonStyles.filter, commonStyles.filterSize]}
              styleToogle={styles.toggle}
              leftTitle={I18n.t('Crm_All')}
              rightTitle={I18n.t('Crm_AssignedToMe')}
              onSwitch={() => setAssigned(!assigned)}
            />
            <OpportunitySearchBar
              showDetailsPopup={false}
              oneFilter={true}
              onFetchDataAction={handleDataSearch}
            />
            <MultiValuePicker
              listItems={opportunityStatusListItems}
              title={I18n.t('Base_Status')}
              onValueChange={statusList => setSelectedStatus(statusList)}
            />
          </View>
        }
      />
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <OpportunityCard
            amount={item.amount}
            expectedCloseDate={item.expectedCloseDate}
            name={item.name}
            opportunityScoring={item.opportunityRating}
            reference={item.opportunitySeq}
            allOpportunityStatus={opportunityStatusList}
            currencySymbol={item.currencySymbol}
            opportunityStatus={item.opportunityStatus}
            onPress={() =>
              navigation.navigate('OpportunityDetailsScreen', {
                opportunityId: item.id,
              })
            }
            style={styles.item}
          />
        )}
        fetchData={fetchOpportunityAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        filter={!checkNullString(filter)}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  headerContainer: {
    alignItems: 'center',
  },
  toggle: {
    width: '54%',
    height: 38,
    borderRadius: 13,
  },
});

export default OpportunityListScreen;
