import { Key , DisplayNavbar} from "./Config.js";

// declare variables

let fav_id = JSON.parse(localStorage.getItem("fav-id"))
let fav_data = []
let vote
// declare variables


// get id from local storage for Favourite_Movies Function
async function get_id(){
    fav_data = []
    await Promise.all(
    fav_id.map((id)=>{
        return Favourite_Movies(id)}
    )
)
}
// get id from local storage for Favourite_Movies Function




// get favourite movies
async function Favourite_Movies(id){
    let result = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${Key}&language=en-US`)
    let data = await result.json()
    fav_data.push(data)
    console.log(fav_data);
    return fav_data
}
// get favourite movies




// display favourite movies
async function Display_Favourite(){
    await get_id()
    let cartona = ``
    for(let i=0 ; i<fav_data.length ; i++){
    let poster = fav_data[i].poster_path
    let url = `https://image.tmdb.org/t/p/w500${poster}`
    fav_data[i].vote_average==0?vote="SOON": vote = Math.round(fav_data[i].vote_average)+"/10" 
    cartona+=`
    <div class="movie col-md-3 mt-4 position-relative" style="cursor:pointer">
    <div class="vote fw-bold position-absolute top-0 bg-warning rounded-5 p-2 mt-3 ms-3">
    ${vote}
    </div>
    <img class="mov-img w-100 rounded-4 border border-2" src=${url}>
    <button class="fav border-0 position-absolute top-0 m-3 end-0 btn">    <i class="empty-heart fa-solid fs-3 fa-heart text-danger "></i>
</button>
    <p class="text-center mt-2 w-75 mx-auto rounded-3 text-white fs-5">${fav_data[i].original_title}</p>
    </div>
    `
    
}
document.getElementById("fav_row").innerHTML = cartona
document.querySelectorAll("#fav_row .movie").forEach((movie, index) => {
        movie.addEventListener("click", () => {
            window.location.href = `MovieDetails.html?id=${fav_data[index].id}`
        });
    });
let fav_btn = document.querySelectorAll(".fav")
fav_btn.forEach((btn , index)=>{
    btn.addEventListener("click",()=>{
        let movie_id = fav_id[index]
        fav_id = fav_id.filter((id)=>{
            return id != movie_id
        })
        
        localStorage.setItem("fav-id",JSON.stringify(fav_id))
        
        Display_Favourite()
        Swal.fire({
  title: "Removed Successfully🥲",
  icon: "success",
  draggable: true,
    theme: 'dark',
});
    })
})
}

Display_Favourite()
// display favourite movies




// Responsiv Navbar
let screenSize = window.matchMedia("(max-width: 780px)");

DisplayNavbar();

screenSize.addEventListener("change", DisplayNavbar);

// Responsiv Navbar



