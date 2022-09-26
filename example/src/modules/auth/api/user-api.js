import {axiosApiProvider} from '@aos-mobile/core';

export async function getLoggedUser(userId) {
  return axiosApiProvider.get({
    url: `/ws/rest/com.axelor.auth.db.User/${userId}`,
  });
}

export async function postUser(user) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.auth.db.User',
    data: {data: user},
  });
}
