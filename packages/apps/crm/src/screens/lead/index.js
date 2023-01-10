import LeadListScreen from './LeadListScreen';
import LeadDetailsScreen from './LeadDetailsScreen';
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
};
