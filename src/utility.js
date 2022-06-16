
function findMovies(el){
    let searchTerm = (el.value).trim(); //
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
    console.log(arr);
    let resultContainer = document.createElement('div');
    
    resultContainer.className = "result-container";
    arr.forEach((item)=>{console.log(item)
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

    <div class="movie-container">
    <img class="poster" src="${arr[4].Poster}">
    <h1>${arr[4].Title}</h1>
    <ul class="movie-details">
    <li>  ${arr[4].Year}</li>
    <li>  ${arr[4].Type}</li>
    </ul>
    </div>

    <div class="movie-container">
    <img class="poster" src="${arr[5].Poster}">
    <h1>${arr[5].Title}</h1>
    <ul class="movie-details">
    <li>  ${arr[5].Year}</li>
    <li>  ${arr[5].Type}</li>
    </ul>
    </div>
    `
    })
    console.log(resultContainer)
    
    const rootSearch = document.querySelector(".div-search")
    console.log(resultContainer)
    rootSearch.appendChild(resultContainer)
    return resultContainer
}


export { findMovies, loadMovies, printMovies, getMovies };




//------LOGIN------//
// - OK

//------SIGN UP------//
// - Responsive 

//------PROFILE------//
// - Responsive 
// - Diseño -> incorporar icono de logout, definir si post usuario tendrán funcionalidad sino borrar botones. 
// - Mostrar información  de usuario
// - Filtrar posts de usuario
// - arreglar Render de búsqueda 
// - textos contexto búsqueda (?) -> ej: "browse for movies to inspire your posts" "search and get movie info " 
// - activar búsqueda con clic en el icono y no en input (sólo si hay tiempo)

//------FEED-----// 
// - Arreglo carrusel (imagenes se salen de contenedor)
// - Botón reviews -> ubicar sobre o bajo las imagenes
// - Postear con Google (auth)
// - hover delete 


//------OTROS-----// 
// - Tests
// - ReadMe: 
//  + Prototipo baja
//  + Prototipo alta
// - Despliegue
// - Revisión y limpieza CSS 
// - Revisión y limpieza JS 

// VARIOS - DEFINIR
// - restringir borrar y editar sólo el currentUser 
// - PhotoURL --> SOLO EN CASO DE TENER TEST LISTOS 
// - Comentarios -> DESCARTADO 

