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
import {Badge, ViewAllContainer} from '@/components/molecules';
import {fetchInternalMoveLines} from '@/modules/stock/features/internalMoveLineSlice';
import {
  InternalMoveLineCard,
  LocationsMoveCard,
} from '../../components/molecules';
import StockMove from '@/modules/stock/types/stock-move';
import formatDate from '@/modules/stock/utils/format-date';
import Colors from '@/types/colors';

const InternalMoveDetailsGeneralScreen = ({navigation, route}) => {
  // ------------  API --------------
  const {loadingInternalMoveLine, internalMoveLineList} = useSelector(
    state => state.internalMoveLine,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params.internalMove != null) {
      dispatch(fetchInternalMoveLines(route.params.internalMove.id));
    }
  }, [dispatch, route.params.internalMove]);

  // ------------  VARIABLES --------------
  const internalMove = route.params.internalMove;

  // ------------  HANDLERS --------------
  const handleViewAll = () => {
    navigation.navigate('InternalMoveDetailsListProductScreen', {
      internalMove: internalMove,
    });
  };

  const handleShowLine = item => {
    navigation.navigate('InternalMoveDetailsScreen', {
      internalMove: internalMove,
      internalMoveLine: item,
    });
  };

  return (
    <Screen>
      {loadingInternalMoveLine ? (
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
                <View style={styles.infoContainer}>
                  <View style={styles.refContainer}>
                    <Text style={styles.text_important}>
                      {route.params.internalMove.stockMoveSeq}
                    </Text>
                    <Text style={styles.text_secondary}>
                      {internalMove.statusSelect ===
                      StockMove.getStatus(StockMove.status.Planned)
                        ? formatDate(internalMove.estimatedDate, 'DD/MM/YYYY')
                        : formatDate(internalMove.realDate, 'DD/MM/YYYY')}
                    </Text>
                  </View>
                  <View style={styles.badgeContainer}>
                    <Badge
                      color={
                        StockMove.getStatusColor(
                          StockMove.getStatus(internalMove.statusSelect),
                        ).backgroundColor
                      }
                      title={StockMove.getStatus(internalMove.statusSelect)}
                    />
                    {internalMove.availableStatusSelect == null ? null : (
                      <Badge
                        color={
                          StockMove.getAvailabilityColor(
                            StockMove.getAvailability(
                              internalMove.availableStatusSelect,
                            ),
                          ).backgroundColor
                        }
                        title={StockMove.getAvailability(
                          internalMove.availableStatusSelect,
                        )}
                      />
                    )}
                  </View>
                </View>
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
                      availability={StockMove.getAvailability(
                        internalMoveLineList[0].availableStatusSelect,
                      )}
                      trackingNumber={
                        internalMoveLineList[0].trackingNumber
                          ?.trackingNumberSeq
                      }
                      movedQty={internalMoveLineList[0].realQty}
                      onPress={() => handleShowLine(internalMoveLineList[0])}
                    />
                  )}
                  {internalMoveLineList[1] == null ? null : (
                    <InternalMoveLineCard
                      style={styles.item}
                      productName={internalMoveLineList[1].product?.fullName}
                      availability={StockMove.getAvailability(
                        internalMoveLineList[1].availableStatusSelect,
                      )}
                      trackingNumber={
                        internalMoveLineList[1].trackingNumber
                          ?.trackingNumberSeq
                      }
                      movedQty={internalMoveLineList[1].realQty}
                      onPress={() => handleShowLine(internalMoveLineList[1])}
                    />
                  )}
                </ViewAllContainer>
                {internalMove.pickingOrderComments == null ? null : (
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
                {internalMove.note == null ? null : (
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
  container: {
    marginVertical: '2%',
  },
  scrollContainer: {
    height: Dimensions.get('window').height - 150,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: '3%',
    marginHorizontal: 16,
  },
  refContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  badgeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    marginHorizontal: 32,
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  contentProduct: {
    width: '90%',
    marginHorizontal: 32,
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 6,
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
  text_secondary: {
    fontSize: 14,
  },
  infosCard: {
    marginHorizontal: 12,
    marginBottom: '2%',
  },
  reasonTitle: {
    marginHorizontal: 20,
  },
  picker: {
    marginHorizontal: 12,
    marginBottom: '2%',
  },
  picker_empty: {
    color: 'red',
  },
  button_container: {
    marginVertical: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    width: '40%',
    borderRadius: 50,
    marginHorizontal: 12,
    marginBottom: '2%',
  },
  button_primary: {
    backgroundColor: Colors.background.green,
  },
  button_secondary: {
    backgroundColor: '#FFFFFF',
  },
  button_title: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  icon: {
    fontSize: Dimensions.get('window').width * 0.14,
    color: Colors.icon.dark_grey,
    marginRight: 6,
  },
  notesContainer: {
    height: '20%',
    marginHorizontal: 16,
  },
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
});

export default InternalMoveDetailsGeneralScreen;
