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
import {StyleSheet, View} from 'react-native';
import {Badge, LabelText, Text} from '@axelor/aos-mobile-ui';
import {
  formatDate,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';

interface InventoryHeaderProps {
  reference: string;
  status: number;
  date?: string;
  stockLocation?: string;
}

const InventoryHeader = ({
  reference,
  status,
  date,
  stockLocation,
}: InventoryHeaderProps) => {
  const I18n = useTranslator();
  const {Inventory} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const _formatDate = useMemo(() => {
    if (date == null) {
      return null;
    }
    const _date = formatDate(date, I18n.t('Base_DateFormat'));

    return <Text style={styles.text_secondary}>{_date}</Text>;
  }, [I18n, date]);

  return (
    <View style={styles.infoContainer}>
      <View style={styles.refContainer}>
        <Text style={styles.text_important}>{reference}</Text>
        {_formatDate}
        {stockLocation && <LabelText iconName="house" title={stockLocation} />}
      </View>
      <View style={styles.badgeContainer}>
        <Badge
          color={getItemColor(Inventory?.statusSelect, status)}
          title={getItemTitle(Inventory?.statusSelect, status)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '2%',
  },
  refContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 24,
  },
  badgeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    marginHorizontal: 32,
    flexDirection: 'row-reverse',
  },
  text_important: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text_secondary: {
    fontSize: 14,
  },
  iconText: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
});

export default InventoryHeader;
