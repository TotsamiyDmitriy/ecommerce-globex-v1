import {  configureStore } from '@reduxjs/toolkit'
import {authReducer, productReducer} from "./"
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";


const persistConfig = {
	key : 'root',
	storage,
	version : 1,
}


const persistedAuthReducer = persistReducer<ReturnType<typeof authReducer>>(persistConfig, authReducer)
const persistedProductReducer = persistReducer<ReturnType<typeof productReducer>>(persistConfig, productReducer)



export const store = configureStore({
 
  reducer: {
    auth : persistedAuthReducer,
    product : persistedProductReducer
  },

  middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		})
})



export const persistor = persistStore(store)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch