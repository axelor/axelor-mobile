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
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Color} from '../../../theme/themes';
import {useThemeColor} from '../../../theme/ThemeContext';
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

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={[styles.container, style]}>
        <ScrollView horizontal={true} style={styles.listItemContainer}>
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
        </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.35,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 15,
    paddingVertical: 5,
    marginVertical: 4,
    marginRight: 16,
  },
  text: {
    textAlign: 'center',
    marginRight: 5,
  },
  listItemContainer: {
    flexDirection: 'row',
    marginLeft: -5,
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 2,
    borderRadius: 14,
    elevation: 3,
    marginLeft: 5,
    paddingHorizontal: 7,
    height: 22,
    maxWidth: 100,
    width: null,
  },
});

export default MultiValuePickerButton;
