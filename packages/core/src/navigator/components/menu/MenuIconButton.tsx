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
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  Card,
  IconTile,
  InfoBubble,
  Text,
  useConfig,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {Compatibility} from '../../../app';
import {useTranslator} from '../../../i18n';
import {getCompatibilityError, isMenuIncompatible} from '../../helpers';

const TILE_SIZE = 20;
const LARGE_SCREEN_WIDTH = 768;
const DRAWER_HORIZONTAL_SPACING = 32;

interface MenuIconButtonProps {
  style?: any;
  icon: string;
  onPress: () => void;
  title?: string;
  showTitle?: boolean;
  isActive?: boolean;
  subtitle?: string;
  rounded?: boolean;
  disabled?: boolean;
  compatibility?: Compatibility;
}

const MenuIconButton = ({
  style,
  icon,
  onPress,
  title,
  showTitle = false,
  isActive = false,
  subtitle,
  rounded = false,
  disabled = false,
  compatibility,
}: MenuIconButtonProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {showSubtitles} = useConfig();
  const {width} = useWindowDimensions();

  const expandedWidth = useMemo(
    () =>
      width * (width >= LARGE_SCREEN_WIDTH ? 0.5 : 0.85) -
      DRAWER_HORIZONTAL_SPACING,
    [width],
  );

  const styles = useMemo(() => getStyles(width), [width]);

  const compatibilityError = useMemo(
    () => isMenuIncompatible(compatibility),
    [compatibility],
  );

  const isExpanded = useMemo(
    () => showTitle && title != null,
    [showTitle, title],
  );

  const isPrimary = useMemo(
    () => isExpanded || isActive,
    [isActive, isExpanded],
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || compatibilityError}
      activeOpacity={0.9}>
      <Card
        style={[
          styles.card,
          rounded && styles.roundedTile,
          isExpanded && {width: expandedWidth},
          style,
        ]}>
        <View style={styles.tileContainer}>
          <IconTile
            style={rounded && styles.roundedTile}
            icon={icon}
            iconSize={TILE_SIZE}
            color={isPrimary ? Colors.primaryColor : undefined}
            backgroundColor={isPrimary ? undefined : Colors.backgroundColor}
            iconColor={
              isPrimary ? undefined : Colors.secondaryColor_dark.background
            }
            disabled={disabled}
            onPress={onPress}
          />
          {compatibilityError && !isExpanded && (
            <InfoBubble
              style={styles.infoBubble}
              usePopup={true}
              iconName="exclamation-triangle-fill"
              badgeColor={Colors.errorColor}
              textIndicationStyle={styles.textIndicationStyle}
              indication={getCompatibilityError(compatibility, I18n)!}
            />
          )}
        </View>
        {isExpanded && (
          <View style={styles.titleContainer}>
            <Text
              writingType="title"
              textColor={
                disabled ? Colors.secondaryColor.background : undefined
              }
              numberOfLines={2}>
              {title}
            </Text>
            {compatibilityError && (
              <Text fontSize={10} textColor={Colors.errorColor.background}>
                {getCompatibilityError(compatibility, I18n, false)}
              </Text>
            )}
          </View>
        )}
      </Card>
      {!isExpanded && showSubtitles && (
        <Text
          style={styles.subtitle}
          fontSize={10}
          writingType={isActive ? 'important' : undefined}
          textColor={isActive ? Colors.primaryColor.background : undefined}
          numberOfLines={1}>
          {I18n.t(subtitle ?? '')}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const getStyles = (windowWidth: number) =>
  StyleSheet.create({
    card: {
      paddingVertical: 8,
      paddingHorizontal: 8,
      paddingRight: 8,
      marginVertical: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    roundedTile: {
      borderRadius: TILE_SIZE,
    },
    tileContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoBubble: {
      position: 'absolute',
      bottom: -8,
      right: -8,
    },
    textIndicationStyle: {
      width: windowWidth * 0.6,
      top: 0,
    },
    titleContainer: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'center',
    },
    subtitle: {
      width: TILE_SIZE * 2,
      alignSelf: 'center',
      textAlign: 'center',
    },
  });

export default MenuIconButton;
