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

import {useCallback, useEffect, useMemo, useState} from 'react';
import {Form, FormConfigs} from './types';
import {addModuleForms, fetchOptionsOfFormKey} from './register.helpers';

export interface RegisterOptions {
  replaceOld?: boolean;
}

class FormConfigsProvider {
  private formConfigs: FormConfigs;
  private refreshCallBack: Function[];

  constructor() {
    this.formConfigs = {};
    this.refreshCallBack = [];
  }

  register(callBack) {
    this.refreshCallBack.push(callBack);
  }

  unregister(callBack) {
    this.refreshCallBack = this.refreshCallBack.filter(_f => _f !== callBack);
  }

  init(configs: FormConfigs) {
    this.formConfigs = configs;
  }

  private updateState() {
    this.refreshCallBack.forEach(_f => _f(this.formConfigs));
  }

  getFormConfig(key: string): Form {
    return fetchOptionsOfFormKey(this.formConfigs, key);
  }

  registerForm(key: string, options: Form, registerOptions: RegisterOptions) {
    this.formConfigs = addModuleForms(
      {...this.formConfigs},
      {[key]: options},
      registerOptions,
    );

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

    return () => {
      formConfigsProvider.unregister(setForms);
    };
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
