/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
