import {axiosApiProvider} from '../axios/AxiosApi';

interface fetchMailMessageProps {
  model: string;
  modelId: number;
  limit?: number;
  page?: number;
}

interface postMailMessageCommentProps {
  model: string;
  modelId: number;
  comment: string;
}

export async function fetchMailMessages({
  model,
  modelId,
  limit = 10,
  page,
}: fetchMailMessageProps) {
  return axiosApiProvider.get({
    url: `/ws/rest/com.axelor.mail.db.MailMessage/messages?relatedId=${modelId}&relatedModel=${model}&limit=${limit}&offset=${
      limit * page
    }`,
  });
}

export async function postMailMessageComment({
  model,
  modelId,
  comment,
}: postMailMessageCommentProps) {
  return axiosApiProvider.post({
    url: `/ws/rest/${model}/${modelId}/message`,
    data: {
      data: {
        body: `${comment}`,
        type: 'comment',
        files: [],
      },
    },
  });
}

export async function fetchModelSubscribers({
  model,
  modelId,
}: {
  model: string;
  modelId: number;
}) {
  return axiosApiProvider.get({url: `/ws/rest/${model}/${modelId}/followers`});
}

export async function subscribeRequest({
  model,
  modelId,
}: {
  model: string;
  modelId: number;
}) {
  return axiosApiProvider.post({
    url: `/ws/rest/${model}/${modelId}/follow`,
    data: {},
  });
}

export async function unsubscribeRequest({
  model,
  modelId,
}: {
  model: string;
  modelId: number;
}) {
  return axiosApiProvider.post({
    url: `/ws/rest/${model}/${modelId}/unfollow`,
    data: {},
  });
}

export async function countUnreadMessages({
  model,
  modelId,
}: {
  model: string;
  modelId: number;
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.mail.db.MailMessage/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: [
              {fieldName: 'relatedModel', operator: '=', value: model},
              {fieldName: 'relatedId', operator: '=', value: modelId},
              {fieldName: 'flags.isRead', operator: '=', value: false},
            ],
          },
        ],
      },
      fields: ['id'],
    },
  });
}

export async function getAllUnReadFlagsOfMailMessage({
  model,
  modelId,
}: {
  model: string;
  modelId: number;
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.mail.db.MailFlags/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: [
              {fieldName: 'message.relatedModel', operator: '=', value: model},
              {fieldName: 'message.relatedId', operator: '=', value: modelId},
              {fieldName: 'isRead', operator: '=', value: false},
            ],
          },
        ],
      },
      limit: null,
      offset: 0,
    },
  });
}

export async function realAllMailMessages({
  model,
  modelId,
}: {
  model: string;
  modelId: number;
}) {
  return getAllUnReadFlagsOfMailMessage({model, modelId}).then(res => {
    const mailFlagList = res?.data?.data;
    return readMailMessage({mailFlagList, model, modelId});
  });
}

export async function readMailMessage({
  mailFlagList,
  model,
  modelId,
}: {
  mailFlagList: any[];
  model: string;
  modelId: number;
}) {
  if (mailFlagList == null || mailFlagList?.length === 0) {
    return null;
  }

  const criteria = mailFlagList.map(item => {
    return {id: item.id, isRead: true, version: item.version};
  });

  return axiosApiProvider
    .post({
      url: '/ws/rest/com.axelor.mail.db.MailFlags/',
      data: {
        records: criteria,
      },
    })
    .then(() => countUnreadMessages({model, modelId}));
}
