import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createNetworkMiddleware } from "react-native-offline";
import thunk from "redux-thunk";

import rootReducer from "../reducers/index";

const persistConfig = {
  key: "root",
  storage
  //   whitelist: ['offlineData','offline'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const networkMiddleware = createNetworkMiddleware({
  queueReleaseThrottle: 200,
});

export const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(networkMiddleware, thunk))
);

export const persistor = persistStore(store);
