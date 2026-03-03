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

import {useMemo} from 'react';
import {useSelector} from '../redux/hooks';
import {formatVersionString} from '../utils';

export const useOutdatedVersion = (versionCheckConfig: any) => {
  const {mobileSettings} = useSelector(state => state.appConfig);
  const {appVersion} = useSelector(state => state.auth);

  const mobileVersion = useMemo(
    () => formatVersionString(appVersion),
    [appVersion],
  );

  const minimalRequiredVersion = useMemo(
    () => formatVersionString(mobileSettings?.minimalRequiredMobileAppVersion),
    [mobileSettings],
  );

  return useMemo(
    () => ({
      isOutdated:
        versionCheckConfig?.activate && mobileVersion < minimalRequiredVersion,
    }),
    [minimalRequiredVersion, mobileVersion, versionCheckConfig?.activate],
  );
};
