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

const routes = {
  AOS6: {
    App: '/ws/rest/com.axelor.apps.base.db.App',
    AppBase: '/ws/rest/com.axelor.apps.base.db.AppBase',
    AppCrm: '/ws/rest/com.axelor.apps.base.db.AppCrm',
    AppExpense: '/ws/rest/com.axelor.apps.base.db.AppExpense',
    AppHelpdesk: '/ws/rest/com.axelor.apps.base.db.AppHelpdesk',
    AppStock: '/ws/rest/com.axelor.apps.base.db.AppStock',
    AppSupplychain: '/ws/rest/com.axelor.apps.base.db.AppSupplychain',
    AppTimesheet: '/ws/rest/com.axelor.apps.base.db.AppTimesheet',
    AppMobileSettings: '/ws/rest/com.axelor.apps.base.db.AppMobileSettings',
    AppProduction: '/ws/rest/com.axelor.apps.base.db.AppProduction',
    AppSale: '/ws/rest/com.axelor.apps.base.db.AppSale',
    AppProject: '/ws/rest/com.axelor.apps.base.db.AppProject',
    AppPurchase: '/ws/rest/com.axelor.apps.base.db.AppPurchase',
    TraceBack: '/ws/rest/com.axelor.exception.db.TraceBack',
    EmailAddress: '/ws/rest/com.axelor.apps.message.db.EmailAddress',
    MailMessages: '/ws/rest/com.axelor.mail.db.MailMessage/messages',
  },
  AOS7: {
    App: '/ws/rest/com.axelor.studio.db.App',
    AppBase: '/ws/rest/com.axelor.studio.db.AppBase',
    AppCrm: '/ws/rest/com.axelor.studio.db.AppCrm',
    AppExpense: '/ws/rest/com.axelor.studio.db.AppExpense',
    AppHelpdesk: '/ws/rest/com.axelor.studio.db.AppHelpdesk',
    AppStock: '/ws/rest/com.axelor.studio.db.AppStock',
    AppSupplychain: '/ws/rest/com.axelor.studio.db.AppSupplychain',
    AppTimesheet: '/ws/rest/com.axelor.studio.db.AppTimesheet',
    AppMobileSettings: '/ws/aos/mobilesettings',
    AppProduction: 'ws/rest/com.axelor.studio.db.AppProduction',
    AppSale: 'ws/rest/com.axelor.studio.db.AppSale',
    AppProject: '/ws/rest/com.axelor.studio.db.AppProject',
    AppPurchase: 'ws/rest/com.axelor.studio.db.AppPurchase',
    TraceBack: '/ws/rest/com.axelor.apps.base.db.TraceBack',
    EmailAddress: '/ws/rest/com.axelor.message.db.EmailAddress',
    MailMessages: '/ws/messages',
  },
};

export default routes;
