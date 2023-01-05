import {LayoutAnimation, Platform, UIManager} from 'react-native';

class Animation {
  config = {
    easeInEaseOut: LayoutAnimation.Presets.easeInEaseOut,
    linear: LayoutAnimation.Presets.linear,
    spring: LayoutAnimation.Presets.spring,
  };

  constructor() {
    this.beforeAnimation();
  }

  beforeAnimation() {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }

  animateNext(config: any = this.config.easeInEaseOut) {
    LayoutAnimation.configureNext(config);
  }
}

export const animationUtil = new Animation();
