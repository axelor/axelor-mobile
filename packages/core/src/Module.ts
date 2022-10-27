export interface Module {
  name: string;
  title: string;
  icon: string;
  menus: {
    [screenKey: string]: {
      title: string;
      icon: string;
      screen: string;
    };
  };
  screens: {
    [screenKey: string]:
      | React.FC<any>
      | {
          component: React.FC<any>;
          title: string;
        };
  };
  translations?: {
    [languageKey: string]: any;
  };
  reducers?: any;
}
