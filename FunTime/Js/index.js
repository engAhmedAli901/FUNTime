import { Key , DisplayNavbar } from "./Config.js";

// declaration variable

let last_data = []
let popular_data = []
let trending_data = []
let top_data = []
let Now_data = []
let Upcoming_data = []
let vote
let fav_id = JSON.parse(localStorage.getItem("fav-id")) || []

// declaration variable



// The Api For All data

async function Movies(type){
    let result = await fetch(`https://api.themoviedb.org/3/${type}?api_key=${Key}&language=en-US&page=1`)
    let data = await result.json()
    last_data = data.results
    console.log(last_data);
    return last_data
    
}


// The Api For All data





// display every type

async function Display_popular(){
    
     popular_data = await Movies("movie/popular")
    let cartona = ``
    for(let i=0 ; i<popular_data.length ; i++){
    let poster = popular_data[i].poster_path
    let url = `https://image.tmdb.org/t/p/w500${poster}`
    popular_data[i].vote_average==0?vote="SOON": vote = Math.round(popular_data[i].vote_average)+"/10" 
    cartona+=`
    <div class="movie col-md-3 mt-4 position-relative" style="cursor:pointer">
    <div class="vote fw-bold position-absolute top-0 bg-warning rounded-5 p-2 mt-3 ms-3">
    ${vote}
    </div>
    <img class="mov-img w-100 rounded-4 border border-2" src=${url}>
     <button class="fav border-0 position-absolute top-0 m-3 end-0 btn"><i class="empty-heart fa-heart fs-3
${fav_id.includes(popular_data[i].id) ? "fa-solid text-danger" : "fa-regular text-warning"}"></i>
</button>
    <p class="text-center mt-2 w-75 mx-auto rounded-3 text-white fs-5">${popular_data[i].original_title}</p>
    </div>
    `
    
}
document.getElementById("popular_row").innerHTML = cartona
document.querySelectorAll("#popular_row .movie").forEach((movie, index) => {
        movie.addEventListener("click", () => {
            window.location.href = `MovieDetails.html?id=${popular_data[index].id}`
        });
    });

}

async function Display_trending(){
    
     trending_data = await Movies("trending/movie/week")
    let cartona = ``
    for(let i=0 ; i<trending_data.length ; i++){
    let poster = trending_data[i].poster_path
    let url = `https://image.tmdb.org/t/p/w500${poster}`
        trending_data[i].vote_average==0?vote="SOON": vote = Math.round(trending_data[i].vote_average)+"/10" 

    cartona+=`
    <div class="movie col-md-3 mt-4 position-relative" style="cursor:pointer">
    <div class="vote fw-bold position-absolute top-0 bg-warning rounded-5 p-2 mt-3 ms-3">
    ${vote}
    </div>
    <img class="mov-img w-100 rounded-4 border border-2" src=${url}>
   
     <button class="fav border-0 position-absolute top-0 m-3 end-0 btn"><i class="empty-heart fa-heart fs-3
${fav_id.includes(trending_data[i].id) ? "fa-solid text-danger" : "fa-regular text-warning"}"></i>
</button>
    <p class="text-center mt-2 w-75 mx-auto rounded-3 text-white fs-5">${trending_data[i].original_title}</p>
    </div>
    `
    
}
document.getElementById("trending_row").innerHTML = cartona
document.querySelectorAll("#trending_row .movie").forEach((movie, index) => {
        movie.addEventListener("click", () => {
            window.location.href = `MovieDetails.html?id=${trending_data[index].id}`
        });
    });
}

async function Display_top(){
    
     top_data = await Movies("movie/top_rated")
    let cartona = ``
    for(let i=0 ; i<top_data.length ; i++){
    let poster = top_data[i].poster_path
    let url = `https://image.tmdb.org/t/p/w500${poster}`
        top_data[i].vote_average==0?vote="SOON": vote = Math.round(top_data[i].vote_average)+"/10" 

    cartona+=`
    <div class="movie col-md-3 mt-4 position-relative" style="cursor:pointer">
    <div class="vote fw-bold position-absolute top-0 bg-warning rounded-5 p-2 mt-3 ms-3">
    ${vote}
    </div>
    <img class="mov-img w-100 rounded-4 border border-2" src=${url}>
   
     <button class="fav border-0 position-absolute top-0 m-3 end-0 btn"><i class="empty-heart fa-heart fs-3
${fav_id.includes(top_data[i].id) ? "fa-solid text-danger" : "fa-regular text-warning"}"></i>
</button>
    <p class="text-center mt-2 w-75 mx-auto rounded-3 text-white fs-5">${top_data[i].original_title}</p>
    </div>
    `
    
}
document.getElementById("top_row").innerHTML = cartona
document.querySelectorAll("#top_row .movie").forEach((movie, index) => {
        movie.addEventListener("click", () => {
            window.location.href = `MovieDetails.html?id=${top_data[index].id}`
        });
    });
}


