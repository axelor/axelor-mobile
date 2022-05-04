import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {Button, Screen, Text} from '@/components/atoms';
import {Badge, InfosCard, Picker} from '@/components/molecules';
import {ProductCard} from '@/modules/stock/components/molecules';
import {QuantityCard} from '@/modules/stock/components/organisms';
import {fetchStockCorrectionReasons} from '@/modules/stock/features/stockCorrectionReasonSlice';

const STATUS_DRAFT = 1;
const STATUS_VALIDATED = 2;

const getStatus = option => {
  if (option === STATUS_DRAFT) {
    return 'Draft';
  } else if (option === STATUS_VALIDATED) {
    return 'Validated';
  } else {
    return option;
  }
};

const StockCorrectionNewDraftScreen = ({navigation, route}) => {
  // ------------  API --------------
  const {loadingReasons, stockCorrectionReasonList} = useSelector(
    state => state.stockCorrectionReason,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStockCorrectionReasons());
  }, [dispatch]);

  useEffect(() => {
    initVariables();
  }, [route]);

  // ------------  VARIABLES --------------
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState();
  const [stockLocation, setStockLocation] = useState();
  const [product, setProduct] = useState();

  const initVariables = () => {
    if (route.params.stockCorrection == null) {
      setStatus(STATUS_DRAFT);
      setStockLocation(route.params.stockLocation);
      setProduct(route.params.stockProduct);
    } else {
      setStatus(route.params.stockCorrection.status);
      setStockLocation(route.params.stockCorrection.stockLocation);
      setProduct(route.params.stockCorrection.product);
    }
    setLoading(false);
  };

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: route.params.product,
    });
  };

  return (
    <Screen style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View style={styles.badge_container}>
            <Badge style={styles.badge} title={getStatus(status)} />
          </View>
          <InfosCard
            style={styles.infosCard}
            valueTxt={stockLocation.name}
            editable={false}
          />
          <ProductCard
            style={styles.productCard}
            name={route.params.stockProduct.name}
            code={route.params.stockProduct.code}
            onPress={handleShowProduct}
          />
          {route.params.stockProduct.trackingNumberConfiguration ==
          null ? null : (
            <InfosCard
              style={styles.infosCard}
              valueTxt={route.params.trackingNumber.trackingNumberSeq}
              editable={false}
            />
          )}
          <QuantityCard
            labelQty="Real quantity"
            defaultValue="0"
            onValueChange={() => {}}>
            <Text style={styles.text}>{'Database quantity: ' + 0}</Text>
          </QuantityCard>
          <Picker
            style={styles.picker}
            title="Reason"
            onValueChange={() => {}}
            defaultValue
            listItems={stockCorrectionReasonList}
            labelField="name"
            valueField="id"
          />
        </View>
      )}
      <View style={styles.button_container}>
        <Button
          title="SAVE"
          style={[styles.button, styles.button_secondary]}
          styleTxt={styles.button_title}
        />
        <Button
          title="VALIDATE"
          style={[styles.button, styles.button_primary]}
          styleTxt={styles.button_title}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: '#84DCB7',
    borderColor: '#3ECF8E',
    borderRadius: 7,
    width: 87,
    height: 22,
    borderWidth: 1.5,
  },
  badge_container: {
    marginHorizontal: '10%',
    marginBottom: 6,
    flexDirection: 'row-reverse',
  },
  infosCard: {
    marginHorizontal: 12,
    marginBottom: 6,
  },
  productCard: {
    marginHorizontal: 12,
    marginBottom: 6,
  },
  picker: {
    marginHorizontal: 12,
    marginBottom: 6,
  },
  button_container: {
    alignItems: 'center',
  },
  button: {
    borderRadius: 50,
    width: '50%',
    marginHorizontal: 12,
    marginBottom: 6,
  },
  button_primary: {
    backgroundColor: '#3ECF8E',
  },
  button_secondary: {
    backgroundColor: '#FFFFFF',
  },
  button_title: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
  },
});

export default StockCorrectionNewDraftScreen;
