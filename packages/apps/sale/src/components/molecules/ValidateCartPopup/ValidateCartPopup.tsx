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

import React, {useCallback, useEffect, useState} from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Alert, useThemeColor, LabelText} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  useNavigation,
  useSelector,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {updateCart} from '../../../features/cartSlice';
import {CustomerSearchBar} from '../../organisms';

const CLIENT_CREATION_EVENT = 'sale.client-creation';

interface ValidateCartPopupProps {
  style?: any;
  visible: boolean;
  onClose: () => void;
  handleValidate?: (cart?: any) => void;
}

const ValidateCartPopup = ({
  style,
  visible,
  onClose,
  handleValidate,
}: ValidateCartPopupProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const dispatch: any = useDispatch();

  const {activeCart} = useSelector(state => state.sale_cart);
  const {userId} = useSelector(state => state.auth);

  const [customerSelected, setCustomerSelected] = useState(null);

  const handleLinkCustomer = useCallback(
    ({id: customerId}: {id: number}) => {
      dispatch(
        (updateCart as any)({
          partnerId: customerId,
          cartId: activeCart?.id,
          cartVersion: activeCart?.version,
          userId,
        }),
      ).then((action: any) => {
        if (action?.payload?.payload != null) {
          handleValidate?.(action.payload.payload);
        }
      });
    },
    [activeCart?.id, activeCart?.version, dispatch, handleValidate, userId],
  );

  const handleClientCreation = useCallback(() => {
    navigation.navigate('ClientSaleFormScreen', {
      eventName: CLIENT_CREATION_EVENT,
    });
  }, [navigation]);

  useEffect(() => {
    DeviceEventEmitter.addListener(CLIENT_CREATION_EVENT, handleLinkCustomer);

    return () => {
      DeviceEventEmitter.removeAllListeners(CLIENT_CREATION_EVENT);
    };
  }, [handleLinkCustomer]);

  return (
    <Alert
      title={I18n.t('Sale_LinkQuotationToCustomer')}
      style={style}
      visible={visible}
      cancelButtonConfig={{title: null, onPress: onClose, width: 50}}
      confirmButtonConfig={{
        title: null,
        onPress: () => handleLinkCustomer(customerSelected),
        disabled: customerSelected == null,
        width: 50,
      }}
      translator={I18n.t}>
      <View style={styles.container}>
        <CustomerSearchBar
          style={styles.searchBar}
          onChange={setCustomerSelected}
          defaultValue={customerSelected}
          companyId={activeCart?.company?.id}
        />
        <TouchableOpacity onPress={handleClientCreation}>
          <LabelText
            iconName="plus-lg"
            color={Colors.primaryColor.background}
            title={I18n.t('Sale_CreateNewCustomer')}
            size={16}
          />
        </TouchableOpacity>
      </View>
    </Alert>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    gap: 5,
  },
  searchBar: {
    width: '100%',
  },
});

export default ValidateCartPopup;
