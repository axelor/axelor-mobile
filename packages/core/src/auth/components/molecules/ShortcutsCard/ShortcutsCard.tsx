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
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, IconTile, Text} from '@axelor/aos-mobile-ui';
import {useNavigation, useSelector} from '../../../../index';

const CARD_PERCENT_WIDTH = 90;
const CARD_PADDING = 8;

const ShortcutsCard = ({style}: {style?: any}) => {
  const navigation = useNavigation();

  const {mobileSettings} = useSelector(state => state.appConfig);

  const horizontal = useMemo(
    () => mobileSettings?.isOneLineShortcut,
    [mobileSettings?.isOneLineShortcut],
  );

  const shortcutSet = useMemo(
    () => mobileSettings?.mobileShortcutList,
    [mobileSettings?.mobileShortcutList],
  );

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
    ({item}: any) => (
      <TouchableOpacity
        style={styles.shortcut}
        onPress={() => navigation.navigate(item.mobileScreenName)}
        key={item.shortcutId}
        activeOpacity={0.9}>
        <IconTile icon={item.iconName} size={45} />
        <View style={styles.shortcutTextContainer}>
          <Text
            numberOfLines={2}
            writingType="important"
            fontSize={12}
            style={styles.shortcutText}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [navigation, styles],
  );

  if (!Array.isArray(shortcutSet) || shortcutSet.length === 0) return null;

  return (
    <Card style={[styles.card, style]}>
      {horizontal ? (
        <FlatList data={shortcutSet} renderItem={renderShortCut} horizontal />
      ) : (
        shortcutSet.map((item: any) => renderShortCut({item}))
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
      paddingVertical: CARD_PADDING,
      zIndex: 1,
    },
    shortcut: {
      width: shortCutWidth,
      padding: 2,
      alignItems: 'center',
    },
    shortcutTextContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    shortcutText: {
      textAlign: 'center',
    },
  });

export default ShortcutsCard;
