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

import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  Button,
  Icon,
  Text,
  ThemeColors,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {DocumentList} from '@axelor/aos-mobile-dms';
import {saveLinkFiles} from '../features/mailMessageSlice';

const MailMessageLinkFilesScreen = ({navigation}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {linkFiles: _linkFiles} = useSelector(state => state.mailMessages);

  const [linkFiles, setLinkFiles] = useState(_linkFiles);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const handleLinkFiles = (file: any) => {
    setLinkFiles(prevFiles => {
      const exists = prevFiles.some(f => f.id === file.id);
      if (exists) {
        return prevFiles.filter(f => f.id !== file.id);
      } else {
        return [...prevFiles, file];
      }
    });
  };

  return (
    <View style={styles.container}>
      <DocumentList hideActions customOnPress={handleLinkFiles} />
      {linkFiles.length > 0 && (
        <View style={styles.linkFilesContainer}>
          {linkFiles.map((file, index) => (
            <TouchableOpacity
              style={styles.linkFile}
              onPress={() => handleLinkFiles(file)}
              key={index}>
              <Icon name="x-lg" />
              <Text style={styles.text} numberOfLines={1}>
                {file.fileName}
              </Text>
            </TouchableOpacity>
          ))}
          <Button
            style={styles.button}
            title={I18n.t('Base_Validate')}
            onPress={() => {
              dispatch(saveLinkFiles(linkFiles));
              navigation.goBack();
            }}
          />
        </View>
      )}
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.screenBackgroundColor,
    },
    linkFilesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingVertical: 10,
      paddingHorizontal: 24,
      gap: 10,
      borderTopLeftRadius: 13,
      borderTopRightRadius: 13,
      backgroundColor: Colors.backgroundColor,
    },
    linkFile: {
      flexShrink: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      flexShrink: 1,
      marginLeft: 3,
      textDecorationLine: 'underline',
    },
    button: {
      width: '100%',
    },
  });

export default MailMessageLinkFilesScreen;
