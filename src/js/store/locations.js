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
    this.countries = countries;
    this.cities = cities;

    return response;
  }

  //метод получения городов по коду страны
  getCitiesByCountryCode(code) {
    return this.cities.filter(city => city.country_code === code);
  }
}

const locations = new Locations(api);

export default locations;
