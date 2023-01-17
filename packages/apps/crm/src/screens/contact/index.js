import ContactListScreen from './ContactListScreen';
import ContactDetailsScreen from './ContactDetailsScreen';

export default {
  ContactListScreen: {
    title: 'Crm_Contacts',
    component: ContactListScreen,
    options: {
      shadedHeader: false,
    },
  },
  ContactDetailsScreen: {
    title: 'Crm_Contact',
    component: ContactDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
};
