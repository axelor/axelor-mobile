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

import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useThemeColor} from '../../../theme';
import {Card, HtmlInput, Icon, Text} from '../../atoms';

const MAX_HEIGHT = 71;

interface NotesCardProps {
  title: string;
  data: string;
  style?: any;
  styleText?: any;
}

const NotesCard = ({title, data, style, styleText}: NotesCardProps) => {
  const Colors = useThemeColor();

  const [expanded, setExpanded] = useState(false);
  const [chevronHeight, setChevronHeight] = useState(0);

  if (data == null || data === '') return null;

  return (
    <View testID="notesCardContainer" style={[styles.description, style]}>
      <Text style={[styles.title, styleText]}>{title}</Text>
      <TouchableOpacity
        testID="notesCardTouchable"
        disabled={chevronHeight < MAX_HEIGHT}
        activeOpacity={0.9}
        onPress={() => setExpanded(current => !current)}>
        <Card style={styles.note}>
          <HtmlInput
            defaultInput={data}
            readonly={true}
            onHeightChange={setChevronHeight}
            style={!expanded && styles.htmlInput}
            editorBackgroundColor={Colors.backgroundColor}
          />
          {chevronHeight > MAX_HEIGHT && (
            <Icon
              name={expanded ? 'chevron-up' : 'chevron-down'}
              color={Colors.primaryColor.background}
            />
          )}
        </Card>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    flexDirection: 'column',
    marginVertical: 4,
    width: '90%',
    alignSelf: 'center',
    gap: 4,
  },
  title: {
    marginLeft: 10,
  },
  note: {
    justifyContent: 'center',
    width: '100%',
    borderRadius: 7,
    paddingRight: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  htmlInput: {
    maxHeight: MAX_HEIGHT,
  },
});

export default NotesCard;
