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

import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Card,
  Icon,
  Text,
  useThemeColor,
  LabelText,
  checkNullString,
} from '@axelor/aos-mobile-ui';

interface LiteContactCardProps {
  style?: any;
  contactFullname: string;
  mobilePhoneNumber?: string;
  fixedPhoneNumber: string;
  email: string;
  onPress: () => void;
}
const LiteContactCard = ({
  style,
  contactFullname,
  mobilePhoneNumber,
  fixedPhoneNumber,
  email,
  onPress,
}: LiteContactCardProps) => {
  const Colors = useThemeColor();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.containerChildren}>
          {!checkNullString(contactFullname) && (
            <Text style={styles.bold}>{contactFullname}</Text>
          )}
          {!checkNullString(mobilePhoneNumber) && (
            <LabelText iconName="phone-alt" title={mobilePhoneNumber} />
          )}
          {!checkNullString(fixedPhoneNumber) && (
            <LabelText iconName="phone-alt" title={fixedPhoneNumber} />
          )}
          {!checkNullString(email) && (
            <LabelText iconName="envelope" title={email} />
          )}
        </View>
        <Icon
          name="chevron-right"
          color={Colors.secondaryColor.background_light}
          size={20}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerChildren: {
    flexDirection: 'column',
  },
  bold: {fontWeight: 'bold'},
});

export default LiteContactCard;
