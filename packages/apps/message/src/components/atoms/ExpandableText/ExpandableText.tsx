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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {isHtml} from '@axelor/aos-mobile-core';
import {HtmlInput, Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';

const MAX_TEXT_LINES = 5;
const MAX_HEIGHT = 150;

interface ExpandableTextProps {
  style?: any;
  value: string;
}

const ExpandableText = ({style, value}: ExpandableTextProps) => {
  const Colors = useThemeColor();

  const [more, setMore] = useState(false);
  const [numOfLines, setNumOfLines] = useState(MAX_TEXT_LINES);
  const [htmlContentHeight, setHtmlContentHeight] = useState<number>();

  const handleTextLayout = useCallback(event => {
    setNumOfLines(event.nativeEvent.lines.length);
  }, []);

  const handleHtmlContainerLayout = useCallback((height: number) => {
    setHtmlContentHeight(_current => (_current != null ? _current : height));
  }, []);

  const styles = useMemo(
    () => getStyles(htmlContentHeight, more),
    [htmlContentHeight, more],
  );

  return (
    <TouchableOpacity
      onPress={() => setMore(_current => !_current)}
      disabled={numOfLines < MAX_TEXT_LINES}
      activeOpacity={0.9}
      style={style}>
      {isHtml(value) ? (
        <View style={styles.htmlContainer}>
          <HtmlInput
            defaultInput={value}
            readonly={true}
            onHeightChange={handleHtmlContainerLayout}
          />
        </View>
      ) : (
        <Text
          numberOfLines={more ? numOfLines : MAX_TEXT_LINES}
          style={styles.text}
          onTextLayout={handleTextLayout}>
          {value}
        </Text>
      )}
      {(numOfLines > MAX_TEXT_LINES ||
        (htmlContentHeight && htmlContentHeight > MAX_HEIGHT)) && (
        <Icon
          name={more ? 'chevron-up' : 'chevron-down'}
          color={Colors.primaryColor.background}
          style={styles.moreIcon}
        />
      )}
    </TouchableOpacity>
  );
};

const getStyles = (htmlContentHeight: number, more: boolean) =>
  StyleSheet.create({
    htmlContainer: {
      width: '100%',
      overflow: 'hidden',
      height:
        htmlContentHeight &&
        (htmlContentHeight > MAX_HEIGHT
          ? more
            ? htmlContentHeight
            : MAX_HEIGHT
          : htmlContentHeight),
    },
    moreIcon: {
      alignSelf: 'center',
    },
    text: {
      width: '100%',
      fontSize: 14,
      textAlign: 'justify',
      marginVertical: 5,
    },
  });

export default ExpandableText;
