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

import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  handlerApiCall,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  AddressListCard,
  ContactInfoAlert,
  ContactInfoType,
} from '../../molecules';
import {fetchPartnerAddresses} from '../../../features/partnerSlice';
import {addPartnerAddressApi} from '../../../api';

interface DropdownAddressesViewProps {
  partnerId: number;
  partnerVersion: number;
  refreshContactInfos: () => void;
}

const DropdownAddressesView = ({
  partnerId,
  partnerVersion,
  refreshContactInfos,
}: DropdownAddressesViewProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.base.db.PartnerAddress',
  });
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);

  const {userId} = useSelector((state: any) => state.auth);
  const {partnerAddressList} = useSelector(state => state.partner);

  const getState = useCallback(() => ({auth: {userId}}), [userId]);

  const addPartnerAddress = useCallback(
    ({data}) => {
      const dataApi = {
        partnerId,
        partnerVersion,
        ...data,
      };

      return handlerApiCall({
        fetchFunction: addPartnerAddressApi,
        data: dataApi,
        action: 'Crm_ApiAction_AddAddress',
        getState,
        responseOptions: {showToast: true},
      });
    },
    [getState, partnerId, partnerVersion],
  );

  useEffect(() => {
    dispatch((fetchPartnerAddresses as any)({partnerId}));
  }, [dispatch, partnerId]);

  if (
    (!Array.isArray(partnerAddressList) || partnerAddressList.length === 0) &&
    !canCreate
  ) {
    return (
      <View>
        <Text>{I18n.t('Crm_NoAddressInformation')}</Text>
      </View>
    );
  }

  return (
    <>
      <View>
        {partnerAddressList.map((partnerAddress, index) => (
          <AddressListCard
            partnerId={partnerId}
            partnerVersion={partnerVersion}
            partnerAddress={partnerAddress}
            borderBottom={index !== partnerAddressList.length - 1 || canCreate}
            refreshContactInfos={refreshContactInfos}
            key={index}
          />
        ))}
        {canCreate && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsVisible(true)}>
            <Icon
              style={styles.addButtonIcon}
              name="plus-lg"
              color={Colors.secondaryColor.background}
            />
            <Text textColor={Colors.secondaryColor.background}>
              {I18n.t('Base_Add')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ContactInfoAlert
        title={I18n.t('Crm_Address')}
        contactInfoType={ContactInfoType.type.Address}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onUpdate={addPartnerAddress}
        refreshContactInfos={refreshContactInfos}
      />
    </>
  );
};

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  addButtonIcon: {
    marginRight: 5,
  },
});

export default DropdownAddressesView;
