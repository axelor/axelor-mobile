/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {authModule} from '../../../auth';
import {Module} from '../../../app';
import {useActiveModule} from '../../providers';
import MenuIconButton from './MenuIconButton';

interface AuthMenuProps {
  isVisible?: boolean;
  onPress: (module: Module) => void;
}

const AuthMenu = ({isVisible = true, onPress}: AuthMenuProps) => {
  const {activeModule} = useActiveModule();

  if (!isVisible) {
    return null;
  }

  return (
    <MenuIconButton
      key={authModule.title}
      icon={authModule.icon}
      subtitle={authModule.subtitle}
      disabled={authModule.disabled}
      isActive={activeModule?.name === authModule.name}
      onPress={() => onPress(authModule)}
      rounded
    />
  );
};

export default AuthMenu;
