import {create} from '@storybook/theming/create';

export default create({
  base: 'light',
  brandTitle: 'AOM Storybook',
  brandUrl: 'https://axelor.com/fr/',
  brandImage:
    'https://axelor.com/wp-content/uploads/2023/05/logo-axelor-bleu.svg',
  brandTarget: '_self',

  //
  colorPrimary: '#3ECF8E',
  colorSecondary: '#CECECE',

  // UI
  appBg: '#F2F2F2',
  appContentBg: '#F2F2F2',
  appPreviewBg: '#F2F2F2',
  appBorderColor: '#CECECE',
  appBorderRadius: 4,

  // Text colors
  textColor: '#10162F',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#3ECF8E',
  barHoverColor: '#84DCB7',
  barBg: '#F2F2F2',

  // Form colors
  inputBg: '#F2F2F2',
  inputBorder: '#CECECE',
  inputTextColor: '#10162F',
  inputBorderRadius: 2,
});
