import React, {useRef} from 'react';
import {Theme, Writing} from '@aos-mobile/ui';
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
      />
    </ContextsProvider>
  );
};

export default Application;
