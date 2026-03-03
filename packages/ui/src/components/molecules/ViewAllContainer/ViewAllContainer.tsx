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
import {ThemeColors, useThemeColor} from '../../../theme';
import {Card, Icon, Text} from '../../atoms';

interface ViewAllContainerProps {
  style?: any;
  title?: string;
  data?: any[];
  disabled?: boolean;
  children: any;
  isHeaderExist?: boolean;
  onNewIcon?: () => void;
  onViewPress: () => void;
  renderFirstTwoItems?: (item: any, index: number) => any;
  translator?: (key: string) => string;
}

const ViewAllContainer = ({
  style,
  title,
  data = [],
  disabled = false,
  children,
  isHeaderExist = false,
  onNewIcon = () => {},
  onViewPress = () => {},
  renderFirstTwoItems,
  translator = null,
}: ViewAllContainerProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <Card style={[styles.container, style]}>
      {isHeaderExist && (
        <View style={styles.headLineMove} testID="viewAllContainerHeader">
          <Text>
            {translator == null ? 'Content' : translator('Base_Content')}
          </Text>
          <Icon
            name="plus-lg"
            color={Colors.primaryColor.background}
            size={24}
            touchable={true}
            onPress={onNewIcon}
          />
        </View>
      )}
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.cardContainer}>
        {data[0] != null && renderFirstTwoItems(data[0], 0)}
        {data[1] != null && renderFirstTwoItems(data[1], 1)}
        {children}
      </View>
      {!disabled && (
        <TouchableOpacity
          onPress={onViewPress}
          activeOpacity={0.9}
          testID="viewAllContainerButton">
          <View style={styles.iconContainer}>
            <Text style={styles.txtDetails}>
              {translator == null ? 'View all' : translator('Base_ViewAll')}
            </Text>
            <Icon
              name="chevron-right"
              color={Colors.secondaryColor.background_light}
              size={20}
            />
          </View>
        </TouchableOpacity>
      )}
    </Card>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      paddingVertical: '2%',
      paddingHorizontal: '3%',
      paddingRight: 16,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 12,
      marginVertical: 4,
    },
    headLineMove: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 1,
      marginVertical: 2,
      width: '100%',
    },
    title: {
      alignSelf: 'flex-start',
      fontSize: 14,
      marginHorizontal: 8,
      marginBottom: 0,
    },
    cardContainer: {
      marginBottom: 2,
      width: '100%',
    },
    iconContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      alignContent: 'center',
      marginBottom: 2,
      elevation: 3,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
    },
    txtDetails: {
      fontSize: 14,
      marginHorizontal: 15,
    },
  });

export default ViewAllContainer;
