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
import {StyleSheet, View} from 'react-native';
import {Alert, Icon, LabelText} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {CustomerSearchBar} from '../../organisms';
import {CompanyPicker} from '../../templates';
import {updateCart} from '../../../features/cartSlice';

interface CartHeaderProps {
  style?: any;
}

const CartHeader = ({style}: CartHeaderProps) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.sale.db.Cart',
  });

  const {activeCart} = useSelector((state: any) => state.sale_cart);
  const {userId} = useSelector((state: any) => state.auth);
  const {user} = useSelector((state: any) => state.user);

  const [popupIsVisible, setPopupIsVisible] = useState(false);

  const canModifyCompany = useMemo(
    () => user?.companySet?.length > 1 && !readonly,
    [readonly, user?.companySet?.length],
  );

  const handleUpdateCart = useCallback(
    ({newCustomer, newCompany}: {newCustomer?: any; newCompany?: any}) => {
      dispatch(
        (updateCart as any)({
          partnerId: newCustomer?.id,
          companyId: newCompany?.id,
          cartId: activeCart?.id,
          cartVersion: activeCart?.version,
          userId,
        }),
      );
    },
    [activeCart?.id, activeCart?.version, dispatch, userId],
  );

  const handleUpdatePartner = useCallback(
    (newCustomer: any) => {
      handleUpdateCart({newCustomer});
    },
    [handleUpdateCart],
  );

  const handleUpdateCompany = useCallback(
    (newCompany: any) => {
      handleUpdateCart({newCompany});
      setPopupIsVisible(false);
    },
    [handleUpdateCart],
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <LabelText
          style={styles.label}
          iconName="building"
          size={16}
          title={activeCart?.company?.name}
        />
        {canModifyCompany && (
          <Icon
            size={16}
            name="pencil-fill"
            touchable
            onPress={() => setPopupIsVisible(true)}
          />
        )}
      </View>
      {readonly ? (
        <LabelText
          style={styles.label}
          iconName="person-fill"
          size={16}
          title={activeCart?.partner?.fullName}
        />
      ) : (
        <CustomerSearchBar
          onChange={handleUpdatePartner}
          defaultValue={activeCart?.partner}
          companyId={activeCart?.company?.id}
        />
      )}
      <Alert
        title={I18n.t('User_Company')}
        visible={popupIsVisible}
        translator={I18n.t}
        cancelButtonConfig={{
          showInHeader: true,
          onPress: () => setPopupIsVisible(false),
        }}>
        <CompanyPicker
          style={styles.picker}
          setCompany={handleUpdateCompany}
          company={activeCart?.company}
          emptyValue={false}
        />
      </Alert>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    marginLeft: 24,
    marginRight: 5,
  },
  picker: {
    width: '100%',
  },
});

export default CartHeader;
