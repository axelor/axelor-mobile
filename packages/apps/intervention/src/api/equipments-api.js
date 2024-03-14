import {createStandardSearch} from '@axelor/aos-mobile-core';

export async function searchEquipments({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.intervention.db.Equipment',
    criteria: [],
    fieldKey: 'intervention_equipment',
    sortKey: 'intervention_equipment',
    page,
  });
}
