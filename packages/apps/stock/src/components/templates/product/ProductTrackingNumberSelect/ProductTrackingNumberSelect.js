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

import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {TrackingNumberSearchBar} from '../../../templates';

const ProductTrackingNumberSelect = ({
  product,
  visible,
  trackingScanKey,
  onAddTrackingNumber,
  style,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [selectedTrackingNumber, setSelectedTrackingNumber] = useState(null);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.autoCompleteSearchContainer}>
        <TrackingNumberSearchBar
          onChange={setSelectedTrackingNumber}
          isFocus={true}
          style={styles.autoSearchComplete}
          product={product}
          scanKeySearch={trackingScanKey}
          defaultValue={selectedTrackingNumber}
        />
        <Card style={styles.cardTrackingNumberInfo}>
          <Text>{I18n.t('Stock_NoTrackingNumberConfigured')}</Text>
        </Card>
      </View>
      {selectedTrackingNumber && (
        <Button
          title={I18n.t('Base_Add')}
          onPress={() => onAddTrackingNumber(selectedTrackingNumber)}
        />
      )}
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 43,
    },
    autoCompleteSearchContainer: {
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      zIndex: 44,
    },
    cardTrackingNumberInfo: {
      backgroundColor: Colors.errorColor.background_light,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
      borderRadius: 5,
      width: '85%',
    },
    autoSearchComplete: {
      borderColor: Colors.errorColor.background,
    },
  });

export default ProductTrackingNumberSelect;
