import {
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createExpenseLinesCriteria = (searchValue, userId) => {
  const criteria = [getSearchCriterias('hr_expenseLines', searchValue)];
  if (userId != null) {
    criteria.push({
      operator: 'and',
      criteria: [
        {
          fieldName: 'employee.user.id',
          operator: '=',
          value: userId,
        },
        {
          fieldName: 'expense',
          operator: 'isNull',
        },
      ],
    });
  }
  return criteria;
};

export async function searchExpenseLines({
  searchValue = null,
  userId,
  page = 0,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.hr.db.ExpenseLine',
    criteria: createExpenseLinesCriteria(searchValue, userId),
    fieldKey: 'hr_expenseLines',
    sortKey: 'hr_expenseLines',
    page,
  });
}
