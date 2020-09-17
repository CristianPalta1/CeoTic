function reducer(state = {}, action){
    switch(action.type){
        case 'SET_PELICULAS_LISTAS':{
            return {
                ...state, ...action.payload 
            }
        }
      
        default:
            return state
    };
} 
export default reducer;