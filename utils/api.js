const BASE_API = 'https://api.themoviedb.org/3/discover/movie?api_key=d2f75c50a366b48f468d9a270511e992&sort_by=popularity.desc';


class Api {
  async getPelicula() {
    const query = await fetch(`${BASE_API}`);
    const {results} = await query.json();
    // console.log(results);
    return results;
  }

  async search(id) {
    const query = await fetch(`${BASE_API}/results/${id}`);
    // const data = await query.json();
    console.log(query);
    // return data;
  }
  
}

export default new Api();
