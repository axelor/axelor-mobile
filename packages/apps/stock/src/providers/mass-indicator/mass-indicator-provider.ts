/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import {MassIndicatorConfig, RegisterMethod} from './types';

class MassIndicatorProvider {
  private massIndicatorConfig: MassIndicatorConfig;
  private refreshCallBack: Function[];

  constructor() {
    this.massIndicatorConfig = {};
    this.refreshCallBack = [];
  }

  register(callBack: Function) {
    this.refreshCallBack.push(callBack);
  }

  unregister(callBack: Function) {
    this.refreshCallBack = this.refreshCallBack.filter(_f => _f !== callBack);
  }

  private updateState() {
    this.refreshCallBack.forEach(_f => _f(this.massIndicatorConfig));
  }

  registerConfig(
    config: MassIndicatorConfig,
    registerMethod: RegisterMethod = 'override',
  ) {
    if (registerMethod === 'override') {
      this.massIndicatorConfig = config;
    } else {
      Object.entries(config).forEach(([key, indicator]) => {
        if (!Object.keys(this.massIndicatorConfig).includes(key)) {
          this.massIndicatorConfig[key] = indicator;
        } else {
          this.massIndicatorConfig[key] = {
            ...this.massIndicatorConfig[key],
            ...indicator,
          };
        }
      });
    }

    this.updateState();
  }

  getMassIndicatorConfig(): MassIndicatorConfig {
    return this.massIndicatorConfig;
  }
}

export const massIndicatorProvider = new MassIndicatorProvider();
