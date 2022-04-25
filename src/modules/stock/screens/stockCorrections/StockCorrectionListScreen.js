import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Screen, IconNew} from '@/components/atoms';
import {SearchBar, Chip} from '@/components/molecules';
import {ChipSelect} from '@/components/organisms';
import {fetchStockCorrections} from '@/modules/stock/features/stockCorrectionSlice';
import {StockCorrectionCard} from '@/modules/stock/components/molecules';

const getStatus = option => {
  if (option === 1) {
    return 'Draft';
  } else if (option === 2) {
    return 'Validated';
  } else {
    return option;
  }
};

const StockCorrectionListScreen = ({navigation}) => {
  const {loading, stockCorrectionList} = useSelector(
    state => state.stockCorrection,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStockCorrections());
  }, [dispatch]);

  // Set status filter

  const [draftStatus, setDraftStatus] = useState(false);
  const [validatedStatus, setValidatedStatus] = useState(false);

  const handleDraftFilter = () => {
    if (!draftStatus && validatedStatus) {
      setValidatedStatus(validatedStatus => !validatedStatus);
    }
    setDraftStatus(draftStatus => !draftStatus);
  };

  const handleValidatedFilter = () => {
    if (!validatedStatus && draftStatus) {
      setDraftStatus(draftStatus => !draftStatus);
    }
    setValidatedStatus(validatedStatus => !validatedStatus);
  };

  // Filter list on status
  const [filteredList, setFilteredList] = useState(stockCorrectionList);

  useEffect(() => {
    if (draftStatus) {
      draftStockCorrectionList = [];
      stockCorrectionList.forEach(item => {
        if (item.statusSelect === 1) {
          draftStockCorrectionList.push(item);
        }
      });
      setFilteredList(draftStockCorrectionList);
    } else if (validatedStatus) {
      validatedStockCorrectionList = [];
      stockCorrectionList.forEach(item => {
        if (item.statusSelect === 2) {
          validatedStockCorrectionList.push(item);
        }
      });
      setFilteredList(validatedStockCorrectionList);
    } else {
      setFilteredList(stockCorrectionList);
    }
  }, [draftStatus, validatedStatus, stockCorrectionList]);

  // Navigation between pages

  const showStockCorrectionDetails = stockCorrection => {
    console.log(draftStatus);
    navigation.navigate('StockCorrectionDetailsScreen', {
      stockCorrectionId: stockCorrection.id,
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconNew
          onNewPress={() => {
            navigation.navigate('StockCorrectionNewLocationScreen');
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <Screen style={styles.container}>
      <SearchBar
        style={styles.searchBar}
        placeholder="Stock Location"
        onSearchPress={() => dispatch(fetchStockCorrections())}
      />
      <SearchBar
        style={styles.searchBar}
        placeholder="Product"
        onSearchPress={() => dispatch(fetchStockCorrections())}
      />
      <ChipSelect style={styles.statusFilter}>
        <Chip
          selected={draftStatus}
          title="Draft"
          onPress={handleDraftFilter}
        />
        <Chip
          selected={validatedStatus}
          title="Validated"
          onPress={handleValidatedFilter}
        />
      </ChipSelect>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filteredList}
          renderItem={({item}) => (
            <StockCorrectionCard
              style={styles.item}
              status={getStatus(item.statusSelect)}
              productFullname={item.product.fullName}
              stockLocation={item.stockLocation.name}
              date={new Date(item.createdOn).toDateString()}
              onPress={() => showStockCorrectionDetails(item)}
            />
          )}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  searchBar: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
  statusFilter: {
    marginBottom: 8,
  },
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default StockCorrectionListScreen;
