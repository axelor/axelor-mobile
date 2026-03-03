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

import {
  axiosApiProvider,
  createStandardSearch,
  getSearchCriterias,
} from '../apiProviders';

const createPrintingTemplateCriteria = ({searchValue, idList}) => {
  return [
    getSearchCriterias('core_printTemplate', searchValue),
    {
      fieldName: 'id',
      operator: 'in',
      value: idList,
    },
  ];
};

export async function fetchActionPrint({id, model}) {
  return axiosApiProvider
    .post({
      url: 'ws/action',
      data: {
        action: 'action-method-print-template',
        model: model,
        data: {
          context: {
            id: id,
            _model: model,
          },
        },
      },
    })
    .then(res => res?.data?.data?.[0])
    .then(res => {
      const templateSet = res?.view?.context?._printingTemplateIdList;
      const fileName = res.view?.views?.[0]?.name;
      const error = res?.error?.message;

      return {templateSet, fileName, error};
    })
    .catch(() => ({}));
}

export async function searchPrintingTemplate({
  searchValue = null,
  page = 0,
  idList,
}) {
  if (!Array.isArray(idList) || idList.length === 0) {
    return {data: {data: [], total: 0}};
  }

  return createStandardSearch({
    model: 'com.axelor.apps.base.db.PrintingTemplate',
    criteria: createPrintingTemplateCriteria({idList, searchValue}),
    fieldKey: 'core_printTemplate',
    page,
  });
}

export async function fetchFileToPrint({id, model, printingTemplate}) {
  return axiosApiProvider
    .post({
      url: 'ws/action',
      data: {
        action: 'action-method-printing-template-config-wizard-print',
        model: 'com.axelor.utils.db.Wizard',
        data: {
          context: {
            _modelId: id,
            _fromTestWizard: false,
            _modelClass: model,
            _viewType: 'form',
            _viewName: 'printing-template-print-config-wizard',
            _views: [
              {
                name: 'printing-template-print-config-wizard',
                type: 'form',
              },
            ],
            _model: 'com.axelor.utils.db.Wizard',
            printingTemplate: printingTemplate,
          },
        },
      },
    })
    .then(res => res?.data?.data?.[0])
    .then(res => ({
      error: res?.error?.message,
      fileName: res.view?.views?.[0]?.name,
    }));
}
