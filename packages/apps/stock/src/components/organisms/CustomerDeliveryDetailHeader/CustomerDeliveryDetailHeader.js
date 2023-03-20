import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {LabelText, Badge, useThemeColor} from '@axelor/aos-mobile-ui';
import StockMoveHeader from '../StockMoveHeader/StockMoveHeader';
import StockMove from '../../../types/stock-move';

const CustomerDeliveryDetailHeader = ({customerDelivery}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <View>
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
      <View style={styles.generalInfoContainer}>
        <View style={styles.clientInfos}>
          <LabelText
            iconName="user"
            title={customerDelivery.partner?.fullName}
          />
          {customerDelivery?.origin && (
            <LabelText iconName="tag" title={customerDelivery?.origin} />
          )}
        </View>
        <View style={styles.ispmInfos}>
          {customerDelivery?.isIspmRequired && (
            <Badge
              color={Colors.errorColor}
              title={I18n.t('Stock_StandardISPM')}
              style={styles.ispmBadge}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  generalInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  clientInfos: {
    flex: 3,
  },
  ispmInfos: {
    flex: 2,
    flexDirection: 'row-reverse',
  },
  ispmBadge: {
    width: '90%',
  },
});

export default CustomerDeliveryDetailHeader;
