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

import React, {useState, useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  MultiValuePicker,
  Screen,
  ToggleSwitch,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {fetchLeads, fetchLeadStatus} from '../../features/leadSlice';
import {LeadsCard} from '../../components';
import {Lead} from '../../types';

const LeadListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {loadingLeadList, moreLoading, isListEnd, leadList, leadStatusList} =
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

  useEffect(() => {
    dispatch(fetchLeadStatus());
  }, [dispatch]);

  const sliceFunctionData = useMemo(
    () => ({
      userId: userId,
      assigned: assigned,
      statusList: selectedStatus,
    }),
    [assigned, selectedStatus, userId],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        expandableFilter={false}
        list={leadList}
        loading={loadingLeadList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchLeads}
        sliceFunctionData={sliceFunctionData}
        onChangeSearchValue={() => {}}
        searchPlaceholder={I18n.t('Crm_Leads')}
        fixedItems={
          <View style={styles.headerContainer}>
            <ToggleSwitch
              leftTitle={I18n.t('Crm_All')}
              rightTitle={I18n.t('Crm_AssignedToMe')}
              onSwitch={() => setAssigned(!assigned)}
            />
            <MultiValuePicker
              listItems={leadStatusListItems}
              title={I18n.t('Base_Status')}
              onValueChange={statusList => setSelectedStatus(statusList)}
            />
          </View>
        }
        renderListItem={({item}) => (
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
