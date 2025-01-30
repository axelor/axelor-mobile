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

import React, {useMemo, useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  checkNullString,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
  getCommonStyles,
  ToggleSwitch,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {PartnerCard, ProspectSearchBar} from '../../components';
import {fetchProspects} from '../../features/prospectSlice';

const ProspectsListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {userId} = useSelector(state => state.auth);
  const {loading, moreLoading, isListEnd, prospectList} = useSelector(
    state => state.prospect,
  );

  const [assigned, setAssigned] = useState(false);
  const [filter, setFilter] = useState(null);

  const handleDataSearch = useCallback(searchValue => {
    setFilter(searchValue);
  }, []);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const fetchProspectAPI = useCallback(
    page => {
      dispatch(fetchProspects({page: page}));
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

  const filteredList = useMemo(
    () => filterOnUserAssigned(prospectList),
    [filterOnUserAssigned, prospectList],
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
            partnerAddress={item.mainAddress?.fullName}
            partnerFixedPhone={item.fixedPhone}
            partnerEmail={item.emailAddress?.address}
            partnerPicture={item.picture}
            onPress={() =>
              navigation.navigate('ProspectDetailsScreen', {
                idProspect: item.id,
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
