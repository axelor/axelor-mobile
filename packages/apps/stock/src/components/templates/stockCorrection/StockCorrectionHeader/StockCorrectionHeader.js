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

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';
import {Text, Badge} from '@axelor/aos-mobile-ui';

const StockCorrectionHeader = ({stockLocation, status}) => {
  const {StockCorrection} = useTypes();
  const {getItemColor, getItemTitle} = useTypeHelpers();

  return (
    <View style={styles.content}>
      <View style={styles.textContainer}>
        <Text style={styles.text_important}>{stockLocation?.name}</Text>
      </View>
      {status && (
        <Badge
          color={getItemColor(StockCorrection?.statusSelect, status)}
          title={getItemTitle(StockCorrection?.statusSelect, status)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 32,
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text_important: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StockCorrectionHeader;
