import React, {useCallback, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen} from '@/components/atoms';
import {Chip} from '@/components/molecules';
import {
  InternalMoveLineCard,
  StockMoveHeader,
} from '@/modules/stock/components/organisms';
import StockMove from '@/modules/stock/types/stock-move';
import {fetchInternalMoveLines} from '@/modules/stock/features/internalMoveLineSlice';
import {ChipSelect, ScrollList} from '@/components/organisms';
import {useThemeColor} from '@/features/themeSlice';
import useTranslator from '@/hooks/use-translator';

const InternalMoveLineListScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const internalMove = route.params.internalMove;
  const {loadingIMLines, moreLoading, isListEnd, internalMoveLineList} =
    useSelector(state => state.internalMoveLine);
  const [filteredList, setFilteredList] = useState(internalMoveLineList);
  const [doneStatus, setDoneStatus] = useState(false);
  const [undoneStatus, setUndoneStatus] = useState(false);
  const dispatch = useDispatch();

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

  const fetchInternalLinesAPI = useCallback(
    page => {
      dispatch(
        fetchInternalMoveLines({
          internalMoveId: internalMove.id,
          page: page,
        }),
      );
    },
    [internalMove.id, dispatch],
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
          return list.filter(
            item => parseFloat(item.qty) === parseFloat(item.realQty),
          );
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
    setFilteredList(filterOnStatus(internalMoveLineList));
  }, [internalMoveLineList, filterOnStatus]);

  return (
    <Screen>
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
      <ChipSelect>
        <Chip
          selected={doneStatus}
          title={I18n.t('Stock_Done')}
          onPress={handleDoneStatus}
          selectedColor={{
            backgroundColor: Colors.primaryColor_light,
            borderColor: Colors.primaryColor,
          }}
        />
        <Chip
          selected={undoneStatus}
          title={I18n.t('Stock_NotDone')}
          onPress={handleUndoneStatus}
          selectedColor={{
            backgroundColor: Colors.cautionColor_light,
            borderColor: Colors.cautionColor,
          }}
        />
      </ChipSelect>
      <ScrollList
        loadingList={loadingIMLines}
        data={filteredList}
        renderItem={({item}) => (
          <InternalMoveLineCard
            style={styles.item}
            productName={item.product?.fullName}
            internalMoveStatus={internalMove.statusSelect}
            availability={
              item.availableStatusSelect == null
                ? null
                : item.availableStatusSelect
            }
            trackingNumber={item.trackingNumber?.trackingNumberSeq}
            expectedQty={item.qty}
            movedQty={item.realQty}
            onPress={() => handleShowLine(item)}
          />
        )}
        fetchData={fetchInternalLinesAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default InternalMoveLineListScreen;
