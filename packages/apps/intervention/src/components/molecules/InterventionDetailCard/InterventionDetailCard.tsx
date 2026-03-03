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

import React, {useMemo} from 'react';
import {linkingProvider, useTranslator} from '@axelor/aos-mobile-core';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {InterventionCard} from '../../atoms';

interface InterventionContent {
  statusSelect: number;
  sequence: string;
  deliveredPartner: any;
  planifStartDateTime: string;
  interventionType: any;
  address: any;
  assignedTo: any;
  contact: any;
}

interface InterventionDetailCardProps {
  style?: any;
  intervention: InterventionContent;
  isCopyCard?: boolean;
  onPress: () => void;
}

const InterventionDetailCard = ({
  intervention,
  isCopyCard,
  onPress,
}: InterventionDetailCardProps) => {
  const I18n = useTranslator();

  const address = useMemo(
    () => intervention?.address?.fullName,
    [intervention?.address?.fullName],
  );

  const phone = useMemo(
    () =>
      intervention?.contact?.mobilePhone || intervention?.contact?.fixedPhone,
    [intervention?.contact?.mobilePhone, intervention?.contact?.fixedPhone],
  );

  return (
    <ActionCard
      translator={I18n.t}
      actionList={[
        {
          iconName: 'geo-alt-fill',
          helper: I18n.t('Intervention_OpenMap'),
          onPress: () => linkingProvider.openMapApp(address),
          hidden: !address,
        },
        {
          iconName: 'telephone-fill',
          helper: I18n.t('Intervention_OpenPhone'),
          onPress: () => linkingProvider.openCallApp(phone),
          hidden: !phone,
        },
      ]}>
      <InterventionCard
        {...intervention}
        isCopyCard={isCopyCard}
        onPress={onPress}
      />
    </ActionCard>
  );
};

export default InterventionDetailCard;
