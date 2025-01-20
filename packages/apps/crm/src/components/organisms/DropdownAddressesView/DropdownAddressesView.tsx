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

import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  useTranslator,
  linkingProvider,
  useDispatch,
  useSelector,
  clipboardProvider,
} from '@axelor/aos-mobile-core';
import {HorizontalRule, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchPartnerAddresses} from '../../../features/partnerSlice';

interface PartnerAddress {
  id: number;
  address: {
    fullName: string;
  };
  isDefaultAddr?: boolean;
  isDeliveryAddr?: boolean;
  isInvoicingAddr?: boolean;
}

const DropdownAddressesView = ({partnerId}: {partnerId: number}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {partnerAddressList} = useSelector(state => state.partner);

  useEffect(() => {
    dispatch((fetchPartnerAddresses as any)({partnerId}));
  }, [dispatch, partnerId]);

  const renderAddressItem = useCallback(
    (partnerAddress: PartnerAddress, index: number, self: PartnerAddress[]) => {
      const isLastItem = index === self.length - 1;

      let icons: any[] = [
        {name: 'star', showIf: partnerAddress.isDefaultAddr},
        {name: 'card-list', showIf: partnerAddress.isInvoicingAddr},
        {name: 'cart-fill', showIf: partnerAddress.isDeliveryAddr},
      ].filter(_i => _i.showIf);

      if (icons.length === 3) {
        icons = [{name: 'star-fill', color: Colors.progressColor.background}];
      }

      const address = partnerAddress.address?.fullName;

      return (
        <View key={partnerAddress.id}>
          <TouchableOpacity
            style={styles.container}
            onPress={() => console.log('edit')}>
            <View style={styles.containerIcons}>
              {icons.map((icon, idx) => (
                <Icon key={idx} name={icon.name} color={icon.color} />
              ))}
            </View>
            <Text fontSize={14} style={styles.title}>
              {address}
            </Text>
            <View style={styles.containerActions}>
              <Icon
                name="pin-map-fill"
                touchable
                onPress={() => linkingProvider.openMapApp(address)}
              />
              <Icon
                name="copy"
                touchable
                onPress={() => clipboardProvider.copyToClipboard(address)}
              />
            </View>
          </TouchableOpacity>
          {!isLastItem && <HorizontalRule style={styles.borderBottom} />}
        </View>
      );
    },
    [Colors],
  );

  if (!Array.isArray(partnerAddressList) || partnerAddressList.length === 0) {
    return (
      <View>
        <Text>{I18n.t('Crm_NoAddressInformation')}</Text>
      </View>
    );
  }

  return <View>{partnerAddressList.map(renderAddressItem)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7,
    paddingHorizontal: 10,
  },
  containerIcons: {
    flexDirection: 'column',
    marginRight: 10,
    gap: 5,
  },
  title: {
    flex: 1,
  },
  containerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  borderBottom: {
    width: '100%',
    marginVertical: 5,
  },
});

export default DropdownAddressesView;
