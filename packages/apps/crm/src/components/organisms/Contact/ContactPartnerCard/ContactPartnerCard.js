import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {PartnerCard} from '../../../molecules';
import {fetchPartner} from '../../../../features/partnerSlice';

const ContactPartnerCard = ({navigation}) => {
  const dispatch = useDispatch();

  const {partner} = useSelector(state => state.partner);
  const {contact} = useSelector(state => state.contact);

  useEffect(() => {
    contact?.mainPartner &&
      dispatch(fetchPartner({partnerId: contact?.mainPartner?.id}));
  }, [dispatch, contact?.mainPartner]);

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

  if (!contact?.mainPartner) {
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
    marginHorizontal: 20,
    marginVertical: 7,
  },
});

export default ContactPartnerCard;
