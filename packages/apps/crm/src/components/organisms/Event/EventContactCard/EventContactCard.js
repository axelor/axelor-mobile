import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {LiteContactCard} from '../../../molecules';
import {getContact} from '../../../../features/contactSlice';

const EventContactCard = ({navigation}) => {
  const dispatch = useDispatch();

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
      email={contact['emailAddress.address']}
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
