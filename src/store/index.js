import { combineReducers, compose, createStore } from "redux";

// Reducers import

const rootReducer = combineReducers({
  // Your reducers here
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers());

export default store;
