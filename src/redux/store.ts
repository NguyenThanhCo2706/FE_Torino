import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counterSlice'
import userReducer from './reducers/userSlice'
import categoryReducer from './reducers/categorySlice'

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  category: categoryReducer
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch