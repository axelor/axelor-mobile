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

import {useCallback, useEffect, useRef, useState} from 'react';
import type {EmbeddedAppDefinition} from '../app/modules/types';
import {useSelector} from '../redux/hooks';
import {
  EmbeddedBundle,
  readCachedBundle,
  syncDownloadedBundle,
} from './bundles';

type SessionAuth = {
  baseUrl?: string | null;
  token?: string;
};

type AuthState = {auth?: SessionAuth};

const selectAuth = (state: AuthState): SessionAuth => state.auth ?? {};

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export type DownloadedBundleState = {
  status: 'checking' | 'downloading' | 'ready' | 'error';
  bundle: EmbeddedBundle | null;
  /* true when the server could not be reached, so the cached copy may be outdated */
  usingCacheOffline: boolean;
  /* A newer version was downloaded while the cached one was shown; it opens next time */
  updateReady: boolean;
  progress: {done: number; total: number} | null;
  error: string | null;
  refresh: () => void;
};

/*
 * Opens the cached copy right away when there is one, and checks the server in
 * the background. Without a cached copy, it waits for the download.
 */
export function useDownloadedBundle(
  appId: string,
  remotePath: string,
): DownloadedBundleState {
  /* token only marks a new session, so the check runs again after each login */
  const {baseUrl, token}: SessionAuth = useSelector(selectAuth);
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<Omit<DownloadedBundleState, 'refresh'>>({
    status: 'checking',
    bundle: null,
    usingCacheOffline: false,
    updateReady: false,
    progress: null,
    error: null,
  });

  const refresh = useCallback(() => setAttempt(value => value + 1), []);

  useEffect(() => {
    let active = true;

    const run = async () => {
      const cached = await readCachedBundle(appId).catch(() => null);
      if (!active) {
        return;
      }
      setState({
        status: cached != null ? 'ready' : 'checking',
        bundle: cached,
        usingCacheOffline: false,
        updateReady: false,
        progress: null,
        error: null,
      });

      try {
        if (baseUrl == null) {
          throw new Error('Not connected to a server');
        }
        const latest = await syncDownloadedBundle({
          appId,
          remotePath,
          baseUrl,
          onProgress: (done, total) =>
            active &&
            cached == null &&
            setState(previous => ({
              ...previous,
              status: 'downloading',
              progress: {done, total},
            })),
        });
        if (active) {
          setState({
            status: 'ready',
            bundle: cached ?? latest,
            usingCacheOffline: false,
            updateReady: cached != null && cached.version !== latest.version,
            progress: null,
            error: null,
          });
        }
      } catch (error) {
        if (!active) {
          return;
        }
        setState({
          status: cached != null ? 'ready' : 'error',
          bundle: cached,
          usingCacheOffline: cached != null,
          updateReady: false,
          progress: null,
          error: errorMessage(error),
        });
      }
    };

    run();
    return () => {
      active = false;
    };
  }, [appId, attempt, baseUrl, remotePath, token]);

  return {...state, refresh};
}

/*
 * Downloads the given apps in the background once the session is ready, so they
 * open offline even if the user never opened them while connected.
 */
export function usePrefetchEmbeddedApps(apps: EmbeddedAppDefinition[]) {
  /* token only marks a new session, so the check runs again after each login */
  const {baseUrl, token}: SessionAuth = useSelector(selectAuth);
  /* The effect reruns when the list of apps changes, not on every new array */
  const appKey = apps.map(app => `${app.id}:${app.path}`).join('|');
  const appsRef = useRef(apps);
  appsRef.current = apps;

  useEffect(() => {
    if (baseUrl == null || appKey.length === 0) {
      return;
    }
    const run = async () => {
      for (const app of appsRef.current) {
        await syncDownloadedBundle({
          appId: app.id,
          remotePath: app.path,
          baseUrl,
        }).catch(error =>
          console.warn(`Prefetch of embedded app ${app.id} failed`, error),
        );
      }
    };
    run();
  }, [appKey, baseUrl, token]);
}
