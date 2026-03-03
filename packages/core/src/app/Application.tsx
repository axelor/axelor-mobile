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

import React, {useEffect, useRef} from 'react';
import {
  Theme,
  ThemeColors,
  Writing,
  WritingStyles,
} from '@axelor/aos-mobile-ui';
import {Module, modulesProvider} from './modules';
import ContextsProvider from './ContextsProvider';
import ContextedApplication from './ContextedApplication';
import {authModule} from '../auth';
import {RouterProvider} from '../config';
import {ApiProviderConfig} from '../apiProviders/config';
import {proxy, releaseConfig, versionCheckConfig} from './types';
import {RouteSwitcher} from '../config/RouterProvider';
import {Session, sessionStorage} from '../sessions';

interface appConfig {
  testInstanceConfig: proxy;
  releaseInstanceConfig: releaseConfig;
  isDemoSession: boolean;
  demoSession: Session;
  defaultLanguage: string;
  defaultRequestLimit: number;
  enableWebSocket: boolean;
  enableConnectionSessions: boolean;
  allowInternetConnectionBlock: boolean;
  retrocompatibilityAOS6: boolean;
  additionalRoutes: RouteSwitcher;
  showModulesSubtitle: boolean;
  themeColorsConfig: ThemeColors;
  writingStylesConfig: WritingStyles;
  logoFile?: any;
  versionCheckConfig?: versionCheckConfig;
}

interface ApplicationProps {
  modules: Module[];
  mainMenu?: string;
  additionalsReducers?: any;
  version: string;
  themes?: Theme[];
  defaultTheme?: Theme;
  writingThemes?: Writing[];
  defaultWritingTheme?: Writing;
  showModulesSubtitle?: boolean;
  configuration?: appConfig;
  customLoginPage?: React.ComponentType;
}

const Application = ({
  modules: modulesProvided,
  mainMenu,
  additionalsReducers,
  version,
  themes,
  defaultTheme,
  writingThemes,
  defaultWritingTheme,
  showModulesSubtitle = false,
  configuration,
  customLoginPage,
}: ApplicationProps) => {
  const modules: Module[] = useRef([authModule, ...modulesProvided]).current;

  RouterProvider.init({
    retrocompatibility: configuration?.retrocompatibilityAOS6,
    routesDefinition: configuration?.additionalRoutes,
  });

  ApiProviderConfig.allowConnectionBlock =
    configuration.allowInternetConnectionBlock;

  useEffect(() => {
    modulesProvider.init(
      modules,
      modules
        .filter(_module => _module.moduleRegister)
        .flatMap(_module => _module.moduleRegister),
    );
  }, [modules]);

  useEffect(() => {
    sessionStorage.init(
      configuration?.isDemoSession,
      configuration?.demoSession,
    );
  }, [configuration?.demoSession, configuration?.isDemoSession]);

  return (
    <ContextsProvider
      modules={modules}
      additionalsReducers={additionalsReducers}
      defaultTheme={defaultTheme}
      themes={themes}
      defaultWritingTheme={defaultWritingTheme}
      writingThemes={writingThemes}
      defaultLanguage={configuration?.defaultLanguage}
      defaultRequestLimit={configuration?.defaultRequestLimit}
      enableWebSocket={configuration?.enableWebSocket}
      themeColorsConfig={configuration?.themeColorsConfig}
      writingStylesConfig={configuration?.writingStylesConfig}
      showModulesSubtitle={
        configuration?.showModulesSubtitle ?? showModulesSubtitle
      }>
      <ContextedApplication
        modules={modules}
        mainMenu={mainMenu}
        version={version}
        configuration={{
          testInstanceConfig: configuration?.testInstanceConfig,
          releaseInstanceConfig: configuration?.releaseInstanceConfig,
          enableConnectionSessions: configuration?.enableConnectionSessions,
          logoFile: configuration?.logoFile,
          versionCheckConfig: configuration?.versionCheckConfig,
        }}
        customLoginPage={customLoginPage}
      />
    </ContextsProvider>
  );
};

export default Application;
