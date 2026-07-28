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

import React, {useCallback, useMemo, useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useThemeColor} from '../../../theme';
import {checkNullString} from '../../../utils';
import {Card, HorizontalRule, Icon, Text, VerticalRule} from '../../atoms';
import {IconTile} from '../../molecules';

const COLLAPSED_TILE_SIZE = 24;
const EXPANDED_TILE_SIZE = 30;

interface MovementIndicationCardProps {
  style?: any;
  iconTop: string;
  labelTop?: string;
  titleTop: string;
  iconDown: string;
  labelDown?: string;
  titleDown: string;
  displayCard?: boolean;
}

function MovementIndicationCard({
  style,
  iconTop,
  labelTop,
  titleTop,
  iconDown,
  labelDown,
  titleDown,
  displayCard = true,
}: MovementIndicationCardProps) {
  const Colors = useThemeColor();

  const [expanded, setExpanded] = useState(false);

  const hasTop = useMemo(() => !checkNullString(titleTop), [titleTop]);
  const hasDown = useMemo(() => !checkNullString(titleDown), [titleDown]);

  const renderTile = useCallback(
    (icon: string, size: number) => (
      <IconTile
        icon={icon}
        size={size}
        iconSize={size / 2}
        borderRadius={size / 3}
      />
    ),
    [],
  );

  const renderCollapsedItem = useCallback(
    (icon: string, title: string) => (
      <View style={styles.collapsedItem}>
        {renderTile(icon, COLLAPSED_TILE_SIZE)}
        <Text numberOfLines={1} style={styles.collapsedTitle}>
          {title}
        </Text>
      </View>
    ),
    [renderTile],
  );

  const renderExpandedItem = useCallback(
    (icon: string, label: string | undefined, title: string) => (
      <View style={styles.expandedItem}>
        {renderTile(icon, EXPANDED_TILE_SIZE)}
        <View style={styles.expandedTexts}>
          {!checkNullString(label) && (
            <Text
              fontSize={10}
              textColor={Colors.secondaryColor_dark.background}
              style={styles.label}>
              {label}
            </Text>
          )}
          <Text writingType="important">{title}</Text>
        </View>
      </View>
    ),
    [Colors.secondaryColor_dark.background, renderTile],
  );

  if (!hasTop && !hasDown) return null;

  const Wrapper: any = displayCard ? Card : View;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.touchable}
      onPress={() => setExpanded(current => !current)}
      testID="movementIndicationCardTouchable">
      <Wrapper
        style={[displayCard ? styles.card : styles.container, style]}
        testID="movementIndicationCardContainer">
        {expanded ? (
          <View>
            {hasTop && renderExpandedItem(iconTop, labelTop, titleTop)}
            {hasTop && hasDown && (
              <VerticalRule
                style={styles.verticalRule}
                color={Colors.primaryColor.background}
              />
            )}
            {hasDown && renderExpandedItem(iconDown, labelDown, titleDown)}
          </View>
        ) : (
          <View style={styles.collapsedContainer}>
            {hasTop && renderCollapsedItem(iconTop, titleTop)}
            {hasTop && hasDown && (
              <View style={styles.arrowContainer}>
                <HorizontalRule
                  style={styles.dottedLine}
                  color={Colors.secondaryColor_dark.background}
                />
                <Icon
                  name="arrow-right"
                  size={12}
                  color={Colors.secondaryColor_dark.background}
                />
              </View>
            )}
            {hasDown && renderCollapsedItem(iconDown, titleDown)}
          </View>
        )}
      </Wrapper>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 4,
  },
  container: {
    width: '100%',
  },
  card: {
    width: '100%',
    paddingHorizontal: 12,
    paddingRight: 12,
    paddingVertical: 10,
  },
  collapsedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collapsedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: 8,
  },
  collapsedTitle: {
    flexShrink: 1,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    minWidth: 24,
    marginHorizontal: 8,
  },
  dottedLine: {
    flexGrow: 1,
    borderStyle: Platform.OS === 'ios' ? 'solid' : 'dotted',
  },
  expandedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  expandedTexts: {
    flexShrink: 1,
  },
  label: {
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  verticalRule: {
    height: 16,
    marginLeft: EXPANDED_TILE_SIZE / 2,
  },
});

export default MovementIndicationCard;
