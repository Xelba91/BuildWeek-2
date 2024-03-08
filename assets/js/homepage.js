const row = document.getElementById("row1");
const row2 = document.getElementById("row2");
const row3 = document.getElementById("row3");
const row4 = document.getElementById("row4");
const id = new URLSearchParams(window.location.search);

function createcardsx(image, titolo, description) {
  const body = document.getElementById("box2");
  const row = document.createElement("div");
  const col = document.createElement("div");
  /* 
  row.className = "row col-12 align-items-center mb-3";
  col.className = "col-2"; */

  const img = document.createElement("img");
  img.className = "card-img prova";
  img.src = image;
  img.style.width = "50px";
  img.style.height = "50px";
  img.style.marginLeft = "20px";
  body.appendChild(row);
  row.appendChild(col);
  row.style.display = "flex";
  row.style.alignItems = "center";
  row.style.gap = "10px";
  row.style.marginBottom = "20px";
  col.appendChild(img);
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title ";
  cardTitle.textContent = titolo;
  row.appendChild(cardTitle);
}
// Creazione card dinamica dx
function createCard(image, title, description, id, row) {
  const col = document.createElement("div");
  col.className = "col-6 col-xl-2 col-md-4";

  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  const img = document.createElement("img");
  img.className = "card-img prova";
  img.src = image;

  cardDiv.appendChild(img);
  const cardBody = document.createElement("div");
  cardBody.className = " m-0 prova2";
  //-----------------------------------------------------------------------
  const link = document.createElement("a");
  link.href = "./artist.html";
  cardDiv.appendChild(link);
  //-------------------------------------------------
  const cardTitle = document.createElement("p");
  cardTitle.className = "card-title pb-0";
  cardTitle.innerText = title;
  cardDiv.appendChild(cardTitle);
  cardTitle.style.paddingTop = "20px";

  const paragrafo = document.createElement("p");
  paragrafo.className = " pb-0";
  paragrafo.innerText = "Artist";
  cardTitle.appendChild(paragrafo);
  paragrafo.style.paddingTop = "20px";

  cardDiv.appendChild(cardBody);
  col.appendChild(cardDiv);
  row.appendChild(col);

  //-------------------------------------------------------------------------------
  cardTitle.addEventListener("click", () => {
    location.href = `./artist.html?artistId=${id}`;
  });
}

const home = (artistId, row) => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}`;
  fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "dc1411bb79msh7fda284dd2f7bdcp11ace5jsnd42d9d71ed13",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella richiesta");
      }
    })
    .then((artist) => {
      const id = artist.id;
      const image = artist.picture;
      const title = artist.name;
      const description = artist.type;
      createCard(image, title, description, id, row);
      createcardsx(image, title, description, row);
    })
    .catch((error) => console.log(`Errore: ${error}`));
};

window.onload = () => {
  for (let i = 0; i < 6; i++) {
    let artistId1 = Math.floor(Math.random() * 900);
    let artistId2 = Math.floor(Math.random() * 900);
    let artistId3 = Math.floor(Math.random() * 900);
    let artistId4 = Math.floor(Math.random() * 900);

    home(artistId1, row);
    home(artistId2, row2);
    home(artistId3, row3);
    home(artistId4, row4);
  }
};
