import axios from 'axios';
import Inventory from '../types/inventory';

const inventoryFields = [
  'id',
  'stockLocation',
  'company',
  'inventorySeq',
  'inventoryTitle',
  'createdOn',
  'updatedOn',
  'plannedStartDateT',
  'plannedEndDateT',
  'validatedOn',
  'typeSelect',
  'statusSelect',
  'product',
  'description',
  'version',
  'fromRack',
  'toRack',
];

const sortByFields = [
  'statusSelect',
  '-validatedOn',
  'plannedStartDateT',
  'inventorySeq',
];

const createSearchCriteria = searchValue => {
  const criteria = [];
  criteria.push(
    {
      fieldName: 'statusSelect',
      operator: '!=',
      value: Inventory.status.Draft,
    },
    {
      fieldName: 'statusSelect',
      operator: '!=',
      value: Inventory.status.Canceled,
    },
  );

  if (searchValue != null) {
    criteria.push({
      fieldName: 'inventorySeq',
      operator: 'like',
      value: searchValue,
    });
  }

  return criteria;
};

export async function fetchInventory({inventoryId}) {
  return axios.post(
    `/ws/rest/com.axelor.apps.stock.db.Inventory/${inventoryId}/fetch`,
    {
      fields: inventoryFields,
    },
  );
}

export async function searchInventoryFilter({searchValue, page = 0}) {
  return axios.post('/ws/rest/com.axelor.apps.stock.db.Inventory/search', {
    data: {
      criteria: [
        {
          operator: 'and',
          criteria: createSearchCriteria(searchValue),
        },
      ],
    },

    fields: inventoryFields,
    sortBy: sortByFields,
    limit: 10,
    offset: 10 * page,
  });
}

export async function modifyDescriptionInventory({
  inventoryId,
  description,
  version,
}) {
  return axios.post(
    `/ws/rest/com.axelor.apps.stock.db.Inventory/${inventoryId}`,
    {
      data: {
        id: inventoryId,
        description: description,
        version: version,
      },
    },
  );
}

export async function updateInventoryStatus({
  inventoryId,
  version,
  status,
  userId = null,
}) {
  return axios.put(
    `/ws/aos/inventory/update-status/${inventoryId}`,
    userId != null
      ? {
          version: version,
          status: status,
          userId: userId,
        }
      : {
          version: version,
          status: status,
        },
  );
}
