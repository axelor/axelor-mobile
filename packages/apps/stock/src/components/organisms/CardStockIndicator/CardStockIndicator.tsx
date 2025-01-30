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
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, PopUpOneButton, Text} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';

interface CardStockIndicatorProps {
  title: string;
  number: string;
}

const CardStockIndicator = ({title, number}: CardStockIndicatorProps) => {
  const [popUp, setPopUp] = useState(false);
  const I18n = useTranslator();

  const handlePress = () => {
    setPopUp(true);
  };

  return (
    <Card style={styles.card}>
      <PopUpOneButton
        visible={popUp}
        data={number}
        title={title}
        btnTitle={I18n.t('Auth_Close')}
        onPress={() => setPopUp(!popUp)}
      />
      <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
        <View style={styles.infos}>
          <Text style={styles.text} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.qty} adjustsFontSizeToFit={true}>
            {number}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    paddingRight: 4,
    paddingLeft: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '1%',
    marginVertical: '1%',
    width: '28.2%',
    height: 90,
  },
  infos: {
    flex: 1,
  },
  text: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  qty: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CardStockIndicator;
