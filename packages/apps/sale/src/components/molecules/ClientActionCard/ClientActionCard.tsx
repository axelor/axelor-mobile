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
import {ClientCard} from '../../atoms';

interface ClientActionCardProps {
  style?: any;
  client: any;
  onPress: () => void;
}

const ClientActionCard = ({style, client, onPress}: ClientActionCardProps) => {
  const I18n = useTranslator();

  const address = useMemo(
    () => client?.mainAddress?.fullName,
    [client?.mainAddress?.fullName],
  );

  const phone = useMemo(
    () => client?.mobilePhone || client?.fixedPhone,
    [client?.mobilePhone, client?.fixedPhone],
  );

  return (
    <ActionCard
      style={style}
      actionList={[
        {
          iconName: 'geo-alt-fill',
          helper: I18n.t('Sale_OpenMap'),
          onPress: () => linkingProvider.openMapApp(address),
          hidden: address == null,
        },
        {
          iconName: 'telephone-fill',
          helper: I18n.t('Sale_Call'),
          onPress: () => linkingProvider.openCallApp(phone),
          hidden: phone == null,
        },
      ]}
      translator={I18n.t}>
      <ClientCard
        {...client}
        address={address}
        phone={phone}
        onPress={onPress}
      />
    </ActionCard>
  );
};

export default ClientActionCard;
