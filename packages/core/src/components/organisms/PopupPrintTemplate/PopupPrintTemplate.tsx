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

  const [templateIdList, setTemplateIdList] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const {baseUrl, token, jsessionId} = useSelector((state: any) => state.auth);

  const handleShowFile = useCallback(
    async file => {
      const fileName = file.split('=')[1];
      await openFileInExternalApp(
        {
          fileName: fileName,
          id: 0,
          path: file,
        },
        {baseUrl: baseUrl, token: token, jsessionId: jsessionId},
        I18n,
      );
    },
    [I18n, baseUrl, jsessionId, token],
  );

  useEffect(() => {
    fetchActionPrint({id: modelId, model: model})
      .then(res => {
        const printingTemplateIdList =
          res?.data?.data[0]?.view?.context?._printingTemplateIdList;

        if (printingTemplateIdList) {
          setTemplateIdList(printingTemplateIdList);
        } else {
          const fileName = res?.data?.data[0].view?.views[0].name;
          if (fileName) {
            handleShowFile(fileName);
            onClose();
          } else {
            showToastMessage({
              type: 'error',
              position: 'bottom',
              text1: 'Error',
              text2: `${res?.data?.data[0]?.error?.message}`,
              onPress: () => {},
            });
            onClose();
          }
        }
      })
      .catch(() => {
        setTemplateIdList([]);
        setSelectedTemplate(null);
        onClose();
      });
  }, [handleShowFile, model, modelId, onClose]);

  const OpenFile = useCallback(() => {
    fetchFileToPrint({
      printingTemplate: selectedTemplate,
      id: modelId,
      model: model,
    })
      .then(res => {
        const file = res?.data?.data[0].view?.views[0].name;
        handleShowFile(file);
      })
      .catch(() => {
        setTemplateIdList([]);
        setSelectedTemplate(null);
        onClose();
      });
  }, [handleShowFile, model, modelId, selectedTemplate, onClose]);

  return (
    <Alert
      visible={visible}
      cancelButtonConfig={{onPress: onClose}}
      confirmButtonConfig={{onPress: OpenFile}}
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
