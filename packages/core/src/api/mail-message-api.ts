import {axiosApiProvider} from '../axios/AxiosApi';

interface fetchMailMessageProps {
  model: string;
  modelId: number;
  limit?: number;
  page?: number;
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
