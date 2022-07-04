import React, {useCallback, useState, useEffect} from 'react';
import {Screen} from '@/components/atoms';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Chip} from '@/components/molecules';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import StockMove from '@/modules/stock/types/stock-move';
import {
  CustomerDeliveryLineCard,
  StockMoveHeader,
} from '@/modules/stock/components/organisms';
import {fetchCustomerDeliveryLines} from '@/modules/stock/features/customerDeliveryLineSlice';
import {ChipSelect, ScrollList} from '@/components/organisms';
import {ColorHook} from '@/themeStore';

const CustomerDeliveryLineListScreen = ({route, navigation}) => {
  const Colors = ColorHook();
  const customerDelivery = route.params.customerDelivery;
  const {loadingCDLines, moreLoading, isListEnd, customerDeliveryLineList} =
    useSelector(state => state.customerDeliveryLine);
  const {racksList} = useSelector(state => state.rack);
  const [filteredList, setFilteredList] = useState(customerDeliveryLineList);
  const [doneStatus, setDoneStatus] = useState(false);
  const [undoneStatus, setUndoneStatus] = useState(false);
  const dispatch = useDispatch();

  const handleShowLine = (item, index) => {
    item = {
      ...item,
      locker:
        racksList != null && racksList[index] != null
          ? racksList[index][0]?.rack
          : '',
    };
    if (customerDelivery.statusSelect === StockMove.status.Realized) {
      navigation.navigate('CustomerDeliveryLineDetailScreen', {
        customerDeliveryLine: item,
        customerDelivery: customerDelivery,
      });
    } else {
      navigation.navigate('CustomerDeliverySelectProductScreen', {
        customerDeliveryLine: item,
        customerDelivery: customerDelivery,
      });
    }
  };

  const fetchDeliveryLinesAPI = useCallback(
    page => {
      dispatch(
        fetchCustomerDeliveryLines({
          customerDeliveryId: customerDelivery.id,
          page: page,
        }),
      );
    },
    [customerDelivery.id, dispatch],
  );

  const handleDoneStatus = () => {
    if (!doneStatus && undoneStatus) {
      setUndoneStatus(!undoneStatus);
    }
    setDoneStatus(!doneStatus);
  };

  const handleUndoneStatus = () => {
    if (!undoneStatus && doneStatus) {
      setDoneStatus(!doneStatus);
    }
    setUndoneStatus(!undoneStatus);
  };

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (doneStatus) {
          return list.filter(item => parseFloat(item.realQty) != null);
        } else if (undoneStatus) {
          return list.filter(item => parseFloat(item.realQty) == null);
        } else {
          return list;
        }
      }
    },
    [doneStatus, undoneStatus],
  );

  useEffect(() => {
    setFilteredList(filterOnStatus(customerDeliveryLineList));
  }, [customerDeliveryLineList, filterOnStatus]);

  return (
    <Screen>
      <StockMoveHeader
        reference={customerDelivery.stockMoveSeq}
        status={customerDelivery.statusSelect}
        date={
          customerDelivery.statusSelect === StockMove.status.Draft
            ? customerDelivery.createdOn
            : customerDelivery.statusSelect === StockMove.status.Planned
            ? customerDelivery.estimatedDate
            : customerDelivery.realDate
        }
        availability={customerDelivery.availableStatusSelect}
      />
      <LocationsMoveCard
        fromStockLocation={customerDelivery.fromStockLocation?.name}
        toStockLocation={customerDelivery?.toAddress.fullName}
        style={styles.LocationsMoveCard}
      />
      <ChipSelect>
        <Chip
          selected={doneStatus}
          title="Done"
          onPress={handleDoneStatus}
          selectedColor={{
            backgroundColor: Colors.primaryColor_light,
            borderColor: Colors.primaryColor,
          }}
        />
        <Chip
          selected={undoneStatus}
          title="Not Done"
          onPress={handleUndoneStatus}
          selectedColor={{
            backgroundColor: Colors.secondaryColor_light,
            borderColor: Colors.secondaryColor,
          }}
        />
      </ChipSelect>
      <ScrollList
        loadingList={loadingCDLines}
        data={filteredList}
        renderItem={({item, index}) => (
          <CustomerDeliveryLineCard
            style={styles.item}
            productName={item.product.fullName}
            pickedQty={item.realQty}
            askedQty={item.qty}
            locker={
              racksList != null && racksList[index] != null
                ? racksList[index][0]?.rack
                : ''
            }
            availability={
              customerDelivery.statusSelect === StockMove.status.Realized
                ? null
                : StockMove.getAvailability(item.availableStatusSelect)
            }
            trackingNumber={item?.trackingNumber}
            onPress={() => handleShowLine(item, index)}
          />
        )}
        fetchData={fetchDeliveryLinesAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  LocationsMoveCard: {
    marginBottom: '2%',
  },
  item: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
});

export default CustomerDeliveryLineListScreen;
