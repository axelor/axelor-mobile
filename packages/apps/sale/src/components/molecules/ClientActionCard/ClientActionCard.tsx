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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {linkingProvider} from '@axelor/aos-mobile-core';
import {CardIconButton, useThemeColor} from '@axelor/aos-mobile-ui';
import {ClientCard} from '../../atoms';

interface ClientActionCardProps {
  style?: any;
  client: any;
  onPress: () => void;
}

const ClientActionCard = ({style, client, onPress}: ClientActionCardProps) => {
  const Colors = useThemeColor();

  const address = useMemo(
    () => client?.mainAddress?.fullName,
    [client?.mainAddress?.fullName],
  );

  const phone = useMemo(
    () => client?.mobilePhone || client?.fixedPhone,
    [client?.mobilePhone, client?.fixedPhone],
  );

  return (
    <View style={[styles.container, style]}>
      <ClientCard
        style={styles.cardContainer}
        {...client}
        address={address}
        phone={phone}
        onPress={onPress}
      />
      {(address || phone) && (
        <View style={styles.flexOne}>
          {address && (
            <CardIconButton
              style={styles.flexOne}
              iconName="geo-alt-fill"
              iconColor={Colors.secondaryColor_dark.background}
              onPress={() => linkingProvider.openMapApp(address)}
            />
          )}
          {phone && (
            <CardIconButton
              style={styles.flexOne}
              iconName="telephone-fill"
              iconColor={Colors.secondaryColor_dark.background}
              onPress={() => linkingProvider.openCallApp(phone)}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '96%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 2,
  },
  cardContainer: {
    flex: 6,
    margin: 2,
  },
  flexOne: {
    flex: 1,
  },
});

export default ClientActionCard;
