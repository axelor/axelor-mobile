export class Themes {
  static ligthTheme = {id: 1, name: 'Light'};

  // Theme used for color blind people, do not modified if not required
  // Will not appear in theme picker on setting screen
  // Can be toggle with switch button on setting scrren
  static colorBlindTheme = {id: 0, name: 'Color blind'};

  static themesList = [{id: 1, name: 'Light'}];
}

class Colors {
  static ligthTheme = {
    screenBackgroundColor: '#F2F2F2',
    backgroundColor: '#FFFFFF',
    primaryColor: '#3ECF8E',
    primaryColor_light: '#84DCB7',
    secondaryColor: '#CECECE',
    secondaryColor_light: '#DDDDDD',
    secondaryColor_dark: '#606060',
    errorColor: '#E54D1D',
    errorColor_light: '#EF9477',
    cautionColor: '#F49B76',
    cautionColor_light: '#F5C0AA',
    plannedColor: '#B5A1DF',
    plannedColor_light: '#D3C7EC',
    progressColor: '#FFD101',
    progressColor_light: '#FCE064',
    priorityColor: '#36AEE1',
    priorityColor_light: '#81C9E8',
    text: '#000000',
    placeholderTextColor: '#C0C0C0',
  };

  // Theme used for color blind people, do not modified if not required
  // Will not appear in theme picker on setting screen
  // Can be toggle with switch button on setting scrren
  static colorBlindTheme = {
    screenBackgroundColor: '#F2F2F2',
    backgroundColor: '#FFFFFF',
    primaryColor: '#994F00',
    primaryColor_light: '#BF9263',
    secondaryColor: '#3288D9',
    secondaryColor_light: '#63A4E0',
    secondaryColor_dark: '#006CD1',
    errorColor: '#E54D1D',
    errorColor_light: '#EF9477',
    cautionColor: '#F49B76',
    cautionColor_light: '#F5C0AA',
    plannedColor: '#B5A1DF',
    plannedColor_light: '#D3C7EC',
    progressColor: '#FFD101',
    progressColor_light: '#FCE064',
    priorityColor: '#36AEE1',
    priorityColor_light: '#81C9E8',
    text: '#000000',
    placeholderTextColor: '#C0C0C0',
  };
}

export function getColorTheme(themeId) {
  switch (themeId) {
    case Themes.ligthTheme.id:
      return Colors.ligthTheme;
    case Themes.colorBlindTheme.id:
      return Colors.colorBlindTheme;
    default:
      break;
  }
}

export default Colors;
