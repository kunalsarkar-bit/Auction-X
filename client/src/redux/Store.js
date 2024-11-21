import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Define the persist configuration
const persistConfig = {
  key: "root",
  storage,
  // Optionally whitelist slices you want to persist
  whitelist: ["Auth"], // Adjust as needed based on your slices
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, AuthSlice);

// Configure the Redux store
export const store = configureStore({
  reducer: {
    Auth: persistedReducer, // Use the persisted reducer under its slice name
  },
  // You can disable the serializable check globally, but it's not recommended unless necessary
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serialization checks
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Allow non-serializable values during persistence
      },
    }),
});

// Create a persistor
export const persistor = persistStore(store);
