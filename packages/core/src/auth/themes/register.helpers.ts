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

import {useCallback, useEffect, useState} from 'react';
import {useTheme} from '@axelor/aos-mobile-ui';
import {useSelector} from '../../redux/hooks';
import {fetchWebThemes} from './api.helpers';

export const useThemesRegister = () => {
  const [themes, setThemes] = useState([]);
  const {addThemes} = useTheme();

  const {logged} = useSelector(state => state.auth);

  const fetchThemes = useCallback(() => {
    fetchWebThemes()
      .then(res => setThemes(res?.data?.data ?? []))
      .catch(() => setThemes([]));
  }, []);

  useEffect(() => {
    if (logged) {
      fetchThemes();
    }
  }, [fetchThemes, logged]);

  useEffect(() => {
    addThemes(themes);
  }, [addThemes, themes]);
};
