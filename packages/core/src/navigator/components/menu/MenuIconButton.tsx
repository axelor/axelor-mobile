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
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Icon,
  InfoBubble,
  Text,
  ThemeColors,
  useConfig,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {Compatibility} from '../../../app';
import {useTranslator} from '../../../i18n';
import {getCompatibilityError, isMenuIncompatible} from '../../helpers';

const WIDTH = 54;
const HEIGHT = 54;
const DEFAULT_RADIUS = 10;
const ROUNDED_RADIUS = WIDTH / 2;

interface MenuIconButtonProps {
  style?: any;
  icon: string;
  onPress: () => void;
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
  isActive = false,
  subtitle,
  rounded = false,
  disabled = false,
  compatibility,
}: MenuIconButtonProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const {showSubtitles} = useConfig();

  const filled = useMemo(() => rounded || isActive, [isActive, rounded]);

  const tileColor = useMemo(
    () => (filled ? Colors.primaryColor.background : Colors.backgroundColor),
    [Colors, filled],
  );

  const iconColor = useMemo(() => {
    if (filled) {
      return Colors.backgroundColor;
    }

    return disabled
      ? Colors.secondaryColor.background
      : Colors.secondaryColor_dark.background;
  }, [Colors, disabled, filled]);

  const styles = useMemo(
    () => getStyles(Colors, tileColor, isActive, rounded),
    [Colors, isActive, rounded, tileColor],
  );

  const compatibilityError = useMemo(
    () => isMenuIncompatible(compatibility),
    [compatibility],
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || compatibilityError}
      activeOpacity={0.95}>
      <View style={[styles.iconWrapper, style]}>
        <View style={styles.tile}>
          <Icon size={22} name={icon} color={iconColor} />
          {compatibilityError && (
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
      </View>
      {showSubtitles && (
        <Text
          style={styles.moduleSubtitle}
          textColor={isActive ? Colors.primaryColor.background : undefined}
          numberOfLines={1}>
          {I18n.t(subtitle ?? '')}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const getStyles = (
  Colors: ThemeColors,
  tileColor: string,
  isActive: boolean,
  rounded: boolean,
) =>
  StyleSheet.create({
    iconWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    tile: {
      width: WIDTH,
      height: HEIGHT,
      borderRadius: rounded ? ROUNDED_RADIUS : DEFAULT_RADIUS,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: tileColor,
      elevation: isActive ? 8 : 2,
      shadowColor: isActive
        ? Colors.primaryColor.background
        : Colors.secondaryColor.background,
      shadowOpacity: isActive ? 0.6 : 0.15,
      shadowRadius: isActive ? 12 : 3,
      shadowOffset: {width: 0, height: isActive ? 6 : 1},
    },
    moduleSubtitle: {
      fontSize: 10,
      maxWidth: WIDTH + 6,
      alignSelf: 'center',
    },
    infoBubble: {
      position: 'absolute',
      bottom: -10,
      right: -10,
    },
    textIndicationStyle: {
      width: Dimensions.get('window').width * 0.6,
      top: 0,
    },
  });

export default MenuIconButton;
