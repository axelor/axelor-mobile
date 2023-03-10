import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {PartnerCard} from '../../../molecules';
import {fetchPartner} from '../../../../features/partnerSlice';

const EventBody = ({navigation}) => {
  const dispatch = useDispatch();

  const {event} = useSelector(state => state.event);
  const {partner} = useSelector(state => state.partner);

  useEffect(() => {
    event?.partner && dispatch(fetchPartner({partnerId: event?.partner?.id}));
  }, [dispatch, event?.partner]);

  const handleCardPress = useCallback(() => {
    if (partner?.isCustomer) {
      return navigation.navigate('ClientDetailsScreen', {
        idClient: partner.id,
      });
    }

    if (partner?.isProspect) {
      return navigation.navigate('ProspectDetailsScreen', {
        idProspect: partner.id,
      });
    }
  }, [navigation, partner?.id, partner?.isCustomer, partner?.isProspect]);

  if (!event.partner) {
    return null;
  }

  return (
    <PartnerCard
      style={styles.item}
      partnerFullName={partner.simpleFullName}
      partnerReference={partner.partnerSeq}
      partnerScoring={partner?.isProspect ? partner.leadScoringSelect : null}
      partnerAdress={partner.mainAddress?.fullName}
      partnerFixedPhone={partner.fixedPhone}
      partnerEmail={partner.emailAddress?.address}
      partnerPicture={partner.picture}
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

export default EventBody;
