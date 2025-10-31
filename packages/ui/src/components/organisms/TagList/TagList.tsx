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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Color, useThemeColor} from '../../../theme';
import {checkNullString} from '../../../utils';
import {Badge} from '../../molecules';
import {Text} from '../../atoms';

interface Tag {
  title: string;
  color?: Color;
  order?: number;
  hidden?: boolean;
}

interface TagListProps {
  style?: any;
  title?: string;
  tags: Tag[];
  defaultColor?: Color;
  hideIfNull?: boolean;
  translator?: (key: string, values?: Object) => string;
}

const TagList = ({
  style,
  title,
  tags,
  defaultColor,
  hideIfNull = true,
  translator,
}: TagListProps) => {
  const Colors = useThemeColor();

  const visibleSortTags = useMemo(
    () =>
      (tags ?? [])
        .map((tag, idx) => ({
          ...tag,
          order: tag.order != null ? tag.order : idx * 10,
        }))
        .filter(tag => tag.hidden !== true)
        .sort((firstTag, secondTag) => firstTag.order - secondTag.order),
    [tags],
  );

  const isEmpty = useMemo(
    () => visibleSortTags.length === 0,
    [visibleSortTags],
  );

  const renderEmptyState = useCallback(() => {
    const _title =
      (checkNullString(title) ? translator?.('Base_Data') : title) ?? 'data';
    const lowerTitle = _title.toLowerCase();

    const message =
      translator != null
        ? translator('Base_NoDataAvailable', {title: lowerTitle})
        : `No ${lowerTitle} available.`;

    return <Text>{message}</Text>;
  }, [title, translator]);

  if (isEmpty && hideIfNull) {
    return null;
  }

  return (
    <View style={[styles.container, style]} testID="tagListContainer">
      {!checkNullString(title) && <Text style={styles.text}>{title} :</Text>}
      {isEmpty
        ? renderEmptyState()
        : visibleSortTags.map((tag, index) => {
            const color =
              tag.color != null
                ? tag.color
                : (defaultColor ?? Colors.infoColor);

            return (
              <Badge
                style={styles.badge}
                title={tag.title}
                color={color}
                key={index}
              />
            );
          })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  text: {
    marginRight: 5,
  },
  badge: {
    width: null,
    height: null,
    margin: null,
    marginRight: 5,
    marginBottom: 5,
    paddingHorizontal: 5,
  },
});

export default TagList;
