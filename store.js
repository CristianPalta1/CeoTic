import {createStore, applyMiddleware, compose} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import reducer from './reducers/reducerPeliculas'
// import { AsyncStorage } from 'react-native'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['moviePromo'],
    login: true
   
  }
  const estadoInicial = {
    
  };
  const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, reducer)

// const store = createStore(reducer, {
//     empresasList: [],
//     usuariosList: [],
    /// {JSON.stryngy} 
// })

const store = createStore(
  persistedReducer,
  estadoInicial,
    compose(
        applyMiddleware(...middleware)
    )
)
const persistor = persistStore(store)


export {store, persistor}
