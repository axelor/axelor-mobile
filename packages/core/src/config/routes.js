/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

const routes = {
  AOS6: {
    AppBase: '/ws/rest/com.axelor.apps.base.db.AppBase',
    TraceBack: '/ws/rest/com.axelor.exception.db.TraceBack',
    AppSupplychain: '/ws/rest/com.axelor.apps.base.db.AppSupplychain',
    EmailAddress: '/ws/rest/com.axelor.apps.message.db.EmailAddress',
    AppMobileSettings: '/ws/rest/com.axelor.apps.base.db.AppMobileSettings',
  },
  AOS7: {
    AppBase: '/ws/rest/com.axelor.studio.db.AppBase',
    TraceBack: '/ws/rest/com.axelor.apps.base.db.TraceBack',
    AppSupplychain: ' /ws/rest/com.axelor.studio.db.AppSupplychain',
    EmailAddress: '/ws/rest/com.axelor.message.db.EmailAddress',
    AppMobileSettings: '/ws/rest/com.axelor.studio.db.AppMobileSettings',
  },
};

export default routes;
