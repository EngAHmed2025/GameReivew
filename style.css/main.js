
let spinner = document.getElementById("spinner");
let table = document.getElementById("table");
let details = document.getElementById("details");
let currentReview = [];
let liList = document.querySelectorAll("ul li");


liList.forEach((li) => {
  li.addEventListener("click", (event) => {
    let category = event.target.innerHTML;
    CrrunetREivew(category);
  });
});

async function CrrunetREivew(category) {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "3357f8861fmsh420423ea68a8ab3p14a26cjsn4ced5c9d3948",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    currentReview = await response.json();
    DisplayData(currentReview);

    table.classList.remove("d-none");
    spinner.classList.add("d-none");

    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        DetailsGame(currentReview[0].id);
        details.classList.remove("d-none");
      });
    });

    return currentReview;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function DetailsGame(id) {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "3357f8861fmsh420423ea68a8ab3p14a26cjsn4ced5c9d3948",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    const gameDetails = await response.json();
   Displaygame(gameDetails)
  } catch (error) {
    console.error("Error fetching game details:", error);
  }
}


function DisplayData(data) {
  let cardHtml = ``;
  for (let i = 0; i < data.length; i++) {
    cardHtml += `
      <div class="col-md-3">
        <div class="card w-100">
          <img src="${data[i].thumbnail}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title line-clamp-1">${data[i].title}</h5>
            <p class="card-text line-clamp-3">${data[i].short_description}</p>
          </div>
        </div>
      </div>
    `;
  }
  document.querySelector(".container .row").innerHTML = cardHtml;
}

CrrunetREivew("MMORPG");



function Displaygame(data) {
let BoxData =``
     BoxData=`
      <div class="col-md-4">
      <img src="${data.thumbnail}" class="w-100" alt="image details">
   </div>
   <div class="col-md-8">
      <h3>Title:${data.title} </h3>
      <p>Category: <span class="badge text-bg-info"></span>${data.genre} </p>
      <p>Platform: <span class="badge text-bg-info"></span>${data.platform} </p>
      <p>Status: <span class="badge text-bg-info"></span>${data.status} </p>
      <p class="small">${data.description}</p>
      <a class="btn btn-outline-warning" target="_blank" href="${data.freetogame_profile_url}">Show Game</a>
   </div>
      
      </div>
         </div>
    
    
    `
    document.getElementById("DetailsContent").innerHTML = BoxData
  }



  function btn() {
    document.querySelector(".details").classList.add("d-none")
    }