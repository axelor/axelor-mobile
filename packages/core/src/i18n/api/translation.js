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

export async function fetchTranslation(language) {
  return axios
    .get(`/ws/aos/translation/${language}`)
    .catch(error => {
      console.warn('ERROR : Failed to fetch translations from webapp');
      if (error) {
        console.log({error});
      }
      return;
    })
    .then(res => res?.data?.translation);
}

export async function postTranslations({language, translations}) {
  return axios.post(`/ws/aos/translation/${language}`, translations);
}
