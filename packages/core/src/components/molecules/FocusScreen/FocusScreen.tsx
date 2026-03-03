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

import React, {useEffect} from 'react';
import {Screen} from '@axelor/aos-mobile-ui';
import {useIsFocused} from '../../../hooks/use-navigation';

interface FocusScreenProps {
  style?: any;
  children: any;
  fixedItems?: any;
  removeSpaceOnTop?: boolean;
  loading?: boolean;
  fetcher: () => void;
  displayCondition?: boolean;
}

const FocusScreen = ({
  style,
  children,
  fixedItems,
  removeSpaceOnTop = false,
  loading = false,
  fetcher,
  displayCondition = true,
}: FocusScreenProps) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetcher();
    }
  }, [fetcher, isFocused]);

  if (!isFocused || !displayCondition) {
    return null;
  }

  return (
    <Screen
      style={style}
      fixedItems={fixedItems}
      removeSpaceOnTop={removeSpaceOnTop}
      loading={loading}>
      {children}
    </Screen>
  );
};

export default FocusScreen;
