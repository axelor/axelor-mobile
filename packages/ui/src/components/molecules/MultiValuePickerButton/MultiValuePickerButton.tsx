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
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Color, ThemeColors, useThemeColor} from '../../../theme';
import {Card, Icon, Text} from '../../atoms';

interface Item {
  color: Color;
  title: string;
  key: string | number;
}
interface MultiValuePickerButtonProps {
  style?: any;
  onPress: (any) => void;
  listItem: Item[];
  onPressItem?: (any) => void;
}

const MultiValuePickerButton = ({
  style,
  onPress = () => {},
  listItem,
  onPressItem = () => {},
}: MultiValuePickerButtonProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <View style={styles.listItemContainer}>
          {listItem &&
            listItem.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onPressItem(item)}
                activeOpacity={0.9}
                style={[styles.cardItem, getItemColor(item.color)]}>
                <Text
                  style={styles.text}
                  fontSize={14}
                  numberOfLines={1}
                  textColor={
                    item.color.foreground || Colors.primaryColor.foreground
                  }>
                  {item.title}
                </Text>
                <Icon name={'times'} color={item.color.foreground} size={14} />
              </TouchableOpacity>
            ))}
        </View>
        <Icon
          name="chevron-down"
          color={Colors.secondaryColor_dark.background}
        />
      </Card>
    </TouchableOpacity>
  );
};

const getItemColor = (color: Color) => ({
  backgroundColor: color.background_light,
  borderColor: color.background,
});

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width * 0.35,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 15,
      paddingVertical: 5,
      marginVertical: 4,
      marginRight: 18,
    },
    text: {
      textAlign: 'center',
      marginRight: 5,
    },
    listItemContainer: {
      flexDirection: 'row',
      marginLeft: -5,
      overflow: 'hidden',
      width: '90%',
    },
    cardItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      borderWidth: 2,
      borderRadius: 14,
      elevation: 3,
      shadowOpacity: 0.5,
      shadowColor: Colors.secondaryColor.background,
      shadowOffset: {width: 0, height: 0},
      marginLeft: 5,
      paddingHorizontal: 7,
      height: 22,
      maxWidth: 110,
      width: null,
    },
  });

export default MultiValuePickerButton;
