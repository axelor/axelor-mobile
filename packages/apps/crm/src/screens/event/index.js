import EventPlanningScreen from './EventPlanningScreen';
import EventDetailsScreen from './EventDetailsScreen';
export default {
  EventPlanningScreen: {
    title: 'Crm_Events',
    component: EventPlanningScreen,
    options: {
      shadedHeader: false,
    },
  },
  EventDetailsScreen: {
    title: 'Crm_Event',
    component: EventDetailsScreen,
    options: {
      shadedHeader: false,
    },
  },
};
