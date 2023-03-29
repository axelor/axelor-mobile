import {headerActionsProvider, useSelector} from '@axelor/aos-mobile-core';
import {useEffect} from 'react';

const useClientDetailsActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.config);
  const {client} = useSelector((state: any) => state.client);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_client_details', {
      model: 'com.axelor.apps.base.db.Partner',
      modelId: client?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageOnCrmApp,
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
      disableMailMessages: !mobileSettings?.isTrackerMessageOnCrmApp,
      attachedFileScreenTitle: contact?.simpleFullName,
    });
  }, [mobileSettings, contact]);
};

const useLeadDetailsActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.config);
  const {lead} = useSelector((state: any) => state.lead);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_lead_details', {
      model: 'com.axelor.apps.crm.db.Lead',
      modelId: lead?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageOnCrmApp,
      attachedFileScreenTitle: lead?.simpleFullName,
    });
  }, [mobileSettings, lead]);
};

const useOpportunityDetailsActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.config);
  const {opportunity} = useSelector((state: any) => state.opportunity);

  useEffect(() => {
    headerActionsProvider.registerModel('crm_opportunity_details', {
      model: 'com.axelor.apps.crm.db.Opportunity',
      modelId: opportunity?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageOnCrmApp,
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
      disableMailMessages: !mobileSettings?.isTrackerMessageOnCrmApp,
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
      disableMailMessages: !mobileSettings?.isTrackerMessageOnCrmApp,
    });
  }, [mobileSettings, event]);
};

export const useCRMHeaders = () => {
  useClientDetailsActions();
  useContactDetailsActions();
  useEventDetailsActions();
  useLeadDetailsActions();
  useOpportunityDetailsActions();
  useProspectDetailsActions();
};
