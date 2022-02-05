let page = 2
const body = document.querySelector('body');
const API_KEY = "0e679229-dae7-4d33-8a67-4b83616235db";
let API_URL_TOP = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=`
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="
const form = document.querySelector("form");
const input = document.querySelector(".header_search");
const footer = document.querySelector(".footer");
const popupBg = document.querySelector('.popup_bg');
const popup = document.querySelector('.popup')


getMovies(API_URL_TOP);

async function getMovies(url){
   const resp = await fetch(url, {
      headers: {
         "Content-Type": "application/json",
         'X-API-KEY': API_KEY,
      },
   });
   const respData = await resp.json();
   showMovies(respData);
}

const openPopup = () =>{
   popupBg.classList.add('active')
   popup.classList.add('active')
}

const closePopup = () =>{
   popupBg.classList.remove('active')
   popup.classList.remove('active')
}





function showMovies(data){
   const moviesCard = document.querySelector('.movies');
   document.querySelector('.movies').innerHTML = "";

   data.films.forEach((movie) => {

      const moviesEl = document.createElement('div');
      moviesEl.classList.add('movie');
      moviesEl.innerHTML = `
                     <div class="movie_cover_inner">
                     <img src="${movie.posterUrlPreview}
                     alt = '${movie.nameRu}'"
                     class="movie_cover">
                     <div class="movie_cover-darkened"></div>
               </div>
               <div class="movie_info">
                  <div class="movie_title">${movie.nameRu != undefined ? movie.nameRu : 'Фильм не найден'}</div>
                  <div class="movie_genre">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
                  <div class="movie_rating movie_rating--${classByRate(movie.rating ? movie.rating : '')}">${movie.rating != 'null' && movie.rating != null ? movie.rating : '-'}</div>
               </div>
      `;
      moviesCard.appendChild(moviesEl);
      moviesEl.addEventListener('click', () =>{
         openPopup();
         poster.classList.add('active')
      })
         const poster = document.createElement('img');
         poster.src = `${movie.posterUrlPreview}`
         popup.appendChild(poster)

         document.addEventListener('click', (e) =>{
            if(e.target === popupBg){
            closePopup()
            poster.classList.remove('active')
         }  
      })
   });
}


function classByRate(vote){
   if(vote >= 7 ){
      return 'green'
   }
   else if(vote >= '70%'){
      return 'green'
   }

   else if(vote >= 5){
      return 'orange'
   }
   else if(vote >= '50%'){
      return 'orange'
   }
   else{
      return "red"
   }
}


form.addEventListener('submit', (e) => {
   e.preventDefault();
   const apiUrlSearch = `${API_URL_SEARCH}${input.value}`
   if(input.value){
      getMovies(apiUrlSearch); 
      footer.removeChild(footer_nav);
   }
   else{
      getMovies(API_URL_TOP);
      footer.appendChild(footer_nav)
   }
})


const footer_nav = document.createElement('a');
   footer_nav.classList.add('footer_nav');
   footer_nav.innerHTML = 'Показать Еще';
   
   footer.appendChild(footer_nav);

      footer_nav.addEventListener('click', (e) =>{
      e.preventDefault();
      e.stopPropagation();
      const nextPage = `${API_URL_TOP}${page}`
      if(page < 17){
         page++
         getMovies(nextPage);
      window.scrollTo(0, 0);
   }

   if(page === 17){
      footer_nav.innerHTML='Конец топа';
   }
})













