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
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Alert,
  Card,
  Text,
  useDigitFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

interface SmallPropertyCardProps {
  style?: any;
  title: string;
  value: string;
  formatValueToNumber?: boolean;
  unit?: string;
  interactive?: boolean;
}

const SmallPropertyCard = ({
  style,
  title,
  value,
  formatValueToNumber = true,
  unit,
  interactive = false,
}: SmallPropertyCardProps) => {
  const Colors = useThemeColor();
  const formatNumber = useDigitFormat();

  const [popUp, setPopUp] = useState(false);

  const _value = useMemo(
    () => (formatValueToNumber ? formatNumber(value) : value),
    [formatNumber, formatValueToNumber, value],
  );

  return (
    <>
      <Alert
        visible={popUp}
        title={title}
        noBoldTitle
        cancelButtonConfig={{
          showInHeader: true,
          headerSize: 25,
          onPress: () => setPopUp(!popUp),
        }}>
        <Text writingType="important">{`${_value} ${unit ?? ''}`}</Text>
      </Alert>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setPopUp(true)}
        disabled={!interactive}>
        <Card style={[styles.card, style]}>
          <Text
            writingType="important"
            fontSize={12}
            textColor={Colors.secondaryColor.background}>
            {title}
          </Text>
          <Text writingType="title" fontSize={18}>
            {_value}
          </Text>
          {unit && (
            <Text
              writingType="important"
              fontSize={12}
              textColor={Colors.primaryColor.background}>
              {unit}
            </Text>
          )}
        </Card>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingRight: 12,
    paddingVertical: 8,
    gap: 2,
    minWidth: '30%',
  },
});

export default SmallPropertyCard;
