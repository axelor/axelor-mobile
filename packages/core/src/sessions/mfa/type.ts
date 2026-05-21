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

export enum MfaMethod {
  TOTP = 'TOTP',
  EMAIL = 'EMAIL',
  RECOVERY = 'RECOVERY',
}

export enum MfaVerifyErrorCode {
  INVALID_CODE = 'MFA_INVALID_CODE',
  SESSION_LOST = 'MFA_SESSION_LOST',
}

export enum MfaEmailErrorCode {
  TOO_MANY_REQUESTS = 'MFA_EMAIL_TOO_MANY_REQUESTS',
  FORBIDDEN = 'MFA_EMAIL_FORBIDDEN',
  FAILED = 'MFA_EMAIL_FAILED',
}

export interface MfaChallenge {
  methods: MfaMethod[];
  username: string;
  emailRetryAfter?: string;
}

export interface SessionResult {
  kind: 'session';
  token: string;
  jsessionId: string | undefined;
  requestInterceptorId: number;
  responseInterceptorId: number;
}

export interface MfaResult extends MfaChallenge {
  kind: 'mfa';
}

export type LoginResult = SessionResult | MfaResult;

export interface EmailCodeResponse {
  message?: string;
  emailRetryAfter?: string;
}
