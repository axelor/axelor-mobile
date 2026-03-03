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

import {Module, Tool} from '../../app';

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

export const addToolDefaultValues = (tool: Tool, idx: number): Tool => {
  return {
    ...tool,
    order: tool.order ?? idx * 10,
    hideIf: tool.hideIf != null ? tool.hideIf : () => false,
    disabledIf: tool.disabledIf != null ? tool.disabledIf : () => false,
  };
};
