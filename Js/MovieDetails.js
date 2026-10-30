import { Key } from "./Config.js";


// get id from the href
let params = new URLSearchParams(window.location.search)
console.log(params.get("id"));
let id = params.get("id")
// get id from the href



// get movie details
 async function MovieDetails(id) {
    let respond = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${Key}&language=en-US`)   
    let data = await respond.json()
    console.log(data);
    return data
}
// get movie details



// get movie link
 async function MovieWatch(id) {
    let respond = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${Key}`
    );

    let link_data = await respond.json();
    return link_data;
}
// get movie link




// get movie trailer
 async function MovieTrailer(id) {
    let respond = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${Key}`)   
    let Trailerdata = await respond.json()
    console.log(Trailerdata);
    let trailer = Trailerdata.results.find(video =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    );
    return trailer
}
// get movie trailer



// display movie details
function display_ditails(FullData , Trailer , WatchData){
    let url = `https://image.tmdb.org/t/p/w1280${FullData.backdrop_path}`
    let trailerUrl = Trailer
    ? `https://www.youtube.com/embed/${Trailer.key}`
    : "";
     let watchUrl =
    WatchData.results?.EG?.flatrate?.[0]?.link ||
    WatchData.results?.EG?.rent?.[0]?.link ||
    WatchData.results?.EG?.buy?.[0]?.link ||
    WatchData.results?.EG?.link ||
    `https://www.themoviedb.org/movie/${FullData.id}`;
    let cartona = `

    <div class="mt-5 d-flex flex-wrap justify-content-center">
    ${Trailer ? `
    <iframe
        width="95%"
        height="800"
        class="rounded-5 trailer border-2 border"
        src="${trailerUrl}"
        title="Movie Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>
` : `<img class="logo rounded-5" style="width: 95% !important;" src="${url}">`}

</div>
            
    <div style="width: 95% !important;">
    <div class=" row  mov_det mt-5 row">
    <div class="col-md-5 d-flex justify-content-center">
        <img class="logo rounded-5" style="width: 95% !important;" src="${url}">
    </div>
    <div class="col-md-6 mt-4">
    <h1 class="fs-1 ms-2">${FullData.original_title}</h1>
    <h2 class="ms-2 text-warning">${FullData.overview}</h2>
    </div>
    </div>
    </div>

    <div class="mt-5 d-flex justify-content-around flex-wrap">
    <div class="details rounded-3 bg-danger  px-4 text-black mt-3"><h3>Type : ${FullData.genres[0].name}</h3></div>
    <div class="details rounded-3 bg-danger  px-4 text-black mt-3"><h3>Rate : ${FullData.vote_average}</h3></div>
    <div class="details rounded-3 bg-danger  px-4 text-black mt-3"><h3>Budget : ${FullData.budget}$</h3></div>
    <div class="details rounded-3 bg-danger  px-4 text-black mt-3"><h3>Origin Country : ${FullData.origin_country}</h3></div>
    </div>


    <div class="d-flex justify-content-center"><button class="mb-4  watch rounded-3 btn btn-warning mt-5"><a class="text-black text-decoration-none" href="${watchUrl}"><p class="text-danger">${FullData.tagline}</p>Are you Ready to Watch it?</a></button></div>
    
    
    `

    document.getElementById("details").innerHTML = cartona
}
// display movie details



// call the functions
async function display() {
    let FullData = await MovieDetails(id)
    let Trailer = await MovieTrailer(id)
    let link = await MovieWatch(id)
     display_ditails(FullData , Trailer , link)
}
display()
// call the functions



// Responsiv Navbar
let screenSize = window.matchMedia("(max-width: 780px)");

DisplayNavbar();

screenSize.addEventListener("change", DisplayNavbar);

// Responsiv Navbar
