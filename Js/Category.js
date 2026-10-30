import { Key , DisplayNavbar , AddToFavourite } from "./Config.js";



// declare Variablres
let full_data = []
let specific_data = []
let movie = document.querySelectorAll(".movie")
let back_btn = document.getElementById("back-btn")
let fav_id = JSON.parse(localStorage.getItem("fav-id")) || []
let vote

// declare Variablres




// get Categories
async function Categories(){
    let result = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${Key}&language=en-US`)
    let data = await result.json()
    full_data = data.genres
    console.log(full_data);
    
}
// get Categories



// get soecific categorie
async function Specific_Categories(id){
    let result = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${Key}&with_genres=${id}`)
    let data = await result.json()
    specific_data = data.results
    console.log(specific_data);
    
}
// get soecific categorie




// Display categorie
async function Display_Categories(){
    
    await Categories()
    let cartona = ``
    for(let i=0 ; i<full_data.length ; i++){
    await Specific_Categories(full_data[i].id)
    let poster = specific_data[1].poster_path
    let url = `https://image.tmdb.org/t/p/w500${poster}`
    cartona+=`
    <div data-id="${full_data[i].id}" class="movie col-md-4 mt-4 position-relative" style="cursor:pointer">
    
    <img class="mov-img w-100 rounded-4 border border-2 opacity-50" src=${url}>
    <p class="cat_disc text-center mt-2 w-75 mx-auto rounded-3 text-white fs-5 position-absolute top-50 start-50">${full_data[i].name}</p>
    </div>
    `
}
document.getElementById("Catdata_row").innerHTML = cartona
back_btn.classList.add("d-none")
document.querySelectorAll("#Catdata_row .movie").forEach((movie) => {
    movie.addEventListener("click", () => {
        DisPlay_Specific(movie.dataset.id);
    });
});
}

Display_Categories()
// Display categorie





// Display soecific categorie
async function DisPlay_Specific(id){
 await Specific_Categories(id)
 let cartona = ``
    for(let i=0 ; i<specific_data.length ; i++){
    let poster = specific_data[i].poster_path
    let url = `https://image.tmdb.org/t/p/w500${poster}`
    specific_data[i].vote_average==0?vote="SOON": vote = Math.round(specific_data[i].vote_average)+"/10" 
    cartona+=`
    <div class="movie col-md-3 mt-4 position-relative" style="cursor:pointer">
    <div class="vote fw-bold position-absolute top-0 bg-warning rounded-5 p-2 mt-3 ms-3">
    ${vote}
    </div>
    <img class="mov-img w-100 rounded-4 border border-2" src=${url}>
<button class="fav border-0 position-absolute top-0 m-3 end-0 btn"><i class="empty-heart fa-heart fs-3
${fav_id.includes(specific_data[i].id) ? "fa-solid text-danger" : "fa-regular text-warning"}"></i>
</button>
    <p class="text-center mt-2 w-75 mx-auto rounded-3 text-white fs-5">${specific_data[i].original_title}</p>
    </div>
    `

    
}
document.getElementById("Catdata_row").innerHTML = cartona
back_btn.classList.remove("d-none")
back_btn.addEventListener("click",Display_Categories)
document.querySelectorAll("#Catdata_row .movie").forEach((movie, index) => {
        movie.addEventListener("click", () => {
            window.location.href = `MovieDetails.html?id=${specific_data[index].id}`
        });
    });
    AddToFavourite(specific_data)
}
// Display soecific categorie




// Responsiv Navbar
let screenSize = window.matchMedia("(max-width: 780px)");

DisplayNavbar();

screenSize.addEventListener("change", DisplayNavbar);

// Responsiv Navbar
