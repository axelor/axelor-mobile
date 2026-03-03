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
import {
  formatDate,
  PeriodDisplay,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  ObjectCard,
  TextUnit,
  useDigitFormat,
  usePriceFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

interface PriceListCardProps {
  style?: any;
  isActive: boolean;
  title: string;
  minQty: number;
  typeSelect: number;
  startDate: string;
  endDate: string;
  amount: number;
  lineTypeSelect: number;
  amountTypeSelect: number;
  currency: string;
  nonNegotiable: boolean;
}

const PriceListCard = ({
  style,
  isActive,
  title,
  minQty,
  typeSelect,
  startDate,
  endDate,
  amount,
  lineTypeSelect,
  amountTypeSelect,
  currency,
  nonNegotiable,
}: PriceListCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const {PriceList, PriceListLine} = useTypes();
  const {getItemTitle} = useTypeHelpers();
  const formatNumber = useDigitFormat();
  const formatPrice = usePriceFormat();

  const styles = useMemo(() => {
    const color = isActive ? Colors.successColor : Colors.warningColor;
    return getStyles(color.background);
  }, [isActive, Colors]);

  const hidePeriod = useMemo(
    () => startDate == null || endDate == null,
    [endDate, startDate],
  );

  const unitTextUnit = useMemo(
    () =>
      amountTypeSelect === PriceListLine?.amountTypeSelect.InPercent
        ? '%'
        : currency,
    [PriceListLine?.amountTypeSelect, amountTypeSelect, currency],
  );

  const valueTextUnit = useMemo(() => {
    let sign = null;
    switch (lineTypeSelect) {
      case PriceListLine?.typeSelect.Discount:
        sign = '-';
        break;
      case PriceListLine?.typeSelect.Increase:
        sign = '+';
        break;
      default:
        sign = '';
        break;
    }

    const formattedAmount =
      unitTextUnit === currency ? formatPrice(amount) : formatNumber(amount);
    return `${sign} ${formattedAmount}`;
  }, [
    PriceListLine?.typeSelect,
    amount,
    currency,
    formatNumber,
    formatPrice,
    lineTypeSelect,
    unitTextUnit,
  ]);

  return (
    <View style={style}>
      <ObjectCard
        style={styles.container}
        leftContainerFlex={2}
        touchable={false}
        showArrow={false}
        upperTexts={{
          items: [
            {
              displayText: title,
              isTitle: true,
            },
            {
              indicatorText: I18n.t('Sale_MinimalQuantity'),
              displayText: formatNumber(minQty),
            },
            {
              indicatorText: I18n.t('Sale_Type'),
              displayText: getItemTitle(PriceList?.typeSelect, typeSelect),
            },
            {
              indicatorText: I18n.t('Base_StartDate'),
              displayText: formatDate(startDate, I18n.t('Base_DateFormat')),
              hideIf: startDate == null || !hidePeriod,
            },
            {
              indicatorText: I18n.t('Base_EndDate'),
              displayText: formatDate(endDate, I18n.t('Base_DateFormat')),
              hideIf: endDate == null || !hidePeriod,
            },
            {
              customComponent: (
                <PeriodDisplay startDate={startDate} endDate={endDate} />
              ),
              hideIf: hidePeriod,
            },
          ],
        }}
        sideBadges={{
          style: styles.sideContainer,
          items: [
            {
              customComponent: (
                <TextUnit value={valueTextUnit} unit={unitTextUnit} />
              ),
            },
            {
              displayText: I18n.t('Sale_NonNegotiable'),
              color: Colors.warningColor,
              style: styles.badge,
              showIf: nonNegotiable,
            },
          ],
        }}
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
      paddingRight: 5,
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
    sideContainer: {
      height: null,
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    badge: {
      width: null,
      paddingHorizontal: 5,
    },
  });

export default PriceListCard;
