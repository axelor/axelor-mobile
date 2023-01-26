import {axiosApiProvider} from '@axelor/aos-mobile-core';

const partnerFields = [
  'simpleFullName',
  'name',
  'fullName',
  'partnerSeq',
  'mainAddress',
  'fixedPhone',
  'mobilePhone',
  'emailAddress',
  'emailAddress.address',
  'user',
  'industrySector',
  'partnerCategory',
  'description',
  'webSite',
  'picture',
  'isCustomer',
  'isProspect',
  'salePartnerPriceList',
  'contactPartnerSet',
  'description',
];

export async function getPartner({partnerId}) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.base.db.Partner/${partnerId}/fetch`,
    data: {
      fields: partnerFields,
    },
  });
}
