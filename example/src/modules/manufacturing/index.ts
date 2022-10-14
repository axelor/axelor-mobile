import {Module} from '@aos-mobile/core';
import ManufacturingOrderScreens from './screens/manufactoringOrder';
import OperationOrderScreens from './screens/operationOrder';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import * as manufacturingReducers from './features';

const ManufacturingModule: Module = {
  name: 'Manufacturing',
  title: t => t('Manufacturing_Manufacturing'),
  icon: 'cogs',
  menus: {
    ManufacturingOrder: {
      title: t => t('Manufacturing_ManufacturingOrder'),
      icon: 'clipboard-list',
      screen: 'ManufacturingOrderListScreen',
    },
    OperationOrder: {
      title: t => t('Manufacturing_OperationOrder'),
      icon: 'dolly-flatbed',
      screen: 'OperationOrderListScreen',
    },
  },
  screens: {
    ...ManufacturingOrderScreens,
    ...OperationOrderScreens,
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  reducers: {
    ...manufacturingReducers,
  },
};

export default ManufacturingModule;
