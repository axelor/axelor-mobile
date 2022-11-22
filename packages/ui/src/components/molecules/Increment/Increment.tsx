import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {formatNumber} from '../../../utils/formatters';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Icon, Input} from '../../atoms';

interface IncrementProps {
  value: string | undefined;
  decimalSpacer?: string;
  thousandSpacer?: string;
  onValueChange: (any) => void;
}

const Increment = ({
  value,
  decimalSpacer,
  thousandSpacer,
  onValueChange,
}: IncrementProps) => {
  const Colors = useThemeColor();
  const [valueQty, setValueQty] = useState(
    formatNumber(value, decimalSpacer, thousandSpacer),
  );

  const handlePlus = () => {
    const newValue: number = parseFloat(valueQty) + parseFloat('1');
    setValueQty(newValue.toFixed(2).toString());
    onValueChange(newValue.toFixed(2));
  };

  const handleMinus = () => {
    const newValue = parseFloat(valueQty) - parseFloat('1');
    if (newValue >= 0) {
      setValueQty(newValue.toFixed(2).toString());
      onValueChange(newValue.toFixed(2));
    }
  };

  const handleEndInput = () => {
    if (valueQty.slice(-1) === decimalSpacer) {
      valueQty.replace(/.,$/, '');
    }

    if (valueQty === '' || valueQty === null) {
      setValueQty(`0${decimalSpacer}00`);
      onValueChange(0.0);
    } else {
      const newValue: number = parseFloat(valueQty);
      if (newValue >= 0) {
        setValueQty(
          formatNumber(
            newValue.toFixed(2).toString(),
            decimalSpacer,
            thousandSpacer,
          ),
        );
        onValueChange(newValue.toFixed(2));
      } else {
        setValueQty(`0${decimalSpacer}00`);
        onValueChange(0.0);
      }
    }
  };

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={styles.container_increment}>
      <Icon
        name="minus"
        size={24}
        color={Colors.primaryColor.background}
        touchable={true}
        onPress={handleMinus}
        style={styles.container_icon}
      />
      <View style={styles.inputLine}>
        <Input
          style={styles.input}
          value={valueQty}
          onChange={input => setValueQty(input)}
          keyboardType="numeric"
          onEndFocus={handleEndInput}
        />
      </View>
      <Icon
        name="plus"
        size={24}
        color={Colors.primaryColor.background}
        touchable={true}
        onPress={handlePlus}
        style={styles.container_icon}
      />
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container_increment: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    container_icon: {
      backgroundColor: Colors.backgroundColor,
      elevation: 3,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 8,
      padding: 2,
      paddingHorizontal: 5,
      borderColor: Colors.secondaryColor.background,
      borderWidth: 0.5,
      borderRadius: 10,
    },
    input: {
      fontSize: 23,
      fontWeight: 'bold',
      paddingBottom: 0,
    },
    inputLine: {
      borderStyle: 'dashed',
      borderBottomColor: Colors.secondaryColor.background,
      borderBottomWidth: 0.7,
      marginBottom: 9,
    },
  });

export default Increment;
