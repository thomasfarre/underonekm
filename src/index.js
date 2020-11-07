import { fetchMap } from './searchmap';
import { myAccessToken, submitButton, input } from './config';

submitButton.addEventListener('submit', (event) => {
  event.preventDefault();
  fetchMap(input.value);
});
