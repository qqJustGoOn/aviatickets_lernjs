//import api from './services/apiService';

// api.countries().then(res => console.log(res));
// api.cities().then(res => console.log(res));
import '../css/style.css';
import './plugins'; //при укказании просто папки будет браться index.js файл
import locations from './store/locations';

locations.init().then(res => {
  console.log(res);
  console.log(locations);
  console.log(locations.getCitiesByCountryCode('PE'));
});
