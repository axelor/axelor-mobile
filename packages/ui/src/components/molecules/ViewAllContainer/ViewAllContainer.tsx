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

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Card, Icon, Text} from '../../atoms';

interface ViewAllContainerProps {
  style?: any;
  title: string;
  data: any[];
  disabled: boolean;
  children: any;
  isHeaderExist?: boolean;
  onNewIcon?: () => void;
  onViewPress: () => void;
  renderFirstTwoItems: (item: any, index: number) => any;
  translator?: (any) => void | undefined;
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

  return (
    <Card style={[styles.container, style]}>
      {isHeaderExist && (
        <View style={styles.headLineMove}>
          <Text>
            {translator == null ? 'Content' : translator('Base_Content')}
          </Text>
          <Icon
            name="plus"
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
        <TouchableOpacity onPress={onViewPress} activeOpacity={0.9}>
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

const styles = StyleSheet.create({
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
  },
  txtDetails: {
    fontSize: 14,
    marginHorizontal: 15,
  },
});

export default ViewAllContainer;
