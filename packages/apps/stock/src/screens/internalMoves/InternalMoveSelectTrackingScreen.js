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

import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Card,
  HeaderContainer,
  PopUpOneButton,
  Screen,
  Text,
} from '@axelor/aos-mobile-ui';
import {
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {StockMoveHeader} from '../../components';
import {filterTrackingNumber} from '../../features/trackingNumberSlice';
import {displayItemTrackingNumber} from '../../utils/displayers';
import StockMove from '../../types/stock-move';

const trackingNumberScanKey = 'tracking-number_internal-move-new';

const InternalMoveSelectTrackingScreen = ({navigation, route}) => {
  const {internalMove, internalMoveLine, product} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {trackingNumberList} = useSelector(state => state.trackingNumber);

  const [isVisible, setVisible] = useState(false);

  const fetchTrackingAPI = useCallback(
    filter => {
      dispatch(
        filterTrackingNumber({productId: product.id, searchValue: filter}),
      );
    },
    [dispatch, product.id],
  );

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
              availability={internalMove.availableStatusSelect}
            />
          }
        />
        <Card style={styles.cardProductInfo}>
          <Text>{internalMoveLine.product?.fullName}</Text>
        </Card>
      </View>
      <ScannerAutocompleteSearch
        objectList={trackingNumberList}
        onChangeValue={item => handleTrackingNumberSelection(item)}
        fetchData={fetchTrackingAPI}
        displayValue={displayItemTrackingNumber}
        scanKeySearch={trackingNumberScanKey}
        placeholder={I18n.t('Stock_TrackingNumber')}
        isFocus={true}
        changeScreenAfter={true}
      />
      <PopUpOneButton
        visible={isVisible}
        title={I18n.t('Auth_Warning')}
        data={I18n.t('Stock_ErrorTrackingNumber')}
        btnTitle={I18n.t('Auth_Close')}
        onPress={() => setVisible(false)}
      />
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
