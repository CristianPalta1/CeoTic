function reducer(state = {}, action){
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
      
        default:
            return state
    };
} 
export default reducer;