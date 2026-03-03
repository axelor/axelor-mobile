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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  checkNullString,
  DateDisplay,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
  useCurrencyFormat,
} from '@axelor/aos-mobile-core';
import {ObjectCard, TextUnit} from '@axelor/aos-mobile-ui';
import StateBadge from '../StateBadge/StateBadge';
import SaleOrderCardTitle from './SaleOrderCardTitle';

interface SaleOrderCardProps {
  style?: any;
  statusSelect: number;
  sequence: string;
  orderBeingEdited: boolean;
  externalReference: string;
  clientPartnerName: string;
  companyName: string;
  tradingName: string;
  orderDate: string;
  WTPrice: number;
  ATIPrice: number;
  currency: {symbol: string; id: number};
  deliveryState: number;
  invoicingState: number;
  onPress: () => void;
}

const SaleOrderCard = ({
  style,
  statusSelect,
  sequence,
  orderBeingEdited,
  externalReference,
  clientPartnerName,
  companyName,
  tradingName,
  orderDate,
  WTPrice,
  ATIPrice,
  currency,
  deliveryState,
  invoicingState,
  onPress,
}: SaleOrderCardProps) => {
  const I18n = useTranslator();
  const {SaleOrder} = useTypes();
  const {getItemColor} = useTypeHelpers();
  const formatCurrencyPrice = useCurrencyFormat();

  const formatPrice = useCallback(
    (amount: string | number) => formatCurrencyPrice(amount, currency?.id),
    [formatCurrencyPrice, currency?.id],
  );

  const {base: baseConfig} = useSelector((state: any) => state.appConfig);
  const {companyList} = useSelector((state: any) => state.company);

  const styles = useMemo(
    () =>
      getStyles(
        getItemColor(SaleOrder?.statusSelect, statusSelect)?.background,
      ),
    [getItemColor, SaleOrder?.statusSelect, statusSelect],
  );

  const companyFullName = useMemo(() => {
    const _companyName =
      baseConfig?.enableMultiCompany && companyList?.length > 1
        ? companyName
        : '';
    const _tradingName =
      baseConfig?.enableTradingNamesManagement && !checkNullString(tradingName)
        ? tradingName
        : '';
    const separator =
      !checkNullString(_companyName) && !checkNullString(_tradingName)
        ? ' - '
        : '';

    return `${_companyName}${separator}${_tradingName}`;
  }, [baseConfig, companyList, companyName, tradingName]);

  const displayBadges = useMemo(
    () => statusSelect > SaleOrder?.statusSelect?.Finalized,
    [SaleOrder?.statusSelect?.Finalized, statusSelect],
  );

  const deliveredStateBadgeType = useMemo(() => {
    switch (deliveryState) {
      case SaleOrder?.deliveryState.Delivered:
        return 'done';
      case SaleOrder?.deliveryState.PartiallyDelivered:
        return 'partially';
      default:
        return 'not';
    }
  }, [deliveryState, SaleOrder?.deliveryState]);

  const invoicedStateBadgeType = useMemo(() => {
    switch (invoicingState) {
      case SaleOrder?.invoicingState.Invoiced:
        return 'done';
      case SaleOrder?.invoicingState.PartiallyInvoiced:
        return 'partially';
      default:
        return 'not';
    }
  }, [invoicingState, SaleOrder?.invoicingState]);

  return (
    <View style={style}>
      <ObjectCard
        style={styles.container}
        leftContainerFlex={2}
        iconLeftMargin={5}
        onPress={onPress}
        upperTexts={{
          items: [
            {
              customComponent: (
                <SaleOrderCardTitle
                  title={sequence}
                  isIconVisible={orderBeingEdited}
                />
              ),
            },
            {
              iconName: 'tag-fill',
              indicatorText: externalReference,
              hideIfNull: true,
            },
            {
              iconName: 'person-fill',
              indicatorText: clientPartnerName,
              numberOfLines: 2,
              hideIfNull: true,
            },
            {
              iconName: 'building-fill',
              indicatorText: companyFullName,
              hideIfNull: true,
            },
            {
              customComponent: <DateDisplay date={orderDate} size={14} />,
            },
          ],
        }}
        sideBadges={{
          items: [
            {
              customComponent: (
                <TextUnit
                  title={I18n.t('Sale_WT')}
                  value={formatPrice(WTPrice)}
                  unit={currency?.symbol}
                  fontSize={16}
                  defaultColor
                />
              ),
            },
            {
              customComponent: (
                <TextUnit
                  title={I18n.t('Sale_ATI')}
                  value={formatPrice(ATIPrice)}
                  unit={currency?.symbol}
                  fontSize={16}
                />
              ),
            },
          ],
        }}
        lowerBadges={
          displayBadges && {
            fixedOnRightSide: true,
            items: [
              {
                customComponent: (
                  <StateBadge
                    style={styles.stateBadge}
                    title={I18n.t('Sale_Delivered')}
                    type={deliveredStateBadgeType}
                  />
                ),
              },
              {
                customComponent: (
                  <StateBadge
                    style={styles.stateBadge}
                    title={I18n.t('Sale_Invoiced')}
                    type={invoicedStateBadgeType}
                  />
                ),
              },
            ],
          }
        }
      />
    </View>
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '96%',
      alignSelf: 'center',
      marginVertical: 3,
      paddingRight: 5,
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
    stateBadge: {
      marginTop: 5,
      marginHorizontal: 2,
    },
  });

export default SaleOrderCard;
