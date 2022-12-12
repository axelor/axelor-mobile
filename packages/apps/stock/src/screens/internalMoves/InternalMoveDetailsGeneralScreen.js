import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  HeaderContainer,
  Icon,
  MovementIndicationCard,
  Screen,
  ScrollView,
  ViewAllContainer,
  useThemeColor,
  NotesCard,
} from '@aos-mobile/ui';
import {
  useDispatch,
  useSelector,
  useTranslator,
  HeaderOptionsMenu,
} from '@aos-mobile/core';
import {InternalMoveLineCard, StockMoveHeader} from '../../components';
import {fetchInternalMoveLines} from '../../features/internalMoveLineSlice';
import {getRacks} from '../../features/racksListSlice';
import {updateInternalMove} from '../../features/internalMoveSlice';
import StockMove from '../../types/stock-move';

const InternalMoveDetailsGeneralScreen = ({navigation, route}) => {
  const internalMove = route.params.internalMove;
  const {loadingIMLines, internalMoveLineList} = useSelector(
    state => state.internalMoveLine,
  );
  const {loadingRacks, racksList} = useSelector(state => state.rack);
  const {mobileSettings} = useSelector(state => state.config);
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  useEffect(() => {
    if (internalMove != null) {
      dispatch(
        fetchInternalMoveLines({internalMoveId: internalMove.id, page: 0}),
      );
    }
  }, [dispatch, internalMove]);

  useEffect(() => {
    dispatch(
      getRacks({
        stockId: internalMove?.fromStockLocation?.id,
        LineList: internalMoveLineList,
      }),
    );
  }, [dispatch, internalMove, internalMoveLineList]);

  const handleViewAll = () => {
    navigation.navigate('InternalMoveLineListScreen', {
      internalMove: internalMove,
    });
  };

  const handleShowLine = item => {
    if (internalMove.statusSelect === StockMove.status.Realized) {
      navigation.navigate('InternalMoveLineDetailsScreen', {
        internalMove: internalMove,
        internalMoveLine: item,
      });
    } else {
      navigation.navigate('InternalMoveSelectProductScreen', {
        internalMove: internalMove,
        internalMoveLine: item,
      });
    }
  };

  const handleRealizeStockMove = useCallback(() => {
    dispatch(
      updateInternalMove({
        internalMoveId: internalMove.id,
        version: internalMove.version,
        status: StockMove.status.Realized,
      }),
    );
  }, [dispatch, internalMove]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderOptionsMenu
          model="com.axelor.apps.stock.db.StockMove"
          modelId={internalMove?.id}
          navigation={navigation}
          disableMailMessages={!mobileSettings?.isTrackerMessageOnStockApp}
        />
      ),
    });
  }, [I18n, mobileSettings, navigation, internalMove]);

  return (
    <Screen
      removeSpaceOnTop={true}
      loading={loadingIMLines}
      fixedItems={
        internalMove.statusSelect === StockMove.status.Planned && (
          <Button
            title={I18n.t('Base_Realize')}
            onPress={handleRealizeStockMove}
          />
        )
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={internalMove.stockMoveSeq}
            status={internalMove.statusSelect}
            date={
              internalMove.statusSelect === StockMove.status.Draft
                ? internalMove.createdOn
                : internalMove.statusSelect === StockMove.status.Planned
                ? internalMove.estimatedDate
                : internalMove.realDate
            }
            availability={internalMove.availableStatusSelect}
          />
        }
      />
      <ScrollView>
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
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
});

export default InternalMoveDetailsGeneralScreen;
