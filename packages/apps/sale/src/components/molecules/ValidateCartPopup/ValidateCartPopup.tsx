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

import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Alert} from '@axelor/aos-mobile-ui';
import {useTranslator, useSelector, useDispatch} from '@axelor/aos-mobile-core';
import {updateCart} from '../../../features/cartSlice';
import {CustomerSearchBar} from '../../organisms';

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
  const dispatch: any = useDispatch();

  const {activeCart} = useSelector((state: any) => state.sale_cart);
  const {userId} = useSelector((state: any) => state.auth);

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

  return (
    <Alert
      title={I18n.t('Sale_LinkQuotationToCustomer')}
      style={style}
      visible={visible}
      cancelButtonConfig={{
        title: null,
        onPress: onClose,
        width: 50,
      }}
      confirmButtonConfig={{
        title: null,
        onPress: () => handleLinkCustomer(customerSelected),
        disabled: customerSelected == null,
        width: 50,
      }}
      translator={I18n.t}>
      <CustomerSearchBar
        style={styles.searchBar}
        onChange={setCustomerSelected}
        defaultValue={customerSelected}
      />
    </Alert>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',
  },
});

export default ValidateCartPopup;
