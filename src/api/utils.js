export const getApiResponseData = response => response.data.data;

export const getFirstData = data => {
  if (data instanceof Array) {
    return data[0];
  }
};
