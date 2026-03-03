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
import {View} from 'react-native';
import {useDispatch, useSelector, useNavigation} from '@axelor/aos-mobile-core';
import {searchLinkedPartnersOfContact} from '../../../features/partnerSlice';
import {PartnerCard} from '../../molecules';

const DropdownContactPartnerView = ({idContact}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {linkedPartnersOfContact} = useSelector(state => state.partner);

  useEffect(() => {
    dispatch(searchLinkedPartnersOfContact({contactId: idContact}));
  }, [dispatch, idContact]);

  const handleCardPress = useCallback(
    item => {
      if (item?.isCustomer) {
        return navigation.navigate('ClientDetailsScreen', {
          idClient: item.id,
        });
      }

      if (item?.isProspect) {
        return navigation.navigate('ProspectDetailsScreen', {
          idProspect: item.id,
        });
      }
    },
    [navigation],
  );

  return (
    <View>
      {linkedPartnersOfContact?.map((item, index) => {
        return (
          <PartnerCard
            key={index}
            partnerFullName={item.simpleFullName}
            partnerReference={item.partnerSeq}
            partnerScoring={item.isProspect ? item?.leadScoringSelect : null}
            partnerAddress={item.mainAddress?.fullName}
            partnerFixedPhone={item.fixedPhone}
            partnerEmail={item.emailAddress?.address}
            partnerPicture={item.picture}
            onPress={() => handleCardPress(item)}
          />
        );
      })}
    </View>
  );
};

export default DropdownContactPartnerView;
