import axios from 'axios';

export async function fetchTranslation(language) {
  return axios
    .get(`/ws/aos/translation/${language}`)
    .catch(error => {
      console.warn('ERROR : Failed to fetch translations from webapp');
      if (error) {
        console.log({error});
      }
      return;
    })
    .then(res => res?.data?.translation);
}

export async function postTranslations(language, translations) {
  return axios
    .post(`/ws/aos/translation/${language}`, translations)
    .then(res => {
      return res?.data?.messageStatus;
    });
}
