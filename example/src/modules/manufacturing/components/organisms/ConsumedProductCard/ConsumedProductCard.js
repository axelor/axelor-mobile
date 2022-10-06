import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Badge, Card, LabelText, Text, useThemeColor} from '@aos-mobile/ui';
import {useTranslator} from '@aos-mobile/core';

const ConsumedProductCard = ({
  style,
  productName,
  plannedQty,
  consumedQty,
  missingQty,
  availableQty,
  unitName,
  trackingNumber = null,
  onPress = () => {},
  increment = {addedQty: 0, incrementVisible: false},
}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const borderStyle = useMemo(() => {
    if (missingQty > 0) {
      return getBorderStyles(Colors.errorColor);
    } else if (
      consumedQty == null ||
      consumedQty === 0 ||
      plannedQty > consumedQty
    ) {
      return getBorderStyles(Colors.plannedColor);
    } else {
      return getBorderStyles(Colors.primaryColor);
    }
  }, [Colors, consumedQty, missingQty, plannedQty]);

  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.cardContainer, borderStyle]}>
        <View style={styles.topContainer}>
          <Text style={styles.txtImportant}>{productName}</Text>
          {increment.incrementVisible && (
            <Badge
              title={`+ ${increment.addedQty}`}
              style={styles.badge}
              color={Colors.priorityColor_light}
              txtStyle={styles.badgeInfos}
            />
          )}
        </View>
        <LabelText
          title={`${I18n.t('Manufacturing_PlannedQty')}:`}
          value={`${parseFloat(plannedQty).toFixed(2)} ${
            unitName != null ? unitName : ''
          }`}
        />
        <LabelText
          title={`${I18n.t('Manufacturing_ConsumedQty')}:`}
          value={`${
            consumedQty == null
              ? parseFloat(0).toFixed(2)
              : parseFloat(consumedQty).toFixed(2)
          } ${unitName != null ? unitName : ''}`}
        />
        {trackingNumber != null && (
          <LabelText
            iconName="qrcode"
            title={`${I18n.t('Manufacturing_TrackingNumber')}:`}
            value={trackingNumber}
          />
        )}
        <Badge
          color={
            availableQty > 0
              ? missingQty > 0
                ? Colors.cautionColor_light
                : Colors.primaryColor_light
              : Colors.errorColor_light
          }
          title={
            availableQty > 0
              ? missingQty > 0
                ? I18n.t('Stock_Partially')
                : I18n.t('Stock_Available')
              : I18n.t('Stock_Unavailable')
          }
        />
      </Card>
    </TouchableOpacity>
  );
};

const getBorderStyles = color =>
  StyleSheet.create({
    borderLeftWidth: 7,
    borderLeftColor: color,
  });

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    margin: 2,
    elevation: 0,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
  },
  txtImportant: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    height: 20,
    width: 40,
    borderRadius: 30,
  },
  badgeInfos: {
    fontWeight: 'bold',
  },
});

export default ConsumedProductCard;
