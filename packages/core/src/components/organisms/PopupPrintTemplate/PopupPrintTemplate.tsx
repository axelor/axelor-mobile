/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useState} from 'react';
import {Alert} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {useSelector} from '../../../redux/hooks';
import {
  fetchActionPrint,
  fetchFileToPrint,
} from '../../../api/print-template-api';
import {openFileInExternalApp} from '../../../tools';
import {PrintTemplateSearchBar} from '../../templates';
import {showToastMessage} from '../../../utils';

interface PopupPrintTemplateProps {
  visible: boolean;
  onClose: () => void;
  model: string;
  modelId: number;
}

const PopupPrintTemplate = ({
  visible = false,
  onClose,
  model,
  modelId,
}: PopupPrintTemplateProps) => {
  const I18n = useTranslator();

  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);

  const [templateIdList, setTemplateIdList] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleShowFile = useCallback(
    async (file: string) => {
      const fileName = file.split('=')[1];

      await openFileInExternalApp(
        {fileName, path: file},
        {baseUrl, token, jsessionId},
        I18n,
      );

      onClose();
    },
    [I18n, baseUrl, jsessionId, onClose, token],
  );

  const handleCancel = useCallback(() => {
    setTemplateIdList([]);
    setSelectedTemplate(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (visible) {
      fetchActionPrint({id: modelId, model: model})
        .then(({templateSet, fileName, error}) => {
          if (Array.isArray(templateSet) && templateSet.length > 0) {
            setTemplateIdList(templateSet);
            setShowPopup(true);
          } else if (fileName) {
            handleShowFile(fileName);
          } else {
            showToastMessage({
              type: 'error',
              position: 'bottom',
              text1: 'Error',
              text2: error,
            });
            onClose();
          }
        })
        .catch(handleCancel);
    }
  }, [handleCancel, handleShowFile, model, modelId, onClose, visible]);

  const openFile = useCallback(() => {
    fetchFileToPrint({printingTemplate: selectedTemplate, id: modelId, model})
      .then(({error, fileName}) => {
        if (fileName == null) {
          showToastMessage({
            type: 'error',
            position: 'bottom',
            text1: 'Error',
            text2: error,
          });
          handleCancel();
        } else {
          handleShowFile(fileName);
        }
      })
      .catch(handleCancel);
  }, [selectedTemplate, modelId, model, handleCancel, handleShowFile]);

  return (
    <Alert
      visible={showPopup}
      cancelButtonConfig={{onPress: onClose}}
      confirmButtonConfig={{onPress: openFile}}
      translator={I18n.t}>
      <PrintTemplateSearchBar
        idList={templateIdList}
        defaultValue={selectedTemplate}
        onChange={setSelectedTemplate}
      />
    </Alert>
  );
};

export default PopupPrintTemplate;
