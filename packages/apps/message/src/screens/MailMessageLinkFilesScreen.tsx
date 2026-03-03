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
import {
  showToastMessage,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Button, Icon, Screen, Text} from '@axelor/aos-mobile-ui';
import {DocumentList} from '@axelor/aos-mobile-dms';
import {saveLinkFiles} from '../features/mailMessageSlice';

const MailMessageLinkFilesScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {linkFiles: _linkFiles} = useSelector(state => state.mailMessages);

  const [linkFiles, setLinkFiles] = useState<any[]>(_linkFiles);

  const displayLinkFiles = useMemo(
    () => linkFiles.length > 0 || linkFiles.length !== _linkFiles.length,
    [_linkFiles.length, linkFiles.length],
  );

  const handleLinkFiles = useCallback(
    (file: any) => {
      if (!file?.metaFile) {
        showToastMessage({
          position: 'bottom',
          type: 'error',
          text1: I18n.t('Base_Error'),
          text2: I18n.t('Message_InvalidFile'),
        });
      } else {
        setLinkFiles(prevFiles => {
          if (prevFiles.some(({id}) => id === file.id)) {
            return prevFiles.filter(({id}) => id !== file.id);
          } else {
            return [...prevFiles, file];
          }
        });
      }
    },
    [I18n],
  );

  const renderFile = useCallback(
    (file: any, idx: number) => {
      return (
        <TouchableOpacity
          style={styles.linkFile}
          onPress={() => handleLinkFiles(file)}
          key={idx}>
          <Icon name="x-lg" />
          <Text style={styles.text} numberOfLines={1}>
            {file.fileName}
          </Text>
        </TouchableOpacity>
      );
    },
    [handleLinkFiles],
  );

  return (
    <Screen
      removeSpaceOnTop
      fixedItems={
        displayLinkFiles && (
          <View style={styles.linkFilesContainer}>
            {linkFiles.map(renderFile)}
            <Button
              width="100%"
              title={I18n.t('Base_Validate')}
              onPress={() => {
                dispatch(saveLinkFiles(linkFiles));
                navigation.goBack();
              }}
            />
          </View>
        )
      }>
      <DocumentList hideActions customOnPress={handleLinkFiles} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  linkFilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 2,
    paddingHorizontal: 15,
    gap: 5,
  },
  linkFile: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  text: {
    flexShrink: 1,
    textDecorationLine: 'underline',
  },
});

export default MailMessageLinkFilesScreen;
