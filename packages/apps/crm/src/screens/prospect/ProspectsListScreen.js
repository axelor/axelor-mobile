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
import {PartnerCard, ProspectSearchBar} from '../../components';
import {
  fetchProspects,
  fetchProspectStatus,
} from '../../features/prospectSlice';
import {Prospect} from '../../types';
import {fetchCrmConfigApi} from '../../features/crmConfigSlice';

const ProspectsListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {userId} = useSelector(state => state.auth);
  const {loading, moreLoading, isListEnd, prospectList, prospectStatusList} =
    useSelector(state => state.prospect);
  const {crmConfig} = useSelector(state => state.crmConfig);

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [assigned, setAssigned] = useState(false);
  const [filter, setFilter] = useState(null);

  const handleDataSearch = useCallback(searchValue => {
    setFilter(searchValue);
  }, []);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

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

  const fetchProspectAPI = useCallback(
    page => {
      dispatch(fetchProspects({page: page}));
    },
    [dispatch],
  );
  useEffect(() => {
    dispatch(fetchProspectStatus());
    dispatch(fetchCrmConfigApi());
  }, [dispatch]);

  const filterOnStatus = useCallback(
    list => {
      if (!Array.isArray(list) || list.length === 0) {
        return [];
      } else {
        if (selectedStatus.length > 0) {
          return list?.filter(item =>
            selectedStatus.find(
              status => item?.partnerStatus?.id === status.key,
            ),
          );
        } else {
          return list;
        }
      }
    },
    [selectedStatus],
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

  const filteredList = useMemo(
    () => filterOnUserAssigned(filterOnStatus(prospectList)),
    [filterOnUserAssigned, prospectList, filterOnStatus],
  );

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
            <ProspectSearchBar
              showDetailsPopup={false}
              oneFilter={true}
              onFetchDataAction={handleDataSearch}
            />
            {crmConfig?.crmProcessOnPartner && (
              <MultiValuePicker
                listItems={prospectStatusListItems}
                title={I18n.t('Base_Status')}
                onValueChange={statusList => setSelectedStatus(statusList)}
              />
            )}
          </View>
        }
      />
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <PartnerCard
            style={styles.item}
            partnerFullName={item.simpleFullName}
            partnerReference={item.partnerSeq}
            partnerScoring={item.leadScoringSelect || 0}
            partnerAdress={item.mainAddress?.fullName}
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
        fetchData={fetchProspectAPI}
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
  toggleSwitchContainer: {
    width: '90%',
    height: 40,
  },
  toggle: {
    width: '54%',
    height: 38,
    borderRadius: 13,
  },
});

export default ProspectsListScreen;
