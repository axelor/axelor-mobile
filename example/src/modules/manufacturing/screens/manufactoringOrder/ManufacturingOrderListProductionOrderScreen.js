import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
  Badge,
  Card,
  LabelText,
  Screen,
  ScrollList,
  HeaderContainer,
  Text,
  useThemeColor,
} from '@aos-mobile/ui';
import {useDispatch, useSelector, useTranslator} from '@aos-mobile/core';
import {ManufacturingOrderHeader} from '../../components/organisms';
import {fetchLinkedManufOrders} from '../../features/manufacturingOrderSlice';
import ManufacturingOrder from '../../types/manufacturing-order';

const ManufacturingOrderListProductionOrderScreen = ({route, navigation}) => {
  const manufOrder = route.params.manufOrder;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {loadingLinkMO, moreLoadingLinkMO, isListEndLinkMO, linkedManufOrders} =
    useSelector(state => state.manufacturingOrder);
  const dispatch = useDispatch();

  const fetchManufOrderAPI = useCallback(
    (page = 0) => {
      dispatch(
        fetchLinkedManufOrders({
          productionOrderList: manufOrder.productionOrderSet,
          page,
        }),
      );
    },
    [dispatch, manufOrder],
  );

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
            <Text style={styles.orderTitle}>
              {I18n.t('Manufacturing_RefOP')}
            </Text>
          </>
        }
      />
      <ScrollList
        loadingList={loadingLinkMO}
        data={linkedManufOrders}
        renderItem={({item}) => {
          return (
            <Card style={styles.itemContainer}>
              <LabelText
                style={styles.itemTitle}
                title={item.manufOrderSeq}
                iconName="tag"
              />
              <Badge
                title={ManufacturingOrder.getStatus(item.statusSelect, I18n)}
                color={
                  ManufacturingOrder.getStatusColor(item.statusSelect, Colors)
                    .backgroundColor
                }
              />
            </Card>
          );
        }}
        fetchData={fetchManufOrderAPI}
        moreLoading={moreLoadingLinkMO}
        isListEnd={isListEndLinkMO}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  orderTitle: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  itemContainer: {
    marginHorizontal: 12,
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '10%',
  },
  itemTitle: {
    fontWeight: 'bold',
  },
});

export default ManufacturingOrderListProductionOrderScreen;
