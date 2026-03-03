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
import {clipboardProvider, linkingProvider} from '@axelor/aos-mobile-core';
import {Icon, Text} from '@axelor/aos-mobile-ui';

interface AdressLineProps {
  address: string;
}

const AdressLine = ({address}: AdressLineProps) => {
  const _address = useMemo(() => address.replace(/\n/g, ' '), [address]);

  return (
    <View style={styles.container}>
      <Text style={styles.addressText} fontSize={14} numberOfLines={2}>
        {_address}
      </Text>
      <View style={styles.iconContainer}>
        <Icon
          style={styles.marginLeft}
          name="pin-map-fill"
          touchable={true}
          onPress={() => linkingProvider.openMapApp(_address)}
        />
        <Icon
          style={styles.marginLeft}
          name="copy"
          touchable={true}
          onPress={() => clipboardProvider.copyToClipboard(_address)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressText: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  marginLeft: {
    marginLeft: 8,
  },
});

export default AdressLine;
