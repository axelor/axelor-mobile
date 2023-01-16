import React from 'react';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {authModule} from '../../auth';
import MenuIconButton from './MenuIconButton';
import useTranslator from '../../i18n/hooks/use-translator';

const AuthMenuIconButton = ({isActive, showModulesSubtitle, onPress}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  return (
    <MenuIconButton
      key={authModule.title}
      icon={authModule.icon}
      subtitle={showModulesSubtitle && I18n.t(authModule.subtitle)}
      disabled={authModule.disabled}
      color={isActive ? Colors.primaryColor.background_light : null}
      onPress={onPress}
      rounded={true}
    />
  );
};

export default AuthMenuIconButton;
