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

import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Screen, ToggleSwitch} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {fetchContact} from '../../features/contactSlice';
import {PartnerCard} from '../../components';

const ContactListScreen = ({navigation}) => {
  const I18n = useTranslator();

  const {userId} = useSelector(state => state.auth);
  const {loadingContact, moreLoading, isListEnd, contactList} = useSelector(
    state => state.contact,
  );

  const [assigned, setAssigned] = useState(false);

  const sliceFunctionData = useMemo(
    () => ({
      userId: userId,
      assigned: assigned,
    }),
    [userId, assigned],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        expandableFilter={false}
        list={contactList}
        loading={loadingContact}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchContact}
        sliceFunctionData={sliceFunctionData}
        onChangeSearchValue={() => {}}
        searchPlaceholder={I18n.t('Crm_Contacts')}
        topFixedItems={
          <ToggleSwitch
            style={styles.headerItem}
            leftTitle={I18n.t('Crm_All')}
            rightTitle={I18n.t('Crm_AssignedToMe')}
            onSwitch={() => setAssigned(!assigned)}
          />
        }
        renderListItem={({item}) => (
          <PartnerCard
            style={styles.item}
            partnerFullName={item.simpleFullName}
            partnerReference={item.partnerSeq}
            partnerAddress={item.mainAddress?.fullName}
            partnerFixedPhone={item.fixedPhone}
            partnerEmail={item.emailAddress?.address}
            partnerPicture={item.picture}
            partnerCompany={item.mainPartner?.fullName}
            onPress={() =>
              navigation.navigate('ContactDetailsScreen', {
                idContact: item.id,
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

export default ContactListScreen;
