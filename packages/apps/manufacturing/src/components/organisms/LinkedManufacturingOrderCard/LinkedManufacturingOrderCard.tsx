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
import {
  clipboardProvider,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';

const LinkedManufacturingOrderCard = ({
  manufOrderSeq,
  statusSelect,
}: {
  manufOrderSeq: string;
  statusSelect: number;
}) => {
  const {ManufOrder} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  return (
    <ObjectCard
      showArrow={false}
      onPress={() => clipboardProvider.copyToClipboard(manufOrderSeq)}
      sideBadges={{
        items: [
          {
            displayText: getItemTitle(ManufOrder?.statusSelect, statusSelect),
            color: getItemColor(ManufOrder?.statusSelect, statusSelect),
          },
        ],
      }}
      upperTexts={{
        items: [{iconName: 'tag-fill', indicatorText: manufOrderSeq}],
      }}
    />
  );
};

export default LinkedManufacturingOrderCard;
