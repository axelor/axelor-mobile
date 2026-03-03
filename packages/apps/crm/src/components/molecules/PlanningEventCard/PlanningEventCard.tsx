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

import React from 'react';
import {useTypes} from '@axelor/aos-mobile-core';
import {ObjectCard} from '@axelor/aos-mobile-ui';

interface PlanningEventCardProps {
  style?: any;
  onPress: () => void;
  subject: string;
  id: string | number;
  contactPartner?: string;
  location?: string;
  partner?: string;
  eventLead?: string;
  partnerTypeSelect?: number;
}

const PlanningEventCard = ({
  style,
  onPress,
  subject,
  id,
  contactPartner,
  location,
  partner,
  eventLead,
  partnerTypeSelect,
}: PlanningEventCardProps) => {
  const {Partner} = useTypes();

  return (
    <ObjectCard
      key={id}
      onPress={onPress}
      style={style}
      upperTexts={{
        items: [
          {displayText: subject, isTitle: true},
          {
            indicatorText: partner,
            hideIfNull: true,
            iconName:
              partnerTypeSelect === Partner?.partnerTypeSelect.Company
                ? 'building-fill'
                : 'person-fill',
          },
          {
            indicatorText: eventLead,
            hideIfNull: true,
            iconName: 'person-badge-fill',
          },
          {
            indicatorText: contactPartner,
            hideIfNull: true,
            iconName: 'person-fill',
          },
          {indicatorText: location, hideIfNull: true, iconName: 'geo-fill'},
        ],
      }}
    />
  );
};

export default PlanningEventCard;
