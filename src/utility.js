const resultContainer = document.createElement('div');
const printMovies = (arr) => {
  let resultSearchList = '';
  resultContainer.innerHTML = '';
  resultContainer.className = 'result-container';
  arr.forEach((item, i) => {
    resultSearchList += `
    <div class='movie-container'>
        <img class='poster' src='${arr[i].Poster}'>
        <h1>${arr[i].Title}</h1>
        <ul class='movie-details'>
            <li> Year: ${arr[i].Year}</li>
            <li> Type: ${arr[i].Type}</li>
        <a href='https://www.imdb.com/title/${arr[i].imdbID}/?ref_=hm_tpks_tt_i_1_pd_tp1_pbr' target='blank' ><img src=img/icon-imdb.png></a> 
        </ul>
    </div>
    `;
  });
  resultContainer.innerHTML = resultSearchList;
  const rootSearch = document.querySelector('.div-search');
  rootSearch.appendChild(resultContainer);
  return resultContainer;
};
const getMovies = (busqueda) => {
  const prueba = [];
  busqueda.forEach((item) => {
    prueba.push(item);
  });
  return printMovies(prueba);
};
async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  if (data.Response === 'True') {
    getMovies(data.Search);
  }
}
function findMovies(el) {
  const searchTerm = (el.value).trim(); //
  if (searchTerm.length > 0) {
    loadMovies(searchTerm);
  } else {
    // console.log('else')
  }
}
export { findMovies };
