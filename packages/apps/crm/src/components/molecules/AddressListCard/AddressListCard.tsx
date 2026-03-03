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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  clipboardProvider,
  handlerApiCall,
  linkingProvider,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Icon, HorizontalRule, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {ContactInfoAlert, ContactInfoType} from '../ContactInfoCard';
import {deletePartnerAddressApi, updateAddressApi} from '../../../api';

interface PartnerAddress {
  id: number;
  address: {
    fullName: string;
  };
  isDefaultAddr?: boolean;
  isDeliveryAddr?: boolean;
  isInvoicingAddr?: boolean;
}

interface AddressListCardProps {
  partnerId: number;
  partnerVersion: number;
  partnerAddress: PartnerAddress;
  borderBottom?: boolean;
  refreshContactInfos: () => void;
}

const AddressListCard = ({
  partnerId,
  partnerVersion,
  partnerAddress,
  borderBottom = false,
  refreshContactInfos,
}: AddressListCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [isVisible, setIsVisible] = useState(false);

  const {userId} = useSelector((state: any) => state.auth);

  const address = useMemo(
    () => partnerAddress.address?.fullName,
    [partnerAddress.address?.fullName],
  );

  const icons = useMemo(() => {
    let _icons: any[] = [
      {name: 'star', showIf: partnerAddress.isDefaultAddr},
      {name: 'card-list', showIf: partnerAddress.isInvoicingAddr},
      {name: 'cart-fill', showIf: partnerAddress.isDeliveryAddr},
    ].filter(_i => _i.showIf);

    if (_icons.length === 3) {
      _icons = [{name: 'star-fill', color: Colors.progressColor.background}];
    }

    return _icons;
  }, [Colors.progressColor.background, partnerAddress]);

  const getState = useCallback(() => ({auth: {userId}}), [userId]);

  const updatePartnerAddress = useCallback(
    ({id, version, data}) => {
      const dataApi = {
        id: partnerId,
        version: partnerVersion,
        partnerAddress: {id, version},
        ...data,
      };

      return handlerApiCall({
        fetchFunction: updateAddressApi,
        data: dataApi,
        action: 'Crm_ApiAction_UpdateAddress',
        getState,
        responseOptions: {showToast: true},
      });
    },
    [getState, partnerId, partnerVersion],
  );

  const deletePartnerAddress = useCallback(
    ({id}) => {
      return handlerApiCall({
        fetchFunction: deletePartnerAddressApi,
        data: {id},
        action: 'Crm_ApiAction_DeleteAddress',
        getState,
        responseOptions: {showToast: true},
      });
    },
    [getState],
  );

  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.container}
          onPress={() => linkingProvider.openMapApp(address)}>
          <View style={styles.leftIconContainer}>
            {icons.map((icon, idx) => (
              <Icon key={idx} name={icon.name} color={icon.color} />
            ))}
          </View>
          <Text fontSize={14} style={styles.title}>
            {address}
          </Text>
          <View style={styles.rigthIconContainer}>
            <Icon
              style={styles.icon}
              name="copy"
              touchable
              onPress={() => clipboardProvider.copyToClipboard(address)}
            />
            <Icon
              style={styles.icon}
              name="pencil-fill"
              touchable={true}
              onPress={() => setIsVisible(true)}
            />
          </View>
        </TouchableOpacity>
        {borderBottom && <HorizontalRule style={styles.borderBottom} />}
      </View>
      <ContactInfoAlert
        title={I18n.t('Crm_Address')}
        contact={partnerAddress}
        contactInfoType={ContactInfoType.type.Address}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onDelete={deletePartnerAddress}
        onUpdate={updatePartnerAddress}
        refreshContactInfos={refreshContactInfos}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7,
    paddingHorizontal: 10,
  },
  leftIconContainer: {
    flexDirection: 'column',
    marginRight: 10,
    gap: 5,
  },
  title: {
    flex: 1,
  },
  rigthIconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 4,
  },
  borderBottom: {
    width: '100%',
    marginVertical: 5,
  },
});

export default AddressListCard;
