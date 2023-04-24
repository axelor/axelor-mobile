/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {filterTrackingNumber} from '../../../../features/trackingNumberSlice';
import {displayItemTrackingNumber} from '../../../../utils/displayers';

const ProductTrackingNumberSelect = ({
  product,
  visible,
  trackingScanKey,
  onAddTrackingNumber,
  style,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {trackingNumberList} = useSelector(state => state.trackingNumber);

  const [selectedTrackingNumber, setSelectedTrackingNumber] = useState(null);

  const fetchTrackingAPI = useCallback(
    filter => {
      dispatch(
        filterTrackingNumber({productId: product.id, searchValue: filter}),
      );
    },
    [dispatch, product.id],
  );

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.autoCompleteSearchContainer}>
        <ScannerAutocompleteSearch
          value={selectedTrackingNumber}
          objectList={trackingNumberList}
          onChangeValue={item => setSelectedTrackingNumber(item)}
          fetchData={fetchTrackingAPI}
          displayValue={displayItemTrackingNumber}
          scanKeySearch={trackingScanKey}
          placeholder={I18n.t('Stock_TrackingNumber')}
          isFocus={true}
          style={styles.autoSearchComplete}
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
    },
    autoCompleteSearchContainer: {
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
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
