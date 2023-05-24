import api from '../services/apiService';


class Locations {
  constructor(api) {
    this.api = api;
    this.contries = null;
    this.cities = null;
  }
  //запрашиваем города и страны у аписервиса(apiService)
  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities()
    ]);

    const [countries, cities] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);

    return response;
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
      const country_name = this.getCountryNameByCode(city.country_code);
      const city_name = city.name || city.name_translations.en; //если нет русского названия города, возьмет англ. интерпретацию
      const key = `${city_name}, ${country_name}`;
      acc[key] = city;
      return acc;
    }, {});
  }

  getCountryNameByCode(countryCode) {
   // { 'Country code': {*тело страны*} }
    return this.countries[countryCode].name;
  }

  //метод получения городов по коду страны
  getCitiesByCountryCode(code) {
    return this.cities.filter(city => city.country_code === code);
  }
}

const locations = new Locations(api);

export default locations;


// { 'City, Country': null } - вид объекта для автокомплита