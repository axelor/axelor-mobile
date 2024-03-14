/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
  contactProvider,
  headerActionsProvider,
  useSelector,
  useNavigation,
  useTranslator,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {useEffect} from 'react';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchTourById} from '../features/tourSlice';

const useCatalogListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();

  const {crm: crmConfig} = useSelector((state: any) => state.appConfig);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_catalog_list', {
      actions: [
        {
          key: 'newCatalog',
          order: 10,
          iconName: 'plus-lg',
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
  const I18n = useTranslator();
  const navigation = useNavigation();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {client} = useSelector((state: any) => state.client);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_client_details', {
      model: 'com.axelor.apps.base.db.Partner',
      modelId: client?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: client?.simpleFullName,
      actions: [
        {
          key: 'client-saveContact',
          order: 10,
          iconName: 'person-fill-add',
          title: I18n.t('Crm_SaveContact'),
          onPress: () =>
            contactProvider.saveContact({
              firstName: client.simpleFullName,
              mobilePhone: client.mobilePhone,
              fixedPhone: client.fixedPhone,
              email: client.emailAddress?.address,
              address: {
                street:
                  client.mainAddress?.addressL4 ?? client.mainAddress?.fullName,
                country: client.mainAddress?.addressL7Country?.name,
                city: client.mainAddress?.city?.name,
                postCode: client.mainAddress?.zip,
              },
              notes: client.description,
            }),
          showInHeader: true,
        },
        {
          key: 'client-openEventForm',
          order: 20,
          iconName: 'calendar-plus-fill',
          title: I18n.t('Crm_CreateEvent'),
          onPress: () =>
            navigation.navigate('EventFormScreen', {client: client}),
          showInHeader: true,
        },
      ],
    });
  }, [mobileSettings, client, I18n, navigation]);
};

const useContactDetailsActions = () => {
  const I18n = useTranslator();
  const navigation = useNavigation();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {contact} = useSelector((state: any) => state.contact);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_contact_details', {
      model: 'com.axelor.apps.base.db.Partner',
      modelId: contact?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: contact?.simpleFullName,
      actions: [
        {
          key: 'contact-saveContact',
          order: 10,
          iconName: 'person-fill-add',
          title: I18n.t('Crm_SaveContact'),
          onPress: () =>
            contactProvider.saveContact({
              firstName: contact.firstName,
              lastName: contact.name,
              company: contact.mainPartner?.fullName,
              mobilePhone: contact.mobilePhone,
              fixedPhone: contact.fixedPhone,
              email: contact.emailAddress?.address,
              address: {
                street:
                  contact.mainAddress?.addressL4 ??
                  contact.mainAddress?.fullName,
                country: contact.mainAddress?.addressL7Country?.name,
                city: contact.mainAddress?.city?.name,
                postCode: contact.mainAddress?.zip,
              },
              notes: contact.description,
            }),
          showInHeader: true,
        },
        {
          key: 'contact-openEventForm',
          order: 20,
          iconName: 'calendar-plus-fill',
          title: I18n.t('Crm_CreateEvent'),
          onPress: () =>
            navigation.navigate('EventFormScreen', {contact: contact}),
          showInHeader: true,
        },
      ],
    });
  }, [mobileSettings, contact, I18n, navigation]);
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
          iconName: 'plus-lg',
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
  const I18n = useTranslator();
  const navigation = useNavigation();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {lead} = useSelector((state: any) => state.lead);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_lead_details', {
      model: 'com.axelor.apps.crm.db.Lead',
      modelId: lead?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: lead?.simpleFullName,
      actions: [
        {
          key: 'lead-saveContact',
          order: 10,
          iconName: 'person-fill-add',
          title: I18n.t('Crm_SaveContact'),
          onPress: () =>
            contactProvider.saveContact({
              firstName: lead.firstName,
              lastName: lead.name,
              company: lead.enterpriseName,
              mobilePhone: lead.mobilePhone,
              fixedPhone: lead.fixedPhone,
              email: lead.emailAddress?.address,
              address: {
                street: lead.primaryAddress,
              },
              notes: lead.description,
            }),
          showInHeader: true,
        },
        {
          key: 'lead-openEventForm',
          order: 20,
          iconName: 'calendar-plus-fill',
          title: I18n.t('Crm_CreateEvent'),
          onPress: () => navigation.navigate('EventFormScreen', {lead: lead}),
          showInHeader: true,
        },
      ],
    });
  }, [mobileSettings, lead, I18n, navigation]);
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
          iconName: 'plus-lg',
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
  const {mobileSettings} = useSelector((state: any) => state.appConfig);
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
  const navigation = useNavigation();
  const I18n = useTranslator();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {prospect} = useSelector((state: any) => state.prospect);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_prospect_details', {
      model: 'com.axelor.apps.base.db.Partner',
      modelId: prospect?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: prospect?.simpleFullName,
      actions: [
        {
          key: 'prospect-saveContact',
          order: 10,
          iconName: 'person-fill-add',
          title: I18n.t('Crm_SaveContact'),
          onPress: () =>
            contactProvider.saveContact({
              firstName: prospect.simpleFullName,
              mobilePhone: prospect.mobilePhone,
              fixedPhone: prospect.fixedPhone,
              email: prospect.emailAddress?.address,
              address: {
                street:
                  prospect.mainAddress?.addressL4 ??
                  prospect.mainAddress?.fullName,
                country: prospect.mainAddress?.addressL7Country?.name,
                city: prospect.mainAddress?.city?.name,
                postCode: prospect.mainAddress?.zip,
              },
              notes: prospect.description,
            }),
          showInHeader: true,
        },
        {
          key: 'prospect-openEventForm',
          order: 20,
          iconName: 'calendar-plus-fill',
          title: I18n.t('Crm_CreateEvent'),
          onPress: () =>
            navigation.navigate('EventFormScreen', {prospect: prospect}),
          showInHeader: true,
        },
      ],
    });
  }, [mobileSettings, prospect, I18n, navigation]);
};

const useTourDetailsActions = () => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {tour} = useSelector((state: any) => state.tour);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_tour_details', {
      model: 'com.axelor.apps.crm.db.Tour',
      modelId: tour?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: tour?.name,
      actions: [
        {
          key: 'refreshTour',
          order: 10,
          iconName: 'arrow-repeat',
          title: I18n.t('Crm_RefreshTour'),
          iconColor: Colors.primaryColor.background,
          onPress: () => {
            dispatch(
              (fetchTourById as any)({
                tourId: tour?.id,
              }),
            );
          },
          showInHeader: true,
        },
      ],
    });
  }, [
    mobileSettings,
    I18n,
    navigation,
    tour,
    Colors.primaryColor.background,
    dispatch,
  ]);
};

const useEventDetailsActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.appConfig);
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
  useTourDetailsActions();
};
