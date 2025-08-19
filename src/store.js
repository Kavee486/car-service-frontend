import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Import reducers
import { serviceReducer } from "./reducers/ServiceReducer";
import message from "./reducers/message";

// Combine reducers
const reducer = combineReducers({
  services: serviceReducer,       // For services management
  message: message,              // For global messages/notifications
  // Add other reducers here as needed
});

// Middleware configuration
const middleware = [thunk];

// Create the Redux store
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;