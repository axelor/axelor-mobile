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

import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  SearchListView,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Screen, ToggleButton} from '@axelor/aos-mobile-ui';
import {CategorySearchBar, ClientActionCard} from '../../components';
import {searchCustomer} from '../../features/customerSlice';

const ClientSaleListScreen = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const [isAsssignedToMe, setIsAsssignedToMe] = useState(true);
  const [category, setCategory] = useState(null);

  const {user} = useSelector(state => state.user);
  const {loading, moreLoading, isListEnd, customerList} = useSelector(
    (state: any) => state.sale_customer,
  );

  const sliceFunctionData = useMemo(
    () => ({
      isAsssignedToMe,
      userId: user.id,
      categoryId: category?.id,
      companyId: user.activeCompany?.id,
    }),
    [category, isAsssignedToMe, user],
  );

  return (
    <Screen removeSpaceOnTop>
      <SearchListView
        list={customerList}
        loading={loading}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={searchCustomer}
        sliceFunctionData={sliceFunctionData}
        searchPlaceholder={I18n.t('Base_Search')}
        fixedItems={
          <View style={styles.headerContainer}>
            <ToggleButton
              buttonConfig={{
                iconName: 'person-fill',
                width: '10%',
                style: styles.toggleButton,
              }}
              isActive={isAsssignedToMe}
              onPress={() => setIsAsssignedToMe(current => !current)}
            />
            <CategorySearchBar
              style={styles.categoryPicker}
              defaultValue={category}
              onChange={setCategory}
            />
          </View>
        }
        expandableFilter={false}
        renderListItem={({item}) => (
          <ClientActionCard
            client={item}
            onPress={() =>
              navigation.navigate('ClientSaleDetailsScreen', {
                customerId: item.id,
              })
            }
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    height: 40,
  },
  categoryPicker: {
    width: '85%',
  },
});

export default ClientSaleListScreen;
