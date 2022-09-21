type TranslateFunc = (key: string) => string;
type Title = string | ((t: TranslateFunc) => string);

interface Module {
  name: string;
  title: Title;
  icon: string;
  menus: {
    [screenKey: string]: {
      title: Title;
      icon: string;
      screen: string;
    };
  };
  screens: {
    [screenKey: string]:
      | React.FC<any>
      | {
          component: React.FC<any>;
          title: Title;
        };
  };
}

export default Module;
