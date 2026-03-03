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

import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useNavigation, useSelector} from '@axelor/aos-mobile-core';
import {LiteContactCard} from '../../../molecules';
import {getContact} from '../../../../features/contactSlice';

const EventContactCard = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {event} = useSelector(state => state.event);
  const {contact} = useSelector(state => state.contact);

  useEffect(() => {
    if (event?.contactPartner) {
      dispatch(getContact({contactId: event?.contactPartner.id}));
    }
  }, [dispatch, event?.contactPartner]);

  const handleCardPress = useCallback(() => {
    navigation.navigate('ContactDetailsScreen', {
      idContact: contact.id,
    });
  }, [contact.id, navigation]);

  if (!event?.contactPartner) {
    return null;
  }

  return (
    <LiteContactCard
      style={styles.item}
      contactFullname={contact.simpleFullName}
      fixedPhoneNumber={contact.fixedPhone}
      email={contact.emailAddress?.address}
      onPress={handleCardPress}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default EventContactCard;
