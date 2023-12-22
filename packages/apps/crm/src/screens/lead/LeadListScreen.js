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

import React, {useCallback, useState, useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Screen,
  HeaderContainer,
  ToggleSwitch,
  ScrollList,
  useThemeColor,
  MultiValuePicker,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchLeads, fetchLeadStatus} from '../../features/leadSlice';
import {LeadsCard, LeadSearchBar} from '../../components';
import {Lead} from '../../types';

const LeadListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {loadingLead, moreLoading, isListEnd, leadList, leadStatusList} =
    useSelector(state => state.lead);
  const {userId} = useSelector(state => state.auth);

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [assigned, setAssigned] = useState(false);

  const leadStatusListItems = useMemo(() => {
    return leadStatusList
      ? leadStatusList.map((status, index) => {
          return {
            title: status.name,
            color: Lead.getStatusColor(index, Colors),
            key: status.id,
          };
        })
      : [];
  }, [leadStatusList, Colors]);

  const fetchLeadsAPI = useCallback(
    (page = 0) => {
      dispatch(fetchLeads({page: page}));
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
            selectedStatus.find(status => item?.leadStatus?.id === status.key),
          );
        } else {
          return list;
        }
      }
    },
    [selectedStatus],
  );

  useEffect(() => {
    dispatch(fetchLeadStatus());
  }, [dispatch]);

  const filteredList = useMemo(
    () => filterOnUserAssigned(filterOnStatus(leadList)),
    [leadList, filterOnUserAssigned, filterOnStatus],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <ToggleSwitch
              leftTitle={I18n.t('Crm_All')}
              rightTitle={I18n.t('Crm_AssignedToMe')}
              onSwitch={() => setAssigned(!assigned)}
            />
            <LeadSearchBar showDetailsPopup={false} oneFilter={true} />
            <MultiValuePicker
              listItems={leadStatusListItems}
              title={I18n.t('Base_Status')}
              onValueChange={statusList => setSelectedStatus(statusList)}
            />
          </View>
        }
      />
      <ScrollList
        loadingList={loadingLead}
        data={filteredList}
        renderItem={({item}) => (
          <LeadsCard
            style={styles.item}
            leadsFullname={item.simpleFullName}
            leadsCompany={item.enterpriseName}
            leadsAddress={item.primaryAddress}
            leadsFixedPhone={item.fixedPhone}
            leadsPhoneNumber={item.mobilePhone}
            leadsEmail={item.emailAddress?.address}
            leadScoring={item.leadScoringSelect}
            leadVersion={item.version}
            leadsId={item.id}
            leadsStatus={item.leadStatus}
            allLeadStatus={leadStatusList}
            isDoNotSendEmail={item.isDoNotSendEmail}
            isDoNotCall={item.isDoNotCall}
            onPress={() =>
              navigation.navigate('LeadDetailsScreen', {
                idLead: item.id,
                versionLead: item.version,
                colorIndex: leadStatusList?.findIndex(
                  status => status.id === item.leadStatus?.id,
                ),
              })
            }
          />
        )}
        fetchData={fetchLeadsAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
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
});

export default LeadListScreen;
