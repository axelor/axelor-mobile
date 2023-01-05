import React, {useRef} from 'react';
import {Theme, Writing} from '@axelor/aos-mobile-ui';
import {Module} from './Module';
import ContextsProvider from './ContextsProvider';
import ContextedApplication from './ContextedApplication';

interface ApplicationProps {
  modules: [Module];
  mainMenu: string;
  additionalsReducers?: any;
  version: string;
  themes?: Theme[];
  defaultTheme?: Theme;
  writingThemes?: Writing[];
  defaultWritingTheme?: Writing;
  showModulesSubtitle: boolean;
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
}: ApplicationProps) => {
  const modules = useRef(modulesProvided).current;

  return (
    <ContextsProvider
      modules={modules}
      additionalsReducers={additionalsReducers}
      defaultTheme={defaultTheme}
      themes={themes}
      defaultWritingTheme={defaultWritingTheme}
      writingThemes={writingThemes}>
      <ContextedApplication
        modules={modules}
        mainMenu={mainMenu}
        version={version}
        showModulesSubtitle={showModulesSubtitle}
      />
    </ContextsProvider>
  );
};

export default Application;
