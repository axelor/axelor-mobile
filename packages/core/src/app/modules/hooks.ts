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
