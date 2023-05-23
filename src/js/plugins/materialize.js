import { isToday } from 'date-fns/esm';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';


//init select
const select = document.querySelectorAll('select');
M.FormSelect.init(select);

export function getSelectInstance(elem) {
  //получаем интсанс нашего селекта
  return M.FormSelect.getInstance(elem);
}


//Init Autocomplete
const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete, {
  data: {
    "Apple": null,
    "Microsoft": null,
    "Google": 'https://placehold.it/250x250',
  },
});

export function getAutocompleteInstance(elem) {
  //получаем интсанс автокомплита
  return M.Autocomplete.getInstance(elem);
}

//init Datepickers
const datepickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepickers, {
  showClearBtn: true,
  minDate: new Date(),
});

export function getDatePickerInstance(elem) {
  //получаем интсанс ltqngbrthf
  return M.Datepicker.getInstance(elem);
}