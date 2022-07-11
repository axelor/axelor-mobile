import axios from 'axios';

export async function fetchTranslation(language) {
  return axios
    .get(`/ws/aos/translation/${language}`)
    .catch(function (error) {
      console.log('ERROR : Failed to fetch translations from webapp');
      return;
    })
    .then(res => res?.data?.translation);
}
