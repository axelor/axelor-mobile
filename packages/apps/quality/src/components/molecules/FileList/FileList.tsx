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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  openFileInExternalApp,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {Icon, Text} from '@axelor/aos-mobile-ui';

interface FileListProps {
  files: any[];
  readonly?: boolean;
  handleRemoveFile: (id: number) => void;
}

const FileList = ({
  files,
  readonly = false,
  handleRemoveFile,
}: FileListProps) => {
  const I18n = useTranslator();

  const {baseUrl, token, jsessionId} = useSelector(state => state.auth);

  const openFile = useCallback(
    (file: any) => {
      return openFileInExternalApp(
        {
          fileName: file?.fileName,
          id: file?.id,
          isMetaFile: true,
        },
        {baseUrl, token, jsessionId},
        I18n,
      );
    },
    [I18n, baseUrl, jsessionId, token],
  );

  const renderFile = useCallback(
    (file: any) => {
      return (
        <View key={file.id} style={styles.fileRow}>
          <Text style={styles.fileName} numberOfLines={1}>
            {file?.fileName}
          </Text>
          <View style={styles.fileActions}>
            <Icon
              name="eye"
              size={20}
              touchable={true}
              onPress={() => openFile(file)}
            />
            {!readonly && (
              <Icon
                name="x-lg"
                size={20}
                touchable={true}
                onPress={() => handleRemoveFile(file.id)}
              />
            )}
          </View>
        </View>
      );
    },
    [handleRemoveFile, openFile, readonly],
  );

  return files.map(renderFile);
};

const styles = StyleSheet.create({
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    gap: 5,
  },
  fileName: {
    flex: 1,
  },
  fileActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default FileList;
