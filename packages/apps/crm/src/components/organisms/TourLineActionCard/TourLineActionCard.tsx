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

import React, {useState} from 'react';
import {ActionCard, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  linkingProvider,
  useDispatch,
  useNavigation,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {validateTourLine} from '../../../features/tourLineSlice';
import TourLineEventPopup from '../TourLineEventPopup/TourLineEventPopup';
import {TourLineCard} from '../../molecules';

interface TourLineActionCardProps {
  partner: any;
  address: string;
  isValidated: boolean;
  eventId?: number;
  id: number;
  tourId: number;
  version: number;
  selectedStatus?: boolean;
}

const TourLineActionCard = ({
  partner,
  address,
  isValidated = false,
  eventId,
  tourId,
  id,
  version,
  selectedStatus,
}: TourLineActionCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [addPopupIsVisible, setAddPopupIsVisible] = useState(false);

  return (
    <>
      <ActionCard
        translator={I18n.t}
        actionList={[
          {
            iconName: 'geo-alt-fill',
            helper: I18n.t('Crm_OpenMap'),
            onPress: () => linkingProvider.openMapApp(address),
          },
          {
            iconName: 'calendar-event',
            helper: I18n.t('Crm_SeeEvent'),
            onPress: () =>
              navigation.navigate('EventDetailsScreen', {
                eventId: eventId,
              }),
            hidden: eventId == null,
          },
          {
            iconName: 'calendar2-plus',
            helper: I18n.t('Crm_AddEvent'),
            onPress: () => setAddPopupIsVisible(true),
            hidden: eventId != null,
          },
          {
            iconName: 'check-lg',
            iconColor: Colors.successColor.background,
            helper: I18n.t('Crm_ValidateTourStep'),
            onPress: () =>
              dispatch(
                (validateTourLine as any)({
                  tourLineId: id,
                  tourId: tourId,
                }),
              ),
            hidden: isValidated,
          },
        ]}>
        <TourLineCard
          name={partner?.fullName}
          address={address}
          isValidated={isValidated}
        />
      </ActionCard>
      <TourLineEventPopup
        visible={addPopupIsVisible}
        partner={partner}
        onClose={() => setAddPopupIsVisible(false)}
        tourlineData={{
          isValidated: selectedStatus,
          tourLineVersion: version,
          tourId: tourId,
          tourLineId: id,
        }}
      />
    </>
  );
};

export default TourLineActionCard;
