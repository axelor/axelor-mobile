import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  Chip,
  ChipSelect,
  Screen,
  ScrollList,
  HeaderContainer,
  Text,
  useThemeColor,
} from '@aos-mobile/ui';
import {useDispatch, useSelector, useTranslator} from '@aos-mobile/core';
import {
  ManufacturingOrderHeader,
  ManufacturingOrderCard,
} from '../../../components/organisms';
import {fetchChildrenOfManufacturingOrder} from '../../../features/manufacturingOrderSlice';
import ManufacturingOrder from '../../../types/manufacturing-order';

const ChildrenManufOrderListScreen = ({route, navigation}) => {
  const manufOrder = route.params.manufOrder;
  const {
    loadingChildrenMO,
    moreLoadingChildrenMO,
    isListEndChildrenMO,
    childrenManufOrders,
  } = useSelector(state => state.manufacturingOrder);
  const [filteredList, setFilteredList] = useState(childrenManufOrders);
  const [draftStatus, setDraftStatus] = useState(false);
  const [plannedStatus, setPlannedStatus] = useState(false);
  const [progressStatus, setProgressStatus] = useState(false);
  const [standByStatus, setStandByStatus] = useState(false);
  const [finishedStatus, setFinishedStatus] = useState(false);
  const dispatch = useDispatch();
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const desactivateChip = () => {
    setDraftStatus(false);
    setPlannedStatus(false);
    setProgressStatus(false);
    setStandByStatus(false);
    setFinishedStatus(false);
  };

  const handleDraftStatus = () => {
    if (plannedStatus && progressStatus && standByStatus && finishedStatus) {
      desactivateChip();
    } else {
      setDraftStatus(!draftStatus);
    }
  };

  const handlePlannedStatus = () => {
    if (draftStatus && progressStatus && standByStatus && finishedStatus) {
      desactivateChip();
    } else {
      setPlannedStatus(!plannedStatus);
    }
  };

  const handleProgressStatus = () => {
    if (plannedStatus && draftStatus && standByStatus && finishedStatus) {
      desactivateChip();
    } else {
      setProgressStatus(!progressStatus);
    }
  };

  const handleStandByStatus = () => {
    if (plannedStatus && progressStatus && draftStatus && finishedStatus) {
      desactivateChip();
    } else {
      setStandByStatus(!standByStatus);
    }
  };

  const handleFinishedStatus = () => {
    if (plannedStatus && progressStatus && standByStatus && draftStatus) {
      desactivateChip();
    } else {
      setFinishedStatus(!finishedStatus);
    }
  };

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        const listFilter = [];
        if (
          draftStatus ||
          plannedStatus ||
          progressStatus ||
          standByStatus ||
          finishedStatus
        ) {
          if (draftStatus) {
            list.forEach(item => {
              if (item.statusSelect === ManufacturingOrder.status.Draft) {
                listFilter.push(item);
              }
            });
          }
          if (plannedStatus) {
            list.forEach(item => {
              if (item.statusSelect === ManufacturingOrder.status.Planned) {
                listFilter.push(item);
              }
            });
          }
          if (progressStatus) {
            list.forEach(item => {
              if (item.statusSelect === ManufacturingOrder.status.InProgress) {
                listFilter.push(item);
              }
            });
          }
          if (standByStatus) {
            list.forEach(item => {
              if (item.statusSelect === ManufacturingOrder.status.StandBy) {
                listFilter.push(item);
              }
            });
          }
          if (finishedStatus) {
            list.forEach(item => {
              if (item.statusSelect === ManufacturingOrder.status.Finished) {
                listFilter.push(item);
              }
            });
          }
        } else {
          return list;
        }

        return listFilter;
      }
    },
    [draftStatus, finishedStatus, plannedStatus, progressStatus, standByStatus],
  );

  useEffect(() => {
    setFilteredList(filterOnStatus(childrenManufOrders));
  }, [filterOnStatus, childrenManufOrders]);

  const fetchManufOrdersAPI = useCallback(() => {
    dispatch(
      fetchChildrenOfManufacturingOrder({
        parentManufOrderId: manufOrder?.id,
      }),
    );
  }, [dispatch, manufOrder]);

  const handleViewItem = item => {
    if (item != null) {
      navigation.navigate('ManufacturingOrderDetailsScreen', {
        manufacturingOrderId: item.id,
      });
    }
  };

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <>
            <ManufacturingOrderHeader
              parentMO={manufOrder.parentMO}
              reference={manufOrder.manufOrderSeq}
              status={manufOrder.statusSelect}
              priority={manufOrder.prioritySelect}
            />
            <View style={styles.titleContainer}>
              <Text>{I18n.t('Manufacturing_ChildrenMO')}</Text>
            </View>
          </>
        }
        chipComponent={
          <ChipSelect>
            <ChipSelect style={styles.chipContainer} scrollable={true}>
              <Chip
                selected={draftStatus}
                title={I18n.t('Manufacturing_Status_Draft')}
                onPress={handleDraftStatus}
                selectedColor={ManufacturingOrder.getStatusColor(
                  ManufacturingOrder.status.Draft,
                  Colors,
                )}
                width={Dimensions.get('window').width * 0.35}
                marginHorizontal={3}
              />
              <Chip
                selected={plannedStatus}
                title={I18n.t('Manufacturing_Status_Planned')}
                onPress={handlePlannedStatus}
                selectedColor={ManufacturingOrder.getStatusColor(
                  ManufacturingOrder.status.Planned,
                  Colors,
                )}
                width={Dimensions.get('window').width * 0.35}
                marginHorizontal={3}
              />
              <Chip
                selected={progressStatus}
                title={I18n.t('Manufacturing_Status_InProgress')}
                onPress={handleProgressStatus}
                selectedColor={ManufacturingOrder.getStatusColor(
                  ManufacturingOrder.status.InProgress,
                  Colors,
                )}
                width={Dimensions.get('window').width * 0.35}
                marginHorizontal={3}
              />
              <Chip
                selected={standByStatus}
                title={I18n.t('Manufacturing_Status_StandBy')}
                onPress={handleStandByStatus}
                selectedColor={ManufacturingOrder.getStatusColor(
                  ManufacturingOrder.status.StandBy,
                  Colors,
                )}
                width={Dimensions.get('window').width * 0.35}
                marginHorizontal={3}
              />
              <Chip
                selected={finishedStatus}
                title={I18n.t('Manufacturing_Status_Finished')}
                onPress={handleFinishedStatus}
                selectedColor={ManufacturingOrder.getStatusColor(
                  ManufacturingOrder.status.Finished,
                  Colors,
                )}
                width={Dimensions.get('window').width * 0.35}
                marginHorizontal={3}
              />
            </ChipSelect>
          </ChipSelect>
        }
      />
      <ScrollList
        loadingList={loadingChildrenMO}
        data={filteredList}
        renderItem={({item}) => (
          <ManufacturingOrderCard
            reference={item.manufOrderSeq}
            status={item.statusSelect}
            style={styles.item}
            priority={item.prioritySelect == null ? null : item.prioritySelect}
            productName={item.product.fullName}
            qty={item.qty}
            unit={item.unit}
            link={{ordersRef: item.saleOrderSet, client: item.clientPartner}}
            onPress={() => handleViewItem(item)}
          />
        )}
        fetchData={fetchManufOrdersAPI}
        isListEnd={isListEndChildrenMO}
        filter={moreLoadingChildrenMO}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    marginBottom: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default ChildrenManufOrderListScreen;
