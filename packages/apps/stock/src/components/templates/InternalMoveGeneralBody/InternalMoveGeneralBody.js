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

import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from '@axelor/aos-mobile-core';
import {
  MovementIndicationCard,
  ViewAllContainer,
  useThemeColor,
  Icon,
} from '@axelor/aos-mobile-ui';
import InternalMoveLineCard from '../InternalMoveLineCard/InternalMoveLineCard';
import {showLine} from '../../../utils/line-navigation';

const InternalMoveGeneralBody = ({internalMove, navigation}) => {
  const Colors = useThemeColor();
  const {internalMoveLineList} = useSelector(state => state.internalMoveLine);
  const {loadingRacks, racksList} = useSelector(state => state.rack);

  const handleViewAll = () => {
    navigation.navigate('InternalMoveLineListScreen', {
      internalMove: internalMove,
    });
  };

  const handleShowLine = item => {
    showLine({
      item: {name: 'internalMove', data: internalMove},
      itemLine: {name: 'internalMoveLine', data: item},
      lineDetailsScreen: 'InternalMoveLineDetailsScreen',
      selectTrackingScreen: 'InternalMoveSelectTrackingScreen',
      selectProductScreen: 'InternalMoveSelectProductScreen',
      productKey: 'stockProduct',
      navigation,
    });
  };

  return (
    <>
      <MovementIndicationCard
        titleTop={internalMove.fromStockLocation.name}
        iconTop={
          <Icon name="warehouse" color={Colors.primaryColor.background} />
        }
        titleDown={internalMove.toStockLocation.name}
        iconDown={
          <Icon name="warehouse" color={Colors.primaryColor.background} />
        }
      />
      <ViewAllContainer
        data={internalMoveLineList}
        renderFirstTwoItems={(item, index) => (
          <InternalMoveLineCard
            style={styles.item}
            productName={item.product?.fullName}
            internalMoveStatus={internalMove.statusSelect}
            availability={
              item.availableStatusSelect != null
                ? item.availableStatusSelect
                : null
            }
            locker={
              !loadingRacks && racksList != null && racksList[index] != null
                ? racksList[index][0]?.rack
                : ''
            }
            trackingNumber={item.trackingNumber?.trackingNumberSeq}
            expectedQty={item.qty}
            movedQty={item.realQty}
            onPress={() => handleShowLine(item)}
          />
        )}
        onViewPress={handleViewAll}
      />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
});

export default InternalMoveGeneralBody;
