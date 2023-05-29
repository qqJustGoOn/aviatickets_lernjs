import api from '../services/apiService';


class Locations {
  constructor(api) {
    this.api = api;
    this.contries = null;
    this.cities = null;
    this.shortCitiesList = null;
    this.lastSearch = {};
    this.airline = {};
  }
  //запрашиваем города и страны у аписервиса(apiService)
  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines()
    ]);

    const [countries, cities, airlines] = response;
    //сформированный объект со странами
    this.countries = this.serializeCountries(countries);
    //сформированный объект с городами
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    this.airlines = this.serializeAirlines(airlines);

    return response;
  }

  //Получаем код города по ключу
  getCityCodeByKey(key) {
    //обеъкт с городами преобразуем в массив и найдем нужный объект города
    const city = Object.values(this.cities).find((item) => item.full_name === key);
    return city.code;
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  getAirlineNameByCode(code) {
    //Возвращаем имя если есть код (иначе пустую строку)
    return this.airline[code] ? this.airline[code].name : '';
  }

  getAirlineLogoByCode(code) {
    return this.airline[code] ? this.airline[code].logo : '';
  }

  //формирование списка для автокомплита, на входе получаем уже объект объектов
  createShortCitiesList(cities) {
    // { 'City, Country': null } - необходимый вид объекта для автокомплита
    // Object.entries => [key, value]
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.full_name] = null;
      return acc;
    }, {})
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      //создаем и указываем поле логотипа авиакомпании
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.code] = item;

      return acc;
    }, {});
  }

  serializeCountries(countriesData) {
    //Приводим массив стран к такому виду:
    // { 'Country code': {*тело страны*} }  "Country code" - ключ
    return countriesData.reduce((acc, country) => {
      //в новый объект закидываем под ключом кода страны ее объект!
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeCities(citiesData) {
    // { 'City name, Country name': {*тело города*} }
    return citiesData.reduce((acc, city) => {
      const country_name = this.countries[city.country_code].name;
      city.name = city.name || city.name_translations.en;  //если нет русского названия города, возьмет англ. интерпретацию
      const full_name = `${city.name},${country_name}`;
      acc[city.code] = {
        ...city,
        country_name,
        //нужен для автокомплита
        full_name,
      };
      return acc;
    }, {});
  }

  // Метод запроса для получения билетов по отправленным данным
  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = this.serializeTickets(response.data);
    console.log(this.lastSearch);
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map(ticket => {
      return {
        ...ticket,
        origin_name: this.getCityNameByCode(ticket.origin),
        destination_name: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirlineLogoByCode(ticket.airline),
        airline_name: this.getAirlineNameByCode(ticket.airline),
      };
    });
  }
}

const locations = new Locations(api);

export default locations;
