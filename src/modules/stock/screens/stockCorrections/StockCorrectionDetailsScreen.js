import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {Button, Card, Screen, Text} from '@/components/atoms';
import {Picker, Badge} from '@/components/molecules';
import {PopUpOneButton} from '@/components/organisms';
import {QuantityCard} from '@/modules/stock/components/organisms';
import {fetchStockCorrectionReasons} from '@/modules/stock/features/stockCorrectionReasonSlice';
import {fetchProductWithId} from '@/modules/stock/features/productSlice';
import {
  createCorrection,
  updateCorrection,
} from '@/modules/stock/features/stockCorrectionSlice';
import getFromList from '@/modules/stock/utils/get-from-list';
import getBadgeColor from '@/modules/stock/utils/get-badge-color';
import {ProductCardCorrection} from '../../components/molecules';
import Icon from 'react-native-vector-icons/FontAwesome';

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

const StockCorrectiondetailsScreen = ({navigation, route}) => {
  // ------------  API --------------
  const {loadingReasons, stockCorrectionReasonList} = useSelector(
    state => state.stockCorrectionReason,
  );
  const {loadingProduct, productFromId} = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
  }, [route.params]);

  return (
    <Screen style={styles.container}>
      {loading || loadingProduct ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <ScrollView>
            <PopUpOneButton
              visible={popUp}
              data="Error Message"
              title="Caution"
              btnTitle="OK"
              onPress={() => setPopUp(!popUp)}
            />
            <View>
              <View style={styles.content}>
                <View style={styles.textContainer}>
                  <Text style={styles.text_important}>
                    {stockLocation.name}
                  </Text>
                </View>
                <Badge
                  style={[styles.badge, getBadgeColor(getStatus(status))]}
                  title={getStatus(status)}
                />
              </View>
              <View style={styles.contentProduct}>
                {stockProduct.picture == null ? (
                  <Icon name="camera" style={styles.icon} />
                ) : (
                  <Image
                    resizeMode="contain"
                    source={{
                      uri: `https://test.axelor.com/open-suite-wip/ws/rest/com.axelor.meta.db.MetaFile/${stockProduct.picture.id}/content/download`,
                    }}
                    style={styles.image}
                  />
                )}
                <ProductCardCorrection
                  style
                  name={stockProduct.name}
                  code={stockProduct.code}
                  onPress={handleShowProduct}>
                  <Text style={styles.text_important}>{stockProduct.name}</Text>
                  <Text style={styles.text_secondary}>{stockProduct.code}</Text>
                  {stockProduct.trackingNumberConfiguration == null ||
                  trackingNumber == null ? null : (
                    <Text style={styles.text_secondary}>
                      {trackingNumber.trackingNumberSeq}
                    </Text>
                  )}
                </ProductCardCorrection>
              </View>
            </View>
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
              <View>
                <View style={styles.reasonTitle}>
                  <Text>Reason</Text>
                </View>
                <Card style={styles.infosCard}>
                  <Text>{reason.name}</Text>
                </Card>
              </View>
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
          </ScrollView>

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
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: '2%',
  },
  content: {
    marginHorizontal: 32,
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  badge: {
    flex: 1,
    alignItems: 'center',
    width: 55,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '40%',
    borderRadius: 50,
    marginHorizontal: 12,
    marginBottom: '2%',
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
    fontSize: 16,
  },
  icon: {
    fontSize: Dimensions.get('window').width * 0.14,
    color: '#cecece',
    marginRight: 6,
  },
});

export default StockCorrectiondetailsScreen;
