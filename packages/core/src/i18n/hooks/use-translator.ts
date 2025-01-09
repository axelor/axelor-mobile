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

import {useMemo} from 'react';
import {i18nProvider} from '../i18n';

export interface TranslatorProps {
  t: (key: string, values?: any) => string;
}

function useTranslator(): TranslatorProps {
  return useMemo(
    () => ({t: i18nProvider?.i18n ? i18nProvider.i18n.t : value => value}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18nProvider.i18n.language],
  );
}

export default useTranslator;
