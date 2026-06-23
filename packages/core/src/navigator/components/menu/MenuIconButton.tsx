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
  Color,
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

  const _color: Color = useMemo(
    () =>
      disabled
        ? Colors.secondaryColor
        : isActive
          ? {...Colors.primaryColor, foreground: Colors.backgroundColor}
          : {
              background_light: Colors.secondaryColor_dark.background_light,
              foreground: Colors.secondaryColor_dark.background,
              background: Colors.backgroundColor,
            },
    [Colors, disabled, isActive],
  );

  const styles = useMemo(
    () => getStyles(Colors, rounded, _color),
    [Colors, _color, rounded],
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
        <View style={[styles.tile, isActive ? styles.activeShadow : null]}>
          <Icon size={22} name={icon} color={_color.foreground} />
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
          fontSize={10}
          textColor={isActive ? Colors.primaryColor.background : undefined}
          numberOfLines={1}>
          {I18n.t(subtitle ?? '')}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const getStyles = (Colors: ThemeColors, rounded: boolean, tileColor: Color) =>
  StyleSheet.create({
    iconWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    tile: {
      width: WIDTH,
      height: HEIGHT,
      borderRadius: rounded ? ROUNDED_RADIUS : DEFAULT_RADIUS,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: tileColor.background,
      elevation: 2,
      shadowOpacity: 0.15,
      shadowColor: Colors.secondaryColor.background,
      shadowRadius: 3,
      shadowOffset: {width: 0, height: 1},
    },
    activeShadow: {
      elevation: 8,
      shadowColor: Colors.primaryColor.background,
      shadowOpacity: 0.6,
      shadowRadius: 12,
      shadowOffset: {width: 0, height: 6},
    },
    moduleSubtitle: {
      maxWidth: WIDTH,
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
