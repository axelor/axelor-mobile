import React, {useCallback} from 'react';
import {useSelector} from '@axelor/aos-mobile-core';
import {PartnerInfoCard} from '../../../molecules';
import {StyleSheet} from 'react-native';

interface Props {
  navigation: any;
}

const OpportunityPartnerCard = ({navigation}: Props) => {
  const {opportunity} = useSelector((state: any) => state.opportunity);

  const navigateToPartnerDetails = useCallback(() => {
    if (opportunity?.partner?.isProspect) {
      return navigation.navigate('ProspectDetailsScreen', {
        idProspect: opportunity.partner.id,
      });
    }

    if (opportunity?.partner?.isCustomer) {
      return navigation.navigate('ClientDetailsScreen', {
        idClient: opportunity.partner.id,
      });
    }
  }, [navigation, opportunity?.partner]);

  return (
    <PartnerInfoCard
      style={styles.card}
      fullName={opportunity.partner?.simpleFullName}
      partnerSeq={opportunity.partner?.partnerSeq}
      picture={opportunity.partner?.picture}
      onPress={navigateToPartnerDetails}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default OpportunityPartnerCard;
