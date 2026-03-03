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

import React, {useCallback, useMemo} from 'react';
import {Dimensions, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Icon, Text} from '@axelor/aos-mobile-ui';
import {useSelector} from '../../../../index';
import {useNavigation} from '../../../../hooks/use-navigation';

const CARD_PERCENT_WIDTH = 90;
const CARD_PADDING = 16;

interface ShortcutsCardProps {
  style?: any;
  horizontal?: boolean;
}

const ShortcutsCard = ({style, horizontal = true}: ShortcutsCardProps) => {
  const navigation = useNavigation();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);

  const styles = useMemo(() => {
    const cardWidth =
      Dimensions.get('window').width * (CARD_PERCENT_WIDTH / 100);
    const insideCardWidth = cardWidth - CARD_PADDING * 2;
    const baseNumberShortcutPerLine =
      Dimensions.get('window').width < 500 ? 3 : 6;
    const numberShortcutPerLine = horizontal
      ? baseNumberShortcutPerLine + 0.5
      : baseNumberShortcutPerLine;
    const shortCutWidth = insideCardWidth / numberShortcutPerLine;

    return getStyles(shortCutWidth);
  }, [horizontal]);

  const renderShortCut = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          style={styles.shortcut}
          onPress={() => navigation.navigate(item.mobileScreenName)}
          key={item.shortcutId}>
          <Icon name={item.iconName} size={35} />
          <Text fontSize={14} numberOfLines={2}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [navigation, styles.shortcut],
  );

  if (
    !Array.isArray(mobileSettings?.mobileShortcutList) ||
    mobileSettings?.mobileShortcutList.length === 0
  ) {
    return null;
  }

  return (
    <Card style={[styles.card, style]}>
      {horizontal ? (
        <FlatList
          data={mobileSettings?.mobileShortcutList}
          renderItem={renderShortCut}
          horizontal
        />
      ) : (
        mobileSettings?.mobileShortcutList.map(item => renderShortCut({item}))
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
      zIndex: 1,
    },
    shortcut: {
      width: shortCutWidth,
      padding: 5,
      alignItems: 'center',
    },
  });

export default ShortcutsCard;
