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

import {Module} from '@axelor/aos-mobile-core';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import MessageScreens from './screens';
import * as messageReducers from './features';
import {useMessageHeaders} from './hooks/use-message-header-actions';

export const MessageModule: Module = {
  name: 'app-message',
  title: 'Message_Message',
  subtitle: 'Message_Message',
  icon: 'bell-fill',
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  screens: {
    ...MessageScreens,
  },
  reducers: {
    ...messageReducers,
  },
  models: {
    headerRegisters: useMessageHeaders,
  },
};

export * from './api';
export * from './components';
export * from './features/asyncFunctions-index';
export * from './screens';
export * from './types';
export * from './utils';
