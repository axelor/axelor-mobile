import axios from 'axios';

export async function fetchTranslation(language) {
  return axios
    .get(`/ws/aos/translation/${language}`)
    .then(res => res.data.translation);
}
