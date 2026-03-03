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
import {ObjectCard} from '@axelor/aos-mobile-ui';

interface LiteContactCardProps {
  contactFullname: string;
  mobilePhoneNumber?: string;
  fixedPhoneNumber: string;
  email: string;
  onPress: () => void;
}
const LiteContactCard = ({
  contactFullname,
  mobilePhoneNumber,
  fixedPhoneNumber,
  email,
  onPress,
}: LiteContactCardProps) => {
  return (
    <ObjectCard
      onPress={onPress}
      upperTexts={{
        items: [
          {displayText: contactFullname, hideIfNull: true, isTitle: true},
          {
            displayText: mobilePhoneNumber,
            hideIfNull: true,
            iconName: 'phone-fill',
          },
          {
            indicatorText: fixedPhoneNumber,
            hideIfNull: true,
            iconName: 'telephone-fill',
          },
          {
            indicatorText: email,
            hideIfNull: true,
            iconName: 'envelope-fill',
          },
        ],
      }}
    />
  );
};

export default LiteContactCard;
