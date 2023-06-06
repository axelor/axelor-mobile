import {
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createLeadCriteria = (searchValue, userId) => {
  return [
    {
      fieldName: 'assignedToUser.id',
      operator: '=',
      value: userId,
    },
    getSearchCriterias('helpdesk_ticket', searchValue),
  ];
};

export async function searchTickets({searchValue, userId, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.helpdesk.db.Ticket',
    criteria: createLeadCriteria(searchValue, userId),
    fieldKey: 'helpdesk_ticket',
    sortKey: 'helpdesk_ticket',
    page,
  });
}
