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

import {useCallback, useEffect, useMemo, useState} from 'react';
import {Form, FormConfigs} from './types';
import {addModuleForms, fetchOptionsOfFormKey} from './register.helpers';

class FormConfigsProvider {
  private formConfigs: FormConfigs;
  private refreshCallBack: Function;

  constructor() {
    this.formConfigs = {};
    this.refreshCallBack = () => {};
  }

  register(callBack) {
    this.refreshCallBack = callBack;
  }

  init(configs: FormConfigs) {
    this.formConfigs = configs;
  }

  private updateState() {
    this.refreshCallBack(this.formConfigs);
  }

  getFormConfig(key: string): Form {
    return fetchOptionsOfFormKey(this.formConfigs, key);
  }

  registerFrom(key: string, options: Form) {
    this.formConfigs = addModuleForms({...this.formConfigs}, {[key]: options});

    this.updateState();
  }

  getAllConfigs(): FormConfigs {
    return this.formConfigs;
  }
}

export const formConfigsProvider = new FormConfigsProvider();

export const useFormConfig = (modelKey: string): {config: Form} => {
  const [forms, setForms] = useState(formConfigsProvider.getAllConfigs());

  useEffect(() => {
    formConfigsProvider.register(setForms);
  }, []);

  const getFormConfigOfModel = useCallback(
    key => fetchOptionsOfFormKey(forms, key),
    [forms],
  );

  return useMemo(
    () => ({config: getFormConfigOfModel(modelKey)}),
    [getFormConfigOfModel, modelKey],
  );
};
