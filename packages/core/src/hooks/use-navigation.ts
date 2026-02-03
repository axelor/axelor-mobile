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

import {useCallback, useMemo} from 'react';
import {
  useNavigation as useReactNavigation,
  useIsFocused as useReactIsFocused,
  useNavigationState as useReactNavigationState,
  CommonActions,
} from '@react-navigation/native';

export const useNavigation = (): any => {
  const navigation = useReactNavigation();

  const navigateAndReset = useCallback(
    ({
      screenName,
      params,
      screensToRemove,
    }: {
      screenName: string;
      params?: any;
      screensToRemove?: string[];
    }) => {
      const _list = (screensToRemove ?? []).filter(screen => screen != null);

      if (_list.length === 0) {
        (navigation.navigate as any)(screenName, params);
        return;
      }

      navigation.dispatch((state: any) => {
        const _routes = state.routes.filter(({name}) => !_list.includes(name));

        const newRoutes = [..._routes, {name: screenName, params}];

        return CommonActions.reset({
          ...state,
          routes: newRoutes,
          index: newRoutes.length - 1,
        });
      });
    },
    [navigation],
  );

  return useMemo(
    () => ({
      ...navigation,
      navigateAndReset,
    }),
    [navigation, navigateAndReset],
  );
};

export const useIsFocused = (): boolean => {
  return useReactIsFocused();
};

export const useNavigationRoutes = (): any => {
  return useReactNavigationState(state => state.routes);
};

export const useIsNavigationRoot = (): any => {
  const routes = useNavigationRoutes();
  return useMemo(() => routes?.length <= 1, [routes?.length]);
};

export const useStackChecker = (): ((name: string) => boolean) => {
  const routes = useNavigationRoutes();

  const checkScreenMounted = useCallback(
    (name: string) => {
      return routes.some((route: any) => route.name === name);
    },
    [routes],
  );

  return useMemo(() => checkScreenMounted, [checkScreenMounted]);
};
