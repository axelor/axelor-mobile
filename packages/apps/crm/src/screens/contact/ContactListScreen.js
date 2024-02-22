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
import {fetchContact} from '../../features/contactSlice';
import {ContactSearchBar, PartnerCard} from '../../components';

const ContactListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {userId} = useSelector(state => state.auth);
  const {loadingContact, moreLoading, isListEnd, contactList} = useSelector(
    state => state.contact,
  );

  const [assigned, setAssigned] = useState(false);
  const [filter, setFilter] = useState(null);

  const handleDataSearch = useCallback(searchValue => {
    setFilter(searchValue);
  }, []);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const fetchContactAPI = useCallback(
    page => {
      dispatch(fetchContact({page: page}));
    },
    [dispatch],
  );

  const filterOnUserAssigned = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
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
    () => filterOnUserAssigned(contactList),
    [filterOnUserAssigned, contactList],
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
            <ContactSearchBar
              showDetailsPopup={false}
              oneFilter={true}
              onFetchDataAction={handleDataSearch}
            />
          </View>
        }
      />
      <ScrollList
        loadingList={loadingContact}
        data={filteredList}
        renderItem={({item}) => (
          <PartnerCard
            style={styles.item}
            partnerFullName={item.simpleFullName}
            partnerReference={item.partnerSeq}
            partnerAdress={item.mainAddress?.fullName}
            partnerFixedPhone={item.fixedPhone}
            partnerEmail={
              item['emailAddress.address'] || item.emailAddress?.address
            }
            partnerPicture={item.picture}
            partnerCompany={item.mainPartner?.fullName}
            onPress={() =>
              navigation.navigate('ContactDetailsScreen', {
                idContact: item.id,
              })
            }
          />
        )}
        fetchData={fetchContactAPI}
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

export default ContactListScreen;
