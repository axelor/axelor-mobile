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

import React, {useEffect} from 'react';
import {View} from 'react-native';
import {
  useTranslator,
  linkingProvider,
  useDispatch,
  useSelector,
  clipboardProvider,
} from '@axelor/aos-mobile-core';
import {Icon, Text} from '@axelor/aos-mobile-ui';
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
  const dispatch = useDispatch();

  const {partnerAddress} = useSelector(state => state.partner);

  console.log(partnerAddress);

  useEffect(() => {
    const idList = partnerAddressList?.map(item => item.id);
    dispatch((fetchPartnerAddressByIds as any)({partnerAddressIds: idList}));
  }, [dispatch, partnerAddressList]);

  const renderAddressItem = (_partnerAddress: Address) => {
    return (
      <View key={_partnerAddress.id}>
        <Text>{_partnerAddress.address?.fullName}</Text>
        <Icon
          name="copy"
          touchable
          onPress={() =>
            clipboardProvider.copyToClipboard(_partnerAddress.address?.fullName)
          }
        />
        <Icon
          name="clipboard-fill"
          touchable
          onPress={() =>
            linkingProvider.openMapApp(_partnerAddress.address?.fullName)
          }
        />
        <Icon name="card-list" visible={_partnerAddress.isDefaultAddr} />

        <Icon name="cart-fill" visible={_partnerAddress.isDeliveryAddr} />

        <Icon name="star" visible={_partnerAddress.isInvoicingAddr} />
      </View>
    );
  };

  if (!partnerAddressList || partnerAddressList.length === 0) {
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

export default DropdownAddressView;
