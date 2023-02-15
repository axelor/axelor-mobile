/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {formatNumber, unformatNumber} from '../../../utils/formatters';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Icon, Input} from '../../atoms';

interface IncrementProps {
  style?: any;
  inputStyle?: any;
  value: string | undefined;
  decimalSpacer?: string;
  thousandSpacer?: string;
  onValueChange: (any) => void;
}

const Increment = ({
  style,
  inputStyle,
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
    const newValue: number =
      parseFloat(unformatNumber(valueQty, decimalSpacer, thousandSpacer)) +
      parseFloat('1');
    setValueQty(
      formatNumber(
        newValue.toFixed(2).toString(),
        decimalSpacer,
        thousandSpacer,
      ),
    );
    onValueChange(
      formatNumber(
        newValue.toFixed(2).toString(),
        decimalSpacer,
        thousandSpacer,
      ),
    );
  };

  const handleMinus = () => {
    const newValue =
      parseFloat(unformatNumber(valueQty, decimalSpacer, thousandSpacer)) -
      parseFloat('1');
    if (newValue >= 0) {
      setValueQty(
        formatNumber(
          newValue.toFixed(2).toString(),
          decimalSpacer,
          thousandSpacer,
        ),
      );
      onValueChange(
        formatNumber(
          newValue.toFixed(2).toString(),
          decimalSpacer,
          thousandSpacer,
        ),
      );
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
    <View style={[styles.container_increment, style]}>
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
          style={[styles.input, inputStyle]}
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
