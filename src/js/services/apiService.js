import axios from 'axios';
import config from '../config/apiConfig';

//countries - array of countries
//cities - array of cities
//prices/cheap - array

//Класс с набором методов для взаимодействия с нашим сервером
class Api {
  constructor(config) {
    this.url = config.url;
  }
//методы запросов на сервер
  async countries() {
    try {
      const response = await axios.get(`${this.url}/countries`);
      return response.data;
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async cities() {
    try {
      const response = await axios.get(`${this.url}/cities`);
      return response.data;
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async airlines() {
    try {
      const response = await axios.get(`${this.url}/airlines`);
      return response.data;
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async prices(params) {
    try {
      const response = await axios.get(`${this.url}/prices/cheap`, {
        params,
      });
      return response.data;
    } catch(err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}


const api = new Api(config);

export default api;