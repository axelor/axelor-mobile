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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  handleDocumentSelection,
  uploadBase64,
  deleteMetaFile,
  useSelector,
  useDispatch,
  useNavigation,
  enableCamera,
  useCameraValueByKey,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  Button,
  FormHtmlInput,
  HorizontalRuleText,
  QuantityCard,
  ViewAllEditList,
  Icon,
  Text,
} from '@axelor/aos-mobile-ui';
import {openFileInExternalApp} from '@axelor/aos-mobile-core';
import {DefectSearchBar} from '../../templates';

interface DefectViewAllListProps {
  title?: string;
  defaultValue?: any[];
  onChange: (value: any[]) => void;
  objectState?: any;
  readonly?: boolean;
}

const cameraKey = 'quality_qi_defect_pictures';

const DefectViewAllListAux = ({
  title = 'Quality_Defect',
  defaultValue,
  onChange,
  objectState,
  readonly = false,
}: DefectViewAllListProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [lines, setLines] = useState<any[]>(defaultValue ?? []);
  const [editId, setEditId] = useState<number | undefined>();
  const [defect, setDefect] = useState<any>();
  const [qty, setQty] = useState<number>(1);
  const [description, setDescription] = useState<string>('');
  const [files, setFiles] = useState<any[]>([]);

  const photo = useCameraValueByKey(cameraKey);

  const handleEditLine = useCallback((line: any) => {
    setEditId(line.id);
    setDefect(line.qiDefault);
    setQty(line.qty);
    setDescription(line.description);
    setFiles(line.files ?? []);
  }, []);

  const handleChange = useCallback(
    (updated: any[]) => {
      setLines(updated);
      onChange(updated);
    },
    [onChange],
  );

  const handleConfirm = useCallback(() => {
    setLines(_current => {
      const lineContent = {
        id: editId ?? `qiDefault-${defect.id}.${_current.length}`,
        name: defect.name,
        qiDefault: defect,
        qty,
        description,
        files,
      };

      let updatedLines: any[];
      if (editId != null) {
        updatedLines = _current.map(_item =>
          _item.id === editId ? {..._item, ...lineContent} : _item,
        );
      } else {
        updatedLines = [..._current, lineContent];
      }

      onChange(updatedLines);

      return updatedLines;
    });

    setDefect(null);
    setQty(1);
    setDescription('');
    setFiles([]);
    setEditId(null);
  }, [defect, description, editId, onChange, qty, files]);

  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);

  const currentEditedLine = useMemo(
    () => lines.find(l => l.id === editId),
    [editId, lines],
  );

  const handleAddFile = useCallback(() => {
    handleDocumentSelection(async file => {
      const toUpload = {
        name: file.name,
        type: file.type,
        size: file.size,
        base64: file.base64,
      };
      try {
        const metaFile = await uploadBase64(toUpload, {
          baseUrl,
          token,
          jsessionId,
        });
        setFiles(prev => [...prev, metaFile]);
      } catch (e) {
        console.log('Could not upload the file:', e);
      }
    });
  }, [baseUrl, jsessionId, token]);

  useEffect(() => {
    const uploadFromCamera = async (_file: any) => {
      try {
        const metaFile = await uploadBase64(_file, {
          baseUrl,
          token,
          jsessionId,
        });
        setFiles(prev => [...prev, metaFile]);
      } catch (error) {
        console.log('Could not upload the file:', error);
      }
    };

    if (photo) {
      uploadFromCamera(photo);
    }
  }, [baseUrl, jsessionId, photo, token]);

  const handleRemoveFile = useCallback(async (index: number) => {
    setFiles(prev => {
      const file = prev[index];
      if (file?.id) {
        deleteMetaFile(file.id).catch(err =>
          console.log('Could not delete the file:', err),
        );
      }
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ViewAllEditList
        title={I18n.t(title)}
        lines={lines}
        setLines={handleChange}
        currentLineId={editId}
        handleEditLine={handleEditLine}
        translator={I18n.t}
      />
      <HorizontalRuleText
        text={I18n.t('Quality_NewDefault')}
        style={styles.width}
      />
      <DefectSearchBar
        defaultValue={defect}
        onChange={setDefect}
        objectState={objectState}
        readonly={readonly}
        required
      />
      <QuantityCard
        style={styles.width}
        labelQty={I18n.t('Quality_Quantity')}
        defaultValue={qty}
        onValueChange={setQty}
        editable={!readonly}
        isBigButton
        translator={I18n.t}
      />
      <FormHtmlInput
        title={I18n.t('Base_Description')}
        defaultValue={description}
        onChange={setDescription}
        readonly={readonly}
      />
      <View style={[styles.width, styles.filesContainer]}>
        <View style={styles.filesHeader}>
          <Text>{I18n.t('Quality_File')}</Text>
          {!readonly && (
            <View style={styles.filesActions}>
              {currentEditedLine?._id != null && (
                <Icon
                  name="paperclip"
                  size={24}
                  touchable={true}
                  onPress={() =>
                    navigation.navigate('AttachedFilesScreen', {
                      model: 'com.axelor.apps.quality.db.QIResolutionDefault',
                      modelId: currentEditedLine?._id,
                      options: {screenTitle: I18n.t('Dms_AttachedFiles')},
                    })
                  }
                />
              )}
              <Icon
                name="camera-fill"
                size={24}
                touchable={true}
                onPress={() => dispatch((enableCamera as any)(cameraKey))}
              />
              <Icon
                name="upload"
                size={24}
                touchable={true}
                onPress={handleAddFile}
              />
            </View>
          )}
        </View>
        {files.map((file, index) => (
          <View key={`${file?.name}-${index}`} style={styles.fileRow}>
            <Text style={styles.fileName} numberOfLines={1}>
              {file?.fileName || file?.name}
            </Text>
            <View style={styles.fileActions}>
              {!readonly && (
                <Icon
                  name="eye"
                  size={20}
                  touchable={true}
                  onPress={async () =>
                    await openFileInExternalApp(
                      {
                        fileName: file?.fileName,
                        id: file?.id,
                        isMetaFile: true,
                      },
                      {baseUrl, token, jsessionId},
                      I18n,
                    )
                  }
                />
              )}
              {!readonly && (
                <Icon
                  name="x-lg"
                  size={20}
                  touchable={true}
                  onPress={() => handleRemoveFile(index)}
                />
              )}
            </View>
          </View>
        ))}
      </View>
      <Button title={I18n.t('Quality_SaveContinue')} onPress={handleConfirm} />
    </View>
  );
};

const DefectViewAllList = (props: DefectViewAllListProps) => {
  return <DefectViewAllListAux {...props} />;
};

const styles = StyleSheet.create({
  container: {
    gap: 3,
    alignItems: 'center',
  },
  width: {
    width: '90%',
  },
  filesContainer: {
    gap: 8,
  },
  filesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filesActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  fileName: {
    flex: 1,
    marginRight: 8,
  },
  fileActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default DefectViewAllList;
