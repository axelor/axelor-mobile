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

import React, {useMemo, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
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
import {PartnerCard} from '../../components';
import {
  fetchProspects,
  fetchProspectStatus,
} from '../../features/prospectSlice';
import {Prospect} from '../../types';

const ProspectsListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {userId} = useSelector(state => state.auth);
  const {
    loadingList,
    moreLoading,
    isListEnd,
    prospectList,
    prospectStatusList,
  } = useSelector(state => state.prospect);
  const {crm: crmConfig} = useSelector(state => state.appConfig);

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [assigned, setAssigned] = useState(false);

  const prospectStatusListItems = useMemo(() => {
    return prospectStatusList
      ? prospectStatusList.map((status, index) => {
          return {
            title: status.name,
            color: Prospect.getStatusColor(index, Colors),
            key: status.id,
          };
        })
      : [];
  }, [prospectStatusList, Colors]);

  useEffect(() => {
    dispatch(fetchProspectStatus());
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
        list={prospectList}
        loading={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchProspects}
        sliceFunctionData={sliceFunctionData}
        onChangeSearchValue={() => {}}
        searchPlaceholder={I18n.t('Crm_Prospects')}
        topFixedItems={
          <ToggleSwitch
            style={styles.headerItem}
            leftTitle={I18n.t('Crm_All')}
            rightTitle={I18n.t('Crm_AssignedToMe')}
            onSwitch={() => setAssigned(!assigned)}
          />
        }
        fixedItems={
          crmConfig?.crmProcessOnPartner && (
            <MultiValuePicker
              style={styles.headerItem}
              listItems={prospectStatusListItems}
              title={I18n.t('Base_Status')}
              onValueChange={statusList => setSelectedStatus(statusList)}
            />
          )
        }
        renderListItem={({item}) => (
          <PartnerCard
            style={styles.item}
            partnerFullName={item.simpleFullName}
            partnerReference={item.partnerSeq}
            partnerScoring={item.leadScoringSelect || 0}
            partnerAddress={item.mainAddress?.fullName}
            partnerFixedPhone={item.fixedPhone}
            partnerEmail={item.emailAddress?.address}
            partnerPicture={item.picture}
            partnerStatus={item.partnerStatus}
            allProspectStatus={prospectStatusList}
            onPress={() =>
              navigation.navigate('ProspectDetailsScreen', {
                idProspect: item.id,
                colorIndex: prospectStatusList?.findIndex(
                  status => status.id === item.partnerStatus?.id,
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
  headerItem: {
    alignSelf: 'center',
  },
});

export default ProspectsListScreen;
