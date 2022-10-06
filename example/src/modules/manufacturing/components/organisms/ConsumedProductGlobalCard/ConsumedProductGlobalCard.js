import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CardIconButton, useThemeColor} from '@aos-mobile/ui';
import ConsumedProductCard from '../ConsumedProductCard/ConsumedProductCard';

const TIME_DISPLAY_INCREMENT = 2000;

const ConsumedProductGlobalCard = ({
  productName,
  plannedQty,
  consumedQty,
  missingQty,
  availableQty,
  unitName,
  trackingNumber = null,
  onPress = () => {},
  onMorePress = () => {},
  onLocationPress = () => {},
  onSubOfPress = () => {},
  isSubOF = false,
}) => {
  const Colors = useThemeColor();
  const [addedQty, setAddedQty] = useState(0);
  const [incrementVisible, setIncrementVisible] = useState(false);
  let timeOutIncrement = useRef();

  const handleIncrement = () => {
    setIncrementVisible(true);
    setAddedQty(addedQty + 1);
  };

  useEffect(() => {
    if (incrementVisible && addedQty > 0) {
      const id = setTimeout(handleTimeOut, TIME_DISPLAY_INCREMENT);
      timeOutIncrement.current = id;

      return () => {
        clearTimeout(timeOutIncrement.current);
      };
    }
  }, [handleTimeOut, incrementVisible, addedQty]);

  const handleTimeOut = useCallback(() => {
    if (addedQty > 0) {
      onMorePress(addedQty);
      setIncrementVisible(false);
      setAddedQty(0);
    }
  }, [addedQty, onMorePress]);

  return (
    <View style={styles.globalContainer}>
      <ConsumedProductCard
        style={styles.consumedCard}
        productName={productName}
        plannedQty={plannedQty}
        consumedQty={consumedQty}
        missingQty={missingQty}
        availableQty={availableQty}
        unitName={unitName}
        trackingNumber={trackingNumber}
        onPress={onPress}
        increment={{addedQty, incrementVisible}}
      />
      <View style={styles.middleContainer}>
        <CardIconButton
          style={styles.cardIconButton}
          iconName="map-marker-alt"
          color={Colors.secondaryColor}
          onPress={onLocationPress}
        />
        {isSubOF ? (
          <CardIconButton
            style={styles.cardIconButton}
            iconName="sitemap"
            color={Colors.secondaryColor}
            onPress={onSubOfPress}
          />
        ) : null}
      </View>
      <View style={styles.middleContainer}>
        <CardIconButton
          style={styles.cardIconButton}
          iconName="plus"
          color={Colors.primaryColor}
          onPress={handleIncrement}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  globalContainer: {
    display: 'flex',
    flex: 1,
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: 14,
    marginVertical: 2,
  },
  middleContainer: {
    flex: 1,
  },
  consumedCard: {
    flex: 5,
  },
  cardIconButton: {
    flex: 1,
  },
});

export default ConsumedProductGlobalCard;
