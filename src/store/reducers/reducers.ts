import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';
import potagerReducer from './potager';
import productsReducer from './products';
import tutorielsReducer from './tutoriels';
import myGardenReducer from './mygarden';
import meteoReducer from './meteo';
import virtualGardenReducer from './virtualGardenReducer';

const rootReducer = combineReducers({
  user: userReducer,
  potager: potagerReducer,
  products: productsReducer,
  tutoriels: tutorielsReducer,
  myGarden: myGardenReducer,
  meteo: meteoReducer,
  virtualGarden: virtualGardenReducer,
});

export default rootReducer;
