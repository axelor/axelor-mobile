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

import {useEffect} from 'react';
import {
  contactProvider,
  headerActionsProvider,
  useSelector,
  useNavigation,
  useTranslator,
  useDispatch,
  usePermitted,
} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {fetchTourById} from '../features/tourSlice';

const useCatalogListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.crm.db.Catalog',
  });

  const {crm: crmConfig} = useSelector((state: any) => state.appConfig);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_catalog_list', {
      model: 'com.axelor.apps.crm.db.Catalog',
      actions: [
        {
          key: 'newCatalog',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Crm_NewCatalog'),
          iconColor: Colors.primaryColor.background,
          hideIf: !crmConfig?.isManageCatalogs || !canCreate,
          onPress: () => navigation.navigate('CatalogFormScreen', {}),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, navigation, crmConfig, canCreate]);
};

const useClientListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.base.db.Partner',
  });

  useEffect(() => {
    headerActionsProvider.registerModel('crm_client_list', {
      model: 'com.axelor.apps.base.db.Partner',
      options: {core_modelFilters: {name: 'partner-filters'}},
      actions: [
        {
          key: 'client-creationForm',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Crm_CreateClient'),
          iconColor: Colors.primaryColor.background,
          hideIf: !canCreate,
          onPress: () => navigation.navigate('ClientFormScreen'),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, canCreate, navigation]);
};

const useClientDetailsActions = () => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {canCreate} = usePermitted({modelName: 'com.axelor.apps.crm.db.Event'});

  const {client} = useSelector((state: any) => state.client);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_client_details', {
      model: 'com.axelor.apps.base.db.Partner',
      modelId: client?.id,
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
                  client.mainAddress?.streetName ??
                  client.mainAddress?.fullName,
                country: client.mainAddress?.country?.name,
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
          hideIf: !canCreate,
          onPress: () =>
            navigation.navigate('EventFormScreen', {client: client}),
          showInHeader: true,
        },
      ],
    });
  }, [client, I18n, navigation, canCreate]);
};
const useContactListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.base.db.Partner',
  });

  useEffect(() => {
    headerActionsProvider.registerModel('crm_contact_list', {
      model: 'com.axelor.apps.base.db.Partner',
      options: {core_modelFilters: {name: 'contact-filters'}},
      actions: [
        {
          key: 'contact-creationForm',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Crm_CreateContact'),
          iconColor: Colors.primaryColor.background,
          hideIf: !canCreate,
          onPress: () => navigation.navigate('ContactFormScreen'),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, canCreate, navigation]);
};

const useContactDetailsActions = () => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {canCreate} = usePermitted({modelName: 'com.axelor.apps.crm.db.Event'});

  const {contact} = useSelector((state: any) => state.contact);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_contact_details', {
      model: 'com.axelor.apps.base.db.Partner',
      modelId: contact?.id,
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
                  contact.mainAddress?.streetName ??
                  contact.mainAddress?.fullName,
                country: contact.mainAddress?.country?.name,
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
          hideIf: !canCreate,
          onPress: () =>
            navigation.navigate('EventFormScreen', {contact: contact}),
          showInHeader: true,
        },
      ],
    });
  }, [contact, I18n, navigation, canCreate]);
};

const useLeadListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();
  const {canCreate} = usePermitted({modelName: 'com.axelor.apps.crm.db.Lead'});

  useEffect(() => {
    headerActionsProvider.registerModel('crm_lead_list', {
      model: 'com.axelor.apps.crm.db.Lead',
      actions: [
        {
          key: 'newLead',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Crm_NewLead'),
          iconColor: Colors.primaryColor.background,
          hideIf: !canCreate,
          onPress: () => navigation.navigate('LeadFormScreen', {}),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, canCreate, navigation]);
};

const useLeadDetailsActions = () => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const {canCreate} = usePermitted({modelName: 'com.axelor.apps.crm.db.Event'});

  const {lead} = useSelector((state: any) => state.lead);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_lead_details', {
      model: 'com.axelor.apps.crm.db.Lead',
      modelId: lead?.id,
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
                street: lead.address?.fullName,
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
          hideIf: !canCreate,
          onPress: () => navigation.navigate('EventFormScreen', {lead: lead}),
          showInHeader: true,
        },
      ],
    });
  }, [lead, I18n, navigation, canCreate]);
};

const useOpportunityListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.crm.db.Opportunity',
  });

  useEffect(() => {
    headerActionsProvider.registerModel('crm_opportunity_list', {
      model: 'com.axelor.apps.crm.db.Opportunity',
      actions: [
        {
          key: 'newOpportunity',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Crm_NewOpportunity'),
          iconColor: Colors.primaryColor.background,
          hideIf: !canCreate,
          onPress: () => navigation.navigate('OpportunityFormScreen', {}),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, canCreate, navigation]);
};

const useOpportunityDetailsActions = () => {
  const {opportunity} = useSelector((state: any) => state.opportunity);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_opportunity_details', {
      model: 'com.axelor.apps.crm.db.Opportunity',
      modelId: opportunity?.id,
    });
  }, [opportunity]);
};

const useProspectListActions = () => {
  const Colors = useThemeColor();
  const navigation = useNavigation();
  const I18n = useTranslator();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.base.db.Partner',
  });

  useEffect(() => {
    headerActionsProvider.registerModel('crm_prospect_list', {
      model: 'com.axelor.apps.base.db.Partner',
      options: {core_modelFilters: {name: 'partner-filters'}},
      actions: [
        {
          key: 'prospect-creationForm',
          order: 10,
          iconName: 'plus-lg',
          title: I18n.t('Crm_CreateProspect'),
          iconColor: Colors.primaryColor.background,
          hideIf: !canCreate,
          onPress: () => navigation.navigate('ProspectFormScreen'),
          showInHeader: true,
        },
      ],
    });
  }, [Colors, I18n, canCreate, navigation]);
};

const useProspectDetailsActions = () => {
  const navigation = useNavigation();
  const I18n = useTranslator();
  const {canCreate} = usePermitted({modelName: 'com.axelor.apps.crm.db.Event'});

  const {prospect} = useSelector((state: any) => state.prospect);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_prospect_details', {
      model: 'com.axelor.apps.base.db.Partner',
      modelId: prospect?.id,
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
                  prospect.mainAddress?.streetName ??
                  prospect.mainAddress?.fullName,
                country: prospect.mainAddress?.country?.name,
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
          hideIf: !canCreate,
          onPress: () =>
            navigation.navigate('EventFormScreen', {prospect: prospect}),
          showInHeader: true,
        },
      ],
    });
  }, [prospect, I18n, navigation, canCreate]);
};

const useTourListActions = () => {
  useEffect(() => {
    headerActionsProvider.registerModel('crm_tour_list', {
      model: 'com.axelor.apps.crm.db.Tour',
    });
  }, []);
};

const useTourDetailsActions = () => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {tour} = useSelector((state: any) => state.tour);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_tour_details', {
      model: 'com.axelor.apps.crm.db.Tour',
      modelId: tour?.id,
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
  }, [I18n, navigation, tour, Colors.primaryColor.background, dispatch]);
};

const useEventDetailsActions = () => {
  const {event} = useSelector((state: any) => state.event);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_event_details', {
      model: 'com.axelor.apps.crm.db.Event',
      modelId: event?.id,
    });
  }, [event]);
};

export const useCRMHeaders = () => {
  useCatalogListActions();
  useClientListActions();
  useClientDetailsActions();
  useContactListActions();
  useContactDetailsActions();
  useEventDetailsActions();
  useLeadListActions();
  useLeadDetailsActions();
  useOpportunityListActions();
  useOpportunityDetailsActions();
  useProspectListActions();
  useProspectDetailsActions();
  useTourListActions();
  useTourDetailsActions();
};
