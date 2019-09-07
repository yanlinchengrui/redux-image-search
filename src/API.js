import Axios from 'axios';

const API_KEY = 'PIXABAY-API-KEY-HERE';

export default {
  search(searchTerm, page = 1) {
    const URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(searchTerm) + "&page=" + page;
    return Axios.get(URL)
      .then(result => {
        return result.data.hits;
      });
  }
}