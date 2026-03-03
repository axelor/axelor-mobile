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

import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {RadioSelect} from '@axelor/aos-mobile-ui';

const DOCUMENT_TYPE = {
  file: 'file',
  folder: 'folder',
};

interface SwitchDocumentTypeProps {
  defaultValue: boolean;
  onChange: (value: boolean) => void;
}

const SwitchDocumentTypeAux = ({
  defaultValue,
  onChange,
}: SwitchDocumentTypeProps) => {
  const I18n = useTranslator();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);

  return (
    <RadioSelect
      style={styles.radioSelect}
      defaultValue={defaultValue ? DOCUMENT_TYPE.folder : DOCUMENT_TYPE.file}
      items={[
        {id: DOCUMENT_TYPE.file, title: I18n.t('Dms_File')},
        {id: DOCUMENT_TYPE.folder, title: I18n.t('Dms_Folder')},
      ]}
      readonly={
        !mobileSettings?.isFolderCreationAllowed ||
        !mobileSettings?.isFileCreationAllowed
      }
      onChange={type => onChange(type === DOCUMENT_TYPE.folder)}
    />
  );
};

const SwitchDocumentType = ({
  defaultValue,
  onChange,
}: SwitchDocumentTypeProps) => {
  return (
    <SwitchDocumentTypeAux defaultValue={defaultValue} onChange={onChange} />
  );
};

const styles = StyleSheet.create({
  radioSelect: {
    alignSelf: 'center',
    width: '90%',
    marginTop: 10,
  },
});

export default SwitchDocumentType;
