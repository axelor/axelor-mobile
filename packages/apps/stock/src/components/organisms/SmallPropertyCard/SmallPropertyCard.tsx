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

import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, PopUpOneButton, Text} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface SmallPropertyCardProps {
  style?: any;
  title: string;
  value: string;
  unit?: string;
  interactive?: boolean;
}

const SmallPropertyCard = ({
  style,
  title,
  value,
  unit = null,
  interactive = false,
}: SmallPropertyCardProps) => {
  const [popUp, setPopUp] = useState(false);
  const I18n = useTranslator();

  const handlePress = () => {
    setPopUp(true);
  };

  return (
    <Card style={[styles.card, style]}>
      <PopUpOneButton
        visible={popUp}
        data={unit == null ? `${value}` : `${value} ${unit}`}
        title={title}
        btnTitle={I18n.t('Auth_Close')}
        onPress={() => setPopUp(!popUp)}
      />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
        disabled={!interactive}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
          {unit && <Text style={styles.unit}>{unit}</Text>}
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
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
