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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  checkNullString,
  DateDisplay,
  useSelector,
  useTranslator,
  useTypes,
  useTypeHelpers,
} from '@axelor/aos-mobile-core';
import {ObjectCard, TextUnit, usePriceFormat} from '@axelor/aos-mobile-ui';
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
  currencySymbol: string;
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
  currencySymbol,
  deliveryState,
  invoicingState,
  onPress,
}: SaleOrderCardProps) => {
  const I18n = useTranslator();
  const {SaleOrder} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();
  const formatPrice = usePriceFormat();

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

  return (
    <View style={style}>
      <ObjectCard
        style={styles.container}
        leftContainerFlex={2}
        iconLeftMargin={10}
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
                  style={styles.textUnit}
                  title={I18n.t('Sales_WT')}
                  value={formatPrice(WTPrice)}
                  unit={currencySymbol}
                  defaultColor
                />
              ),
            },
            {
              customComponent: (
                <TextUnit
                  style={styles.textUnit}
                  title={I18n.t('Sales_ATI')}
                  value={formatPrice(ATIPrice)}
                  unit={currencySymbol}
                />
              ),
            },
          ],
        }}
        lowerBadges={
          displayBadges && {
            style: styles.badgesContainer,
            items: [
              {
                displayText: getItemTitle(
                  SaleOrder?.deliveryState,
                  deliveryState,
                ),
                color: getItemColor(SaleOrder?.deliveryState, deliveryState),
                style: styles.badge,
              },
              {
                displayText: getItemTitle(
                  SaleOrder?.invoicingState,
                  invoicingState,
                ),
                color: getItemColor(SaleOrder?.invoicingState, invoicingState),
                style: styles.badge,
              },
            ],
          }
        }
      />
    </View>
  );
};

const getStyles = color =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '96%',
      alignSelf: 'center',
      marginVertical: 3,
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
    textUnit: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    badgesContainer: {
      justifyContent: 'flex-end',
    },
    badge: {
      width: null,
      paddingHorizontal: 5,
    },
  });

export default SaleOrderCard;