async function Display_Now(){
    
     Now_data =await Movies("movie/now_playing")
    let cartona = ``
    for(let i=0 ; i<Now_data.length ; i++){
    let poster = Now_data[i].poster_path
    let url = `https://image.tmdb.org/t/p/w500${poster}`
        Now_data[i].vote_average==0?vote="SOON": vote = Math.round(Now_data[i].vote_average)+"/10" 

    cartona+=`
    <div class="movie col-md-3 mt-4 position-relative" style="cursor:pointer">
    <div class="vote fw-bold position-absolute top-0 bg-warning rounded-5 p-2 mt-3 ms-3">
    ${vote}
    </div>
    <img class="mov-img w-100 rounded-4 border border-2" src=${url}>
   
      <button class="fav border-0 position-absolute top-0 m-3 end-0 btn"><i class="empty-heart fa-heart fs-3
${fav_id.includes(Now_data[i].id) ? "fa-solid text-danger" : "fa-regular text-warning"}"></i>
</button>
    <p class="text-center mt-2 w-75 mx-auto rounded-3 text-white fs-5">${Now_data[i].original_title}</p>
    </div>
    `
    
}
document.getElementById("now_row").innerHTML = cartona
document.querySelectorAll("#now_row .movie").forEach((movie, index) => {
        movie.addEventListener("click", () => {
            window.location.href = `MovieDetails.html?id=${Now_data[index].id}`
        });
    });
}


async function Display_UPcoming(){
    
     Upcoming_data = await Movies("movie/upcoming")
    let cartona = ``
    for(let i=0 ; i<Upcoming_data.length ; i++){
    let poster = Upcoming_data[i].poster_path
    let url = `https://image.tmdb.org/t/p/w500${poster}`
        Upcoming_data[i].vote_average==0?vote="SOON": vote = Math.round(Upcoming_data[i].vote_average)+"/10" 

    cartona+=`
    <div class="movie col-md-3 mt-4 position-relative " style="cursor:pointer">
    <div class="vote fw-bold position-absolute top-0 bg-warning rounded-5 p-2 mt-3 ms-3">
    ${vote}
    </div>
    <img class="mov-img w-100 rounded-4 border border-2" src=${url}>
   
    <button class="fav border-0 position-absolute top-0 m-3 end-0 btn"><i class="empty-heart fa-heart fs-3
${fav_id.includes(Upcoming_data[i].id) ? "fa-solid text-danger" : "fa-regular text-warning"}"></i>
</button>
    <p class="text-center mt-2 w-75 mx-auto rounded-3 text-white fs-5">${Upcoming_data[i].original_title}</p>
    </div>
    `
    
}
document.getElementById("upcoming_row").innerHTML = cartona
document.querySelectorAll("#upcoming_row .movie").forEach((movie, index) => {
        movie.addEventListener("click", () => {
            window.location.href = `MovieDetails.html?id=${Upcoming_data[index].id}`
        });
    });
}


// display every type



// Call the display functions & collect all data in FullData 

async function Display(){
    await Promise.all([
        Display_popular(),
    Display_trending(),
    Display_top(),
    Display_Now(),
    Display_UPcoming()
    ])
    let fav_btn = document.querySelectorAll(".fav")
    let FullData = [...popular_data,...trending_data,...top_data,...Now_data,...Upcoming_data]

    

    


    fav_btn.forEach((btn , index)=>{      
btn.addEventListener("click",(e)=>{
     e.stopPropagation()
    console.log(FullData[index].id);
    let heart = btn.querySelector(".empty-heart");
    console.log(heart);
    heart.classList.replace("text-warning","text-danger");
    Swal.fire({
  title: "Added Successfully",
  icon: "success",
  draggable: true,
    theme: 'dark'
});
    if(fav_id.includes(FullData[index].id)){
        Swal.fire({
  title: "Already Added",
  icon: "warning",
  draggable: true,
    theme: 'dark'
})
        return
    }
    else{
        fav_id.push(FullData[index].id)
    }
    localStorage.setItem("fav-id",JSON.stringify(fav_id))
}
    
)
})
}

 Display()



// Call the display functions & collect all data in FullData 



// Responsiv Navbar
let screenSize = window.matchMedia("(max-width: 780px)");

DisplayNavbar();

screenSize.addEventListener("change", DisplayNavbar);

// Responsiv Navbar

