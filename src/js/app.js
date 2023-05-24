import '../css/style.css';
import './plugins'; //при укказании просто папки будет браться index.js файл
import locations from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency';

//Инитим После загрузки ДОМа
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUI.form;

//Events
form.addEventListener('submit', (e) => {
  e.preventDefault();
  onFormSumbit();
})

//Handlers
  async function initApp() {
    //ожидание инициализациии locations, получение(загрузка) данных
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList)
  }

  //async - птму что будем делать Запрос на получение билетов
  async function onFormSumbit() {
    //собрать данные из полей формы, инпутов
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    //названия с нижним подчеркиванием, птму что под таким же ключом нужно отправлять их в объекте для запроса
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    //CODE, CODE, 2023-04-21, 2023-05-23 - в такой формат данные
    //Метод запроса на сервер
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    })
  }
})
