/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {StyleSheet, View} from 'react-native';
import Card from '../../atoms/Card/Card';
import Text from '../../atoms/Text/Text';
import {useThemeColor} from '../../../theme/ThemeContext';
import RenderHTML from 'react-native-render-html';

const PERCENTAGE_WIDTH_NOTES = 0.95;

interface NotesCardProps {
  title: string;
  data: string;
}

const NotesCard = ({title, data}: NotesCardProps) => {
  const [widthNotes, setWidthNotes] = useState<number>();
  const Colors = useThemeColor();

  if (data == null || data === '') {
    return null;
  }
  return (
    <View
      style={styles.description}
      onLayout={event => {
        const {width} = event.nativeEvent.layout;
        setWidthNotes(width);
      }}>
      <Text style={styles.title}>{title}</Text>
      <Card style={styles.note}>
        <RenderHTML
          source={{
            html: data,
          }}
          contentWidth={
            widthNotes != null ? widthNotes * PERCENTAGE_WIDTH_NOTES : 100
          }
          baseStyle={{color: Colors.text}}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    marginHorizontal: 16,
    flexDirection: 'column',
    marginTop: 2,
  },
  title: {
    marginHorizontal: '5%',
  },
  note: {
    justifyContent: 'center',
    elevation: 0,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
});

export default NotesCard;
