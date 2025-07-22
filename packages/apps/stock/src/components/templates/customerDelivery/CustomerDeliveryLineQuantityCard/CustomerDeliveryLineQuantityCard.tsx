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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useTranslator,
  useSelector,
  isEmpty,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  Badge,
  LabelText,
  QuantityCard,
  useThemeColor,
  useDigitFormat,
} from '@axelor/aos-mobile-ui';
import {useMassIndicatorChecker} from '../../../../providers';

const CustomerDeliveryLineQuantityCard = ({
  customerDelivery,
  customerDeliveryLine,
  realQty,
  setRealQty,
  readonly = false,
}: {
  customerDelivery: any;
  customerDeliveryLine?: any;
  realQty: number;
  setRealQty: (value: number) => void;
  readonly?: boolean;
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const formatNumber = useDigitFormat();
  const {StockMove} = useTypes();
  const {getMassIndicator, massUnitLabel} = useMassIndicatorChecker();

  const {productFromId: product} = useSelector((state: any) => state.product);

  const indicatorBadge = useMemo(
    () =>
      Number(customerDeliveryLine?.qty) !==
      Number(customerDeliveryLine?.realQty)
        ? {title: I18n.t('Stock_Status_Incomplete'), color: Colors.cautionColor}
        : {title: I18n.t('Stock_Status_Complete'), color: Colors.successColor},
    [Colors, I18n, customerDeliveryLine],
  );

  const askedQty = useMemo(
    () =>
      `${formatNumber(customerDeliveryLine?.qty)} ${
        isEmpty(customerDeliveryLine)
          ? product?.unit?.name
          : customerDeliveryLine.unit?.name
      }`,
    [customerDeliveryLine, formatNumber, product?.unit?.name],
  );

  const massIndicator = useMemo(
    () => getMassIndicator(customerDeliveryLine?.totalNetMass),
    [getMassIndicator, customerDeliveryLine?.totalNetMass],
  );

  return (
    <QuantityCard
      labelQty={I18n.t('Stock_PickedQty')}
      defaultValue={realQty}
      onValueChange={setRealQty}
      editable={
        !readonly &&
        customerDelivery.statusSelect < StockMove?.statusSelect.Realized
      }
      isBigButton={true}
      translator={I18n.t}>
      <View style={styles.headerQuantityCard}>
        <LabelText title={`${I18n.t('Stock_AskedQty')} :`} value={askedQty} />
        {customerDeliveryLine != null && <Badge {...indicatorBadge} />}
      </View>
      {customerDeliveryLine?.totalNetMass != null && (
        <LabelText
          iconName={massIndicator?.icon ?? 'box-seam-fill'}
          title={`${I18n.t('Stock_TotalMass')} :`}
          value={`${customerDeliveryLine?.totalNetMass} ${massUnitLabel ?? ''}`}
          color={massIndicator?.color?.background}
        />
      )}
    </QuantityCard>
  );
};

const styles = StyleSheet.create({
  headerQuantityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default CustomerDeliveryLineQuantityCard;
