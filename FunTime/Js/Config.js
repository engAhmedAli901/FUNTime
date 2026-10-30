export const Key = `688213848bc6844ead2fb55775e7281f`
let fav_id = JSON.parse(localStorage.getItem("fav-id")) || []

export function DisplayNavbar() {
    if (window.matchMedia("(max-width: 780px)").matches) {
        document.getElementById("start").innerHTML = `<nav id="nav" class="navbar border border-3 bg-1 fg-2  mx-auto mt-4 rounded-pill w-75">
        <div class="container-fluid ">

            


            <!-- Navigation Links -->
            <div class=" navbar-collapse" id="funTimeNavbar">
                <ul class="navbar-nav mx-auto gap-lg-4 text-center">
                    <div class="d-flex justify-content-around">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="./index.html"><i class="fa-solid fa-house"></i></a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="./movies.html"><i class="fa-solid fa-film"></i></a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="./categories.html"><i class="fa-solid fa-list"></i></a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="./favorite.html"><i class="fa-solid fa-face-grin-hearts"></i></a>
                    </li>
                    </div>
                </ul>
            </div>
            

        </div>
    </nav>`
    } else {
        document.getElementById("start").innerHTML = `
            <nav id="nav" class="navbar navbar-expand-lg border border-3 bg-1 fg-2 w-75 mx-auto mt-4 rounded-pill">
        <div class="container-fluid">

            <!-- Logo and Brand -->
            <a class="navbar-brand d-flex align-items-center me-0" href="#">
                <img
                    src="../img/popcorn (1).png"
                    alt="FUNTime Logo"
                    width="50"
                    height="50"
                    class="me-2"
                >

                <h3 class="mb-0">
                    <span style="color: rgb(193, 4, 4);">FUN</span><span style="color: rgb(0, 0, 175);">TIME</span>
                </h3>
            </a>


            <!-- Navigation Links -->
            <div class="collapse navbar-collapse" id="funTimeNavbar">
                <ul class="navbar-nav mx-auto gap-lg-4 text-center">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="./movies.html">Movies</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="./categories.html">Categories</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="./favorite.html">Favourites</a>
                    </li>
                </ul>
            </div>

            <!-- Camera Icon -->
            <img
                src="../img/video-camera.png"
                alt="Camera"
                width="50"
                height="50"
                class="d-none d-lg-block ms-3"
            >

        </div>
    </nav>
        `;
    }
    let links = document.querySelectorAll(".navbar-nav .nav-link");

links.forEach((link) => {

    link.classList.remove("active");

    if (link.pathname === window.location.pathname) {
        link.classList.add("active");
    }

});
}



// Add to Favourite Function
export function AddToFavourite(movies) {
    let fav_btn = document.querySelectorAll(".fav");

    fav_btn.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            let heart = btn.querySelector(".empty-heart");
            let movie_id = movies[index].id;

            if (fav_id.includes(movie_id)) {
                Swal.fire({
                    title: "Already Added",
                    icon: "warning",
                    theme: "dark"
                });
                return;
            }

            fav_id.push(movie_id);

            localStorage.setItem(
                "fav-id",
                JSON.stringify(fav_id)
            );

            heart.classList.replace("text-warning", "text-danger");
            heart.classList.replace("fa-regular", "fa-solid");

            Swal.fire({
                title: "Added Successfully",
                icon: "success",
                theme: "dark"
            });
        });
    });
}
// Add to Favourite Function
