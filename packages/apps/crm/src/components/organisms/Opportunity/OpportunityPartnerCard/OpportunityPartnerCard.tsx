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

import React, {useCallback} from 'react';
import {useNavigation, useSelector} from '@axelor/aos-mobile-core';
import {PartnerInfoCard} from '../../../molecules';
import {StyleSheet} from 'react-native';

const OpportunityPartnerCard = ({}) => {
  const navigation = useNavigation();

  const {opportunity} = useSelector((state: any) => state.opportunity);

  const navigateToPartnerDetails = useCallback(() => {
    if (opportunity?.partner?.isProspect) {
      return navigation.navigate('ProspectDetailsScreen', {
        idProspect: opportunity.partner?.id,
      });
    }

    if (opportunity?.partner?.isCustomer) {
      return navigation.navigate('ClientDetailsScreen', {
        idClient: opportunity.partner?.id,
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
