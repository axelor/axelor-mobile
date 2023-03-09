import React from 'react';
import {StyleSheet} from 'react-native';
import {useTranslator, useSelector} from '@axelor/aos-mobile-core';
import {
  MovementIndicationCard,
  NotesCard,
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
  const I18n = useTranslator();

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
      <NotesCard
        title={I18n.t('Stock_NotesOnPreparation')}
        data={internalMove.pickingOrderComments}
      />
      <NotesCard
        title={I18n.t('Stock_NotesOnStockMove')}
        data={internalMove.note}
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
