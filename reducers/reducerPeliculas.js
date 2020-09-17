import { connect } from "react-redux";

const initialState = {
    favoritos: []
}

function reducer(state = initialState, action){
    switch(action.type){
        case 'SET_PELICULAS_LISTAS':{
            return {
                ...state, ...action.payload 
            }
        }
        case 'SET_BUSQUEDA':{
            // console.log("Llegue al reducer",action.payload.busquedapelicula)
            return{
                ...state, busquedapelicula: action.payload.busquedapelicula
            }
        }
      
        case 'ADD-FAVORITO': {
            // const newArray = state.favoritos.push(action.payload.favorite);
            // console.log('Favoritos',state.favoritos)
            return {
                ...state,
                favoritos: [...state.favoritos, action.payload.favorite],
            }
        }

        case 'DELETE-FAVORITO': {
            const index = state.favoritos.findIndex(fav => fav.id == action.payload.id);
            const newFavs = state.favoritos.filter(fav => fav.id !== action.payload.id)
            // const newFavs = [];
            //Asi busco por Id y borro
            console.log('New favs: ', newFavs);
            return {
                ...state,
                favoritos: newFavs,
            }
        }
        default:
            return state
    };
} 
export default reducer;