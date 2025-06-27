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

import axios from 'axios';
import {useEffect, useState} from 'react';
import {MaintenanceError} from '@axelor/aos-mobile-error';
import {useTranslator} from '../i18n';
import {showToastMessage} from '../utils';

let maintenanceCallback: (() => void) | null = null;

export function registerMaintenanceCallback(cb: () => void) {
  maintenanceCallback = cb;
}

export function clearMaintenanceState() {
  maintenanceCallback?.();
}

export function installMaintenanceInterceptor() {
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error?.response?.status === 503) {
        maintenanceCallback?.();
      }
      return Promise.reject(error);
    },
  );
}

export function MaintenanceTrigger() {
  const I18n = useTranslator();

  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    registerMaintenanceCallback(() => {
      showToastMessage({
        position: 'bottom',
        type: 'error',
        text1: I18n.t('Base_Error'),
        text2: I18n.t('Base_ServerMainteance'),
      });
      setMaintenance(true);
    });
  }, [I18n]);

  if (maintenance) {
    throw new MaintenanceError();
  }

  return null;
}
