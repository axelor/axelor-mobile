import {axiosApiProvider} from '@axelor/aos-mobile-core';

export async function getBaseConfig() {
  return axiosApiProvider.get({
    url: '/ws/rest/com.axelor.apps.base.db.AppBase/',
  });
}

export async function getMobileSettings() {
  return axiosApiProvider
    .get({
      url: '/ws/rest/com.axelor.apps.base.db.AppMobileSettings/',
    })
    .then(res => {
      if (res?.data?.status !== 0) {
        return {
          data: {
            data: [
              {
                isTrackerMessageOnStockApp: true,
                isTrackerMessageOnProductionApp: true,
              },
            ],
          },
        };
      }
      return res;
    });
}
