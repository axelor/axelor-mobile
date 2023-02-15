import ClientsListScreen from './ClientsListScreen';
import ClientDetailsScreen from './ClientDetailsScreen';
import ClientFormScreen from './ClientFormScreen';
export default {
  ClientsListScreen: {
    title: 'Crm_Clients',
    component: ClientsListScreen,
    options: {
      shadedHeader: false,
    },
  },
  ClientDetailsScreen: {
    title: 'Crm_Clients',
    component: ClientDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
  ClientFormScreen: {
    title: 'Crm_Clients',
    component: ClientFormScreen,
  },
};
