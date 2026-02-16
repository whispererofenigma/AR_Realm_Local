import { combineReducers } from '@reduxjs/toolkit';
import arModelsReducer from './ARModels';

const rootReducer = combineReducers({
  arModels: arModelsReducer,
  // Add User, Auth, etc. slices here later
});

export default rootReducer;