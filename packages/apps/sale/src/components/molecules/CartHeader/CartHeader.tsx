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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {LabelText} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {CustomerSearchBar} from '../../organisms';
import {updateCart} from '../../../features/cartSlice';

interface CartHeaderProps {
  style?: any;
}

const CartHeader = ({style}: CartHeaderProps) => {
  const dispatch = useDispatch();

  const {activeCart} = useSelector((state: any) => state.sale_cart);
  const {userId} = useSelector((state: any) => state.auth);

  const handleChangeCustomer = useCallback(
    newCustomer => {
      dispatch(
        (updateCart as any)({
          partnerId: newCustomer?.id,
          cartId: activeCart?.id,
          cartVersion: activeCart?.version,
          userId,
        }),
      );
    },
    [activeCart?.id, activeCart?.version, dispatch, userId],
  );

  return (
    <View style={style}>
      <LabelText
        style={styles.label}
        iconName="building"
        size={16}
        title={activeCart?.company?.name}
      />
      <CustomerSearchBar
        onChange={handleChangeCustomer}
        defaultValue={activeCart?.partner}
        companyId={activeCart?.company?.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginHorizontal: 24,
    marginBottom: 5,
  },
});

export default CartHeader;
