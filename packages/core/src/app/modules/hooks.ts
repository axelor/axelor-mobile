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

import {useEffect, useMemo} from 'react';
import {processProvider} from '../../loader';
import {useBackgroundFunction} from '../../hooks/use-background-function';
import {core_modelAPI, core_searchFields, core_sortFields} from '../../models';
import {addModuleForms, formConfigsProvider} from '../../forms';
import {objectFieldsProvider} from '../../apiProviders';
import {initSelections} from '../../selections';
import {addModuleModels} from '../context.helper';
import {useModules} from './ModuleProvider';
import {Models} from './types';

export const useModulesInitialisation = () => {
  const {modules} = useModules();

  const modulesBackgroundFunctions = useMemo(() => {
    const backgroundFunctions = modules
      .filter(_module => _module.backgroundFunctions)
      .flatMap(_module => _module.backgroundFunctions);

    backgroundFunctions.push(processProvider.removeOldProcesses);

    return backgroundFunctions;
  }, [modules]);

  useBackgroundFunction(modulesBackgroundFunctions);

  const modulesObjectFields: Models = useMemo(
    () =>
      modules
        .filter(_module => _module.models)
        .reduce(addModuleModels, {
          objectFields: {...core_modelAPI},
          sortFields: {...core_sortFields},
          searchFields: {...core_searchFields},
          typeObjects: [],
        }),
    [modules],
  );

  const modulesFormsRegisters = useMemo(() => {
    return modules
      .filter(_module => _module.models?.formsRegister)
      .map(_module => _module.models.formsRegister)
      .reduce((forms, _moduleForms) => addModuleForms(forms, _moduleForms), {});
  }, [modules]);

  useEffect(() => {
    objectFieldsProvider.init(modulesObjectFields);
    initSelections(modulesObjectFields.typeObjects);
    formConfigsProvider.init(modulesFormsRegisters);
  }, [modulesObjectFields, modulesFormsRegisters]);

  return useMemo(() => ({modules}), [modules]);
};
