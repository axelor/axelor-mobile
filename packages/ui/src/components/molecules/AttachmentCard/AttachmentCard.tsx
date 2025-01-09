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

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import File from '../../../types/file';
import {formatDate} from '../../../utils/formatters';
import {HorizontalRule, Icon, Text} from '../../atoms';

interface AttachmentCardProps {
  fileName: string;
  creationDate: string;
  onPress: () => void;
  translator: (translationKey: string) => string;
}

const AttachmentCard = ({
  fileName,
  creationDate,
  onPress,
  translator,
}: AttachmentCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.container}>
        <Icon name={File.getFileIcon(fileName)} size={35} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{fileName}</Text>
          {creationDate && (
            <Text style={styles.text}>
              {`${
                translator != null ? translator('Base_AddedOn') : 'Added on'
              } : ${formatDate(
                creationDate,
                translator != null
                  ? translator('Base_DateFormat')
                  : 'MM/DD/YYYY',
              )}`}
            </Text>
          )}
        </View>
      </View>
      <HorizontalRule style={styles.bottomLine} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 15,
    marginBottom: 5,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: '5%',
  },
  text: {
    fontSize: 18,
  },
  bottomLine: {
    marginTop: 10,
    width: '45%',
    alignSelf: 'center',
  },
});

export default AttachmentCard;
