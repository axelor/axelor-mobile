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

import {MfaMethod} from './type';

export const MFA_SUPPORTED_METHODS: MfaMethod[] = [
  MfaMethod.TOTP,
  MfaMethod.EMAIL,
];

export const isMfaRouteResponse = (data: any): boolean =>
  data?.route?.path === '/mfa';

export const computeRetryCount = (retryAfter?: string | null): number => {
  if (!retryAfter) return -1;
  const diff = Math.floor((new Date(retryAfter).getTime() - Date.now()) / 1000);
  return diff > 0 ? diff : 0;
};

export const getMfaDescriptionKey = (method?: MfaMethod): string => {
  switch (method) {
    case MfaMethod.TOTP:
      return 'Auth_MFA_TOTP_Description';
    case MfaMethod.EMAIL:
      return 'Auth_MFA_EMAIL_Description';
    default:
      return '';
  }
};

export const getMfaMethodLabelKey = (method: MfaMethod): string => {
  switch (method) {
    case MfaMethod.TOTP:
      return 'Auth_MFA_TOTP_Method';
    case MfaMethod.EMAIL:
      return 'Auth_MFA_EMAIL_Method';
    default:
      return '';
  }
};

export const getMfaPlaceholderKey = (method?: MfaMethod): string => {
  switch (method) {
    case MfaMethod.TOTP:
      return 'Auth_MFA_TOTP_Placeholder';
    case MfaMethod.EMAIL:
      return 'Auth_MFA_EMAIL_Placeholder';
    default:
      return 'Auth_MFA_VerificationCode';
  }
};
