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

import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {
  Button,
  FormInput,
  QuantityCard,
  Text,
  ViewAllEditList,
} from '@axelor/aos-mobile-ui';
import {DefectSearchBar} from '../../templates';

interface DefectViewAllListProps {
  title?: string;
  defaultValue?: any[];
  objectState?: any;
  onChange: (employees: any[]) => void;
  readonly?: boolean;
}

const DefectViewAllListAux = ({
  title = 'Quality_Defects',
  defaultValue,
  objectState,
  onChange,
  readonly = false,
}: DefectViewAllListProps) => {
  const I18n = useTranslator();

  const [lines, setLines] = useState(defaultValue ?? []);
  const [selectedDefect, setSelectedDefect] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedDescription, setSelectedDescription] = useState('');

  console.log('objectSate', objectState);

  const handleAddDefect = useCallback((defect: any) => {
    if (defect) {
      setSelectedDefect(defect);
      setSelectedQty(1);
      setSelectedDescription('');
      setEditIndex(null);
    }
  }, []);

  const handleEditLine = useCallback(
    (line: any) => {
      const index = lines.findIndex(l => l.id === line.id);
      if (index !== -1) {
        setEditIndex(index);
        setSelectedDefect(line);
        setSelectedQty(line.qty || 1);
        setSelectedDescription(line.description || '');
      }
    },
    [lines],
  );
  const handleChange = useCallback(
    (updated: any[]) => {
      setLines(updated);
      onChange(updated);
    },
    [onChange],
  );

  const handleConfirmAdd = () => {
    const newDefect = {
      ...selectedDefect,
      qty: selectedQty,
      description: selectedDescription,
    };

    let updatedLines;
    if (editIndex !== null) {
      updatedLines = [...lines];
      updatedLines[editIndex] = newDefect;
    } else {
      updatedLines = [...lines, newDefect].filter(
        ({id}, idx, self) => self.findIndex(_e => _e.id === id) === idx,
      );
    }

    setLines(updatedLines);
    onChange(updatedLines);
    setSelectedDefect(null);
    setSelectedQty(1);
    setSelectedDescription('');
    setEditIndex(null);
  };

  return (
    <>
      <ViewAllEditList
        currentLineId={selectedDefect?.id ?? null}
        title={I18n.t(title)}
        lines={lines}
        setLines={handleChange}
        handleEditLine={handleEditLine}
        translator={I18n.t}
      />
      {!readonly && (
        <DefectSearchBar
          placeholderKey="Quality_Defects"
          showTitle={false}
          onChange={handleAddDefect}
        />
      )}
      {selectedDefect && (
        <>
          <QuantityCard
            labelQty={I18n.t('Quality_Quantity')}
            defaultValue={selectedQty}
            onValueChange={setSelectedQty}
            editable
            actionQty
            iconName="x-lg"
            onPressActionQty={() => {
              setSelectedDefect(null);
              setSelectedQty(1);
            }}
            isBigButton
            translator={I18n.t}>
            <Text fontSize={16}>{selectedDefect.name}</Text>
          </QuantityCard>
          <FormInput
            style={styles.formInput}
            title={I18n.t('Base_Description')}
            defaultValue={selectedDescription}
            onChange={setSelectedDescription}
            multiline
            adjustHeightWithLines
          />
          <View style={styles.addButton}>
            <Button
              title={I18n.t('Quality_AddDefault')}
              onPress={handleConfirmAdd}
            />
          </View>
        </>
      )}
    </>
  );
};

const DefectViewAllList = (props: DefectViewAllListProps) => {
  return <DefectViewAllListAux {...props} />;
};

const styles = StyleSheet.create({
  formInput: {
    alignSelf: 'center',
  },
  addButton: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default DefectViewAllList;
