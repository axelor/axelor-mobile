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
import {Card, Icon, Text} from '../../atoms';
import {Increment} from '../../molecules';
import {getCommonStyles} from '../../../utils/commons-styles';
import {useDigitFormat} from '../../../hooks/use-digit-format';
import {useThemeColor} from '../../../theme';

interface QuantityCardProps {
  style?: any;
  children?: any;
  labelQty: string;
  defaultValue: number;
  onValueChange: (value: number) => void;
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
  onPressActionQty = () => {},
  isBigButton = false,
  translator,
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
    return (
      <Increment
        {...incrementProps}
        value={_defaultValue}
        decimalSpacer={translator('Base_DecimalSpacer')}
        thousandSpacer={translator('Base_ThousandSpacer')}
        onValueChange={onValueChange}
        isBigButton={isBigButton}
      />
    );
  }, [_defaultValue, incrementProps, isBigButton, onValueChange, translator]);

  if (children == null || children.length === 0) {
    return (
      <Card style={[styles.noChildrenContainer, style]}>
        <Text style={styles.noChildrenTextField}>{labelQty}</Text>
        {editable ? (
          renderIncrement()
        ) : (
          <Text style={styles.noChildrenTextValue}>{_defaultValue}</Text>
        )}
      </Card>
    );
  }

  return (
    <Card style={[commonStyles.filter, styles.container]}>
      <View style={styles.container_up}>
        {actionQty ? (
          <View style={styles.actionContainer}>
            <View style={styles.childrenContainer}>{children}</View>
            <Icon
              name={iconName}
              size={17}
              touchable={true}
              onPress={onPressActionQty}
            />
          </View>
        ) : (
          <View>{children}</View>
        )}
      </View>
      <View style={styles.container_down}>
        <Text style={styles.textField}>{labelQty}</Text>
        {editable ? (
          renderIncrement()
        ) : (
          <Text style={styles.textValue}>{_defaultValue}</Text>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  noChildrenContainer: {
    flexDirection: 'column',
    marginHorizontal: 16,
    marginBottom: '2%',
    alignItems: 'center',
  },
  noChildrenTextField: {
    fontSize: 16,
  },
  noChildrenTextValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'column',
    marginHorizontal: 18,
    paddingVertical: 16,
    paddingRight: 16,
    paddingLeft: 16,
    width: '90%',
    alignSelf: 'center',
  },
  container_up: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    flexDirection: 'column',
    width: '100%',
    paddingBottom: '3%',
    alignSelf: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  childrenContainer: {
    flexDirection: 'column',
  },
  container_down: {
    paddingTop: '1%',
    alignItems: 'center',
  },
  textField: {
    fontSize: 16,
    paddingTop: '3%',
  },
  textValue: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: '3%',
  },
});

export default QuantityCard;
