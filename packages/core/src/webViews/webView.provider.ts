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

import {useCallback, useEffect, useState} from 'react';

export interface WebViewConfig {
  id: number;
  appName: string;
  isAosWebView?: boolean;
  url?: string;
  metaAction?: {name: string};
  menuTitle?: string;
  iconName?: string;
  menuOrder?: number;
  authorizedRoleSet?: any[];
}

class WebViewProvider {
  private configs: WebViewConfig[];
  private refreshCallBack: Function[];

  constructor() {
    this.configs = [];
    this.refreshCallBack = [];
  }

  registerCallback(callBack: Function) {
    this.refreshCallBack.push(callBack);
  }

  unregisterCallback(callBack: Function) {
    this.refreshCallBack = this.refreshCallBack.filter(_f => _f !== callBack);
  }

  registerConfigs(configs: WebViewConfig[]) {
    this.configs = Array.isArray(configs) ? configs : [];
    this.updateState();
  }

  updateConfig(config: WebViewConfig) {
    if (config?.id == null) {
      return;
    }

    this.configs = this.configs.map(_config =>
      _config.id === config.id ? {..._config, ...config} : _config,
    );
    this.updateState();
  }

  getConfigs(): WebViewConfig[] {
    return this.configs;
  }

  getConfig(id: number): WebViewConfig {
    return this.configs.find(_config => _config.id === id) as WebViewConfig;
  }

  private updateState() {
    this.refreshCallBack.forEach(_f => _f(this.configs));
  }
}

export const webViewProvider = new WebViewProvider();

export const useWebViewConfigs = (): WebViewConfig[] => {
  const [configs, setConfigs] = useState<WebViewConfig[]>(
    webViewProvider.getConfigs(),
  );

  const refreshData = useCallback(
    (data: WebViewConfig[]) => setConfigs([...data]),
    [],
  );

  useEffect(() => {
    webViewProvider.registerCallback(refreshData);

    return () => {
      webViewProvider.unregisterCallback(refreshData);
    };
  }, [refreshData]);

  return configs;
};
