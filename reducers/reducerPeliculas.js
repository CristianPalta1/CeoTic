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
            return {
                ...state,
                favoritos: [...state.favoritos, action.payload.movie],
            }
        }
        default:
            return state
    };
} 
export default reducer;