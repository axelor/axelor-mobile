/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useCallback, useMemo} from 'react';
import {KeyboardTypeOptions, StyleSheet, View} from 'react-native';
import {getCommonStyles} from '../../../utils';
import {useDigitFormat} from '../../../hooks';
import {useThemeColor} from '../../../theme';
import {Card, HorizontalRule, Icon, Text} from '../../atoms';
import {Increment} from '../../molecules';

interface QuantityCardProps {
  style?: any;
  children?: any;
  labelQty: string;
  defaultValue: number;
  onValueChange: (_v?: any) => void;
  editable: boolean;
  actionQty?: boolean;
  iconName?: string;
  onPressActionQty?: () => void;
  isBigButton?: boolean;
  translator: (key: string) => string;
  inputStyle?: any;
  onFocus?: () => void;
  onBlur?: () => void;
  defaultFormatting?: boolean;
  stepSize?: number;
  minValue?: number;
  maxValue?: number;
  keyboardType?: KeyboardTypeOptions;
  scale?: number;
  isFormWrapper?: boolean;
}

const QuantityCard = ({
  style,
  children,
  labelQty,
  defaultValue = 0,
  onValueChange,
  editable,
  actionQty = false,
  iconName = 'pencil-fill',
  onPressActionQty,
  isBigButton = false,
  translator,
  isFormWrapper = false,
  ...incrementProps
}: QuantityCardProps) => {
  const Colors = useThemeColor();
  const formatNumber = useDigitFormat();

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const _defaultValue = useMemo(
    () => formatNumber(defaultValue),
    [defaultValue, formatNumber],
  );

  const renderIncrement = useCallback(() => {
    if (editable)
      return (
        <Increment
          {...incrementProps}
          value={_defaultValue}
          decimalSpacer={translator('Base_DecimalSpacer')}
          thousandSpacer={translator('Base_ThousandSpacer')}
          onValueChange={onValueChange}
          isBigButton={isBigButton}
          inputStyle={styles.incrementInput}
        />
      );

    return <Text writingType="important">{_defaultValue}</Text>;
  }, [
    _defaultValue,
    editable,
    incrementProps,
    isBigButton,
    onValueChange,
    translator,
  ]);

  const Container = useMemo(
    () => (isFormWrapper ? View : Card),
    [isFormWrapper],
  );

  return (
    <Container
      style={[
        isFormWrapper ? commonStyles.filter : undefined,
        styles.container,
        style,
      ]}>
      {children != null && (
        <View style={styles.upperContainer}>
          {actionQty ? (
            <View style={styles.actionContainer}>
              <View style={styles.childrenContainer}>{children}</View>
              <Icon name={iconName} touchable onPress={onPressActionQty} />
            </View>
          ) : (
            <View>{children}</View>
          )}
          <HorizontalRule
            style={styles.border}
            color={Colors.secondaryColor.background_light}
          />
        </View>
      )}
      <View style={styles.incrementContainer}>
        <Text>{labelQty}</Text>
        {renderIncrement()}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 8,
    paddingRight: 16,
    paddingLeft: 16,
    width: '90%',
    alignSelf: 'center',
  },
  upperContainer: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'column',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
  },
  childrenContainer: {
    flex: 1,
  },
  border: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 5,
  },
  incrementContainer: {
    alignItems: 'center',
  },
  incrementInput: {
    fontSize: 15,
  },
});

export default QuantityCard;
