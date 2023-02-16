import OpportunityDetailsScreen from './OpportunityDetailsScreen';
import OpportunityListScreen from './OpportunityListScreen';
import OpportunityFormScreen from './OpportunityFormScreen';

export default {
  OpportunityListScreen: {
    title: 'Crm_Opportunities',
    component: OpportunityListScreen,
    options: {
      shadedHeader: false,
    },
  },
  OpportunityDetailsScreen: {
    title: 'Crm_Opportunity',
    component: OpportunityDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  OpportunityFormScreen: {
    title: 'Crm_Opportunity',
    component: OpportunityFormScreen,
  },
};
