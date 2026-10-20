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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {
  Button,
  FormHtmlInput,
  HorizontalRuleText,
  QuantityCard,
  ViewAllEditList,
} from '@axelor/aos-mobile-ui';
import {DefectSearchBar} from '../../templates';
import {DefectFilesManager} from '../../organisms';
import {QualityImprovement} from '../../../types';

interface DefectViewAllListProps {
  title?: string;
  defaultValue?: any[];
  onChange: (value: any[]) => void;
  objectState?: any;
  readonly?: boolean;
}

const DefectViewAllListAux = ({
  title = 'Quality_Defect',
  defaultValue,
  onChange,
  objectState,
  readonly = false,
}: DefectViewAllListProps) => {
  const I18n = useTranslator();

  const [initialPendingLine] = useState(() =>
    defaultValue?.find(_item => _item.isPending),
  );

  const [lines, setLines] = useState<any[]>(() =>
    (defaultValue ?? []).flatMap(_item => {
      if (!_item.isPending) return [_item];
      return _item.originalLine != null ? [_item.originalLine] : [];
    }),
  );
  const [editId, setEditId] = useState<number | undefined>(
    initialPendingLine?.originalLine != null
      ? initialPendingLine.id
      : undefined,
  );
  const [defect, setDefect] = useState<any>(initialPendingLine?.qiDefault);
  const [qty, setQty] = useState<number>(initialPendingLine?.qty ?? 1);
  const [description, setDescription] = useState<string>(
    initialPendingLine?.description ?? '',
  );
  const [files, setFiles] = useState<any[]>(initialPendingLine?.files ?? []);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const pendingLine = useMemo(
    () =>
      defect == null
        ? null
        : {
            id: editId ?? `qiDefault-${defect.id}.${lines.length}`,
            name: defect.name,
            qiDefault: defect,
            qty,
            description,
            files,
          },
    [defect, description, editId, files, lines.length, qty],
  );

  useEffect(() => {
    onChangeRef.current(
      QualityImprovement.mergeDefectLine(
        lines,
        pendingLine && {
          ...pendingLine,
          isPending: true,
          originalLine: lines.find(_item => _item.id === pendingLine.id),
        },
      ),
    );
  }, [lines, pendingLine]);

  const handleEditLine = useCallback((line: any) => {
    setEditId(line.id);
    setDefect(line.qiDefault);
    setQty(line.qty);
    setDescription(line.description);
    setFiles(line.files ?? []);
  }, []);

  const handleConfirm = useCallback(() => {
    setLines(_current =>
      QualityImprovement.mergeDefectLine(_current, pendingLine),
    );

    setDefect(undefined);
    setQty(1);
    setDescription('');
    setFiles([]);
    setEditId(undefined);
  }, [pendingLine]);

  const currentDefectId = useMemo(
    () => lines?.find(l => l.id === editId)?._id,
    [editId, lines],
  );

  return (
    <View style={styles.container}>
      <ViewAllEditList
        title={I18n.t(title)}
        lines={lines}
        setLines={setLines}
        currentLineId={editId!}
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
      <DefectFilesManager
        style={styles.width}
        defectId={currentDefectId}
        files={files}
        setFiles={setFiles}
        readonly={readonly}
      />
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
});

export default DefectViewAllList;
