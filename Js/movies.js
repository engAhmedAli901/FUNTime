import { Key , DisplayNavbar , AddToFavourite } from "./Config.js";

// Declare variables

let fav_id = JSON.parse(localStorage.getItem("fav-id")) || []
let input = document.getElementById("Search")
let load_more = document.getElementById("load_more")
let All_data = []
let specific_data = []
let vote
let Page_count = 1



// Declare variables





// Get All Movies
async function All_Movies(num){
    let result = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${Key}&include_adult=false&include_video=false&language=en-US&page=${num}&sort_by=popularity.desc`)
    let data = await result.json()
    All_data = data.results
    console.log(All_data);   
}
// Get All Movies






// Get Specific Movies
async function Specific_Movie(name,page){
    let result = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${Key}&query=${name}&page=${page}`)
    let data = await result.json()
    specific_data = data.results
    console.log(specific_data);   
}
// Get Specific Movies







// Display All Movies
async function Display_All_Movies(){
    
    let cartona = ``
    for(let i=0 ; i<All_data.length ; i++){
    let poster = All_data[i].poster_path
    let url = `https://image.tmdb.org/t/p/w500${poster}`
    All_data[i].vote_average==0?vote="SOON": vote = Math.round(All_data[i].vote_average)+"/10" 
    cartona+=`
    <div class="movie col-md-3 mt-4 position-relative" style="cursor:pointer">
    <div class="vote fw-bold position-absolute top-0 bg-warning rounded-5 p-2 mt-3 ms-3">
    ${vote}
    </div>
    <img class="mov-img w-100 rounded-4 border border-2" src=${url}>
<button class="fav border-0 position-absolute top-0 m-3 end-0 btn"><i class="empty-heart fa-heart fs-3
${fav_id.includes(All_data[i].id) ? "fa-solid text-danger" : "fa-regular text-warning"}"></i>
</button>
    <p class="text-center mt-2 w-75 mx-auto rounded-3 text-white fs-5">${All_data[i].original_title}</p>
    </div>
    `
    
}
document.getElementById("Alldata_row").innerHTML = cartona
    document.querySelectorAll("#Alldata_row .movie").forEach((movie, index) => {
        movie.addEventListener("click", () => {
            window.location.href = `MovieDetails.html?id=${All_data[index].id}`
        });
    });
    AddToFavourite(All_data);
}
// Display All Movies






// Display Specific Movies
async function Display_Specific_Movie(){
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
document.getElementById("Alldata_row").innerHTML = cartona
    document.querySelectorAll("#Alldata_row .movie").forEach((movie, index) => {
        movie.addEventListener("click", () => {
            window.location.href = `MovieDetails.html?id=${specific_data[index].id}`
        });
    });
AddToFavourite(specific_data);

}
// Display Specific Movies



// Load more btn
load_more.addEventListener("click",async function load_more(){
    Page_count++;
    if (input.value == "") {
        await All_Movies(Page_count);
        await Display_All_Movies();
        window.scrollTo({
    top: 0,
    behavior: "smooth"
})
        return;
    }
    await Specific_Movie(input.value,Page_count)
await Display_Specific_Movie()
    window.scrollTo({
    top: 0,
    behavior: "smooth"
});
})
// Load more btn





// Call Functions
async function init() {
    await All_Movies(Page_count);
    await Display_All_Movies();
    console.log("hello");
    
}

init();
// Call Functions









// Input Form
input.addEventListener("input",async function Search(){
console.log(input.value);
if (input.value == "") {
        Page_count = 1;
        await All_Movies(Page_count);
        await Display_All_Movies();
        return;
    }
await Specific_Movie(input.value,Page_count)
await Display_Specific_Movie()

})
// Input Form


// Responsiv Navbar
let screenSize = window.matchMedia("(max-width: 780px)");

DisplayNavbar();

screenSize.addEventListener("change", DisplayNavbar);

// Responsiv Navbar
