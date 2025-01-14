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

import React, {useEffect, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useTranslator,
  linkingProvider,
  useDispatch,
  useSelector,
  clipboardProvider,
} from '@axelor/aos-mobile-core';
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchPartnerAddressByIds} from '../../../features/partnerSlice';

interface Address {
  id: number;
  address: {
    fullName: string;
  };
  isDefaultAddr?: boolean;
  isDeliveryAddr?: boolean;
  isInvoicingAddr?: boolean;
}

interface DropdownAddressViewProps {
  partnerAddressList: Address[];
}

const DropdownAddressView = ({
  partnerAddressList,
}: DropdownAddressViewProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {partnerAddress} = useSelector(state => state.partner);

  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  useEffect(() => {
    const idList = partnerAddressList?.map(item => item.id);
    dispatch((fetchPartnerAddressByIds as any)({partnerAddressIds: idList}));
  }, [dispatch, partnerAddressList]);

  const renderAddressItem = (_partnerAddress: Address, index: number) => {
    const isLastItem = index === partnerAddress.length - 1;

    const icons = [
      _partnerAddress.isInvoicingAddr && {name: 'star'},
      _partnerAddress.isDefaultAddr && {name: 'card-list'},
      _partnerAddress.isDeliveryAddr && {name: 'cart-fill'},
    ].filter(Boolean);

    return (
      <View style={styles.container} key={_partnerAddress.id}>
        <View style={styles.containerBody}>
          {icons.length === 1 && (
            <Icon name={icons[0].name} style={styles.leftIcon} />
          )}

          {icons.length === 2 && (
            <View style={styles.twoIconsStack}>
              {icons.map((icon, idx) => (
                <Icon key={idx} name={icon.name} />
              ))}
            </View>
          )}

          {icons.length === 3 && <Icon name="star" style={styles.leftIcon} />}

          <Text fontSize={14} style={styles.title}>
            {_partnerAddress.address?.fullName}
          </Text>
          <View style={styles.containerItem}>
            <Icon
              name="pin-map-fill"
              touchable
              onPress={() =>
                linkingProvider.openMapApp(_partnerAddress.address?.fullName)
              }
            />
            <Icon
              name="copy"
              touchable
              onPress={() =>
                clipboardProvider.copyToClipboard(
                  _partnerAddress.address?.fullName,
                )
              }
            />
            <Icon name="pencil-fill" touchable onPress={() => {}} />
          </View>
        </View>

        {!isLastItem && <View style={styles.borderBottom} />}
      </View>
    );
  };

  if (!partnerAddress || partnerAddress.length === 0) {
    return (
      <View>
        <Text>{I18n.t('Crm_NoAddressInformation')}</Text>
      </View>
    );
  }

  return (
    <View>
      {partnerAddress &&
        partnerAddress.length !== 0 &&
        partnerAddress.map(renderAddressItem)}
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      width: '95%',
      marginHorizontal: 5,
    },
    containerBody: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '2%',
    },
    containerItem: {
      flexDirection: 'row',
      gap: 10,
    },
    borderBottom: {
      width: '112%',
      left: '-5%',
      borderBottomWidth: 1.5,
      borderBottomColor: Colors.secondaryColor.background,
      marginVertical: '3%',
    },
    leftIcon: {
      marginRight: 10,
    },
    twoIconsStack: {
      flexDirection: 'column',
      marginRight: 10,
      gap: 5,
    },
    title: {
      flex: 1,
    },
  });

export default DropdownAddressView;
