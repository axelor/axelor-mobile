export interface Module {
  name: string;
  title: string;
  subtitle: string;
  icon: string;
  disabled?: boolean;
  menus: {
    [screenKey: string]: {
      title: string;
      icon: string;
      screen: string;
      disabled?: boolean;
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
