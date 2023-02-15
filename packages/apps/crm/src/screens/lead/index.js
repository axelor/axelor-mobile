import LeadListScreen from './LeadListScreen';
import LeadDetailsScreen from './LeadDetailsScreen';
import LeadFormScreen from './LeadFormScreen';
export default {
  LeadListScreen: {
    title: 'Crm_Leads',
    component: LeadListScreen,
    options: {
      shadedHeader: false,
    },
  },
  LeadDetailsScreen: {
    title: 'Crm_Lead',
    component: LeadDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  LeadFormScreen: {
    title: 'Crm_Lead',
    component: LeadFormScreen,
  },
};
