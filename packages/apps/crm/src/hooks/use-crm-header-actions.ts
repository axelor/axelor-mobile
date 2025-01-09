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

import {
  headerActionsProvider,
  useSelector,
  useNavigation,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {useEffect} from 'react';
import {useThemeColor} from '@axelor/aos-mobile-ui';

const useCatalogListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();

  const {crmConfig} = useSelector((state: any) => state.crmConfig);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_catalog_list', {
      actions: [
        {
          key: 'newCatalog',
          order: 10,
          iconName: 'plus',
          title: I18n.t('Crm_NewCatalog'),
          iconColor: Colors.primaryColor.background,
          hideIf: !crmConfig?.isManageCatalogs,
          onPress: () => navigation.navigate('CatalogFormScreen', {}),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, navigation, crmConfig]);
};

const useClientDetailsActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.config);
  const {client} = useSelector((state: any) => state.client);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_client_details', {
      model: 'com.axelor.apps.base.db.Partner',
      modelId: client?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: client?.simpleFullName,
    });
  }, [mobileSettings, client]);
};

const useContactDetailsActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.config);
  const {contact} = useSelector((state: any) => state.contact);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_contact_details', {
      model: 'com.axelor.apps.base.db.Partner',
      modelId: contact?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: contact?.simpleFullName,
    });
  }, [mobileSettings, contact]);
};

const useLeadListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();

  useEffect(() => {
    headerActionsProvider.registerModel('crm_lead_list', {
      actions: [
        {
          key: 'newLead',
          order: 10,
          iconName: 'plus',
          title: I18n.t('Crm_NewLead'),
          iconColor: Colors.primaryColor.background,
          onPress: () => navigation.navigate('LeadFormScreen', {}),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, navigation]);
};

const useLeadDetailsActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.config);
  const {lead} = useSelector((state: any) => state.lead);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_lead_details', {
      model: 'com.axelor.apps.crm.db.Lead',
      modelId: lead?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: lead?.simpleFullName,
    });
  }, [mobileSettings, lead]);
};

const useOpportunityListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();

  useEffect(() => {
    headerActionsProvider.registerModel('crm_opportunity_list', {
      actions: [
        {
          key: 'newOpportunity',
          order: 10,
          iconName: 'plus',
          title: I18n.t('Crm_NewOpportunity'),
          iconColor: Colors.primaryColor.background,
          onPress: () => navigation.navigate('OpportunityFormScreen', {}),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, navigation]);
};

const useOpportunityDetailsActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.config);
  const {opportunity} = useSelector((state: any) => state.opportunity);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_opportunity_details', {
      model: 'com.axelor.apps.crm.db.Opportunity',
      modelId: opportunity?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: opportunity?.name,
    });
  }, [mobileSettings, opportunity]);
};

const useProspectDetailsActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.config);
  const {prospect} = useSelector((state: any) => state.prospect);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_prospect_details', {
      model: 'com.axelor.apps.base.db.Partner',
      modelId: prospect?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: prospect?.simpleFullName,
    });
  }, [mobileSettings, prospect]);
};

const useEventDetailsActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.config);
  const {event} = useSelector((state: any) => state.event);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_event_details', {
      model: 'com.axelor.apps.crm.db.Event',
      modelId: event?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
    });
  }, [mobileSettings, event]);
};

export const useCRMHeaders = () => {
  useCatalogListActions();
  useClientDetailsActions();
  useContactDetailsActions();
  useEventDetailsActions();
  useLeadListActions();
  useLeadDetailsActions();
  useOpportunityListActions();
  useOpportunityDetailsActions();
  useProspectDetailsActions();
};
