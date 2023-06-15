import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import categoryReducer from './reducers/categorySlice'
import orderDetailReducer from './reducers/orderDetailSlice'

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  orderDetail: orderDetailReducer
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
