type Method = 'put' | 'post';

export type ActionRequest = {
  url: string;
  method: Method;
  body: any;
  description: string;
};
