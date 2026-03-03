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
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Alert, Card, Text, useDigitFormat} from '@axelor/aos-mobile-ui';

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
  unit = null,
  interactive = false,
}: SmallPropertyCardProps) => {
  const [popUp, setPopUp] = useState(false);
  const formatNumber = useDigitFormat();

  const handlePress = () => {
    setPopUp(true);
  };

  const _value = useMemo(
    () => (formatValueToNumber ? formatNumber(value) : value),
    [formatNumber, formatValueToNumber, value],
  );

  return (
    <Card style={[styles.card, style]}>
      <Alert
        style={styles.alert}
        visible={popUp}
        title={title}
        noBoldTitle
        cancelButtonConfig={{
          showInHeader: true,
          headerSize: 25,
          onPress: () => setPopUp(!popUp),
        }}>
        <Text writingType="important" fontSize={20}>
          {unit == null ? `${_value}` : `${_value} ${unit}`}
        </Text>
      </Alert>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
        disabled={!interactive}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{_value}</Text>
          {unit && <Text style={styles.unit}>{unit}</Text>}
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  alert: {
    width: '70%',
  },
  card: {
    paddingHorizontal: 0,
    paddingVertical: 4,
    paddingRight: 4,
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: '1%',
  },
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  unit: {
    fontSize: 14,
  },
});

export default SmallPropertyCard;
