import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Feature/userSlice.js"; // assuming this is a slice, not a reducer directly
import { createLogger } from "redux-logger";

const logger = createLogger();

const Store = configureStore({
  reducer: {
    user: userSlice, // <-- use an object with slice name as key
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default Store;
