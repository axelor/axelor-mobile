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

import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Card,
  Text,
  checkNullString,
  useThemeColor,
  Icon,
} from '@axelor/aos-mobile-ui';
import {
  getFullDateItems,
  useSelector,
  useTranslator,
  openFileInExternalApp,
} from '@axelor/aos-mobile-core';

interface ExpenseLineCardProps {
  expenseDate?: string;
  projectName?: string;
  totalAmount?: string;
  displayText?: string | number;
  linkIcon?: boolean;
  pdfFile?: any;
  onLongPress: () => void;
  setCardHeight: (height: any) => void;
}

const ExpenseLineCard = ({
  expenseDate,
  projectName,
  totalAmount,
  displayText,
  linkIcon = false,
  pdfFile,
  onLongPress,
  setCardHeight,
}: ExpenseLineCardProps) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const {user} = useSelector((state: any) => state.user);
  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const _date = useMemo(
    () => getFullDateItems(expenseDate, I18n),
    [I18n, expenseDate],
  );

  const handleShowFile = async () => {
    await openFileInExternalApp(
      {fileName: pdfFile?.fileName, id: pdfFile?.id, isMetaFile: true},
      {baseUrl: baseUrl, token: token, jsessionId: jsessionId},
      I18n,
    );
  };

  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={pdfFile != null ? handleShowFile : null}
      delayLongPress={200}
      activeOpacity={1}
      onLayout={event => {
        const {height} = event.nativeEvent.layout;
        setCardHeight(_current => (_current == null ? height : _current));
      }}>
      <Card style={[styles.containerCard, styles.border]}>
        {_date != null && (
          <View style={styles.date}>
            <Text>{_date.day}</Text>
            <Text>{`${_date.date} ${_date.month}`}</Text>
            <Text>{`${_date.year}`}</Text>
          </View>
        )}
        <View style={styles.verticalLine} />
        <View style={styles.column}>
          {!checkNullString(displayText) && (
            <Text style={styles.bold}>{displayText}</Text>
          )}
          {!checkNullString(projectName) && <Text>{projectName}</Text>}
        </View>
        <View style={styles.amount}>
          {!checkNullString(totalAmount) && (
            <Text style={styles.bold}>{`${totalAmount} ${
              user?.activeCompany?.currency?.symbol != null
                ? user?.activeCompany?.currency?.symbol
                : user?.activeCompany?.currency?.code
            }`}</Text>
          )}
        </View>
        {linkIcon && (
          <Icon style={styles.linkIcon} name="external-link-alt" size={10} />
        )}
      </Card>
    </TouchableOpacity>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    containerCard: {
      paddingHorizontal: 0,
      paddingRight: 0,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    bold: {
      fontWeight: 'bold',
    },
    column: {
      flexDirection: 'column',
      flex: 3,
      alignSelf: 'center',
    },
    date: {
      alignSelf: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
    },
    amount: {
      alignSelf: 'center',
      flex: 1,
    },
    verticalLine: {
      borderRightColor: Colors.secondaryColor.background,
      borderRightWidth: 1,
      height: 50,
      alignSelf: 'center',
      marginRight: 10,
    },
    border: {
      borderLeftWidth: 7,
      borderLeftColor: Colors.secondaryColor.background,
    },
    linkIcon: {
      position: 'absolute',
      bottom: 5,
      right: 15,
    },
  });

export default ExpenseLineCard;
