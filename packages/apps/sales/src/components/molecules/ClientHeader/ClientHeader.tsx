/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {Badge, useThemeColor} from '@axelor/aos-mobile-ui';
import {ClientHeader as CrmClientHeader} from '@axelor/aos-mobile-crm';

interface ClientHeaderProps {
  customer: any;
}

const ClientHeader = ({customer}: ClientHeaderProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <View style={styles.container}>
      <CrmClientHeader />
      <View style={styles.badgesContainer}>
        {customer.factorizedCustomer && (
          <Badge
            style={styles.badge}
            title={I18n.t('Sales_Factorized')}
            color={Colors.progressColor}
          />
        )}
        {customer.hasBlockedAccount && (
          <Badge
            style={styles.badge}
            title={I18n.t('Sales_AccountBlocked')}
            color={Colors.progressColor}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badgesContainer: {
    marginRight: '5%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  badge: {
    width: '100%',
  },
});

export default ClientHeader;
