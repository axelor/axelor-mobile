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
import {PartnerCard} from '../../../molecules';
import {fetchPartner} from '../../../../features/partnerSlice';

const EventBody = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  if (!event?.partner) {
    return null;
  }

  return (
    <PartnerCard
      style={styles.item}
      partnerFullName={partner.simpleFullName}
      partnerReference={partner.partnerSeq}
      partnerScoring={partner?.isProspect ? partner.leadScoringSelect : null}
      partnerAddress={partner.mainAddress?.fullName}
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
