/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {StyleSheet} from 'react-native';
import {ActionCard} from '@axelor/aos-mobile-ui';
import {isEmpty, linkingProvider, useTranslator} from '@axelor/aos-mobile-core';
import LogisticalFormCarrierCard from '../LogisticalFormCarrierCard/LogisticalFormCarrierCard';

interface LogisticalFormCarrierActionCardProps {
  carrierPartner?: any;
  style?: any;
  showPhoneAction?: boolean;
  showAddressAction?: boolean;
}

const LogisticalFormCarrierActionCard = ({
  carrierPartner,
  style,
  showPhoneAction = true,
  showAddressAction = true,
}: LogisticalFormCarrierActionCardProps) => {
  const I18n = useTranslator();

  const actionList = useMemo(
    () => [
      {
        iconName: 'telephone-fill',
        helper: I18n.t('Stock_OpenPhone'),
        hidden:
          !showPhoneAction ||
          (carrierPartner?.mobilePhone == null &&
            carrierPartner?.fixedPhone == null),
        onPress: () =>
          linkingProvider.openCallApp(
            carrierPartner?.mobilePhone ?? carrierPartner?.fixedPhone,
          ),
      },
      {
        iconName: 'geo-alt-fill',
        helper: I18n.t('Stock_OpenMap'),
        hidden:
          !showAddressAction || carrierPartner?.mainAddress?.fullName == null,
        onPress: () =>
          linkingProvider.openMapApp(carrierPartner?.mainAddress?.fullName),
      },
    ],
    [
      I18n,
      carrierPartner?.fixedPhone,
      carrierPartner?.mainAddress?.fullName,
      carrierPartner?.mobilePhone,
      showAddressAction,
      showPhoneAction,
    ],
  );

  if (isEmpty(carrierPartner)) {
    return null;
  }

  return (
    <ActionCard
      style={[styles.container, style]}
      translator={I18n.t}
      actionList={actionList}>
      <LogisticalFormCarrierCard carrierPartner={carrierPartner} />
    </ActionCard>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 12,
  },
});

export default LogisticalFormCarrierActionCard;
