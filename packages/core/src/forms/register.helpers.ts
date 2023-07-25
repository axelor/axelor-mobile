/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import {Field, FormConfigs, JSONObject, Panel} from './types';

export const mergePanels = (
  currentPanels: JSONObject<Panel>,
  newPanels: JSONObject<Panel>,
) => {
  if (newPanels == null || Object.keys(newPanels).length === 0) {
    return currentPanels;
  }

  if (currentPanels == null || Object.keys(currentPanels).length === 0) {
    return newPanels;
  }

  const resultPanels = {...currentPanels};

  Object.entries(newPanels).forEach(([panelKey, _panel]) => {
    if (!Object.keys(resultPanels).includes(panelKey)) {
      resultPanels[panelKey] = _panel;
    } else {
      const oldPanel = {...resultPanels[panelKey]};
      resultPanels[panelKey] = {
        ...oldPanel,
        ..._panel,
      };
    }
  });

  return resultPanels;
};

export const mergeFields = (
  currentFields: JSONObject<Field>,
  newFields: JSONObject<Field>,
) => {
  if (newFields == null || Object.keys(newFields).length === 0) {
    return currentFields;
  }

  if (currentFields == null || Object.keys(currentFields).length === 0) {
    return newFields;
  }

  const resultFields = {...currentFields};

  Object.entries(newFields).forEach(([fieldKey, _field]) => {
    if (!Object.keys(resultFields).includes(fieldKey)) {
      resultFields[fieldKey] = _field;
    } else {
      const oldFields = {...resultFields[fieldKey]};
      resultFields[fieldKey] = {
        ...oldFields,
        ..._field,
      };
    }
  });

  return resultFields;
};

export const addModuleForms = (
  forms: FormConfigs,
  _moduleForms: FormConfigs,
) => {
  if (_moduleForms == null || Object.keys(_moduleForms).length === 0) {
    return forms;
  }

  if (forms == null || Object.keys(forms).length === 0) {
    return _moduleForms;
  }

  let result = {...forms};

  for (const [key, config] of Object.entries(_moduleForms)) {
    if (!Object.keys(result).includes(key)) {
      result[key] = config;
    } else {
      const oldOptions = {...result[key]};
      result[key] = {
        ...oldOptions,
        ...config,
        panels: mergePanels(oldOptions.panels, config.panels),
        fields: mergeFields(oldOptions.fields, config.fields),
      };
    }
  }
};
