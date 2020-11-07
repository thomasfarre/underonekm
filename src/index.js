import { fetchMap } from './js/searchmap';
import { myAccessToken, submitButton, input } from './js/config';

submitButton.addEventListener('submit', (event) => {
  event.preventDefault();
  fetchMap(input.value);
});
