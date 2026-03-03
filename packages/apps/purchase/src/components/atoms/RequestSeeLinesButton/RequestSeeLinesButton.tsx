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

import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  Card,
  Icon,
  NumberBubble,
  useThemeColor,
  Text,
} from '@axelor/aos-mobile-ui';

const RequestSeeLinesButton = () => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const navigation = useNavigation();

  const styles = useMemo(
    () => getStyles(Colors.secondaryColor.background),
    [Colors.secondaryColor.background],
  );

  const {totalPurchaseRequestLine} = useSelector(
    state => state.purchase_purchaseRequestLine,
  );

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('RequestLineListScreen')}
      disabled={totalPurchaseRequestLine === 0}
      activeOpacity={0.9}>
      <Card style={styles.container}>
        <Text style={styles.text}>{I18n.t('Purchase_SeeLines')}</Text>
        <View style={styles.rightContainer}>
          <NumberBubble
            style={styles.numberBubble}
            number={totalPurchaseRequestLine}
            color={Colors.progressColor}
            isNeutralBackground={false}
          />
          {totalPurchaseRequestLine > 0 && (
            <Icon name="chevron-right" color={Colors.primaryColor.background} />
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = (borderColor: string) =>
  StyleSheet.create({
    container: {
      width: '90%',
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
      alignItems: 'center',
      marginRight: 0,
      paddingVertical: 5,
      paddingLeft: 10,
      paddingRight: 10,
      borderWidth: 1,
      borderRadius: 7,
      borderColor: borderColor,
      marginVertical: 3,
    },
    text: {
      fontWeight: 'bold',
    },
    rightContainer: {
      flexDirection: 'row',
    },
    numberBubble: {
      borderRadius: 7,
      marginRight: 4,
    },
  });

export default RequestSeeLinesButton;
