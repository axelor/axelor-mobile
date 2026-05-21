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

import {useCallback, useEffect, useMemo, useState} from 'react';
import {cancelMfa} from '../../features/authSlice';
import {useDispatch} from '../../redux/hooks';
import {useTranslator} from '../../i18n';
import {sendEmailVerificationCode} from './api';
import {computeRetryCount} from './utils';
import {MfaEmailErrorCode} from './type';
import {MfaEmailError} from './errors';

export type EmailAlert = {
  type: 'success' | 'danger';
  message: string;
};

export function useEmailCode({
  baseUrl,
  username,
  initialRetryAfter,
}: {
  baseUrl?: string;
  username: string;
  initialRetryAfter?: string;
}) {
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const [alert, setAlert] = useState<EmailAlert | null>(null);
  const [retryCount, setRetryCount] = useState(() =>
    computeRetryCount(initialRetryAfter),
  );

  useEffect(() => {
    setRetryCount(computeRetryCount(initialRetryAfter));
  }, [initialRetryAfter]);

  useEffect(() => {
    if (retryCount <= 0) return;

    const timer = setTimeout(
      () => setRetryCount(c => Math.max(0, c - 1)),
      1000,
    );

    return () => clearTimeout(timer);
  }, [retryCount]);

  const send = useCallback(async () => {
    if (!baseUrl || !username || retryCount > 0) return;

    try {
      const result = await sendEmailVerificationCode(baseUrl, username);

      if (result.emailRetryAfter) {
        setRetryCount(computeRetryCount(result.emailRetryAfter));
      }

      setAlert({
        type: 'success',
        message: result.message ?? I18n.t('Auth_MFA_EmailSent'),
      });
    } catch (e) {
      if (!(e instanceof MfaEmailError)) {
        setAlert({type: 'danger', message: I18n.t('Auth_MFA_GenericError')});
        return;
      }

      if (e.code === MfaEmailErrorCode.FORBIDDEN) {
        dispatch(cancelMfa());
        return;
      }

      if (e.code === MfaEmailErrorCode.TOO_MANY_REQUESTS && e.emailRetryAfter) {
        setRetryCount(computeRetryCount(e.emailRetryAfter));
      }

      setAlert({
        type: 'danger',
        message: e.serverMessage ?? I18n.t('Auth_MFA_GenericError'),
      });
    }
  }, [I18n, baseUrl, dispatch, retryCount, username]);

  const reset = useCallback(() => setAlert(null), []);

  return useMemo(
    () => ({retryCount, alert, send, reset}),
    [alert, reset, retryCount, send],
  );
}
