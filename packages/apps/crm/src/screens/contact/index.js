import ContactListScreen from './ContactListScreen';
import ContactDetailsScreen from './ContactDetailsScreen';
import ContactFormScreen from './ContactFormScreen';

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
  ContactFormScreen: {
    title: 'Crm_Contact',
    component: ContactFormScreen,
    options: {
      shadedHeader: false,
    },
  },
};
