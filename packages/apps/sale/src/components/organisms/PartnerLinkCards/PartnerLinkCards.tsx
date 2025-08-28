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

import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Text} from '@axelor/aos-mobile-ui';
import {PartnerActionCard} from '../../molecules';

interface PartnerLinkCardsProps {
  clientPartner?: any;
  invoicedPartner?: any;
  deliveredPartner?: any;
}

const PartnerLinkCards = ({
  clientPartner,
  invoicedPartner,
  deliveredPartner,
}: PartnerLinkCardsProps) => {
  const I18n = useTranslator();

  const {base: baseConfig} = useSelector(state => state.appConfig);

  const renderPartnerCard = useCallback(
    (titleKey: string, partner: any) => {
      if (!partner || partner.id === clientPartner?.id) {
        return null;
      }

      return (
        <>
          <Text style={styles.title} writingType="important">
            {I18n.t(titleKey)}
          </Text>
          <PartnerActionCard
            partner={partner}
            showAddressAction
            showPhoneAction
          />
        </>
      );
    },
    [I18n, clientPartner?.id],
  );

  if (!baseConfig?.activatePartnerRelations) {
    return null;
  }

  return (
    <>
      {renderPartnerCard('Sale_InvoicedPartner', invoicedPartner)}
      {renderPartnerCard('Sale_DeliveredPartner', deliveredPartner)}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 20,
  },
});

export default PartnerLinkCards;
