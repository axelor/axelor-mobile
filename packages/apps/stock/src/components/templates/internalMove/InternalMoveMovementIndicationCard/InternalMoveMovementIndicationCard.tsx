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
import {
  Icon,
  MovementIndicationCard,
  useThemeColor,
  checkNullString,
} from '@axelor/aos-mobile-ui';

const InternalMoveMovementIndicationCard = ({from, to}) => {
  const Colors = useThemeColor();

  if (checkNullString(from) && checkNullString(to)) {
    return null;
  }

  return (
    <MovementIndicationCard
      titleTop={from}
      iconTop={
        <Icon name="house-down" color={Colors.primaryColor.background} />
      }
      titleDown={to}
      iconDown={<Icon name="house-up" color={Colors.primaryColor.background} />}
    />
  );
};

export default InternalMoveMovementIndicationCard;
