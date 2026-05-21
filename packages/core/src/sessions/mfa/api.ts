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

import axios from 'axios';
import {initAxiosWithHeaders} from '../../api/axios-init';
import {MfaEmailError, MfaVerifyError} from './errors';
import {isMfaRouteResponse} from './utils';
import {
  EmailCodeResponse,
  MfaEmailErrorCode,
  MfaMethod,
  MfaVerifyErrorCode,
  SessionResult,
} from './type';

const CALLBACK_PATH = 'callback';
const MFA_CLIENT_PARAM = 'client_name=MfaClient';
const EMAIL_CODE_PATH = 'ws/public/mfa/email-code/send';

export async function verifyMfaApi(
  url: string,
  {
    username,
    mfaCode,
    mfaMethod,
  }: {username: string; mfaCode: string; mfaMethod: MfaMethod},
): Promise<SessionResult> {
  let res;
  try {
    res = await axios.post(`${url}${CALLBACK_PATH}?${MFA_CLIENT_PARAM}`, {
      username,
      mfaCode,
      mfaMethod,
    });
  } catch (e: any) {
    if (e?.response?.status === 401)
      throw new MfaVerifyError(MfaVerifyErrorCode.INVALID_CODE);
    if (e?.response?.status === 403)
      throw new MfaVerifyError(MfaVerifyErrorCode.SESSION_LOST);
    throw e;
  }

  if (res.headers['x-csrf-token'] == null || isMfaRouteResponse(res.data)) {
    throw new MfaVerifyError(MfaVerifyErrorCode.INVALID_CODE);
  }

  return {kind: 'session', ...initAxiosWithHeaders(res, url)};
}

export async function sendEmailVerificationCode(
  url: string,
  username: string,
): Promise<EmailCodeResponse> {
  try {
    const res = await axios.post(`${url}${EMAIL_CODE_PATH}`, {username});
    return (res.data ?? {}) as EmailCodeResponse;
  } catch (e: any) {
    const status = e?.response?.status;
    const data = (e?.response?.data ?? {}) as EmailCodeResponse;

    if (status === 429) {
      throw new MfaEmailError(MfaEmailErrorCode.TOO_MANY_REQUESTS, {
        emailRetryAfter: data.emailRetryAfter,
        serverMessage: data.message,
      });
    }

    if (status === 403) {
      throw new MfaEmailError(MfaEmailErrorCode.FORBIDDEN, {
        serverMessage: data.message,
      });
    }

    throw new MfaEmailError(MfaEmailErrorCode.FAILED, {
      serverMessage: data.message,
    });
  }
}
