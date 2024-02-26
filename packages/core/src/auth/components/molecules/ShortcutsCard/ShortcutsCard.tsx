/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {Dimensions, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Icon, Text} from '@axelor/aos-mobile-ui';
import {useNavigation} from '../../../../hooks/use-navigation';

const CARD_PERCENT_WIDTH = 90;
const CARD_PADDING = 16;
const ACTION_TYPE = {
  ScreenNavigation: 0,
};

interface ShortcutsCardProps {
  style?: any;
  horizontal?: boolean;
}

const ShortcutsCard = ({style, horizontal = true}: ShortcutsCardProps) => {
  const navigation = useNavigation();

  const renderShortCut = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.shortcut}
        onPress={() =>
          item.actionType === ACTION_TYPE.ScreenNavigation &&
          navigation.navigate(item.params)
        }
        key={index}>
        <Icon name="clock-history" size={35} />
        <Text fontSize={14}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const styles = useMemo(() => {
    const cardWidth =
      Dimensions.get('window').width * (CARD_PERCENT_WIDTH / 100);
    const insideCardWidth = cardWidth - CARD_PADDING * 2;
    const numberShortcutPerLine = horizontal ? 3.5 : 3;
    const shortCutWidth = insideCardWidth / numberShortcutPerLine;

    return getStyles(shortCutWidth);
  }, [horizontal]);

  if (!Array.isArray(demoData) || demoData.length === 0) {
    return null;
  }

  return (
    <Card style={[styles.card, style]}>
      {horizontal ? (
        <FlatList data={demoData} renderItem={renderShortCut} horizontal />
      ) : (
        demoData.map((item, index) => renderShortCut({item, index}))
      )}
    </Card>
  );
};

const getStyles = (shortCutWidth: number) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: `${CARD_PERCENT_WIDTH}%`,
      alignSelf: 'center',
      paddingHorizontal: CARD_PADDING,
      paddingRight: CARD_PADDING,
    },
    shortcut: {
      width: shortCutWidth,
      padding: 5,
      alignItems: 'center',
    },
  });

export default ShortcutsCard;

const demoData = [
  {
    name: 'Timesheets',
    actionType: ACTION_TYPE.ScreenNavigation,
    params: 'TimesheetListScreen',
  },
  {
    name: 'Timesheets',
    actionType: ACTION_TYPE.ScreenNavigation,
    params: 'TimesheetListScreen',
  },
  {
    name: 'Timesheets',
    actionType: ACTION_TYPE.ScreenNavigation,
    params: 'TimesheetListScreen',
  },
  {
    name: 'Timesheets',
    actionType: ACTION_TYPE.ScreenNavigation,
    params: 'TimesheetListScreen',
  },
  {
    name: 'Timesheets',
    actionType: ACTION_TYPE.ScreenNavigation,
    params: 'TimesheetListScreen',
  },
];
