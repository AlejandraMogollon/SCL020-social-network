
function findMovies(el){
    let searchTerm = (el.value).trim(); //
    if(searchTerm.length > 0){
        console.log(`searchTerm  ${searchTerm}`)
        loadMovies(searchTerm);
    } else {
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
let resultContainer = document.createElement('div');
const printMovies = (arr)=>{
    let resultSearchList='';
    resultContainer.innerHTML = ""
    resultContainer.className = "result-container";
    arr.forEach((item,i)=>{console.log(item)
     resultSearchList+= `
    <div class="movie-container">
        <img class="poster" src="${arr[i].Poster}">
        <h1>${arr[i].Title}</h1>
        <ul class="movie-details">
            <li> Year: ${arr[i].Year}</li>
            <li> Type: ${arr[i].Type}</li>
        <a href="https://www.imdb.com/title/${arr[i].imdbID}/?ref_=hm_tpks_tt_i_1_pd_tp1_pbr" target="blank" ><img src=img/icon-imdb.png></a> 
        </ul>
    </div>
    `
    })
    resultContainer.innerHTML = resultSearchList
    console.log(resultContainer)
    
    const rootSearch = document.querySelector(".div-search")
    console.log(resultContainer)
    rootSearch.appendChild(resultContainer)
    return resultContainer
}



export { findMovies };




                       

//------LOGIN------//
// - OK

//------SIGN UP------//
// - Responsive 

//------PROFILE------//
// - Responsive 
// - Diseño -> incorporar icono de logout, definir si post usuario tendrán funcionalidad sino borrar botones. 
// - OK => Mostrar información  de usuario
// - OK => Filtrar posts de usuario
// - OK => arreglar Render de búsqueda 
// - textos contexto búsqueda (?) -> ej: "browse for movies to inspire your posts" "search and get movie info " 
// - activar búsqueda con clic en el icono y no en input (sólo si hay tiempo)

//------FEED-----// 
// - Arreglo carrusel (imagenes se salen de contenedor)
// - OK => Botón reviews -> ubicar sobre o bajo las imagenes
// - Postear con Google (auth)
// - OK => hover delete 


//------OTROS-----// 
// - Tests
// - ReadMe: 
//  + Prototipo baja
//  + Prototipo alta
// - Despliegue
// - Revisión y limpieza CSS 
// - Revisión y limpieza JS 

// VARIOS - DEFINIR
// - OK => restringir borrar y editar sólo el currentUser 
// - PhotoURL --> SOLO EN CASO DE TENER TEST LISTOS 
// - Comentarios -> DESCARTADO 

