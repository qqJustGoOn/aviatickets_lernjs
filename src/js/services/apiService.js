import axios from 'axios';
import config from '../config/apiConfig';

//Класс с набором методов для взаимодействия с нашим сервером
class Api {
  constructor(config) {
    this.url = config.url;
  }
  
}


const api = new Api(config);

export default api;