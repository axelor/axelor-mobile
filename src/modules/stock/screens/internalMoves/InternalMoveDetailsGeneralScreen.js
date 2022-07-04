import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Card, Screen, Text} from '@/components/atoms';
import {ViewAllContainer} from '@/components/molecules';
import {fetchInternalMoveLines} from '@/modules/stock/features/internalMoveLineSlice';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {
  InternalMoveLineCard,
  StockMoveHeader,
} from '@/modules/stock/components/organisms';
import StockMove from '@/modules/stock/types/stock-move';
import {getRacks} from '../../features/racksListSlice';

const InternalMoveDetailsGeneralScreen = ({navigation, route}) => {
  const internalMove = route.params.internalMove;
  const {loadingIMLines, internalMoveLineList} = useSelector(
    state => state.internalMoveLine,
  );
  const {loadingRacks, racksList} = useSelector(state => state.rack);
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

  return (
    <Screen>
      {loadingIMLines ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View
            style={
              internalMove.statusSelect === StockMove.status.Realized ||
              internalMove.statusSelect === StockMove.status.Canceled
                ? null
                : styles.scrollContainer
            }>
            <ScrollView>
              <View>
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
                <View style={styles.content}>
                  <LocationsMoveCard
                    fromStockLocation={internalMove.fromStockLocation.name}
                    toStockLocation={internalMove.toStockLocation.name}
                    editable={false}
                  />
                </View>
                <ViewAllContainer onPress={handleViewAll}>
                  {internalMoveLineList[0] == null ? null : (
                    <InternalMoveLineCard
                      style={styles.item}
                      productName={internalMoveLineList[0].product?.fullName}
                      internalMoveStatus={internalMove.statusSelect}
                      availability={
                        internalMoveLineList[0].availableStatusSelect != null
                          ? StockMove.getAvailability(
                              internalMoveLineList[0].availableStatusSelect,
                            )
                          : null
                      }
                      locker={
                        !loadingRacks &&
                        racksList != null &&
                        racksList[0] != null
                          ? racksList[0][0]?.rack
                          : ''
                      }
                      trackingNumber={
                        internalMoveLineList[0].trackingNumber
                          ?.trackingNumberSeq
                      }
                      expectedQty={internalMoveLineList[0].qty}
                      movedQty={internalMoveLineList[0].realQty}
                      onPress={() => handleShowLine(internalMoveLineList[0])}
                    />
                  )}
                  {internalMoveLineList[1] == null ? null : (
                    <InternalMoveLineCard
                      style={styles.item}
                      productName={internalMoveLineList[1].product?.fullName}
                      internalMoveStatus={internalMove.statusSelect}
                      availability={
                        internalMoveLineList[1].availableStatusSelect != null
                          ? StockMove.getAvailability(
                              internalMoveLineList[1].availableStatusSelect,
                            )
                          : null
                      }
                      locker={
                        !loadingRacks &&
                        racksList != null &&
                        racksList[1] != null
                          ? racksList[1][0]?.rack
                          : ''
                      }
                      trackingNumber={
                        internalMoveLineList[1].trackingNumber
                          ?.trackingNumberSeq
                      }
                      expectedQty={internalMoveLineList[1].qty}
                      movedQty={internalMoveLineList[1].realQty}
                      onPress={() => handleShowLine(internalMoveLineList[1])}
                    />
                  )}
                </ViewAllContainer>
                {internalMove.pickingOrderComments == null ||
                internalMove.pickingOrderComments === '' ? null : (
                  <View>
                    <View style={styles.reasonTitle}>
                      <Text>Notes on Preparation </Text>
                    </View>
                    <Card style={styles.infosCard}>
                      <Text numberOfLines={3}>
                        {internalMove.pickingOrderComments}
                      </Text>
                    </Card>
                  </View>
                )}
                {internalMove.note == null ||
                internalMove.note === '' ? null : (
                  <View>
                    <View style={styles.reasonTitle}>
                      <Text>Notes on Stock Move </Text>
                    </View>
                    <Card style={styles.infosCard}>
                      <Text numberOfLines={3}>{internalMove.note}</Text>
                    </Card>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: Dimensions.get('window').height - 150,
  },
  content: {
    marginHorizontal: 32,
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  infosCard: {
    marginHorizontal: 12,
    marginBottom: '2%',
  },
  reasonTitle: {
    marginHorizontal: 20,
  },
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
});

export default InternalMoveDetailsGeneralScreen;
