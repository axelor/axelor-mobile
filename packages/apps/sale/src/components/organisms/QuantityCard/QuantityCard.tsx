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
import {StyleSheet} from 'react-native';
import {Card, Increment, Text, useDigitFormat} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface QuantityCardProps {
  style?: any;
  labelQty: string;
  defaultValue: number;
  onValueChange: (value: number) => void;
}

const QuantityCard = ({
  style,
  labelQty,
  defaultValue = 0,
  onValueChange,
}: QuantityCardProps) => {
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();

  const _defaultValue = useMemo(
    () => formatNumber(defaultValue),
    [defaultValue, formatNumber],
  );

  return (
    <Card style={[styles.noChildrenContainer, style]}>
      <Text style={styles.noChildrenTextField}>{labelQty}</Text>
      <Increment
        value={_defaultValue}
        decimalSpacer={I18n.t('Base_DecimalSpacer')}
        thousandSpacer={I18n.t('Base_ThousandSpacer')}
        minValue={1}
        onValueChange={onValueChange}
        isBigButton={true}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  noChildrenContainer: {
    flexDirection: 'column',
    marginHorizontal: 16,
    marginBottom: '2%',
    alignItems: 'center',
  },
  noChildrenTextField: {
    fontSize: 16,
  },
  noChildrenTextValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuantityCard;
