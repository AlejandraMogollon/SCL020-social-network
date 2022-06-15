const search =  () => {
  const templateSearch = ` 
  <header>
    <nav>
      <img src="img/menu-icon.png" alt="">
      <img class="logo-mediary-nav"src="img/logo-Mediary.png" alt="">
      <img id="btnSearch" src="img/search-icon.png" alt=""/>
      <img id= "btnUser" src="img/user-icon.png" alt="" >
    </nav>
  </header>
  <section class="section-feed">
    <main class="feed">
      <div class = "wrapper">
        <div class = "search-container">
            <div class = "search-element">
                <h3>Search Movie:</h3>
                <input type = "text" class = "input-search" placeholder="Search Movie Title ..." id = "movie-search-box"  >
                <div class = "search-list" id = "search-list">

                    <!-- <div class = "search-list-item">
                        <div class = "search-item-thumbnail">
                            <img src = "medium-cover.jpg">
                        </div>
                        <div class = "search-item-info">
                            <h3>Guardians of the Galaxy Vol. 2</h3>
                            <p>2017</p>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- end of search container -->

        <!-- result container -->
        <div class = "container">
            <div class = "result-container">
                <div class = "result-grid" id = "result-grid">
                    <!-- movie information here -->
                    <!-- <div class = "movie-poster">
                        <img src = "medium-cover.jpg" alt = "movie poster">
                    </div>
                    <div class = "movie-info">
                        <h3 class = "movie-title">Guardians of the Galaxy Vol. 2</h3>
                        <ul class = "movie-misc-info">
                            <li class = "year">Year: 2017</li>
                            <li class = "rated">Ratings: PG-13</li>
                            <li class = "released">Released: 05 May 2017</li>
                        </ul>
                        <p class = "genre"><b>Genre:</b> Action, Adventure, Comedy</p>
                        <p class = "writer"><b>Writer:</b> James Gunn, Don Abnett, Andy Lanning</p>
                        <p class = "actors"><b>Actors: </b>Chris Pratt, Zoe Saldana, Dave Bautista</p>
                        <p class = "plot"><b>Plot:</b> The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's ecounter with his father the ambitious celestial being Ego.</p>
                        <p class = "language"><b>Language:</b> English</p>
                        <p class = "awards"><b><i class = "fas fa-award"></i></b> Nominated for 1 Oscar</p>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- end of result container -->
    </div>
      <div class="root-post"> </div>
    </main>
  </section>
  <footer> FOOTER </footer> `;
  
const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';
  searchContainer.innerHTML = templateSearch;

const movieSearchBox = searchContainer.querySelector('#movie-search-box');
const searchList = searchContainer.querySelector('.search-list');
const resultGrid = searchContainer.querySelector('.result-grid');

movieSearchBox.addEventListener("click",  ()=>{
     findMovies()
})



function findMovies(){
    let searchTerm = (movieSearchBox.value).trim(); //
    if(searchTerm.length > 0){
        console.log(`searchTerm  ${searchTerm}`)
        // searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        // searchList.classList.add('hide-search-list');
        console.log("no tiene nada la search")
    }
}

async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    
    // console.log(URL)
    // console.log(data.Search);
    if(data.Response == "True") 
      getMovies(data.Search)
}

const getMovies = (busqueda)=>{
const prueba = []
busqueda.forEach((item)=> {
    prueba.push(item);
    console.log(prueba)
   })
   return printMovies(prueba)
}

const printMovies = (arr)=>{
    console.log(arr)
    let resultContainer = searchContainer.querySelector(".result-container")
    resultContainer.innerHTML = `
    <div class="movie-container">
    <img class="poster" src="${arr[0].Poster}">
    <h1>${arr[0].Title}</h1>
    <ul class="movie-details">
    <li> Year: ${arr[0].Year}</li>
    <li> Type: ${arr[0].Type}</li>
    </ul>
    </div>

    <div class="movie-container">
    <img class="poster" src="${arr[1].Poster}">
    <h1>${arr[1].Title}</h1>
    <ul class="movie-details">
    <li>  ${arr[1].Year}</li>
    <li>  ${arr[1].Type}</li>
    </ul>
    </div>

    <div class="movie-container">
    <img class="poster" src="${arr[2].Poster}">
    <h1>${arr[2].Title}</h1>
    <ul class="movie-details">
    <li>  ${arr[2].Year}</li>
    <li>  ${arr[2].Type}</li>
    </ul>
    </div>

    <div class="movie-container">
    <img class="poster" src="${arr[3].Poster}">
    <h1>${arr[3].Title}</h1>
    <ul class="movie-details">
    <li>  ${arr[3].Year}</li>
    <li>  ${arr[3].Type}</li>
    </ul>
    </div>
    `
    
    console.log(resultContainer)
}




  return searchContainer;
};

export default search;