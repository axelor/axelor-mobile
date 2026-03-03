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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator, useTypes, useTypeHelpers} from '@axelor/aos-mobile-core';
import {
  Badge,
  InfoBubble,
  LabelText,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {StateBadge, TaxModeBadge} from '../../atoms';

interface SaleOrderHeaderProps {
  saleOrder: any;
}

const SaleOrderHeader = ({saleOrder}: SaleOrderHeaderProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {SaleOrder} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  const displayStateBadges = useMemo(
    () => saleOrder.statusSelect > SaleOrder?.statusSelect.Finalized,
    [saleOrder.statusSelect, SaleOrder?.statusSelect.Finalized],
  );

  const deliveredStateBadgeType = useMemo(() => {
    switch (saleOrder.deliveryState) {
      case SaleOrder?.deliveryState.Delivered:
        return 'done';
      case SaleOrder?.deliveryState.PartiallyDelivered:
        return 'partially';
      default:
        return 'not';
    }
  }, [saleOrder.deliveryState, SaleOrder?.deliveryState]);

  const invoicedStateBadgeType = useMemo(() => {
    switch (saleOrder.invoicingState) {
      case SaleOrder?.invoicingState.Invoiced:
        return 'done';
      case SaleOrder?.invoicingState.PartiallyInvoiced:
        return 'partially';
      default:
        return 'not';
    }
  }, [saleOrder.invoicingState, SaleOrder?.invoicingState]);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.title}>
          {saleOrder.orderBeingEdited && (
            <InfoBubble
              style={styles.infoBubble}
              iconName="exclamation-triangle-fill"
              badgeColor={Colors.warningColor}
              indication={I18n.t('Sale_OrderBeingEdited')}
              coloredBubble={false}
            />
          )}
          <Text writingType="title">{saleOrder.saleOrderSeq}</Text>
        </View>
        <Badge
          title={getItemTitle(SaleOrder?.statusSelect, saleOrder.statusSelect)}
          color={getItemColor(SaleOrder?.statusSelect, saleOrder.statusSelect)}
        />
      </View>
      <View style={styles.rowContainer}>
        <View>
          {saleOrder.externalReference && (
            <LabelText
              iconName="tag-fill"
              size={16}
              title={saleOrder.externalReference}
              textStyle={styles.labelText}
            />
          )}
          <LabelText
            iconName="clock-history"
            size={16}
            title={I18n.t('Sale_Version')}
            value={saleOrder.version}
            textStyle={styles.labelText}
          />
        </View>
        <View>
          <View style={styles.badgesContainer}>
            {saleOrder.oneoffSale && (
              <Badge
                title={I18n.t('Sale_OneOffSale')}
                color={Colors.cautionColor}
              />
            )}
            {saleOrder.saleOrderTypeSelect ===
              SaleOrder?.saleOrderTypeSelect.Subscription && (
              <Badge
                title={I18n.t('Sale_Subscription')}
                color={Colors.plannedColor}
              />
            )}
            <TaxModeBadge inAti={saleOrder.inAti} type="sale" />
          </View>
          {displayStateBadges && (
            <View style={styles.badgesContainer}>
              <StateBadge
                style={styles.stateBadge}
                title={I18n.t('Sale_Delivered')}
                type={deliveredStateBadgeType}
              />
              <StateBadge
                style={styles.stateBadge}
                title={I18n.t('Sale_Invoiced')}
                type={invoicedStateBadgeType}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  title: {
    flexDirection: 'row',
  },
  infoBubble: {
    marginRight: 8,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 3,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 3,
  },
  stateBadge: {
    margin: '1%',
  },
});

export default SaleOrderHeader;
