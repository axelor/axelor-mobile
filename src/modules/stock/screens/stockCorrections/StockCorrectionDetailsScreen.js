import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {Button, Screen, Text} from '@/components/atoms';
import {Badge, InfosCard, Picker} from '@/components/molecules';
import {PopUpOneButton, PopUpTwoButton} from '@/components/organisms';
import {ProductCard} from '@/modules/stock/components/molecules';
import {QuantityCard} from '@/modules/stock/components/organisms';
import {fetchStockCorrectionReasons} from '@/modules/stock/features/stockCorrectionReasonSlice';
import {fetchProductWithId} from '@/modules/stock/features/productSlice';
import {
  createCorrection,
  updateCorrection,
} from '@/modules/stock/features/stockCorrectionSlice';
import getFromList from '@/modules/stock/utils/get-from-list';

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
  const {loadingProduct, productFromId} = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStockCorrectionReasons());
    if (route.params.stockCorrection != null) {
      dispatch(fetchProductWithId(route.params.stockCorrection.product.id));
    }
  }, [dispatch]);

  // ------------  VARIABLES --------------
  const [loading, setLoading] = useState(true); // Indicator for initialisation of variables
  const [saveStatus, setSaveStatus] = useState(); // Inidicator for changes

  const [status, setStatus] = useState();
  const [stockLocation, setStockLocation] = useState();
  const [stockProduct, setStockProduct] = useState();
  const [trackingNumber, setTrackingNumber] = useState();
  const [databaseQty, setDatabaseQty] = useState();
  const [realQty, setRealQty] = useState();
  const [reason, setReason] = useState();

  useEffect(() => {
    initVariables();
  }, [route, productFromId]);

  const initVariables = () => {
    if (route.params.stockCorrection == null) {
      setStatus(STATUS_DRAFT);
      setStockLocation(route.params.stockLocation);
      setStockProduct(route.params.stockProduct);
      setTrackingNumber(
        route.params.trackingNumber == null
          ? null
          : route.params.trackingNumber,
      );
      setDatabaseQty(0); // get current qty of product with request
      setRealQty(0);
      setReason({name: '', id: 'empty'});

      setSaveStatus(false);
    } else {
      setStatus(route.params.stockCorrection.statusSelect);
      setStockLocation(route.params.stockCorrection.stockLocation);
      setStockProduct(productFromId);
      setTrackingNumber(route.params.stockCorrection.trackingNumber);
      setDatabaseQty(route.params.stockCorrection.realQty);
      setRealQty(route.params.stockCorrection.realQty);
      setReason(route.params.stockCorrection.stockCorrectionReason);

      setSaveStatus(true);
    }
    setLoading(false);
  };

  // ------------  HANDLERS --------------

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: stockProduct,
    });
  };

  const handleQtyChange = value => {
    setRealQty(value);
    setSaveStatus(false);
  };

  const handleReasonChange = reasonId => {
    if (reasonId == 'empty') {
      setReason({name: '', id: 'empty'});
    } else {
      setReason(getFromList(stockCorrectionReasonList, 'id', reasonId));
    }
    setSaveStatus(false);
  };

  const {createResponse, updateResponse, error} = useSelector(
    state => state.stockCorrection,
  );

  const handleSave = () => {
    if (reason.id == 'empty') {
      // Required field
      setPopUp(true);
      return;
    }

    // Request AOS API
    if (route.params.stockCorrection == null) {
      // Stock correction doesn't exsist yet : creation
      if (
        stockProduct.trackingNumberConfiguration == null ||
        trackingNumber == null
      ) {
        dispatch(
          createCorrection({
            productId: stockProduct.id,
            stockLocationId: stockLocation.id,
            reasonId: reason.id,
            status: STATUS_DRAFT,
            realQty: realQty,
          }),
        );
      } else {
        dispatch(
          createCorrection({
            productId: stockProduct.id,
            stockLocationId: stockLocation.id,
            reasonId: reason.id,
            trackingNumberId: trackingNumber.id,
            status: STATUS_DRAFT,
            realQty: realQty,
          }),
        );
      }
    } else {
      // Stock correction already exists : update qty or reason
      dispatch(
        updateCorrection({
          stockCorrectionId: route.params.stockCorrection.id,
          realQty: realQty,
        }),
      );
    }
  };

  const handleValidate = () => {
    if (reason.id == 'empty') {
      // Required field
      setPopUp(true);
      return;
    }

    // Request AOS API
    if (route.params.stockCorrection == null) {
      // Stock correction doesn't exsist yet : creation
      if (
        stockProduct.trackingNumberConfiguration == null ||
        trackingNumber == null
      ) {
        dispatch(
          createCorrection({
            productId: stockProduct.id,
            stockLocationId: stockLocation.id,
            reasonId: reason.id,
            status: STATUS_VALIDATED,
            realQty: realQty,
          }),
        );
      } else {
        dispatch(
          createCorrection({
            productId: stockProduct.id,
            stockLocationId: stockLocation.id,
            reasonId: reason.id,
            trackingNumberId: trackingNumber.id,
            status: STATUS_VALIDATED,
            realQty: realQty,
          }),
        );
      }
    } else {
      // Stock correction already exists : update qty or reason
      dispatch(
        updateCorrection({
          stockCorrectionId: route.params.stockCorrection.id,
          realQty: saveStatus ? null : realQty,
          status: STATUS_VALIDATED,
        }),
      );
    }
  };

  // ------------  RENDER SCREEN --------------
  const [popUp, setPopUp] = useState(false);

  return (
    <Screen style={styles.container}>
      {loading || loadingProduct ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <PopUpOneButton
            visible={popUp}
            data="Error Message"
            title="Caution"
            btnTitle="OK"
            onPress={() => setPopUp(!popUp)}
          />
          <View style={styles.badge_container}>
            <Badge
              style={[
                styles.badge,
                status == STATUS_DRAFT
                  ? styles.badge_draft
                  : styles.badge_validated,
              ]}
              title={getStatus(status)}
            />
          </View>
          <InfosCard
            style={styles.infosCard}
            valueTxt={stockLocation.name}
            editable={false}
          />
          <ProductCard
            style={styles.productCard}
            name={stockProduct.name}
            code={stockProduct.code}
            onPress={handleShowProduct}
          />
          {stockProduct.trackingNumberConfiguration == null ||
          trackingNumber == null ? null : (
            <InfosCard
              style={styles.infosCard}
              valueTxt={trackingNumber.trackingNumberSeq}
              editable={false}
            />
          )}
          <QuantityCard
            labelQty="Real quantity"
            defaultValue={parseFloat(realQty).toFixed(2)}
            onValueChange={handleQtyChange}
            editable={status == STATUS_DRAFT}>
            <Text style={styles.text}>
              {'Database quantity: ' + parseFloat(databaseQty).toFixed(2)}
            </Text>
          </QuantityCard>
          {status == STATUS_VALIDATED ? (
            <InfosCard
              style={styles.infosCard}
              valueTxt={reason.name}
              editable={false}
            />
          ) : (
            <Picker
              style={styles.picker}
              styleTxt={reason.id == 'empty' ? styles.picker_empty : null}
              title="Reason"
              onValueChange={handleReasonChange}
              defaultValue={reason.id}
              listItems={stockCorrectionReasonList}
              labelField="name"
              valueField="id"
            />
          )}
        </View>
      )}
      <View style={styles.button_container}>
        {saveStatus ? null : (
          <Button
            title="SAVE"
            style={[styles.button, styles.button_secondary]}
            styleTxt={styles.button_title}
            onPress={handleSave}
          />
        )}
        {status == STATUS_VALIDATED ? null : (
          <Button
            title="VALIDATE"
            style={[styles.button, styles.button_primary]}
            styleTxt={styles.button_title}
            onPress={handleValidate}
          />
        )}
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
  badge_draft: {
    backgroundColor: 'rgba(206, 206, 206, 0.6)',
    borderColor: 'rgba(206, 206, 206, 1)',
  },
  badge_validated: {
    backgroundColor: '#84DCB7',
    borderColor: '#3ECF8E',
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
  picker_empty: {
    color: 'red',
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
