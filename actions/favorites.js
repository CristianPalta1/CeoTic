import AsyncStorage from '@react-native-community/async-storage';

export const addFavorite = (favorite) => dispatch => {
    console.log('favorite receved: ', favorite);
    dispatch({
        type: 'ADD-FAVORITO',
        payload: {
            favorite
        }
    }) 
}

export const deleteFavorite = (id) => dispatch => {
    console.log('favorite receved: ', id);
    dispatch({
        type: 'DELETE-FAVORITO',
        payload: {
            id
        }
    }) 
}