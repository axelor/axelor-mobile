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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {deleteMetaFile, UploadFileInput} from '@axelor/aos-mobile-core';
import {FileList} from '../../molecules';
import {DefectAttachedFilesButton} from '../../atoms';

interface DefectFilesManagerProps {
  style?: any;
  defectId?: number | string;
  files: any[];
  setFiles: (value: any[] | ((_current: any[]) => any[])) => void;
  readonly?: boolean;
}

const DefectFilesManager = ({
  style,
  defectId,
  files,
  setFiles,
  readonly = false,
}: DefectFilesManagerProps) => {
  const handleRemoveFile = useCallback(
    (id: number) => {
      setFiles(_current => {
        if (id) {
          deleteMetaFile(id).catch(err =>
            console.log('Could not delete the file:', err),
          );
          return _current.filter(i => i.id !== id);
        }

        return _current;
      });
    },
    [setFiles],
  );

  const addFile = useCallback(
    (file: any) => {
      if (file) {
        setFiles(_current => [..._current, file]);
      }
    },
    [setFiles],
  );

  return (
    <View style={[styles.container, style]}>
      <DefectAttachedFilesButton defectId={parseInt(`${defectId}`, 10)} />
      <UploadFileInput
        style={styles.input}
        onUpload={addFile}
        readonly={readonly}
        manageFileLocally={false}
      />
      <FileList
        files={files}
        handleRemoveFile={handleRemoveFile}
        readonly={readonly}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 3,
    alignItems: 'center',
  },
  input: {
    width: '100%',
  },
});

export default DefectFilesManager;
