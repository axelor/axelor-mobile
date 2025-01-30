/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {StyleSheet, View} from 'react-native';
import {
  Icon,
  LabelText,
  Text,
  useThemeColor,
  checkNullString,
} from '@axelor/aos-mobile-ui';
import {clipboardProvider} from '@axelor/aos-mobile-core';

interface ContactInfoCardProps {
  style?: any;
  headerIconName: string;
  title: string;
  data: string;
  rightIconName: string;
  rightIconAction?: () => any;
  FontAwesome5HeaderIcon?: boolean;
  FontAwesome5RightIcon?: boolean;
  border?: boolean;
  styleBorder?: any;
}

const ContactInfoCard = ({
  style,
  headerIconName,
  title,
  data,
  rightIconName,
  FontAwesome5HeaderIcon = true,
  FontAwesome5RightIcon = true,
  border = false,
  styleBorder,
  rightIconAction,
}: ContactInfoCardProps) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => {
    return getStyles(Colors);
  }, [Colors]);

  return (
    <View style={[styles.container, style]}>
      {!checkNullString(data) && (
        <View>
          <LabelText
            title={title}
            iconName={headerIconName}
            size={15}
            textStyle={styles.textTitle}
            FontAwesome5={FontAwesome5HeaderIcon}
          />
          <View style={styles.containerBody}>
            <Text style={styles.textData}>{data}</Text>
            <Icon
              style={styles.rightIcon}
              name={rightIconName}
              touchable={true}
              onPress={rightIconAction}
              FontAwesome5={FontAwesome5RightIcon}
            />
            <Icon
              name={'copy'}
              touchable={true}
              onPress={() => clipboardProvider.copyToClipboard(data)}
            />
          </View>
          {border && <View style={[styles.borderBottom, styleBorder]} />}
        </View>
      )}
    </View>
  );
};
const getStyles = Colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      width: '95%',
      marginHorizontal: 5,
    },
    containerBody: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '2%',
    },
    rightIcon: {
      marginRight: '2%',
    },
    textTitle: {
      fontSize: 14,
    },
    textData: {
      width: '85%',
      fontSize: 14,
    },
    borderBottom: {
      width: '100%',
      borderBottomWidth: 1.5,
      borderBottomColor: Colors.secondaryColor.background,
      marginVertical: '3%',
    },
  });

export default ContactInfoCard;
