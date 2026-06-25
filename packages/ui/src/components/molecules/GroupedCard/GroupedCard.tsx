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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {checkNullString} from '../../../utils';
import {useThemeColor} from '../../../theme';
import {Card, HorizontalRule, Text} from '../../atoms';

interface GroupedCardProps {
  style?: any;
  titleStyle?: any;
  itemStyle?: any;
  ruleStyle?: any;
  title?: string;
  data: any[];
  renderItem: (item: any, index: number) => any;
  keyExtractor?: (item: any, index: number) => string;
}

const GroupedCard = ({
  style,
  titleStyle,
  itemStyle,
  ruleStyle,
  title,
  data,
  renderItem,
  keyExtractor,
}: GroupedCardProps) => {
  const Colors = useThemeColor();

  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <Card style={[styles.container, style]}>
      {!checkNullString(title) && (
        <Text
          style={[styles.title, titleStyle]}
          fontSize={12}
          textColor={Colors.secondaryColor.background}>
          {title}
        </Text>
      )}
      {data.map((item, index) => (
        <View key={keyExtractor ? keyExtractor(item, index) : index}>
          {index > 0 && (
            <HorizontalRule
              style={[styles.rule, ruleStyle]}
              color={Colors.secondaryColor.background_light}
              width={0.5}
            />
          )}
          <View style={itemStyle} testID="groupedCardItem">
            {renderItem(item, index)}
          </View>
        </View>
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingRight: 0,
    paddingVertical: 4,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 8,
    marginTop: 0,
  },
  title: {
    marginVertical: 5,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  rule: {
    marginHorizontal: 0,
    marginVertical: 4,
  },
});

export default GroupedCard;
