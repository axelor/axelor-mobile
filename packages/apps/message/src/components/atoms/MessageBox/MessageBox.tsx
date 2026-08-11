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
import {StyleSheet, View} from 'react-native';
import {
  HtmlInput,
  IconTile,
  INPUT_MIN_HEIGHT,
  NumberBubble,
  ThemeColors,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

interface MessageBoxProps {
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange: (value: string) => void;
  onSend?: () => void;
  onLinkFiles?: () => void;
  numberLinkedFiles?: number;
}

const MessageBox = ({
  placeholder,
  disabled = false,
  value,
  onChange,
  onSend,
  onLinkFiles,
  numberLinkedFiles = 0,
}: MessageBoxProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={styles.container}>
      <View style={styles.inputCard}>
        <HtmlInput
          defaultInput={value}
          onChange={onChange}
          placeholder={placeholder}
          editorBackgroundColor="transparent"
          style={styles.htmlInput}
          styleToolbar={styles.htmlToolbar}
        />
      </View>
      <View style={styles.iconsContainer}>
        {onSend != null && (
          <IconTile
            icon="send-fill"
            iconSize={16}
            color={disabled ? Colors.secondaryColor : Colors.primaryColor}
            disabled={disabled}
            onPress={onSend}
          />
        )}
        {onLinkFiles != null && (
          <IconTile
            icon="paperclip"
            iconSize={16}
            color={Colors.infoColor}
            onPress={onLinkFiles}>
            {numberLinkedFiles > 0 && (
              <NumberBubble
                style={styles.badge}
                color={Colors.primaryColor}
                number={numberLinkedFiles}
                isNeutralBackground={false}
                size={15}
              />
            )}
          </IconTile>
        )}
      </View>
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
      gap: 5,
    },
    inputCard: {
      flex: 1,
      backgroundColor: Colors.backgroundColor,
      borderColor: Colors.secondaryColor.background_light,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 4,
      marginVertical: 4,
    },
    htmlInput: {
      width: '100%',
      minHeight: INPUT_MIN_HEIGHT,
    },
    htmlToolbar: {
      backgroundColor: undefined,
      height: 36,
      marginLeft: -5,
    },
    iconsContainer: {
      gap: 5,
    },
    badge: {
      position: 'absolute',
      top: 2,
      right: 2,
    },
  });

export default MessageBox;
