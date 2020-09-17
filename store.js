import {createStore} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducer from './reducers/reducerPeliculas'
// import { AsyncStorage } from 'react-native'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['moviePromo'],
    login: true
   
  }

const persistedReducer = persistReducer(persistConfig, reducer)

// const store = createStore(reducer, {
//     empresasList: [],
//     usuariosList: [],
    
// })

const store = createStore(persistedReducer)
const persistor = persistStore(store)


export {store, persistor}
