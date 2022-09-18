import React, {createContext, ReactChildren, useEffect} from 'react';

const ApplicationContext = createContext(null);

interface ApplicationProsp {
  modules: [any];
  children: ReactChildren;
}

const Application = ({modules, children}: ApplicationProsp) => {
  useEffect(() => {
    console.log('Successfully Initialisation Application');
  }, []);
  console.log({modules});
  return (
    <ApplicationContext.Provider value={{}}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default Application;
