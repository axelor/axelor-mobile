import {Module, Tool} from '../../../app';

export const addModuleTools = (
  registeredTools: Tool[],
  module: Module,
): Tool[] => {
  const currentTools = registeredTools.map(_i => _i.key);
  const moduleTools = module.globalTools;

  let result: Tool[] =
    moduleTools.filter(({key}) => !currentTools.includes(key)) ?? [];

  registeredTools.forEach(_tool => {
    const overrideTool = moduleTools.find(({key}) => key === _tool.key);

    if (overrideTool == null) {
      result.push(_tool);
    } else {
      result.push({
        ..._tool,
        ...overrideTool,
      });
    }
  });

  return result;
};

export const addDefaultValues = (tool: Tool, idx: number): Tool => {
  return {
    ...tool,
    order: tool.order ?? idx * 10,
    hideIf: tool.hideIf != null ? tool.hideIf : () => false,
    disabledIf: tool.disabledIf != null ? tool.disabledIf : () => false,
  };
};
