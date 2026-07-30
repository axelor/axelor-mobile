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

import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Screen,
  ScrollList,
  HeaderContainer,
  Text,
  ObjectCard,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {splitSaleOrderRef} from '../../utils';
import {ManufacturingOrderHeader} from '../../components';

const IS_INFINITE_SCROLL_ENABLED = false;

const ManufacturingOrderListSaleOrderScreen = ({route}: any) => {
  const {manufOrder} = route?.params ?? {};
  const I18n = useTranslator();

  return (
    <Screen>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ManufacturingOrderHeader
            parentMO={manufOrder.parentMO}
            reference={manufOrder.manufOrderSeq}
            status={manufOrder.statusSelect}
            priority={manufOrder.prioritySelect}>
            <Text style={styles.orderTitle} writingType="important">
              {I18n.t('Manufacturing_RefClient')}
            </Text>
          </ManufacturingOrderHeader>
        }
      />
      <ScrollList
        loadingList={IS_INFINITE_SCROLL_ENABLED}
        data={manufOrder.saleOrderSet}
        fetchData={() => {}}
        moreLoading={false}
        renderItem={({item}: any) => {
          const saleOrderRef = splitSaleOrderRef(item.fullName);
          return (
            <ObjectCard
              touchable={false}
              showArrow={false}
              upperTexts={{
                items: [
                  {indicatorText: saleOrderRef.ref, iconName: 'tag-fill'},
                  {indicatorText: saleOrderRef.client, iconName: 'person-fill'},
                ],
              }}
            />
          );
        }}
        isListEnd={!IS_INFINITE_SCROLL_ENABLED}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  orderTitle: {
    marginHorizontal: 24,
  },
});

export default ManufacturingOrderListSaleOrderScreen;
