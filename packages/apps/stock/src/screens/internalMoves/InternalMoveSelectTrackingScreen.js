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

import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Alert,
  Card,
  HeaderContainer,
  Screen,
  Text,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import {StockMoveHeader, TrackingNumberSearchBar} from '../../components';
import StockMove from '../../types/stock-move';

const trackingNumberScanKey = 'tracking-number_internal-move-new';

const InternalMoveSelectTrackingScreen = ({navigation, route}) => {
  const {internalMove, internalMoveLine, product} = route.params;
  const I18n = useTranslator();

  const [isVisible, setVisible] = useState(false);

  const handleTrackingNumberSelection = useCallback(
    trackingNumber => {
      if (trackingNumber != null) {
        if (trackingNumber?.id !== internalMoveLine.trackingNumber?.id) {
          setVisible(true);
        } else {
          navigation.navigate('InternalMoveLineDetailsScreen', {
            internalMove: internalMove,
            internalMoveLineId: internalMoveLine?.id,
          });
        }
      }
    },
    [internalMove, internalMoveLine, navigation],
  );

  return (
    <Screen removeSpaceOnTop={internalMove != null ? true : false}>
      <View>
        <HeaderContainer
          expandableFilter={false}
          fixedItems={
            <StockMoveHeader
              reference={internalMove.stockMoveSeq}
              status={internalMove.statusSelect}
              date={StockMove.getStockMoveDate(
                internalMove.statusSelect,
                internalMove,
              )}
              availability={internalMoveLine?.availableStatusSelect}
              stockMoveLineId={internalMoveLine?.id}
            />
          }
        />
        <Card style={styles.cardProductInfo}>
          <Text>{internalMoveLine.product?.fullName}</Text>
        </Card>
      </View>
      <TrackingNumberSearchBar
        scanKey={trackingNumberScanKey}
        onChange={handleTrackingNumberSelection}
        isFocus={true}
        changeScreenAfter={true}
        product={product}
      />
      <Alert
        visible={isVisible}
        title={I18n.t('Auth_Warning')}
        confirmButtonConfig={{
          width: 50,
          title: null,
          onPress: () => setVisible(false),
        }}>
        <Text>{I18n.t('Stock_ErrorTrackingNumber')}</Text>
      </Alert>
    </Screen>
  );
};

const styles = StyleSheet.create({
  cardProductInfo: {
    marginVertical: '2%',
    marginHorizontal: 16,
  },
});

export default InternalMoveSelectTrackingScreen;
