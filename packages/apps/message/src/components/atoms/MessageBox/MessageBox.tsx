/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
  getCommonStyles,
  HtmlInput,
  Icon,
  NumberBubble,
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
  disabled,
  value,
  onChange,
  onSend,
  onLinkFiles,
  numberLinkedFiles,
}: MessageBoxProps) => {
  const Colors = useThemeColor();

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <View style={styles.container}>
      <HtmlInput
        defaultInput={value}
        onChange={onChange}
        placeholder={placeholder}
        containerStyle={[commonStyles.filter, styles.htlmInput]}
        styleToolbar={styles.htmlToolBar}
      />
      <View style={styles.iconsContainer}>
        {onSend && (
          <Icon
            style={[commonStyles.filter, styles.action]}
            name="send-fill"
            color={disabled && Colors.secondaryColor.background_light}
            size={24}
            touchable={!disabled}
            onPress={onSend}
          />
        )}
        {onLinkFiles && (
          <View style={[commonStyles.filter, styles.action]}>
            <Icon name="paperclip" size={24} touchable onPress={onLinkFiles} />
            {numberLinkedFiles > 0 && (
              <NumberBubble
                style={styles.number}
                number={numberLinkedFiles}
                color={Colors.primaryColor}
                isNeutralBackground
                size={18}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    gap: 5,
  },
  htlmInput: {
    paddingHorizontal: 0,
    paddingTop: 10,
  },
  htmlToolBar: {
    backgroundColor: null,
    marginLeft: -5,
  },
  iconsContainer: {
    width: '10%',
  },
  action: {
    flex: 1,
    justifyContent: 'center',
  },
  number: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
});

export default MessageBox;
