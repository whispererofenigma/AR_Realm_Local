import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from '../reducer'; // Points to your App/Redux/reducer/index.js

// Redux Persist Configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Whitelist slices you want to survive app restarts. 
  // Let's persist arModels so the app remembers their last spawned object!
  whitelist: ['arModels'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disabling serializableCheck is required when using Redux Persist
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);