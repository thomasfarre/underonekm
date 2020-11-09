import mapboxgl from 'mapbox-gl';
import { myAccessToken } from './config';

const results = document.querySelector(".exemple");
mapboxgl.accessToken = myAccessToken;

const searchMap = (data) => {
  const result = data.features[0];
  const [latitude, longitude] = result.center;
  mapboxgl.accessToken = `${myAccessToken}`;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [latitude, longitude],
    zoom: 12
  });
  map.on("load", (a) => {
    map.addSource("source_circle_500", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [{
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [latitude, longitude]
          }
        }]
      }
    });
    map.addLayer({
      id: "circle500",
      type: "circle",
      source: "source_circle_500",
      paint: {
        "circle-radius": {
          stops: [
            [5, 1],
            [15, 650]
          ],
          base: 2
        },
        "circle-color": "lightblue",
        "circle-opacity": 0.6
      }
    });
  });
};

const fetchMap = (adress) => {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=${myAccessToken}`)
    .then(response => response.json())
    .then(searchMap);
};

export {
  fetchMap
};
